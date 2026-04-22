"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { SiteSettings } from "@/lib/data";

const quickLinks = [
  { label: "Home", href: "/", icon: "icofont-home" },
  { label: "About Us", href: "/about", icon: "icofont-people" },
  { label: "Services", href: "/services", icon: "icofont-briefcase" },
  { label: "Blog", href: "/blog", icon: "icofont-newspaper" },
  { label: "Contact", href: "/contact", icon: "icofont-phone" },
  {
    label: "Application Form",
    href: "/application-form",
    icon: "icofont-paper",
  },
];

const loanLinks = [
  { label: "Personal Loan", href: "/services", icon: "icofont-people" },
  { label: "Business Loan", href: "/services", icon: "icofont-businessman" },
  { label: "Home Loan", href: "/services", icon: "icofont-building" },
  { label: "Education Loan", href: "/services", icon: "icofont-student" },
  { label: "Car Loan", href: "/services", icon: "icofont-car" },
  { label: "Medical Loan", href: "/services", icon: "icofont-heartbeat" },
];


export default function Footer({ settings }: { settings?: SiteSettings }) {
  const s = settings;
  const contactInfo = [
    { icon: "icofont-location-pin", text: s?.address      ?? "42 Finance Tower, New York, NY 10001" },
    { icon: "icofont-phone",        text: s?.phone1        ?? "+1 (800) 694-8956" },
    { icon: "icofont-email",        text: s?.email         ?? "hello@payloan.com" },
    { icon: "icofont-clock-time",   text: s?.workingHours  ?? "Mon – Sat: 9 AM – 6 PM" },
  ];
  const socialsWithLinks = [
    { icon: "icofont-facebook",     href: s?.facebookUrl  ?? "#", color: "#3b5998", label: "Facebook" },
    { icon: "icofont-twitter",      href: s?.twitterUrl   ?? "#", color: "#1da1f2", label: "Twitter" },
    { icon: "icofont-linkedin",     href: s?.linkedinUrl  ?? "#", color: "#0077b5", label: "LinkedIn" },
    { icon: "icofont-instagram",    href: s?.instagramUrl ?? "#", color: "#e1306c", label: "Instagram" },
    { icon: "icofont-youtube-play", href: s?.youtubeUrl   ?? "#", color: "#ff0000", label: "YouTube" },
  ];
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubscribed(true);
  };

  return (
    <footer
      style={{
        background: "#13132b",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ── Decorative SVG ── */}
      <svg
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 0,
        }}
        viewBox="0 0 1440 600"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Large background rings */}
        <circle
          cx="-100"
          cy="300"
          r="380"
          fill="none"
          stroke="rgba(129,128,224,0.07)"
          strokeWidth="60"
        />
        <circle
          cx="1540"
          cy="300"
          r="380"
          fill="none"
          stroke="rgba(129,128,224,0.07)"
          strokeWidth="60"
        />
        <circle
          cx="720"
          cy="-80"
          r="280"
          fill="none"
          stroke="rgba(129,128,224,0.04)"
          strokeWidth="40"
        />
        <circle
          cx="720"
          cy="680"
          r="280"
          fill="none"
          stroke="rgba(240,115,74,0.05)"
          strokeWidth="40"
        />

        {/* Glowing blobs */}
        <ellipse
          cx="0"
          cy="0"
          rx="220"
          ry="160"
          fill="rgba(129,128,224,0.06)"
        />
        <ellipse
          cx="1440"
          cy="600"
          rx="220"
          ry="160"
          fill="rgba(240,115,74,0.06)"
        />
        <ellipse
          cx="720"
          cy="300"
          rx="300"
          ry="180"
          fill="rgba(129,128,224,0.02)"
        />

        {/* Top wave */}
        <path
          d="M0 0 Q360 40 720 0 Q1080 -40 1440 0 L1440 50 Q1080 90 720 50 Q360 10 0 50 Z"
          fill="rgba(129,128,224,0.06)"
        />

        {/* Dot grid */}
        {Array.from({ length: 6 }).map((_, r) =>
          Array.from({ length: 18 }).map((_, c) => (
            <circle
              key={`d${r}-${c}`}
              cx={40 + c * 80}
              cy={60 + r * 90}
              r="1.8"
              fill="rgba(129,128,224,0.10)"
            />
          )),
        )}

        {/* Diagonal accent lines */}
        <line
          x1="0"
          y1="600"
          x2="200"
          y2="300"
          stroke="rgba(129,128,224,0.05)"
          strokeWidth="1"
          strokeDasharray="6 14"
        />
        <line
          x1="1440"
          y1="0"
          x2="1240"
          y2="300"
          stroke="rgba(240,115,74,0.05)"
          strokeWidth="1"
          strokeDasharray="6 14"
        />
        <line
          x1="400"
          y1="0"
          x2="600"
          y2="600"
          stroke="rgba(129,128,224,0.03)"
          strokeWidth="1"
          strokeDasharray="4 18"
        />
        <line
          x1="1040"
          y1="0"
          x2="840"
          y2="600"
          stroke="rgba(129,128,224,0.03)"
          strokeWidth="1"
          strokeDasharray="4 18"
        />

        {/* Orange sparkle dots */}
        <circle cx="1340" cy="80" r="16" fill="rgba(240,115,74,0.15)" />
        <circle cx="1310" cy="110" r="9" fill="rgba(240,115,74,0.20)" />
        <circle cx="100" cy="520" r="14" fill="rgba(240,115,74,0.12)" />
        <circle cx="130" cy="548" r="8" fill="rgba(240,115,74,0.18)" />

        {/* Cross marks */}
        {[
          [300, 80],
          [1100, 500],
          [900, 100],
          [500, 480],
        ].map(([x, y], i) => (
          <g key={i}>
            <line
              x1={x - 8}
              y1={y}
              x2={x + 8}
              y2={y}
              stroke="rgba(129,128,224,0.14)"
              strokeWidth="1.5"
            />
            <line
              x1={x}
              y1={y - 8}
              x2={x}
              y2={y + 8}
              stroke="rgba(129,128,224,0.14)"
              strokeWidth="1.5"
            />
          </g>
        ))}
      </svg>

      {/* ── Top divider stripe ── */}
      <div
        style={{
          height: 4,
          background:
            "linear-gradient(90deg, #8180e0 0%, #f0734a 50%, #8180e0 100%)",
          position: "relative",
          zIndex: 1,
        }}
      />

      {/* ── Main footer body ── */}
      <div
        className="container"
        style={{ position: "relative", zIndex: 1, padding: "64px 15px 48px" }}
      >
        <div className="row">
          {/* ── Col 1 — Brand ── */}
          <div className="col-lg-3 col-md-6" style={{ marginBottom: 40 }}>
            <Link href="/">
              <Image
                src="/images/logo.png"
                alt="Payloan"
                width={150}
                height={48}
                style={{ marginBottom: 20, filter: "brightness(0) invert(1)" }}
              />
            </Link>
            <p
              style={{
                color: "rgba(255,255,255,0.55)",
                fontSize: 14,
                lineHeight: 1.8,
                marginBottom: 24,
              }}
            >
              Payloan helps you access fast, affordable financing with zero
              hassle. Trusted by 50,000+ customers across the country.
            </p>

            {/* Contact info */}
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px" }}>
              {contactInfo.map((c) => (
                <li
                  key={c.text}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 10,
                    marginBottom: 12,
                  }}
                >
                  <div
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 8,
                      background: "rgba(129,128,224,0.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      marginTop: 1,
                    }}
                  >
                    <i
                      className={c.icon}
                      style={{ color: "#8180e0", fontSize: 14 }}
                    ></i>
                  </div>
                  <span
                    style={{
                      color: "rgba(255,255,255,0.60)",
                      fontSize: 13,
                      lineHeight: 1.6,
                    }}
                  >
                    {c.text}
                  </span>
                </li>
              ))}
            </ul>

            {/* Social icons */}
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {socialsWithLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    background: "rgba(255,255,255,0.07)",
                    border: "1px solid rgba(255,255,255,0.10)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "rgba(255,255,255,0.60)",
                    fontSize: 15,
                    transition: "all 0.3s",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.background = s.color;
                    el.style.borderColor = s.color;
                    el.style.color = "#fff";
                    el.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.background = "rgba(255,255,255,0.07)";
                    el.style.borderColor = "rgba(255,255,255,0.10)";
                    el.style.color = "rgba(255,255,255,0.60)";
                    el.style.transform = "translateY(0)";
                  }}
                >
                  <i className={s.icon}></i>
                </a>
              ))}
            </div>
          </div>

          {/* ── Col 2 — Quick Links ── */}
          <div className="col-lg-2 col-md-6" style={{ marginBottom: 40 }}>
            <h4
              style={{
                color: "#fff",
                fontSize: 17,
                fontWeight: 700,
                marginBottom: 24,
                position: "relative",
                paddingBottom: 14,
              }}
            >
              Quick Links
              <span
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: 32,
                  height: 3,
                  background: "linear-gradient(90deg,#8180e0,#f0734a)",
                  borderRadius: 2,
                }}
              />
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {quickLinks.map((l) => (
                <li key={l.href} style={{ marginBottom: 12 }}>
                  <Link
                    href={l.href}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      color: "rgba(255,255,255,0.55)",
                      fontSize: 14,
                      textDecoration: "none",
                      transition: "all 0.25s",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color =
                        "#8180e0";
                      (e.currentTarget as HTMLAnchorElement).style.paddingLeft =
                        "4px";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color =
                        "rgba(255,255,255,0.55)";
                      (e.currentTarget as HTMLAnchorElement).style.paddingLeft =
                        "0";
                    }}
                  >
                    <i
                      className={l.icon}
                      style={{
                        fontSize: 14,
                        color: "#8180e0",
                        width: 16,
                        flexShrink: 0,
                      }}
                    ></i>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Col 3 — Loan Types ── */}
          <div className="col-lg-2 col-md-6" style={{ marginBottom: 40 }}>
            <h4
              style={{
                color: "#fff",
                fontSize: 17,
                fontWeight: 700,
                marginBottom: 24,
                position: "relative",
                paddingBottom: 14,
              }}
            >
              Loan Types
              <span
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: 32,
                  height: 3,
                  background: "linear-gradient(90deg,#8180e0,#f0734a)",
                  borderRadius: 2,
                }}
              />
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {loanLinks.map((l) => (
                <li key={l.href} style={{ marginBottom: 12 }}>
                  <Link
                    href={l.href}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      color: "rgba(255,255,255,0.55)",
                      fontSize: 14,
                      textDecoration: "none",
                      transition: "all 0.25s",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color =
                        "#f0734a";
                      (e.currentTarget as HTMLAnchorElement).style.paddingLeft =
                        "4px";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color =
                        "rgba(255,255,255,0.55)";
                      (e.currentTarget as HTMLAnchorElement).style.paddingLeft =
                        "0";
                    }}
                  >
                    <i
                      className={l.icon}
                      style={{
                        fontSize: 14,
                        color: "#f0734a",
                        width: 16,
                        flexShrink: 0,
                      }}
                    ></i>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Col 4 — Recent Posts ── */}
          <div className="col-lg-2 col-md-6" style={{ marginBottom: 40 }}>
            <h4
              style={{
                color: "#fff",
                fontSize: 17,
                fontWeight: 700,
                marginBottom: 24,
                position: "relative",
                paddingBottom: 14,
              }}
            >
              Recent Posts
              <span
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: 32,
                  height: 3,
                  background: "linear-gradient(90deg,#8180e0,#f0734a)",
                  borderRadius: 2,
                }}
              />
            </h4>

            {[
              {
                href: "/blog/1",
                title: "How to get a personal loan quickly and easily",
                date: "Apr 12, 2026",
              },
              {
                href: "/blog/2",
                title: "Top 5 tips for faster business loan approval",
                date: "Apr 4, 2026",
              },
              {
                href: "/blog/3",
                title:
                  "Understanding EMI: A complete guide for first-time borrowers",
                date: "Mar 28, 2026",
              },
            ].map((p) => (
              <div
                key={p.href}
                style={{
                  display: "flex",
                  gap: 12,
                  marginBottom: 20,
                  paddingBottom: 20,
                  borderBottom: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    background: "rgba(129,128,224,0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <i
                    className="icofont-newspaper"
                    style={{ color: "#8180e0", fontSize: 18 }}
                  ></i>
                </div>
                <div>
                  <Link
                    href={p.href}
                    style={{
                      color: "rgba(255,255,255,0.75)",
                      fontSize: 13,
                      lineHeight: 1.5,
                      display: "block",
                      marginBottom: 4,
                      textDecoration: "none",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLAnchorElement).style.color =
                        "#8180e0")
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLAnchorElement).style.color =
                        "rgba(255,255,255,0.75)")
                    }
                  >
                    {p.title}
                  </Link>
                  <span
                    style={{
                      color: "rgba(255,255,255,0.35)",
                      fontSize: 12,
                      display: "flex",
                      alignItems: "center",
                      gap: 5,
                    }}
                  >
                    <i
                      className="icofont-calendar"
                      style={{ fontSize: 11 }}
                    ></i>
                    {p.date}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* ── Col 5 — Newsletter ── */}
          <div className="col-lg-3 col-md-6" style={{ marginBottom: 40 }}>
            <h4
              style={{
                color: "#fff",
                fontSize: 17,
                fontWeight: 700,
                marginBottom: 24,
                position: "relative",
                paddingBottom: 14,
              }}
            >
              Newsletter
              <span
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: 32,
                  height: 3,
                  background: "linear-gradient(90deg,#8180e0,#f0734a)",
                  borderRadius: 2,
                }}
              />
            </h4>

            <p
              style={{
                color: "rgba(255,255,255,0.50)",
                fontSize: 14,
                lineHeight: 1.7,
                marginBottom: 20,
              }}
            >
              Get the latest loan tips, rate updates, and exclusive offers
              straight to your inbox.
            </p>

            {subscribed ? (
              <div
                style={{
                  background: "rgba(39,174,96,0.15)",
                  border: "1px solid rgba(39,174,96,0.30)",
                  borderRadius: 12,
                  padding: "16px 20px",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <i
                  className="icofont-check-circled"
                  style={{ color: "#27ae60", fontSize: 22 }}
                ></i>
                <span
                  style={{ color: "#27ae60", fontWeight: 600, fontSize: 14 }}
                >
                  You&apos;re subscribed!
                </span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe}>
                <div style={{ position: "relative", marginBottom: 12 }}>
                  <i
                    className="icofont-email"
                    style={{
                      position: "absolute",
                      left: 14,
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "rgba(255,255,255,0.35)",
                      fontSize: 16,
                      pointerEvents: "none",
                    }}
                  ></i>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    required
                    style={{
                      width: "100%",
                      padding: "13px 14px 13px 42px",
                      background: "rgba(255,255,255,0.07)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      borderRadius: 10,
                      color: "#fff",
                      fontSize: 14,
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
                <button
                  type="submit"
                  style={{
                    width: "100%",
                    padding: "13px",
                    background:
                      "linear-gradient(135deg, #8180e0 0%, #a079e0 100%)",
                    border: "none",
                    borderRadius: 10,
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: 15,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    boxShadow: "0 6px 20px rgba(129,128,224,0.40)",
                    transition: "opacity 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLButtonElement).style.opacity =
                      "0.88")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLButtonElement).style.opacity = "1")
                  }
                >
                  <i
                    className="icofont-paper-plane"
                    style={{ fontSize: 16 }}
                  ></i>
                  Subscribe Now
                </button>
              </form>
            )}

            {/* Trust badges */}
            <div
              style={{
                marginTop: 24,
                display: "flex",
                gap: 12,
                flexWrap: "wrap",
              }}
            >
              {[
                { icon: "icofont-lock", text: "SSL Secure" },
                { icon: "icofont-shield", text: "No Spam" },
              ].map((b) => (
                <div
                  key={b.text}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    background: "rgba(255,255,255,0.06)",
                    padding: "6px 12px",
                    borderRadius: 8,
                  }}
                >
                  <i
                    className={b.icon}
                    style={{ color: "#8180e0", fontSize: 13 }}
                  ></i>
                  <span
                    style={{ color: "rgba(255,255,255,0.50)", fontSize: 12 }}
                  >
                    {b.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.07)",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div className="container" style={{ padding: "20px 15px" }}>
          <div className="row align-items-center">
            <div className="col-md-6">
              <p
                style={{
                  color: "rgba(255,255,255,0.35)",
                  fontSize: 13,
                  margin: 0,
                }}
              >
                © {new Date().getFullYear()}{" "}
                <span style={{ color: "#8180e0", fontWeight: 600 }}>
                  Payloan
                </span>
                . All rights reserved.
              </p>
            </div>
            <div className="col-md-6 text-right">
              <div
                style={{
                  display: "flex",
                  gap: 20,
                  justifyContent: "flex-end",
                  flexWrap: "wrap",
                }}
              >
                {[
                  { label: "Privacy Policy", href: "#" },
                  { label: "Terms of Use", href: "#" },
                  { label: "Sitemap", href: "#" },
                ].map((l) => (
                  <Link
                    key={l.label}
                    href={l.href}
                    style={{
                      color: "rgba(255,255,255,0.35)",
                      fontSize: 13,
                      textDecoration: "none",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLAnchorElement).style.color =
                        "#8180e0")
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLAnchorElement).style.color =
                        "rgba(255,255,255,0.35)")
                    }
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
