import { NextRequest, NextResponse } from "next/server";
import GetPlansRequest from "@/types/GetPlansRequest";
import GetPlansResponse from "@/types/GetPlansResponse";

const API_KEY = process.env.HEALTHCARE_API_KEY;

class Requester {
  private static readonly RATE_LIMIT_PER_SECOND = 200;
  private static readonly RATE_LIMIT_PER_MINUTE = 1000;

  private static remainingPerSecond = Requester.RATE_LIMIT_PER_SECOND;
  private static remainingPerMinute = Requester.RATE_LIMIT_PER_MINUTE;

  static async make_request(body) {
    const res = await fetch(
      `https://marketplace.api.healthcare.gov/api/v1/plans/search?apikey=${API_KEY}`,
      {
        method: "post",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
      }
    );
    Requester.remainingPerSecond = parseInt(
      res.headers.get("X-RateLimit-Remaining-second")
    );
    Requester.remainingPerMinute = parseInt(
      res.headers.get("X-RateLimit-Remaining-minute")
    );

    return res;
  }
}

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
  const res = await Requester.make_request(body);
  if (!res.ok) {
    throw new Error(`Error: ${res.status}`);
  }
  let resJson = (await res.json()) as GetPlansResponse;
  let { plans, total } = resJson;

  // create an array of JSON request bodies, each of which is for a page of 10 results
  const pageReqBodies = [];
  for (let i = 10; i < total; i += 10) {
    pageReqBodies.push({ ...body, offset: i });
  }
  // gather tasks for fetching those results
  const tasks = pageReqBodies.map(Requester.make_request);
  const results = await Promise.all(tasks);
  for (let result of results) {
    const pageResJson = (await result.json()) as GetPlansResponse;
    plans = plans.concat(pageResJson.plans);
  }
  resJson.plans = plans;
  return NextResponse.json(resJson);
}
