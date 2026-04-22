import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Application } from "@/lib/models";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { f_name, l_name, email, phone, address, message, loanType, amount } = body;

    if (!f_name || !l_name || !email) {
      return NextResponse.json({ error: "Name and email are required." }, { status: 400 });
    }

    await connectDB();
    await Application.create({
      name: `${f_name} ${l_name}`.trim(),
      email,
      phone: phone ?? "",
      loanType: loanType ?? "General Enquiry",
      amount: Number(amount) || 0,
      message: `${address ? `Address: ${address}\n` : ""}${message ?? ""}`,
    });

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("Contact form error:", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
