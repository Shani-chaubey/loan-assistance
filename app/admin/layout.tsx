"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const navItems = [
  { href: "/admin", icon: "icofont-dashboard-web", label: "Dashboard" },
  { href: "/admin/hero", icon: "icofont-image", label: "Hero Section" },
  { href: "/admin/about", icon: "icofont-info-circle", label: "About Page" },
  { href: "/admin/stats", icon: "fa fa-bar-chart", label: "Stats" },
  { href: "/admin/services", icon: "icofont-briefcase", label: "Services" },
  { href: "/admin/why-choose-us", icon: "icofont-star", label: "Why Choose Us" },
  { href: "/admin/process-steps", icon: "icofont-rocket-alt-2", label: "Process Steps" },
  { href: "/admin/partners", icon: "icofont-handshake-deal", label: "Partners & Awards" },
  { href: "/admin/team", icon: "icofont-people", label: "Team Members" },
  { href: "/admin/testimonials", icon: "icofont-speech-comments", label: "Testimonials" },
  { href: "/admin/blog", icon: "icofont-newspaper", label: "Blog Posts" },
  { href: "/admin/chatbot", icon: "icofont-chat", label: "Chatbot Q&A" },
  { href: "/admin/chat-leads", icon: "icofont-contacts", label: "Chat Leads" },
  { href: "/admin/applications", icon: "icofont-paper", label: "Applications" },
  { href: "/admin/form-fields", icon: "icofont-ui-form", label: "Form Fields" },
  { href: "/admin/settings", icon: "icofont-settings-alt", label: "Settings" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  // Login page renders its own full-screen UI — skip the sidebar shell
  if (pathname === "/admin/login") return <>{children}</>;

  const handleLogout = async () => {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.replace("/admin/login");
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "'Segoe UI', sans-serif", background: "#f0f2f8" }}>
      {/* ── Sidebar ── */}
      <aside style={{
        width: 240, background: "#13132b", display: "flex", flexDirection: "column",
        position: "fixed", top: 0, left: 0, bottom: 0, zIndex: 100,
        boxShadow: "4px 0 20px rgba(0,0,0,0.15)",
      }}>
        {/* Logo */}
        <div style={{ padding: "28px 20px 20px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg,#2cbbdf,#38cfe8)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <i className="icofont-bank" style={{ color: "#fff", fontSize: 18 }}></i>
            </div>
            <div>
              <div style={{ color: "#fff", fontWeight: 800, fontSize: 16, lineHeight: 1.1 }}>Payloan</div>
              <div style={{ color: "rgba(255,255,255,0.40)", fontSize: 11 }}>Admin Panel</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, overflowY: "auto", padding: "12px 10px" }}>
          {navItems.map((item) => {
            const active = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: "flex", alignItems: "center", gap: 10,
                  padding: "10px 12px", borderRadius: 10, marginBottom: 4,
                  background: active ? "rgba(44,187,223,0.20)" : "transparent",
                  borderLeft: active ? "3px solid #2cbbdf" : "3px solid transparent",
                  color: active ? "#7dd8ed" : "rgba(255,255,255,0.55)",
                  textDecoration: "none", fontSize: 14, fontWeight: active ? 600 : 400,
                  transition: "all 0.2s",
                }}
              >
                <i className={item.icon} style={{ fontSize: 17, width: 20, textAlign: "center" }}></i>
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div style={{ padding: "14px 20px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, color: "rgba(255,255,255,0.40)", fontSize: 13, textDecoration: "none" }}>
            <i className="icofont-external-link"></i> View Site
          </Link>
        </div>
      </aside>

      {/* ── Main ── */}
      <div style={{ marginLeft: 240, flex: 1, display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        {/* Topbar */}
        <header style={{ background: "#fff", borderBottom: "1px solid #e8eaf2", padding: "0 32px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 50 }}>
          <div style={{ fontWeight: 700, color: "#222", fontSize: 16 }}>
            {navItems.find(n => pathname === n.href || (n.href !== "/admin" && pathname.startsWith(n.href)))?.label ?? "Admin"}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, background: "#f8f8fb", borderRadius: 10, padding: "6px 12px" }}>
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg,#2cbbdf,#38cfe8)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <i className="icofont-user-alt-5" style={{ color: "#fff", fontSize: 14 }}></i>
              </div>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#333" }}>Admin</span>
            </div>
            <button
              onClick={handleLogout}
              style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(229,57,53,0.08)", border: "1.5px solid rgba(229,57,53,0.20)", color: "#e53935", padding: "6px 14px", borderRadius: 10, cursor: "pointer", fontSize: 13, fontWeight: 600 }}
            >
              <i className="icofont-logout" style={{ fontSize: 15 }}></i>
              Logout
            </button>
          </div>
        </header>

        {/* Page content */}
        <main style={{ flex: 1, padding: "28px 32px" }}>
          {children}
        </main>
      </div>
    </div>
  );
}
