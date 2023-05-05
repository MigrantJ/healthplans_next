import { NextRequest, NextResponse } from "next/server";
import GetPlansRequest from "@/types/GetPlansRequest";
import GetPlansResponse from "@/types/GetPlansResponse";

export async function POST(req: NextRequest) {
  const apikey = process.env.HEALTHCARE_API_KEY;
  const reqBody = (await req.json()) as GetPlansRequest;
  let body: any = {
    place: {
      zipcode: reqBody.location.zipcode,
      state: reqBody.location.state,
      countyfips: reqBody.location.countyfips,
    },
    market: "Individual",
  };
  const household = {};
  if (reqBody.income) household["income"] = reqBody.income;
  if (reqBody.household) household["people"] = reqBody.household.people;
  body["household"] = household;
  const res = await fetch(
    `https://marketplace.api.healthcare.gov/api/v1/plans/search?apikey=${apikey}`,
    {
      method: "post",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    }
  );
  if (!res.ok) {
    console.log(await res.json());
    throw new Error(`Error: ${res.status}`);
  }
  const resJson = (await res.json()) as GetPlansResponse;
  return NextResponse.json(resJson);
}
