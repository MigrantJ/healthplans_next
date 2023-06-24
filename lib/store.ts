import { useQuery } from "@tanstack/react-query";
import { create } from "zustand";

import ILocation from "@/types/Location";
import IPerson from "@/types/Person";
import * as GCE from "@/types/GetCreditEstimate";
import { getCreditEstimate } from "./useCreditEstimate";

interface State {
  location: ILocation;
  income: number;
  people: IPerson[];
  actions: {
    setLocation: (newLocation: ILocation) => void;
    setIncome: (newIncome: number) => void;
    setPeople: (newPeople: IPerson[]) => void;
  };
}

const useHouseholdStore = create<State>((set) => ({
  location: null,
  income: 0,
  people: [],
  actions: {
    setLocation: (newLocation) => set({ location: newLocation }),
    setIncome: (newIncome) => set({ income: newIncome }),
    setPeople: (newPeople) => set({ people: newPeople }),
  },
}));

// export selectors so that it is not possible to select the entire store and references remain stable
export const useLocation = () => useHouseholdStore((state) => state.location);
export const useIncome = () => useHouseholdStore((state) => state.income);
export const usePeople = () => useHouseholdStore((state) => state.people);
// since functions are static, they can be exported as an object without failing equivalence check
export const useActions = () => useHouseholdStore((state) => state.actions);

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

// CUSTOM HOOKS
// useFilteredPlans
// useCreditEstimate

// ACTIONS
// addPerson
// editPerson?
// removePerson
// setIncome
// setZipCode?
