import { create } from "zustand";

import IPerson from "@/types/Person";
import IFilter from "@/types/Filter";

import { Request, SuccessResponse } from "@/types/GetLocation";
import { useQuery, useQueryClient, QueryFunction } from "@tanstack/react-query";

interface HouseholdStore {
  latlong: { lat: number; long: number };
  zipcode: string;
  income: number;
  people: IPerson[];
  filter: IFilter;
  actions: {
    setLatLong: (newLatLong: { lat: number; long: number }) => void;
    setZipcode: (newZipcode: string) => void;
    setIncome: (newIncome: number) => void;
    setPeople: (newPeople: IPerson[]) => void;
    setFilter: (newFilter: IFilter) => void;
  };
}

const useHouseholdStore = create<HouseholdStore>((set) => ({
  latlong: { lat: null, long: null },
  zipcode: "",
  income: 0,
  people: [],
  filter: null,
  displayMode: "Planlist",
  actions: {
    setLatLong: (newLatLong) => set({ latlong: newLatLong }),
    setZipcode: (newZipcode) => set({ zipcode: newZipcode }),
    setIncome: (newIncome) => set({ income: newIncome }),
    setPeople: (newPeople) => set({ people: newPeople }),
    setFilter: (newFilter) => set({ filter: newFilter }),
  },
}));

// export selectors so that it is not possible to select the entire store and references remain stable
export const useLatLong = () => useHouseholdStore((state) => state.latlong);
export const useZipcode = () => useHouseholdStore((state) => state.zipcode);
export const useIncome = () => useHouseholdStore((state) => state.income);
export const usePeople = () => useHouseholdStore((state) => state.people);
export const useFilter = () => useHouseholdStore((state) => state.filter);
// since functions are static, they can be exported as an object without failing equivalence check
export const useHouseholdActions = () =>
  useHouseholdStore((state) => state.actions);

const getLocation: QueryFunction<
  SuccessResponse,
  ["location", Request]
> = async ({ queryKey }) => {
  const body: Request = { ...queryKey[1] };
  console.log(body);
  const res = await fetch(`/api/location`, {
    method: "post",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) {
    throw new Error(`Error: ${res.status}`);
  }
  const location = (await res.json()) as SuccessResponse;
  return location;
};

export const useLocation = () => {
  const queryClient = useQueryClient();
  const latlong = useHouseholdStore((state) => state.latlong);
  const { lat, long } = latlong;
  const zipcode = useHouseholdStore((state) => state.zipcode);
  const results = useQuery({
    queryKey: ["location", { lat, long, zipcode }],
    queryFn: getLocation,
    enabled: !!zipcode || (lat !== null && long !== null),
    keepPreviousData: true,
    retry: 10,
  });
  const location = results.data;
  // since queryresult uniqueness is based on zip code, fill the cache with other combinations of the same zip code
  if (location?.zipcode) {
    if (
      !queryClient.getQueryData([
        "location",
        { lat, long, zipcode: location.zipcode },
      ])
    ) {
      queryClient.setQueryData(
        ["location", { lat, long, zipcode: location.zipcode }],
        location
      );
      queryClient.setQueryData(
        ["location", { lat: null, long: null, zipcode: location.zipcode }],
        location
      );
    }
  }
  return results;
};
