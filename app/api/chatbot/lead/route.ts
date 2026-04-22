import { connectDB } from "@/lib/mongodb";
import { ChatLead } from "@/lib/models";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, phone, query } = await req.json();
    if (!name || !phone) {
      return NextResponse.json({ success: false, error: "Name and phone required" }, { status: 400 });
    }
    await connectDB();
    await ChatLead.create({ name: name.trim(), phone: phone.trim(), query: query ?? "" });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
