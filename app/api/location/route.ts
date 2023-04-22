import geo2zip from "geo2zip";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { parse } from "csv-parse";

const dataDir = path.join(process.cwd(), "staticdata");
// todo: make a type for this
let zipToCountyAndState = {};

function buildCodes() {
  fs.createReadStream(`${dataDir}/location_data.csv`)
    // skip the header row
    .pipe(parse({ delimiter: ",", from_line: 2 }))
    .on("data", function (row) {
      if (row) {
        zipToCountyAndState[row[0]] = [row[1], row[2]];
      }
    });
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const lat = searchParams.get("lat");
  const long = searchParams.get("long");
  const zipcode = searchParams.get("zipcode");

  let closestZipCode: string;
  if (lat !== null && long !== null) {
    const location = {
      latitude: parseFloat(searchParams.get("lat")),
      longitude: parseFloat(searchParams.get("long")),
    };
    closestZipCode = await geo2zip(location);
  } else if (zipcode !== null) {
    closestZipCode = zipcode;
  } else {
    //todo: better error handling here
    throw new Error("Required parameters not found");
  }
  const [county, state] = zipToCountyAndState[closestZipCode];
  return NextResponse.json({
    zipcode: closestZipCode,
    state: state,
    countyfips: county,
  });
}

buildCodes();
