import { NextRequest, NextResponse } from "next/server";
import * as GCE from "@/types/GetCreditEstimate";

const API_KEY = process.env.HEALTHCARE_API_KEY;

export async function POST(req: NextRequest) {
  const reqBody = (await req.json()) as GCE.InitRequest;
  const body = {
    place: reqBody.location,
    market: "Individual",
    household: {
      income: reqBody.income,
      people: reqBody.people,
    },
  };

  const res = await fetch(
    `https://marketplace.api.healthcare.gov/api/v1/households/eligibility/estimates?apikey=${API_KEY}`,
    {
      method: "post",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    }
  );

  const resJson = (await res.json()) as GCE.Response;
  return NextResponse.json(resJson);
}
