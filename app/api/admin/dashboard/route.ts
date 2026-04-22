import { connectDB } from "@/lib/mongodb";
import { Service, TeamMember, Testimonial, BlogPost, Application } from "@/lib/models";
import { ok, err } from "@/lib/apiHelper";

export async function GET() {
  try {
    await connectDB();
    const [services, team, testimonials, blogs, applications] = await Promise.all([
      Service.countDocuments(),
      TeamMember.countDocuments(),
      Testimonial.countDocuments(),
      BlogPost.countDocuments(),
      Application.countDocuments(),
    ]);
    const pending = await Application.countDocuments({ status: "pending" });
    const recentApps = await Application.find().sort({ createdAt: -1 }).limit(5).lean();
    return ok({ services, team, testimonials, blogs, applications, pending, recentApps });
  } catch (e) {
    return err(String(e), 500);
  }
}
