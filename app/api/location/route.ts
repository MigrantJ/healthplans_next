import geo2zip from "geo2zip";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { parse } from "csv-parse";

import * as GetLocation from "@/types/GetLocation";

interface ZipToCountyAndState {
  [k: string]: [string, string];
}

const dataDir = path.join(process.cwd(), "staticdata");
let zipToCountyAndState: ZipToCountyAndState;

async function buildCodes() {
  zipToCountyAndState = {};
  await new Promise((resolve, reject) => {
    fs.createReadStream(`${dataDir}/location_data.csv`)
      // skip the header row
      .pipe(parse({ delimiter: ",", from_line: 2 }))
      .on("data", function (row: [string, string, string]) {
        zipToCountyAndState[row[0]] = [row[1], row[2]];
      })
      .on("error", (err) => reject(err))
      .on("finish", () => resolve(null));
  });
}

export async function POST(req: NextRequest) {
  const reqBody = (await req.json()) as GetLocation.Request;

  if (!zipToCountyAndState) {
    await buildCodes();
  }

  let closestZipCode: string;
  if ("zipcode" in reqBody && reqBody.zipcode !== "") {
    closestZipCode = reqBody.zipcode;
  } else if ("lat" in reqBody && "long" in reqBody) {
    const location = {
      latitude: reqBody.lat,
      longitude: reqBody.long,
    };
    const zipCodeArray = await geo2zip(location);
    closestZipCode = zipCodeArray[0];
  } else {
    return new NextResponse("Missing required parameters", {
      status: 400,
    });
  }

  if (!("closestZipCode" in zipToCountyAndState)) {
    return NextResponse.json({message: "Please enter a valid US zip code."}, {"status": 400});
  }

  const [county, state] = zipToCountyAndState[closestZipCode];
  const resBody: GetLocation.SuccessResponse = {
    zipcode: closestZipCode,
    state: state,
    countyfips: county,
  };
  return NextResponse.json(resBody);
}
