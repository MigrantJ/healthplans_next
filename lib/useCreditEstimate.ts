import { useQuery, QueryFunction } from "@tanstack/react-query";
import * as GCE from "@/types/GetCreditEstimate";
import ILocation from "@/types/Location";
import IPerson from "@/types/Person";

interface IProps {
  queryKey: ["query", GCE.InitRequest];
}

const getCreditEstimate: QueryFunction<
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

const querySelect = (data: GCE.Response) => data.estimates[0];

export const useCreditEstimate = (
  location: ILocation,
  income: number,
  people: IPerson[]
) =>
  useQuery({
    queryKey: ["creditEstimate", { location, income, people }],
    queryFn: getCreditEstimate,
    select: querySelect,
    enabled: !!location && income > 0,
    keepPreviousData: true,
    retry: 10,
  });
