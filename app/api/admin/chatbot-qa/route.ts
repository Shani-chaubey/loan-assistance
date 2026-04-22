import { connectDB } from "@/lib/mongodb";
import { ChatbotQA } from "@/lib/models";
import { ok, err } from "@/lib/apiHelper";
import { NextRequest } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const docs = await ChatbotQA.find().sort({ order: 1, createdAt: 1 }).lean();
    return ok(docs);
  } catch (e) { return err(String(e), 500); }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    if (typeof body.keywords === "string") {
      body.keywords = body.keywords.split(",").map((k: string) => k.trim()).filter(Boolean);
    }
    const doc = await ChatbotQA.create(body);
    return ok(doc, 201);
  } catch (e) { return err(String(e), 500); }
}
