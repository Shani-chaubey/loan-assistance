import { connectDB } from "@/lib/mongodb";
import { FormField, FORM_FIELD_SEEDS } from "@/lib/models";
import { ok, err } from "@/lib/apiHelper";

async function seedIfEmpty() {
  const count = await FormField.countDocuments();
  if (count === 0) {
    await FormField.insertMany(FORM_FIELD_SEEDS);
  }
}

export async function GET() {
  try {
    await connectDB();
    await seedIfEmpty();
    const fields = await FormField.find({ enabled: true }).sort({ order: 1 }).lean();
    return ok(fields);
  } catch (e) {
    return err(String(e), 500);
  }
}
