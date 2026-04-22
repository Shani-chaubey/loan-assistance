import Preloader from "@/components/Preloader";
import Header from "@/components/Header";
import PageBanner from "@/components/PageBanner";
import Footer from "@/components/Footer";
import Copyright from "@/components/Copyright";
import Link from "next/link";
import { getServices, getSettings } from "@/lib/data";

export const revalidate = 60;

export default async function ServicesPage() {
  const [services, settings] = await Promise.all([getServices(), getSettings()]);
  return (
    <>
      <Preloader />
      <Header settings={settings} />
      <PageBanner title="Services of Payloan" description="We are here to help you when you need your<br>financial support, then we are help you." />

      <section className="commonSection servicePage" style={{ background: "#f8f8fb", position: "relative", overflow: "hidden" }}>
        <svg aria-hidden="true" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }} viewBox="0 0 1440 900" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
          <circle cx="-80" cy="150" r="260" fill="rgba(129,128,224,0.08)" />
          <circle cx="1500" cy="760" r="260" fill="rgba(240,115,74,0.08)" />
          <path d="M0 70 Q360 10 720 70 Q1080 130 1440 70" fill="none" stroke="rgba(129,128,224,0.10)" strokeWidth="2" />
        </svg>
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="row">
            <div className="col-lg-12 text-center">
              <div style={{ display: "inline-flex", gap: 8, alignItems: "center", background: "rgba(129,128,224,0.10)", padding: "6px 16px", borderRadius: 20, marginBottom: 14 }}>
                <i className="icofont-ui-briefcase" style={{ color: "#8180e0" }}></i>
                <span style={{ color: "#8180e0", fontWeight: 700, fontSize: 13, textTransform: "uppercase", letterSpacing: 0.8 }}>Our Loan Services</span>
              </div>
              <h2 className="sec_title">Find the right loan product for your goals</h2>
              <p className="sec_desc">Each service is designed with competitive rates, flexible tenure, and transparent processing.</p>
            </div>
          </div>

          <div className="row">
            {services.map((s) => (
              <div key={s._id} className="col-lg-4 col-md-6" style={{ marginBottom: 30 }}>
                <div className="singleService three_column clearfix" style={{ borderRadius: 16, border: "1px solid #efeff7", padding: 28, background: "#fff", height: "100%", boxShadow: "0 10px 30px rgba(0,0,0,0.04)" }}>
                  <div style={{ width: 56, height: 56, borderRadius: 14, background: `${s.color}1A`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
                    <i className={s.icon} style={{ color: s.color, fontSize: 24 }}></i>
                  </div>
                  <h1 style={{ color: s.color, fontSize: 26, marginBottom: 4 }}>{s.rate}</h1>
                  <h4>{s.title}</h4>
                  <p style={{ marginBottom: 14 }}>{s.desc}</p>
                  <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
                    <div style={{ background: "#f8f8fb", borderRadius: 10, padding: "8px 10px", flex: 1 }}>
                      <span style={{ display: "block", fontSize: 11, color: "#aaa", textTransform: "uppercase" }}>Max Amount</span>
                      <strong style={{ color: "#333", fontSize: 14 }}>{s.amount}</strong>
                    </div>
                    <div style={{ background: "#f8f8fb", borderRadius: 10, padding: "8px 10px", flex: 1 }}>
                      <span style={{ display: "block", fontSize: 11, color: "#aaa", textTransform: "uppercase" }}>Tenure</span>
                      <strong style={{ color: "#333", fontSize: 14 }}>{s.tenure}</strong>
                    </div>
                  </div>
                  <ul style={{ padding: 0, margin: "0 0 16px", listStyle: "none" }}>
                    {s.features.map((f) => (
                      <li key={f} style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 6 }}>
                        <i className="icofont-check-circled" style={{ color: s.color, fontSize: 15 }}></i>
                        <span style={{ color: "#666", fontSize: 14 }}>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/service-details" style={{ color: s.color, fontWeight: 700 }}>
                    View Details <i className="icofont-long-arrow-right"></i>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="row mt42">
            <div className="col-lg-12">
              <div style={{ background: "linear-gradient(135deg, #8180e0 0%, #9e7fe2 100%)", borderRadius: 16, padding: "30px 34px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 14 }}>
                <div>
                  <h4 style={{ color: "#fff", margin: "0 0 6px", fontSize: 24 }}>Need help choosing the right loan?</h4>
                  <p style={{ color: "rgba(255,255,255,0.8)", margin: 0 }}>Talk to our advisor and get a tailored recommendation in minutes.</p>
                </div>
                <Link className="common_btn" href="/application-form">Apply Now</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer settings={settings} />
      <Copyright settings={settings} />
    </>
  );
}
