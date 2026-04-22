import mongoose, { Schema } from "mongoose";

// ── Settings ─────────────────────────────────────────────
const settingsSchema = new Schema(
  {
    siteName: { type: String, default: "Payloan" },
    tagline: { type: String, default: "Banking & Business Loan" },
    phone1: { type: String, default: "+1 (800) 694-8956" },
    phone2: { type: String, default: "88 487 983 576" },
    email: { type: String, default: "hello@payloan.com" },
    address: { type: String, default: "42 Finance Tower, New York, NY 10001" },
    workingHours: { type: String, default: "Mon – Sat: 9 AM – 6 PM" },
    facebookUrl: { type: String, default: "#" },
    twitterUrl: { type: String, default: "#" },
    linkedinUrl: { type: String, default: "#" },
    instagramUrl: { type: String, default: "#" },
    youtubeUrl: { type: String, default: "#" },
  },
  { timestamps: true },
);

// ── Hero ──────────────────────────────────────────────────
const heroSchema = new Schema(
  {
    eyebrow: { type: String, default: "Trusted by 50,000+ customers" },
    title: { type: String, default: "Fast, Flexible & Trusted Loan Solutions" },
    subtitle: {
      type: String,
      default:
        "Get instant approval with lowest interest rates, flexible repayment, and zero hidden charges.",
    },
    ctaPrimary: { type: String, default: "Apply Now" },
    ctaSecondary: { type: String, default: "Learn More" },
    stat1Value: { type: String, default: "50K+" },
    stat1Label: { type: String, default: "Happy Customers" },
    stat2Value: { type: String, default: "₹500Cr+" },
    stat2Label: { type: String, default: "Disbursed" },
    stat3Value: { type: String, default: "24 Hrs" },
    stat3Label: { type: String, default: "Approval Time" },
    image: { type: String, default: "/images/banner/banner_img.png" },
  },
  { timestamps: true },
);

// ── Stat item ─────────────────────────────────────────────
const statSchema = new Schema(
  {
    icon: { type: String, default: "icofont-users" },
    value: { type: String, required: true },
    label: { type: String, required: true },
    color: { type: String, default: "#8180e0" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

// ── Service ───────────────────────────────────────────────
const serviceSchema = new Schema(
  {
    icon: { type: String, default: "flaticon-money" },
    rate: { type: String, required: true },
    title: { type: String, required: true },
    amount: { type: String, required: true },
    tenure: { type: String, required: true },
    desc: { type: String, required: true },
    features: { type: [String], default: [] },
    color: { type: String, default: "#8180e0" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

// ── Why Choose Us ─────────────────────────────────────────
const whySchema = new Schema(
  {
    icon: { type: String, default: "icofont-flash" },
    title: { type: String, required: true },
    desc: { type: String, required: true },
    color: { type: String, default: "#8180e0" },
    bg: { type: String, default: "rgba(129,128,224,0.10)" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

// ── Team Member ───────────────────────────────────────────
const teamSchema = new Schema(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    image: { type: String, default: "/images/team/1.jpg" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

// ── Testimonial ───────────────────────────────────────────
const testimonialSchema = new Schema(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    image: { type: String, default: "/images/testimonials/1.jpg" },
    text: { type: String, required: true },
    stars: { type: Number, default: 5, min: 1, max: 5 },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

// ── Blog Post ─────────────────────────────────────────────
const blogSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, default: "General" },
    author: { type: String, default: "Admin" },
    date: { type: String, default: () => new Date().toISOString().split("T")[0] },
    image: { type: String, default: "/images/blog/1.jpg" },
    excerpt: { type: String, required: true },
    content: { type: String, default: "" },
    published: { type: Boolean, default: false },
  },
  { timestamps: true },
);

// ── Process Step ──────────────────────────────────────────
const processStepSchema = new Schema(
  {
    num:   { type: String, required: true },
    title: { type: String, required: true },
    desc:  { type: String, required: true },
    icon:  { type: String, default: "icofont-paper" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

// ── Partner / Award / Certification ───────────────────────
const partnerSchema = new Schema(
  {
    type:  { type: String, enum: ["partner", "award", "certification"], default: "partner" },
    name:  { type: String, required: true },
    icon:  { type: String, default: "icofont-bank" },
    color: { type: String, default: "#8180e0" },
    org:   { type: String, default: "" },       // used for awards (award org name)
    text:  { type: String, default: "" },       // used for certifications
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

// ── Loan Application ──────────────────────────────────────
const applicationSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    loanType: { type: String, default: "Personal Loan" },
    purpose: { type: String, required: true },
    amount: { type: Number, required: true },
    gender: { type: String, default: "" },
    birth: { type: String, default: "" },
    maritalStatus: { type: String, default: "" },
    dependants: { type: String, default: "" },
    city: { type: String, default: "" },
    street: { type: String, default: "" },
    houseName: { type: String, default: "" },
    homeTown: { type: String, default: "" },
    timeAtAddress: { type: String, default: "" },
    timeAtAddress2: { type: String, default: "" },
    employmentStatus: { type: String, default: "" },
    employerName: { type: String, default: "" },
    employmentIndustry: { type: String, default: "" },
    employmentLength: { type: String, default: "" },
    income: { type: Number, default: 0 },
    message: { type: String, default: "" },
    status: {
      type: String,
      enum: ["pending", "reviewed", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true },
);

// ── Export models (safe for hot-reload) ──────────────────
export const Settings =
  mongoose.models.Settings ?? mongoose.model("Settings", settingsSchema);

export const Hero =
  mongoose.models.Hero ?? mongoose.model("Hero", heroSchema);

export const Stat =
  mongoose.models.Stat ?? mongoose.model("Stat", statSchema);

export const Service =
  mongoose.models.Service ?? mongoose.model("Service", serviceSchema);

export const WhyChooseUs =
  mongoose.models.WhyChooseUs ?? mongoose.model("WhyChooseUs", whySchema);

export const TeamMember =
  mongoose.models.TeamMember ?? mongoose.model("TeamMember", teamSchema);

export const Testimonial =
  mongoose.models.Testimonial ?? mongoose.model("Testimonial", testimonialSchema);

export const BlogPost =
  mongoose.models.BlogPost ?? mongoose.model("BlogPost", blogSchema);

export const Application =
  mongoose.models.Application ?? mongoose.model("Application", applicationSchema);

export const ProcessStep =
  mongoose.models.ProcessStep ?? mongoose.model("ProcessStep", processStepSchema);

export const Partner =
  mongoose.models.Partner ?? mongoose.model("Partner", partnerSchema);

// ── Chatbot Q&A ───────────────────────────────────────────
const chatbotQASchema = new Schema(
  {
    question:     { type: String, required: true },
    answer:       { type: String, required: true },
    keywords:     { type: [String], default: [] },
    isQuickReply: { type: Boolean, default: false },
    order:        { type: Number, default: 0 },
  },
  { timestamps: true },
);

// ── Chat Lead (name + phone collected via chatbot) ────────
const chatLeadSchema = new Schema(
  {
    name:  { type: String, required: true },
    phone: { type: String, required: true },
    query: { type: String, default: "" },
  },
  { timestamps: true },
);

export const ChatbotQA =
  mongoose.models.ChatbotQA ?? mongoose.model("ChatbotQA", chatbotQASchema);

export const ChatLead =
  mongoose.models.ChatLead ?? mongoose.model("ChatLead", chatLeadSchema);
