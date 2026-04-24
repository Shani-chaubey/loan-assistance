import { getSettings } from "@/lib/data";
import { NextResponse } from "next/server";

export async function GET() {
    const settings = await getSettings();
    return NextResponse.json({ success: true, data: settings });
}
