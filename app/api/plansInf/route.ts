import { NextRequest, NextResponse } from "next/server";
import * as GetPlans from "@/types/GetPlans";
import * as MarketplaceSearch from "@/types/MarketplaceSearch";

const API_KEY = process.env.HEALTHCARE_API_KEY;

const INVALID_STATES: { [key: string]: [string, string] } = {
  CA: ["Covered California", "https://www.coveredca.com/"],
  CO: ["Connect for Health Colorado", "https://connectforhealthco.com/"],
  CT: ["Access Health CT", "https://www.accesshealthct.com/"],
  DC: ["DC Health Link", "https://dchealthlink.com/"],
  ID: ["Your Health Idaho", "https://www.yourhealthidaho.org/"],
  KY: ["Kynect", "https://kynect.ky.gov/s/?language=en_US"],
  ME: ["CoverME", "https://www.coverme.gov/"],
  MD: [
    "Maryland Health Connection",
    "https://www.marylandhealthconnection.gov/",
  ],
  MA: ["Massachusetts Health Connector", "https://www.mahix.org/individual/"],
  MN: ["MNsure", "https://www.mnsure.org/"],
  NV: ["Nevada Health Link", "https://www.nevadahealthlink.com/"],
  NJ: ["Get Covered NJ", "https://www.nj.gov/getcoverednj/"],
  NM: ["bewellnm", "https://www.bewellnm.com/"],
  NY: ["New York State of Health", "https://nystateofhealth.ny.gov/"],
  PA: ["Pennie", "https://pennie.com/"],
  RI: ["HealthSource RI", "https://healthsourceri.com/"],
  VT: [
    "Vermont Health Connect",
    "https://portal.healthconnect.vermont.gov/VTHBELand/welcome.action",
  ],
  WA: ["Washington Healthplanfinder", "https://maint.wahealthplanfinder.org/"],
};

class Requester {
  private static readonly RATE_LIMIT_PER_SECOND = 200;
  private static readonly RATE_LIMIT_PER_MINUTE = 1000;

  private static remainingPerSecond = Requester.RATE_LIMIT_PER_SECOND;
  private static remainingPerMinute = Requester.RATE_LIMIT_PER_MINUTE;

  static make_request = async (body) => {
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
  };
}

export async function POST(req: NextRequest) {
  const reqBody = (await req.json()) as GetPlans.Request;
  const body: MarketplaceSearch.Request = {
    place: reqBody.location,
    market: "Individual",
    filter: reqBody.filter,
  };
  const household = {};
  if (reqBody.income) household["income"] = reqBody.income;
  if (reqBody.people) household["people"] = reqBody.people;
  body["household"] = household;
  if (reqBody.pageParam) body["offset"] = reqBody.pageParam * 10;
  const res = await Requester.make_request(body);
  if (!res.ok) {
    const resJson = (await res.json()) as MarketplaceSearch.ErrorResponse;
    if (resJson.code === "1003") {
      // this user's state runs their own exchange
      const state = reqBody.location.state;
      const [exchange_name, exchange_url] = INVALID_STATES[state];
      const invalidStateBody: GetPlans.Response = {
        plans: [],
        total: 0,
        alt_data: {
          type: "InvalidState",
          ...{ state, exchange_name, exchange_url },
        },
      };
      return NextResponse.json(invalidStateBody);
    }
    throw new Error(`Error: ${res.status}`);
  }
  const resJson = (await res.json()) as MarketplaceSearch.SuccessResponse;
  return NextResponse.json(resJson);
}
