import geo2zip from "geo2zip";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { parse } from "csv-parse";

const dataDir = path.join(process.cwd(), "staticdata");
// todo: make a type for this
let zipToCountyAndState;

async function buildCodes() {
  zipToCountyAndState = {};
  await new Promise((resolve, reject) => {
    fs.createReadStream(`${dataDir}/location_data.csv`)
      // skip the header row
      .pipe(parse({ delimiter: ",", from_line: 2 }))
      .on("data", function (row) {
        zipToCountyAndState[row[0]] = [row[1], row[2]];
      })
      .on("error", (err) => reject(err))
      .on("finish", () => resolve(null));
  });
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const lat = searchParams.get("lat");
  const long = searchParams.get("long");
  const zipcode = searchParams.get("zipcode");

  if (!(lat !== null && long !== null) && zipcode === null) {
    return new NextResponse("Missing required parameters", {
      status: 400
    });
  }

  if (!zipToCountyAndState) {
    await buildCodes();
  }

  let closestZipCode: string;
  if (zipcode) {
    closestZipCode = zipcode;
  } else {
    const location = {
      latitude: parseFloat(searchParams.get("lat")),
      longitude: parseFloat(searchParams.get("long")),
    };
    closestZipCode = await geo2zip(location);
  }

  const [county, state] = zipToCountyAndState[closestZipCode];
  return NextResponse.json({
    zipcode: closestZipCode,
    state: state,
    countyfips: county,
  });
}
