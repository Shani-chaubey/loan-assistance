import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Application } from "@/lib/models";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Support both legacy contact-form keys (f_name/l_name) and new direct keys (name)
    const name  = body.name?.trim() || `${body.f_name ?? ""} ${body.l_name ?? ""}`.trim();
    const email = body.email?.trim() ?? "";
    const phone = body.phone?.trim() ?? "";

    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required." }, { status: 400 });
    }

    await connectDB();
    await Application.create({
      name,
      email,
      phone,
      loanType: body.loanType || body.purpose || "General Enquiry",
      purpose:  body.purpose  ?? body.loanType ?? "General Enquiry",
      amount:   Number(body.amount) || 0,
      gender:             body.gender            ?? "",
      birth:              body.birth             ?? "",
      maritalStatus:      body.maritalStatus     ?? "",
      dependants:         body.dependants        ?? "",
      city:               body.city              ?? "",
      street:             body.street            ?? "",
      houseName:          body.houseName         ?? "",
      homeTown:           body.homeTown          ?? "",
      timeAtAddress:      body.timeAtAddress     ?? "",
      timeAtAddress2:     body.timeAtAddress2    ?? "",
      employmentStatus:   body.employmentStatus  ?? "",
      employerName:       body.employerName      ?? "",
      employmentIndustry: body.employmentIndustry ?? "",
      employmentLength:   body.employmentLength  ?? "",
      income:             Number(body.income)    || 0,
      message: body.message ?? "",
    });

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("Contact form error:", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
