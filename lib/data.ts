/**
 * Server-side data helpers.
 * Each function connects to MongoDB directly (no HTTP round-trip) and always
 * returns hardcoded fallback data when the DB is unavailable or empty.
 */

import { connectDB } from "./mongodb";
import {
  Settings, Hero, Stat, Service, WhyChooseUs,
  TeamMember, Testimonial, BlogPost, ProcessStep, Partner,
} from "./models";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface SiteSettings {
  siteName: string; tagline: string;
  phone1: string; phone2: string;
  email: string; address: string; workingHours: string;
  facebookUrl: string; twitterUrl: string; linkedinUrl: string;
  instagramUrl: string; youtubeUrl: string;
}

export interface HeroData {
  eyebrow: string; title: string; subtitle: string;
  ctaPrimary: string; ctaSecondary: string;
  stat1Value: string; stat1Label: string;
  stat2Value: string; stat2Label: string;
  stat3Value: string; stat3Label: string;
  image: string;
}

export interface StatItem   { _id: string; icon: string; value: string; label: string; color: string; order: number }
export interface ServiceItem{ _id: string; icon: string; rate: string; title: string; amount: string; tenure: string; desc: string; features: string[]; color: string; order: number }
export interface WhyItem    { _id: string; icon: string; title: string; desc: string; color: string; bg: string; order: number }
export interface TeamItem   { _id: string; name: string; role: string; image: string; order: number }
export interface TestimonialItem { _id: string; name: string; role: string; image: string; text: string; stars: number; order: number }
export interface BlogItem        { _id: string; title: string; slug: string; category: string; author: string; date: string; image: string; excerpt: string; content: string; published: boolean }
export interface ProcessStepItem { _id: string; num: string; title: string; desc: string; icon: string; order: number }
export interface PartnerItem     { _id: string; type: "partner" | "award" | "certification"; name: string; icon: string; color: string; org: string; text: string; order: number }

// ── Fallbacks ─────────────────────────────────────────────────────────────────

const FALLBACK_SETTINGS: SiteSettings = {
  siteName: "Payloan", tagline: "Banking & Business Loan",
  phone1: "+1 (800) 694-8956", phone2: "88 487 983 576",
  email: "hello@payloan.com", address: "42 Finance Tower, New York, NY 10001",
  workingHours: "Mon – Sat: 9 AM – 6 PM",
  facebookUrl: "#", twitterUrl: "#", linkedinUrl: "#", instagramUrl: "#", youtubeUrl: "#",
};

const FALLBACK_HERO: HeroData = {
  eyebrow: "Trusted by 50,000+ customers",
  title: "Fast, Flexible & Trusted Loan Solutions",
  subtitle: "Get instant approval with lowest interest rates, flexible repayment, and zero hidden charges.",
  ctaPrimary: "Apply Now", ctaSecondary: "Learn More",
  stat1Value: "50K+", stat1Label: "Happy Customers",
  stat2Value: "₹500Cr+", stat2Label: "Disbursed",
  stat3Value: "24 Hrs", stat3Label: "Approval Time",
  image: "/images/slider/2.png",
};

const FALLBACK_STATS: StatItem[] = [
  { _id: "1", icon: "icofont-people",        value: "25,000+", label: "Happy Customers", color: "#8180e0", order: 1 },
  { _id: "2", icon: "icofont-money",         value: "₹2B+",    label: "Loans Processed", color: "#f0734a", order: 2 },
  { _id: "3", icon: "icofont-check-circled", value: "98%",     label: "Approval Rate",   color: "#27ae60", order: 3 },
  { _id: "4", icon: "icofont-globe",         value: "50+",     label: "Cities Covered",  color: "#e91e8c", order: 4 },
];

