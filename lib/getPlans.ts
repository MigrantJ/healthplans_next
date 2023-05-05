import { QueryFunction } from "@tanstack/react-query";
import GetPlansRequest from "@/types/GetPlansRequest";
import GetPlansResponse from "@/types/GetPlansResponse";

const getPlans: QueryFunction<
  GetPlansResponse,
  ["query", GetPlansRequest]
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
