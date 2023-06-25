import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { create } from "zustand";

import ILocation from "@/types/Location";
import IPerson from "@/types/Person";
import * as GCE from "@/types/GetCreditEstimate";
import * as GetPlans from "@/types/GetPlans";
import { getCreditEstimate } from "./useCreditEstimate";
import { getPlans } from "./getPlans";
import IFilter from "@/types/Filter";
import { DisplayMode } from "@/types/DisplayMode";
import IHealthPlan from "@/types/HealthPlan";
import filterPlans from "./filterPlans";
import constants from "../styles/constants";

interface HouseholdStore {
  location: ILocation;
  income: number;
  people: IPerson[];
  filter: IFilter;
  displayMode: DisplayMode;
  actions: {
    setLocation: (newLocation: ILocation) => void;
    setIncome: (newIncome: number) => void;
    setPeople: (newPeople: IPerson[]) => void;
    setFilter: (newFilter: IFilter) => void;
    setDisplayMode: (newDisplayMode: DisplayMode) => void;
  };
}

const useHouseholdStore = create<HouseholdStore>((set) => ({
  location: null,
  income: 0,
  people: [],
  filter: null,
  displayMode: "Planlist",
  actions: {
    setLocation: (newLocation) => set({ location: newLocation }),
    setIncome: (newIncome) => set({ income: newIncome }),
    setPeople: (newPeople) => set({ people: newPeople }),
    setFilter: (newFilter) => set({ filter: newFilter }),
    setDisplayMode: (newDisplayMode) => set({ displayMode: newDisplayMode }),
  },
}));

// export selectors so that it is not possible to select the entire store and references remain stable
export const useLocation = () => useHouseholdStore((state) => state.location);
export const useIncome = () => useHouseholdStore((state) => state.income);
export const usePeople = () => useHouseholdStore((state) => state.people);
export const useFilter = () => useHouseholdStore((state) => state.filter);
export const useDisplayMode = () =>
  useHouseholdStore((state) => state.displayMode);
// since functions are static, they can be exported as an object without failing equivalence check
export const useHouseholdActions = () =>
  useHouseholdStore((state) => state.actions);

const querySelect = (data: GCE.Response) => data.estimates[0];

export const useCreditEstimate = () => {
  const location = useLocation();
  const income = useIncome();
  const people = usePeople();
  return useQuery({
    queryKey: ["creditEstimate", { location, income, people }],
    queryFn: getCreditEstimate,
    select: querySelect,
    enabled: !!location && income > 0,
    keepPreviousData: true,
    retry: 10,
    placeholderData: {
      estimates: [
        {
          aptc: 0,
          hardship_exemption: false,
          is_medicaid_chip: false,
          in_coverage_gap: false,
        },
      ],
    },
  });
};

const usePlans = () => {
  const location = useLocation();
  const income = useIncome();
  const people = usePeople();
  return useInfiniteQuery<GetPlans.Response, Error>({
    queryKey: ["plans", { location, income, people }],
    queryFn: getPlans,
    enabled: !!location,
    keepPreviousData: true,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    retry: 10,
    placeholderData: {
      pages: [
        {
          plans: [],
          total: 0,
          ranges: {
            premiums: {
              min: 0,
              max: 1000,
            },
            deductibles: {
              min: 0,
              max: 1000,
            },
          },
          facet_groups: [],
        },
      ],
      pageParams: [],
    },
  });
};

export const usePlanFacetGroups = () => {
  const result = usePlans();
  return result.data?.pages[0].facet_groups;
};

export const usePlanRanges = () => {
  const result = usePlans();
  return result.data?.pages[0].ranges;
};

export const useFilteredPlans = () => {
  const results = usePlans();
  const filter = useFilter();
  const creditEstimate = useCreditEstimate().data;

  const plans =
    results.data?.pages.reduce((acc, page) => {
      return acc.concat(page.plans);
    }, [] as IHealthPlan[]) || [];
  return filterPlans(plans, filter, creditEstimate.aptc);
};

export const usePlanQueryStatus = () => {
  const { isInitialLoading, hasNextPage, fetchNextPage, isFetching } =
    usePlans();
  return { isInitialLoading, hasNextPage, fetchNextPage, isFetching };
};

interface SavedPlansStore {
  savedPlans: Set<string>;
  actions: {
    addSavedPlan: (id: string) => void;
    removeSavedPlan: (id: string) => void;
  };
}

const useSavedPlansStore = create<SavedPlansStore>((set) => ({
  savedPlans: new Set(),
  actions: {
    addSavedPlan: (id: string) =>
      set((state) => {
        const newSet = new Set(state.savedPlans);
        newSet.add(id);
        return { savedPlans: newSet };
      }),
    removeSavedPlan: (id: string) =>
      set((state) => {
        const newSet = new Set(state.savedPlans);
        newSet.delete(id);
        return { savedPlans: newSet };
      }),
  },
}));

export const useNumSavedPlans = () =>
  useSavedPlansStore((state) => state.savedPlans.size);
export const useIsPlanSaved = (id: string) =>
  useSavedPlansStore((state) => state.savedPlans.has(id));
export const useToggleSavedPlan = () => {
  const savedPlanIds = useSavedPlansStore((state) => state.savedPlans);
  const { addSavedPlan, removeSavedPlan } = useSavedPlansStore(
    (state) => state.actions
  );
  return (id: string) => {
    if (savedPlanIds.has(id)) {
      removeSavedPlan(id);
    } else {
      if (savedPlanIds.size === constants.MAX_SAVED_PLANS) return false;
      addSavedPlan(id);
    }
    return true;
  };
};
export const useSavedPlans = () => {
  const savedPlanIds = useSavedPlansStore((state) => state.savedPlans);
  const results = usePlans();
  const plans =
    results.data?.pages.reduce((acc, page) => {
      return acc.concat(page.plans);
    }, [] as IHealthPlan[]) || [];
  return plans.filter((plan) => savedPlanIds.has(plan.id));
};
