import { NextRequest, NextResponse } from "next/server";
import { IHealthPlan } from "@/types/HealthPlan";

export interface GetPlansResponse {
  plans: IHealthPlan[];
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const zipcode = searchParams.get("zipcode");
  const state = searchParams.get("state");
  const countyCode = searchParams.get("countyCode");

  const apikey = process.env.HEALTHCARE_API_KEY;
  const res = await fetch(
    `https://marketplace.api.healthcare.gov/api/v1/plans/search?apikey=${apikey}`,
    {
      method: "post",
      body: JSON.stringify({
        place: {
          zipcode: zipcode,
          state: state,
          countyfips: countyCode,
        },
        market: "Individual",
      }),
      headers: { "Content-Type": "application/json" },
    }
  );
  const resJson = (await res.json()) as GetPlansResponse;
  return NextResponse.json(resJson);
}
