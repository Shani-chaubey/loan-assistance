"use client";

import { useEffect, useState } from "react";

interface Lead {
  _id: string;
  name: string;
  phone: string;
  email: string;
  query: string;
  createdAt: string;
}

export default function ChatLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const load = () => {
    setLoading(true);
    fetch("/api/admin/chat-leads")
      .then(r => r.json())
      .then(d => { setLeads(d.data ?? []); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const deleteLead = async (id: string) => {
    if (!confirm("Delete this lead?")) return;
    await fetch(`/api/admin/chat-leads/${id}`, { method: "DELETE" });
    setLeads(prev => prev.filter(l => l._id !== id));
  };

  const filtered = leads.filter(l =>
    l.name.toLowerCase().includes(search.toLowerCase()) ||
    l.phone.includes(search) ||
    (l.email ?? "").toLowerCase().includes(search.toLowerCase()) ||
    (l.query ?? "").toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div style={{ padding: "28px 32px", maxWidth: 1100 }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16, marginBottom: 28 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: "#222", margin: 0 }}>Chat Leads</h1>
          <p style={{ color: "#888", margin: "4px 0 0", fontSize: 14 }}>{leads.length} total leads collected via chatbot</p>
        </div>
        <button onClick={load} style={{ padding: "8px 16px", background: "#2cbbdf", color: "#fff", border: "none", borderRadius: 10, cursor: "pointer", fontWeight: 600, fontSize: 14, display: "flex", alignItems: "center", gap: 8 }}>
          <i className="icofont-refresh" style={{ fontSize: 16 }}></i> Refresh
        </button>
      </div>

      {/* Search */}
      <div style={{ marginBottom: 20 }}>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search by name, phone, email or query…"
          style={{ width: "100%", maxWidth: 400, padding: "10px 16px", border: "1.5px solid #cceffa", borderRadius: 10, fontSize: 14, outline: "none" }}
        />
      </div>

      {/* Stats row */}
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 24 }}>
        {[
          { label: "Total Leads", value: leads.length, icon: "icofont-users", color: "#2cbbdf" },
          { label: "Today", value: leads.filter(l => new Date(l.createdAt).toDateString() === new Date().toDateString()).length, icon: "icofont-calendar", color: "#f0734a" },
          { label: "This Week", value: leads.filter(l => Date.now() - new Date(l.createdAt).getTime() < 7 * 864e5).length, icon: "icofont-chart-bar", color: "#27ae60" },
        ].map(s => (
          <div key={s.label} style={{ background: "#fff", border: "1.5px solid #f0f0f8", borderRadius: 14, padding: "16px 20px", display: "flex", alignItems: "center", gap: 12, minWidth: 160, boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
            <div style={{ width: 42, height: 42, borderRadius: "50%", background: `${s.color}18`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <i className={s.icon} style={{ color: s.color, fontSize: 20 }}></i>
            </div>
            <div>
              <div style={{ fontSize: 22, fontWeight: 800, color: "#222", lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: 12, color: "#aaa", marginTop: 2 }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Table */}
      {loading ? (
        <div style={{ textAlign: "center", padding: 48, color: "#aaa" }}>Loading leads…</div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: 64, color: "#bbb" }}>
          <i className="icofont-chat" style={{ fontSize: 48, display: "block", marginBottom: 12 }}></i>
          <p>No leads found yet. Chatbot leads will appear here when users share their details.</p>
        </div>
      ) : (
        <div style={{ background: "#fff", borderRadius: 16, border: "1.5px solid #f0f0f8", overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.04)" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f8f8ff" }}>
                {["#", "Name", "Phone", "Email", "Query", "Date", ""].map(h => (
                  <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: 12, fontWeight: 700, color: "#888", textTransform: "uppercase", letterSpacing: 0.5, borderBottom: "1.5px solid #f0f0f8" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((lead, i) => (
                <tr key={lead._id} style={{ borderBottom: "1px solid #f8f8ff" }}
                  onMouseEnter={e => (e.currentTarget as HTMLTableRowElement).style.background = "#fafafe"}
                  onMouseLeave={e => (e.currentTarget as HTMLTableRowElement).style.background = "transparent"}
                >
                  <td style={{ padding: "14px 16px", color: "#aaa", fontSize: 13 }}>{i + 1}</td>
                  <td style={{ padding: "14px 16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg,#2cbbdf,#21a8c8)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <span style={{ color: "#fff", fontWeight: 700, fontSize: 14 }}>{lead.name.charAt(0).toUpperCase()}</span>
                      </div>
                      <span style={{ fontWeight: 600, color: "#222", fontSize: 14 }}>{lead.name}</span>
                    </div>
                  </td>
                  <td style={{ padding: "14px 16px" }}>
                    <a href={`tel:${lead.phone}`} style={{ color: "#2cbbdf", fontWeight: 600, fontSize: 14, textDecoration: "none", display: "flex", alignItems: "center", gap: 5 }}>
                      <i className="icofont-phone" style={{ fontSize: 13 }}></i>
                      {lead.phone}
                    </a>
                  </td>
                  <td style={{ padding: "14px 16px" }}>
                    {lead.email
                      ? <a href={`mailto:${lead.email}`} style={{ color: "#f0734a", fontWeight: 600, fontSize: 13, textDecoration: "none", display: "flex", alignItems: "center", gap: 5 }}>
                        <i className="icofont-email" style={{ fontSize: 13 }}></i>
                        {lead.email}
                      </a>
                      : <span style={{ color: "#ccc", fontStyle: "italic", fontSize: 13 }}>—</span>
                    }
                  </td>
                  <td style={{ padding: "14px 16px", maxWidth: 240 }}>
                    <span style={{ color: "#666", fontSize: 13, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                      {lead.query || <span style={{ color: "#ccc", fontStyle: "italic" }}>—</span>}
                    </span>
                  </td>
                  <td style={{ padding: "14px 16px" }}>
                    <span style={{ fontSize: 12, color: "#aaa" }}>
                      {new Date(lead.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                    </span>
                    <div style={{ fontSize: 11, color: "#ccc" }}>
                      {new Date(lead.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </div>
                  </td>
                  <td style={{ padding: "14px 16px" }}>
                    <div style={{ display: "flex", gap: 8 }}>
                      <a href={`tel:${lead.phone}`}
                        style={{ padding: "6px 12px", background: "rgba(39,174,96,0.1)", color: "#27ae60", borderRadius: 8, fontSize: 12, fontWeight: 600, textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}>
                        <i className="icofont-phone" style={{ fontSize: 12 }}></i> Call
                      </a>
                      {lead.email && (
                        <a href={`mailto:${lead.email}`}
                          style={{ padding: "6px 12px", background: "rgba(240,115,74,0.1)", color: "#f0734a", borderRadius: 8, fontSize: 12, fontWeight: 600, textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}>
                          <i className="icofont-email" style={{ fontSize: 12 }}></i> Email
                        </a>
                      )}
                      <button onClick={() => deleteLead(lead._id)}
                        style={{ padding: "6px 10px", background: "rgba(231,76,60,0.08)", color: "#e74c3c", border: "none", borderRadius: 8, fontSize: 12, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
                        <i className="icofont-trash" style={{ fontSize: 12 }}></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
