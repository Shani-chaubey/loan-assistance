import Image from "next/image";
import Link from "next/link";
import type { BlogItem } from "@/lib/data";

interface LatestPostsSectionProps {
  posts?: BlogItem[];
}

const defaultPosts: BlogItem[] = [
  { _id:"1", title:"What should you need do to get personal loan very easily.", slug:"how-to-get-personal-loan", category:"Finance", author:"Admin", date:"20 days ago", image:"/images/blog/1.jpg", excerpt:"Many modern alternatives often eumen incorpo other content actually detracts from...", content:"", published:true },
  { _id:"2", title:"Top 5 tips to improve your credit score before applying.",  slug:"improve-credit-score-tips", category:"Tips",   author:"Admin", date:"15 days ago", image:"/images/blog/2.jpg", excerpt:"Many modern alternatives often eumen incorpo other content actually detracts from...", content:"", published:true },
];

export default function LatestPostsSection({ posts: propPosts }: LatestPostsSectionProps) {
  const posts = propPosts?.length ? propPosts : defaultPosts;
  return (
    <section
      className="commonSection postTodaySec"
      style={{ position: "relative", overflow: "hidden" }}
    >
      {/* ── SVG background ── */}
      <svg
        aria-hidden="true"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }}
        viewBox="0 0 1440 560"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Left soft blob */}
        <ellipse cx="-60" cy="280" rx="220" ry="300" fill="rgba(44,187,223,0.05)" />

        {/* Top-right ring */}
        <circle cx="1380" cy="80" r="180" fill="none" stroke="rgba(44,187,223,0.07)" strokeWidth="36" />

        {/* Bottom wave */}
        <path d="M0 520 Q360 480 720 520 Q1080 560 1440 520" fill="none" stroke="rgba(44,187,223,0.07)" strokeWidth="2" />

        {/* Dot grid — right side */}
        {[0,1,2,3,4,5,6,7,8].map(i => (
          <circle key={`d${i}`} cx={1100 + (i%3)*30} cy={350 + Math.floor(i/3)*30} r="4" fill="rgba(44,187,223,0.10)" />
        ))}

        {/* Orange accent — bottom-left */}
        <circle cx="140" cy="500" r="22" fill="rgba(240,115,74,0.12)" />
        <circle cx="110" cy="470" r="12" fill="rgba(240,115,74,0.18)" />

        {/* Newspaper icon paths (decorative) */}
        <rect x="590" y="30" width="260" height="60" rx="8" fill="rgba(44,187,223,0.03)" />
        <line x1="600" y1="50" x2="840" y2="50" stroke="rgba(44,187,223,0.06)" strokeWidth="2" />
        <line x1="600" y1="65" x2="780" y2="65" stroke="rgba(44,187,223,0.06)" strokeWidth="2" />
        <line x1="600" y1="80" x2="800" y2="80" stroke="rgba(44,187,223,0.06)" strokeWidth="2" />
      </svg>

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div className="row">
          <div className="col-lg-12 text-center">
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(44,187,223,0.10)", padding: "6px 16px", borderRadius: 20, marginBottom: 16 }}>
              <i className="icofont-newspaper" style={{ color: "#2cbbdf", fontSize: 16 }}></i>
              <span style={{ fontSize: 13, color: "#2cbbdf", fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" }}>Latest News</span>
            </div>
            <h2 className="sec_title">Warm Content of Todays</h2>
            <p className="sec_desc">
              We are here to help you when you need your financial
              <br /> support, then we are help you.
            </p>
          </div>
        </div>

        <div className="row">
          {/* Posts list */}
          <div className="col-lg-4 col-md-5">
            {posts.map((post) => (
              <div key={post._id} className="latestPost" style={{ position: "relative" }}>
                {/* Category badge */}
                <div style={{ marginBottom: 10 }}>
                  <span style={{ background: "rgba(44,187,223,0.10)", color: "#2cbbdf", fontSize: 12, fontWeight: 700, padding: "3px 12px", borderRadius: 12, letterSpacing: 0.5 }}>
                    <i className="icofont-tag" style={{ marginRight: 4 }}></i>
                    {post.category}
                  </span>
                </div>

                <h4>
                  <Link href={`/blog/${post.slug ?? post._id}`}>{post.title}</Link>
                </h4>

                {/* Meta row */}
                <div style={{ display: "flex", gap: 16, flexWrap: "wrap", margin: "8px 0 10px", fontSize: 13, color: "#aaa" }}>
                  <span>
                    <i className="icofont-calendar" style={{ marginRight: 5, color: "#2cbbdf" }}></i>
                    {post.date}
                  </span>
                  <span>
                    <i className="icofont-user" style={{ marginRight: 5, color: "#2cbbdf" }}></i>
                    {post.author}
                  </span>
                </div>

                <p>{post.excerpt}</p>

                <Link href={`/blog/${post.slug ?? post._id}`} className="readMore" style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                  More details
                  <i className="icofont-long-arrow-right" style={{ fontSize: 16 }}></i>
                </Link>
              </div>
            ))}
          </div>

          {/* Feature image with floating badge */}
          <div className="col-lg-8 col-md-7">
            <div className="featureImg text-center" style={{ position: "relative" }}>
              {/* Floating article count badge */}
              <div style={{ position: "absolute", top: 20, left: 20, background: "#2cbbdf", borderRadius: 12, padding: "12px 18px", boxShadow: "0 8px 24px rgba(44,187,223,0.4)", zIndex: 2, display: "flex", alignItems: "center", gap: 10 }}>
                <i className="icofont-newspaper" style={{ color: "#fff", fontSize: 24 }}></i>
                <div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.75)", textTransform: "uppercase", letterSpacing: 1 }}>Blog Posts</div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: "#fff", lineHeight: 1 }}>150+</div>
                </div>
              </div>

              {/* Floating read time badge */}
              <div style={{ position: "absolute", bottom: 30, right: 20, background: "#fff", borderRadius: 12, padding: "10px 16px", boxShadow: "0 6px 20px rgba(0,0,0,0.08)", zIndex: 2, display: "flex", alignItems: "center", gap: 8 }}>
                <i className="icofont-clock-time" style={{ color: "#2cbbdf", fontSize: 20 }}></i>
                <div>
                  <div style={{ fontSize: 12, color: "#aaa" }}>Avg Read Time</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "#222" }}>5 Minutes</div>
                </div>
              </div>

              <Image src="/images/home/2.png" alt="Feature" width={700} height={500} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