const FALLBACK_SERVICES: ServiceItem[] = [
  { _id:"1", icon:"flaticon-money",         rate:"9.35%",  title:"Personal Loan", amount:"₹2,00,000",   tenure:"Up to 60 months",  desc:"Ideal for urgent expenses, travel plans, medical support.", features:["No collateral","Instant e-approval","Flexible EMI"],  color:"#8180e0", order:1 },
  { _id:"2", icon:"flaticon-resume",        rate:"9.35%",  title:"Education Loan",amount:"₹10,00,000",  tenure:"Up to 120 months", desc:"Support your academic journey.",                           features:["Moratorium","Tax benefits","Co-applicant support"],    color:"#2196f3", order:2 },
  { _id:"3", icon:"flaticon-mortgage-loan", rate:"10.2%",  title:"Business Loan", amount:"₹5,00,000",   tenure:"Up to 84 months",  desc:"Working capital for SMEs and startups.",                  features:["Fast disbursal","Minimal paperwork","Overdraft"],      color:"#f0734a", order:3 },
  { _id:"4", icon:"flaticon-loan-2",        rate:"9.35%",  title:"Car Loan",      amount:"₹3,00,000",   tenure:"Up to 84 months",  desc:"Buy a new or used car easily.",                           features:["Up to 95% financing","Used car","Doorstep processing"],color:"#27ae60", order:4 },
  { _id:"5", icon:"flaticon-loan-1",        rate:"18.5%",  title:"Medical Loan",  amount:"₹1,00,000",   tenure:"Up to 48 months",  desc:"Emergency healthcare financing.",                         features:["Emergency approvals","Cashless network","No charges"], color:"#e91e8c", order:5 },
  { _id:"6", icon:"flaticon-mortgage-loan", rate:"6.90%",  title:"Home Loan",     amount:"₹50,00,000",  tenure:"Up to 360 months", desc:"Own your dream home.",                                    features:["Top-up facility","Balance transfer","Dedicated manager"],color:"#ff9800", order:6 },
];

const FALLBACK_WHY: WhyItem[] = [
  { _id:"1", icon:"icofont-flash",         title:"Lightning Fast Approval", desc:"Approved within 24 hours.",                    color:"#8180e0", bg:"rgba(129,128,224,0.10)", order:1 },
  { _id:"2", icon:"icofont-shield-alt",    title:"Bank-Level Security",     desc:"256-bit SSL protection.",                      color:"#27ae60", bg:"rgba(39,174,96,0.10)",   order:2 },
  { _id:"3", icon:"icofont-money",         title:"Lowest Interest Rates",   desc:"Starting from just 8.5% p.a.",                 color:"#f0734a", bg:"rgba(240,115,74,0.10)",  order:3 },
  { _id:"4", icon:"icofont-ui-calculator", title:"Flexible Repayment",      desc:"Tenure from 6 to 360 months.",                 color:"#e91e8c", bg:"rgba(233,30,140,0.10)",  order:4 },
  { _id:"5", icon:"icofont-support",       title:"24 / 7 Expert Support",   desc:"Advisors always available.",                   color:"#2196f3", bg:"rgba(33,150,243,0.10)",  order:5 },
  { _id:"6", icon:"icofont-paper",         title:"Zero Hidden Charges",     desc:"Complete transparency guaranteed.",            color:"#ff9800", bg:"rgba(255,152,0,0.10)",   order:6 },
];

const FALLBACK_TEAM: TeamItem[] = [
  { _id:"1", name:"Roxanne Bryant",    role:"Managing Director",  image:"/images/team/1.png", order:1 },
  { _id:"2", name:"Dominic Jefferson", role:"Head of Marketing",  image:"/images/team/2.png", order:2 },
  { _id:"3", name:"Mercedes Baldwin",  role:"General Manager",    image:"/images/team/3.png", order:3 },
  { _id:"4", name:"Gertrude Keller",   role:"Commercial Manager", image:"/images/team/4.png", order:4 },
];

const FALLBACK_TESTIMONIALS: TestimonialItem[] = [
  { _id:"1", name:"Austin Matthews", role:"Business Owner", stars:5, text:"From time to time we need generate sample names to populate a test database.", image:"/images/about/5.png", order:1 },
  { _id:"2", name:"Evelyn Goodman",  role:"Freelancer",     stars:5, text:"From time to time we need generate sample names to populate a test database.", image:"/images/about/5.png", order:2 },
  { _id:"3", name:"Calvin Cannon",   role:"Entrepreneur",   stars:5, text:"From time to time we need generate sample names to populate a test database.", image:"/images/about/5.png", order:3 },
];

