import { QueryFunction } from "@tanstack/react-query";
import * as GetPlans from "@/types/GetPlans";

const getPlans: QueryFunction<
  GetPlans.Response,
  ["query", GetPlans.Request]
> = async ({ queryKey }) => {
  const body = queryKey[1];
  const res = await fetch(`/api/plans`, {
    method: "post",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) {
    throw new Error(`Error: ${res.status}`);
  }
  return res.json();
};

export default getPlans;
