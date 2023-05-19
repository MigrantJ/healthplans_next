import { QueryFunction } from "@tanstack/react-query";
import * as GetPlans from "@/types/GetPlans";

interface IProps {
  queryKey: ["query", GetPlans.Request];
  pageParam?: number;
}

export const getPlans: QueryFunction<
  GetPlans.Response,
  ["query", GetPlans.Request]
> = async ({ queryKey, pageParam = 0 }: IProps) => {
  const body: GetPlans.Request = { ...queryKey[1], pageParam };
  const res = await fetch(`/api/plans`, {
    method: "post",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) {
    throw new Error(`Error: ${res.status}`);
  }
  const resJson = (await res.json()) as GetPlans.Response;
  if (resJson.plans.length === 10) resJson.nextCursor = pageParam + 1;
  return resJson;
};
