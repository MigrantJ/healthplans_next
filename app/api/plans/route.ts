import { NextRequest, NextResponse } from "next/server";
import dotenv from "dotenv";
dotenv.config();

export async function GET(req: NextRequest) {
    const apikey = process.env.HEALTHCARE_API_KEY;
    const res = await fetch(`https://marketplace.api.healthcare.gov/api/v1/plans/search?apikey=${apikey}`);
    return res.json();
}
