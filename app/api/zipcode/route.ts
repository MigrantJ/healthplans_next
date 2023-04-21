import geo2zip from "geo2zip";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const location = {
    latitude: parseFloat(searchParams.get("lat")),
    longitude: parseFloat(searchParams.get("long")),
  };
  const closestZipCode = await geo2zip(location);
  return NextResponse.json({ closestZipCode: closestZipCode });
}
