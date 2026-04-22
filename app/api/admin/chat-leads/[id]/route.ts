import { connectDB } from "@/lib/mongodb";
import { ChatLead } from "@/lib/models";
import { ok, err } from "@/lib/apiHelper";
import { NextRequest } from "next/server";

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;
    await ChatLead.findByIdAndDelete(id);
    return ok({ deleted: true });
  } catch (e) { return err(String(e), 500); }
}
