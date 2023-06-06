import { QueryFunction } from "@tanstack/react-query";
import * as GCE from "@/types/GetCreditEstimate";

interface IProps {
  queryKey: ["query", GCE.InitRequest];
}

export const getCreditEstimate: QueryFunction<
  GCE.Response,
  ["query", GCE.InitRequest]
> = async ({ queryKey }: IProps) => {
  const body: GCE.InitRequest = { ...queryKey[1] };
  const res = await fetch(`/api/credit`, {
    method: "post",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) {
    throw new Error(`Error: ${res.status}`);
  }
  const resJson = (await res.json()) as GCE.Response;
  return resJson;
};
