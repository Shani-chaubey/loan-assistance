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
    const missingText = ["name", "email", "phone", "purpose"].filter((k) => !body?.[k]?.toString().trim());
    if (missingText.length || !Number(body?.amount)) {
      const all = [...missingText, ...(!Number(body?.amount) ? ["amount"] : [])];
      return err(`Required fields missing: ${all.join(", ")}`, 400);
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