const FALLBACK_BLOG: BlogItem[] = [
  { _id:"1", title:"What should you need do to get personal loan very easily.", slug:"how-to-get-personal-loan", category:"Finance",  author:"Admin", date:"2026-04-02", image:"/images/blog/1.jpg", excerpt:"Many modern alternatives often eumen incorpo other content actually detracts from...", content:"", published:true },
  { _id:"2", title:"Top 5 tips to improve your credit score before applying.",  slug:"improve-credit-score-tips", category:"Tips",    author:"Admin", date:"2026-04-07", image:"/images/blog/2.jpg", excerpt:"Many modern alternatives often eumen incorpo other content actually detracts from...", content:"", published:true },
  { _id:"3", title:"Understanding EMI: A complete guide for first-time borrowers.", slug:"understanding-emi-guide", category:"Personal Finance", author:"Admin", date:"2026-04-12", image:"/images/blog/3.jpg", excerpt:"EMI stands for Equated Monthly Installment.", content:"", published:true },
];

// ── Fetch helpers ─────────────────────────────────────────────────────────────

async function safeConnect() {
  try { await connectDB(); return true; } catch { return false; }
}

export async function getSettings(): Promise<SiteSettings> {
  if (!(await safeConnect())) return FALLBACK_SETTINGS;
  try {
    const doc = await Settings.findOne().lean<SiteSettings>();
    return doc ?? FALLBACK_SETTINGS;
  } catch { return FALLBACK_SETTINGS; }
}

export async function getHero(): Promise<HeroData> {
  if (!(await safeConnect())) return FALLBACK_HERO;
  try {
    const doc = await Hero.findOne().lean<HeroData>();
    return doc ?? FALLBACK_HERO;
  } catch { return FALLBACK_HERO; }
}

export async function getStats(): Promise<StatItem[]> {
  if (!(await safeConnect())) return FALLBACK_STATS;
  try {
    const docs = await Stat.find().sort({ order: 1 }).lean<StatItem[]>();
    return docs.length ? docs : FALLBACK_STATS;
  } catch { return FALLBACK_STATS; }
}

export async function getServices(): Promise<ServiceItem[]> {
  if (!(await safeConnect())) return FALLBACK_SERVICES;
  try {
    const docs = await Service.find().sort({ order: 1 }).lean<ServiceItem[]>();
    return docs.length ? docs : FALLBACK_SERVICES;
  } catch { return FALLBACK_SERVICES; }
}

export async function getWhyChooseUs(): Promise<WhyItem[]> {
  if (!(await safeConnect())) return FALLBACK_WHY;
  try {
    const docs = await WhyChooseUs.find().sort({ order: 1 }).lean<WhyItem[]>();
    return docs.length ? docs : FALLBACK_WHY;
  } catch { return FALLBACK_WHY; }
}

export async function getTeam(): Promise<TeamItem[]> {
  if (!(await safeConnect())) return FALLBACK_TEAM;
  try {
    const docs = await TeamMember.find().sort({ order: 1 }).lean<TeamItem[]>();
    return docs.length ? docs : FALLBACK_TEAM;
  } catch { return FALLBACK_TEAM; }
}

export async function getTestimonials(): Promise<TestimonialItem[]> {
  if (!(await safeConnect())) return FALLBACK_TESTIMONIALS;
  try {
    const docs = await Testimonial.find().sort({ order: 1 }).lean<TestimonialItem[]>();
    return docs.length ? docs : FALLBACK_TESTIMONIALS;
  } catch { return FALLBACK_TESTIMONIALS; }
}

export async function getBlogPosts(publishedOnly = true): Promise<BlogItem[]> {
  if (!(await safeConnect())) return FALLBACK_BLOG;
  try {
    const query = publishedOnly ? { published: true } : {};
    const docs = await BlogPost.find(query).sort({ date: -1 }).lean<BlogItem[]>();
    return docs.length ? docs : FALLBACK_BLOG;
  } catch { return FALLBACK_BLOG; }
}

