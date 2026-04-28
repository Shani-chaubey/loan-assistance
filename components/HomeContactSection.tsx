import Image from "next/image";
import Link from "next/link";
import type { SiteSettings } from "@/lib/data";

interface HomeContactSectionProps {
  settings?: SiteSettings;
}

export default function HomeContactSection({ settings }: HomeContactSectionProps) {
  const contactInfo = [
    { icon: "icofont-phone",        text: settings?.phone1      ?? "+1 (800) 694-8956", label: "Call us anytime" },
    { icon: "icofont-email",        text: settings?.email       ?? "hello@payloan.com",  label: "Send us an email" },
    { icon: "icofont-location-pin", text: settings?.address     ?? "New York, USA",       label: "Our headquarters" },
  ];

  return (
    <section className="commonSection homeContact" style={{ position: "relative", overflow: "hidden" }}>
      {/* ── SVG background ── */}
      <svg aria-hidden="true" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }} viewBox="0 0 1440 560" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
        <circle cx="-100" cy="280" r="360" fill="rgba(44,187,223,0.05)" />
        <circle cx="1400" cy="80" r="200" fill="none" stroke="rgba(44,187,223,0.08)" strokeWidth="40" />
        <ellipse cx="1420" cy="520" rx="260" ry="160" fill="rgba(240,115,74,0.05)" />
        {[0,1,2,3,4,5,6,7,8,9,10,11].map(i => (
          <circle key={`d${i}`} cx={900 + (i%4)*36} cy={80 + Math.floor(i/4)*36} r="4" fill="rgba(44,187,223,0.10)" />
        ))}
        <path d="M0 480 Q360 440 720 480 Q1080 520 1440 480" fill="none" stroke="rgba(44,187,223,0.07)" strokeWidth="2" />
        <circle cx="820" cy="500" r="10" fill="rgba(240,115,74,0.15)" />
        <circle cx="850" cy="470" r="6"  fill="rgba(240,115,74,0.20)" />
      </svg>

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div className="row align-items-center">
          {/* ── Text + contact cards ── */}
          <div className="col-lg-5 col-md-5">
            <div className="contactArea">
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(240,115,74,0.10)", padding: "6px 16px", borderRadius: 20, marginBottom: 16 }}>
                <i className="icofont-support-faq" style={{ color: "#f0734a", fontSize: 16 }}></i>
                <span style={{ fontSize: 13, color: "#f0734a", fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" }}>Get In Touch</span>
              </div>

              <h3>Our manager will contact you to clear the details.</h3>
              <p style={{ marginBottom: 10 }}>We are here to help you when you need your financial support, then we are here to guide you.</p>

              <div style={{ margin: "24px 0 28px" }}>
                {contactInfo.map(c => (
                  <div key={c.label} style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
                    <div style={{ width: 46, height: 46, borderRadius: "50%", background: "#2cbbdf", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 4px 14px rgba(44,187,223,0.35)" }}>
                      <i className={c.icon} style={{ color: "#fff", fontSize: 20 }}></i>
                    </div>
                    <div>
                      <div style={{ fontSize: 12, color: "#aaa", textTransform: "uppercase", letterSpacing: 1 }}>{c.label}</div>
                      <div style={{ fontSize: 16, fontWeight: 700, color: "#222" }}>{c.text}</div>
                    </div>
                  </div>
                ))}
              </div>

              <Link href="/contact" className="common_btn">Call Us Now</Link>
            </div>
          </div>

          {/* ── Image ── */}
          <div className="col-lg-7 col-md-7">
            <div className="contactThumb" style={{ position: "relative" }}>
              <div style={{ position: "absolute", top: 30, right: 20, background: "#fff", borderRadius: 14, padding: "14px 18px", boxShadow: "0 8px 30px rgba(0,0,0,0.10)", zIndex: 2, textAlign: "center" }}>
                <i className="icofont-shield-alt" style={{ fontSize: 28, color: "#2cbbdf", display: "block", marginBottom: 4 }}></i>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#222" }}>100% Secure</div>
                <div style={{ fontSize: 11, color: "#aaa" }}>Bank-level safety</div>
              </div>
              <div style={{ position: "absolute", bottom: 40, left: 10, background: "#2cbbdf", borderRadius: 14, padding: "12px 18px", boxShadow: "0 8px 30px rgba(44,187,223,0.4)", zIndex: 2, display: "flex", alignItems: "center", gap: 10 }}>
                <i className="icofont-clock-time" style={{ color: "#fff", fontSize: 22 }}></i>
                <div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.75)" }}>Response Time</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "#fff" }}>{settings?.workingHours ?? "Under 2 Hours"}</div>
                </div>
              </div>
              <Image src="/images/home/1.png" alt="Contact" width={650} height={450} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
