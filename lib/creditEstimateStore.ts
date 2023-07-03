import { useQuery, QueryFunction } from "@tanstack/react-query";
import * as GCE from "@/types/GetCreditEstimate";
import { useIncome, useLocation, usePeople } from "./householdStore";

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

const querySelect = (data: GCE.Response) => data.estimates[0];

export const useCreditEstimate = () => {
  const location = useLocation().data;
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
