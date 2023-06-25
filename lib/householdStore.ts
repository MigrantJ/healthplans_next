import { create } from "zustand";

import ILocation from "@/types/Location";
import IPerson from "@/types/Person";
import IFilter from "@/types/Filter";
import { DisplayMode } from "@/types/DisplayMode";

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
