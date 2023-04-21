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
    .pipe(parse({ delimiter: ",", from_line: 2 }))
    .on("data", function (row) {
      zipToCountyAndState[row[0]] = [row[1], row[2]];
    });
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const location = {
    latitude: parseFloat(searchParams.get("lat")),
    longitude: parseFloat(searchParams.get("long")),
  };
  const closestZipCode = await geo2zip(location);
  const [county, state] = zipToCountyAndState[closestZipCode];
  return NextResponse.json({
    zipcode: closestZipCode,
    state: state,
    countyfips: county,
  });
}

buildCodes();
