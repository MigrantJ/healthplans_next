import { QueryFunction } from "@tanstack/react-query";
import IHealthPlan from "@/types/HealthPlan";

export type GetPlansInput = {
  zipCode: string;
  state: string;
  countyCode: string;
};

export interface GetPlansResponse {
  plans: IHealthPlan[];
}

const getPlans: QueryFunction<
  GetPlansResponse,
  ["location", GetPlansInput]
> = async ({ queryKey }) => {
  const { zipCode, state, countyCode } = queryKey[1];
  const res = await fetch(
    `/api/plans?zipcode=${zipCode}&state=${state}&countyCode=${countyCode}`
  );
  if (!res.ok) {
    throw new Error(`Get Plans Failed`);
  }
  return res.json();
};

export default getPlans;
