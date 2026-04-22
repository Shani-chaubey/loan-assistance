import { connectDB } from "@/lib/mongodb";
import { ChatbotQA } from "@/lib/models";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const faqs = await ChatbotQA.find().sort({ order: 1, createdAt: 1 }).lean();
    return NextResponse.json({ success: true, data: faqs });
  } catch {
    return NextResponse.json({ success: false, data: [] });
  }
}
