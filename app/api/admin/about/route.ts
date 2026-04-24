import { connectDB } from "@/lib/mongodb";
import { AboutPage } from "@/lib/models";
import { ok, err } from "@/lib/apiHelper";
import { NextRequest } from "next/server";

export async function GET() {
    try {
        await connectDB();
        const doc = await AboutPage.findOne().lean();
        return ok(doc ?? {});
    } catch (e) {
        return err(String(e), 500);
    }
}

export async function PUT(req: NextRequest) {
    try {
        await connectDB();
        const body = await req.json();
        const doc = await AboutPage.findOneAndUpdate({}, body, { new: true, upsert: true });
        return ok(doc);
    } catch (e) {
        return err(String(e), 500);
    }
}