const FALLBACK_PROCESS: ProcessStepItem[] = [
  { _id:"1", num:"01", title:"Apply Bank Loan",     desc:"Fill out our simple online form in just a few minutes.",                  icon:"icofont-paper",         order:1 },
  { _id:"2", num:"02", title:"Approved Bank Loan",  desc:"Our team reviews and approves your application quickly.",                 icon:"icofont-check-circled", order:2 },
  { _id:"3", num:"03", title:"Review Your Loan",    desc:"Receive funds and manage repayments with ease.",                          icon:"icofont-money",         order:3 },
];

const FALLBACK_PARTNERS: PartnerItem[] = [
  { _id:"p1", type:"partner", name:"HDFC Bank",  icon:"icofont-bank",              color:"#004c8f", org:"", text:"", order:1 },
  { _id:"p2", type:"partner", name:"ICICI Bank", icon:"icofont-institution",        color:"#f37021", org:"", text:"", order:2 },
  { _id:"p3", type:"partner", name:"Axis Bank",  icon:"icofont-money",              color:"#97144d", org:"", text:"", order:3 },
  { _id:"p4", type:"partner", name:"SBI",        icon:"icofont-building",           color:"#22509d", org:"", text:"", order:4 },
  { _id:"p5", type:"partner", name:"Kotak Bank", icon:"icofont-ui-wallet",          color:"#ed1c24", org:"", text:"", order:5 },
  { _id:"p6", type:"partner", name:"Yes Bank",   icon:"icofont-chart-bar",          color:"#0052a2", org:"", text:"", order:6 },
  { _id:"a1", type:"award",   name:"Best Loan Provider 2024",    icon:"icofont-badge",              color:"#8180e0", org:"Finance India Awards", text:"", order:7 },
  { _id:"a2", type:"award",   name:"Customer Choice Award",       icon:"icofont-star",               color:"#f0734a", org:"Banking Excellence 2024", text:"", order:8 },
  { _id:"a3", type:"award",   name:"Most Trusted Brand",          icon:"icofont-shield-alt",         color:"#27ae60", org:"Consumer Voice Report", text:"", order:9 },
  { _id:"a4", type:"award",   name:"ISO 9001:2015 Certified",     icon:"icofont-certificate-alt-1",  color:"#2196f3", org:"Quality Management", text:"", order:10 },
  { _id:"c1", type:"certification", name:"256-bit SSL Encrypted", icon:"icofont-lock",           color:"#8180e0", org:"", text:"256-bit SSL Encrypted", order:11 },
  { _id:"c2", type:"certification", name:"RBI Registered NBFC",   icon:"icofont-check-circled",  color:"#27ae60", org:"", text:"RBI Registered NBFC",   order:12 },
  { _id:"c3", type:"certification", name:"ISO 27001 Certified",   icon:"icofont-safety",         color:"#f0734a", org:"", text:"ISO 27001 Certified",   order:13 },
  { _id:"c4", type:"certification", name:"PCI DSS Compliant",     icon:"icofont-shield",         color:"#e91e8c", org:"", text:"PCI DSS Compliant",     order:14 },
];

export async function getProcessSteps(): Promise<ProcessStepItem[]> {
  if (!(await safeConnect())) return FALLBACK_PROCESS;
  try {
    const docs = await ProcessStep.find().sort({ order: 1 }).lean<ProcessStepItem[]>();
    return docs.length ? docs : FALLBACK_PROCESS;
  } catch { return FALLBACK_PROCESS; }
}

export async function getPartners(): Promise<PartnerItem[]> {
  if (!(await safeConnect())) return FALLBACK_PARTNERS;
  try {
    const docs = await Partner.find().sort({ order: 1 }).lean<PartnerItem[]>();
    return docs.length ? docs : FALLBACK_PARTNERS;
  } catch { return FALLBACK_PARTNERS; }
}

export async function getBlogPost(slug: string): Promise<BlogItem | null> {
  if (!(await safeConnect())) return FALLBACK_BLOG.find(b => b.slug === slug) ?? null;
  try {
    // Try by slug first, fall back to numeric id
    const bySlug = await BlogPost.findOne({ slug }).lean<BlogItem>();
    if (bySlug) return bySlug;
    const byFallback = FALLBACK_BLOG.find(b => b.slug === slug || String(b._id) === slug);
    return byFallback ?? null;
  } catch { return null; }
}
