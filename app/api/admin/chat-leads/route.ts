import { connectDB } from "@/lib/mongodb";
import { ChatLead } from "@/lib/models";
import { ok, err } from "@/lib/apiHelper";

export async function GET() {
  try {
    await connectDB();
    const docs = await ChatLead.find().sort({ createdAt: -1 }).lean();
    return ok(docs);
  } catch (e) { return err(String(e), 500); }
}
