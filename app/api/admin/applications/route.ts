import { connectDB } from "@/lib/mongodb";
import { Application } from "@/lib/models";
import { ok, err } from "@/lib/apiHelper";
import { NextRequest } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const docs = await Application.find().sort({ order: 1, createdAt: -1 }).lean();
    return ok(docs);
  } catch (e) {
    return err(String(e), 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    if (!body?.name || !body?.email || !body?.phone || !body?.purpose || !Number(body?.amount)) {
      return err("Name, email, phone, purpose and amount are required", 400);
    }
    const doc = await Application.create({
      ...body,
      amount: Number(body.amount) || 0,
      income: Number(body.income) || 0,
      loanType: body.loanType || body.purpose || "Personal Loan",
    });
    return ok(doc, 201);
  } catch (e) {
    return err(String(e), 500);
  }
}
