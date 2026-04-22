import { connectDB } from "@/lib/mongodb";
import { Partner } from "@/lib/models";
import { ok, err } from "@/lib/apiHelper";
import { NextRequest } from "next/server";

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;
    const doc = await Partner.findById(id).lean();
    if (!doc) return err("Not found", 404);
    return ok(doc);
  } catch (e) { return err(String(e), 500); }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await req.json();
    const doc = await Partner.findByIdAndUpdate(id, body, { new: true });
    if (!doc) return err("Not found", 404);
    return ok(doc);
  } catch (e) { return err(String(e), 500); }
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;
    await Partner.findByIdAndDelete(id);
    return ok({ deleted: true });
  } catch (e) { return err(String(e), 500); }
}
