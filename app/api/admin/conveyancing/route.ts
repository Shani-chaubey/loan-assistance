import { connectDB } from "@/lib/mongodb";
import { ConveyancingService } from "@/lib/models";
import { ok, err } from "@/lib/apiHelper";
import { NextRequest } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const docs = await ConveyancingService.find().sort({ order: 1, createdAt: -1 }).lean();
    return ok(docs);
  } catch (e) {
    return err(String(e), 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const doc = await ConveyancingService.create(body);
    return ok(doc, 201);
  } catch (e) {
    return err(String(e), 500);
  }
}
