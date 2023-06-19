import { NextRequest, NextResponse } from "next/server";
import * as GCE from "@/types/GetCreditEstimate";
import Requester from "@/lib/requester";

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

  const res = await Requester.getEligibility(body);
  const resJson = (await res.json()) as GCE.Response;
  return NextResponse.json(resJson);
}
