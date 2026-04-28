"use client";

import { useEffect, useState } from "react";

interface App {
  _id: string;
  name: string;
  email: string;
  phone: string;
  loanType: string;
  purpose: string;
  amount: number;
  gender: string;
  birth: string;
  maritalStatus: string;
  dependants: string;
  city: string;
  street: string;
  houseName: string;
  homeTown: string;
  timeAtAddress: string;
  timeAtAddress2: string;
  employmentStatus: string;
  employerName: string;
  employmentIndustry: string;
  employmentLength: string;
  income: number;
  message: string;
  status: string;
  createdAt: string;
}

const STATUS_COLORS: Record<string, { bg: string; fg: string }> = {
  pending:  { bg: "rgba(255,152,0,0.12)",   fg: "#ff9800" },
  reviewed: { bg: "rgba(33,150,243,0.12)",  fg: "#2196f3" },
  approved: { bg: "rgba(39,174,96,0.12)",   fg: "#27ae60" },
  rejected: { bg: "rgba(229,57,53,0.12)",   fg: "#e53935" },
};

const STATUSES = ["pending", "reviewed", "approved", "rejected"];

export default function AdminApplicationsPage() {
  const [apps, setApps] = useState<App[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [toast, setToast] = useState<string | null>(null);
  const [editingApp, setEditingApp] = useState<App | null>(null);

  useEffect(() => {
    fetch("/api/admin/applications")
      .then(r => r.json())
      .then(r => { setApps(r.data ?? []); setLoading(false); });
  }, []);

  const updateStatus = async (id: string, status: string) => {
    await fetch(`/api/admin/applications/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) });
    setApps(prev => prev.map(a => a._id === id ? { ...a, status } : a));
    setToast("Status updated");
    setTimeout(() => setToast(null), 2500);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this application?")) return;
    await fetch(`/api/admin/applications/${id}`, { method: "DELETE" });
    setApps(prev => prev.filter(a => a._id !== id));
    setToast("Deleted");
    setTimeout(() => setToast(null), 2500);
  };

  const updateField = (key: keyof App, value: string) => {
    if (!editingApp) return;
    setEditingApp({
      ...editingApp,
      [key]: key === "amount" || key === "income" ? Number(value) || 0 : value,
    });
  };

  const saveEdit = async () => {
    if (!editingApp) return;
    const response = await fetch(`/api/admin/applications/${editingApp._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editingApp),
    });
    if (!response.ok) {
      setToast("Failed to update application");
      setTimeout(() => setToast(null), 2500);
      return;
    }
    setApps(prev => prev.map(a => (a._id === editingApp._id ? editingApp : a)));
    setEditingApp(null);
    setToast("Application updated");
    setTimeout(() => setToast(null), 2500);
  };

  const filtered = filter === "all" ? apps : apps.filter(a => a.status === filter);

  return (
    <div>
      {toast && (
        <div style={{ position: "fixed", top: 20, right: 20, background: "#27ae60", color: "#fff", padding: "10px 20px", borderRadius: 10, zIndex: 9999, fontWeight: 600 }}>{toast}</div>
      )}

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: "#1a1a2e", margin: "0 0 4px" }}>Loan Applications</h2>
          <p style={{ color: "#888", margin: 0 }}>{apps.length} total · {apps.filter(a => a.status === "pending").length} pending</p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {["all", ...STATUSES].map(s => (
            <button key={s} onClick={() => setFilter(s)} style={{ padding: "7px 14px", borderRadius: 8, border: "1.5px solid", borderColor: filter === s ? "#2cbbdf" : "#cceffa", background: filter === s ? "rgba(44,187,223,0.10)" : "#fff", color: filter === s ? "#2cbbdf" : "#555", fontWeight: 600, cursor: "pointer", textTransform: "capitalize", fontSize: 13 }}>
              {s === "all" ? "All" : s}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <p style={{ color: "#aaa" }}>Loading…</p>
      ) : filtered.length === 0 ? (
        <div style={{ background: "#fff", borderRadius: 14, padding: 48, textAlign: "center" }}>
          <i className="icofont-box" style={{ fontSize: 40, color: "#ddd", display: "block", marginBottom: 12 }}></i>
          <p style={{ color: "#aaa" }}>No applications found.</p>
        </div>
      ) : (
        <div style={{ background: "#fff", borderRadius: 16, overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f8f8fb" }}>
                {["Name", "Contact", "Purpose", "Amount", "Status", "Date", "Actions"].map(h => (
                  <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: 12, fontWeight: 700, color: "#888", textTransform: "uppercase", letterSpacing: 0.5 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((app, i) => (
                <tr key={app._id} style={{ borderTop: "1px solid #f0f0f8", background: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                  <td style={{ padding: "12px 16px" }}>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{app.name}</div>
                    {app.message && <div style={{ fontSize: 11, color: "#aaa", marginTop: 2 }}>{app.message.slice(0, 40)}…</div>}
                  </td>
                  <td style={{ padding: "12px 16px", fontSize: 13 }}>
                    <div>{app.email}</div>
                    <div style={{ color: "#aaa" }}>{app.phone}</div>
                  </td>
                  <td style={{ padding: "12px 16px", fontSize: 13 }}>{app.purpose || app.loanType}</td>
                  <td style={{ padding: "12px 16px", fontSize: 13 }}>{app.amount ? `$${app.amount.toLocaleString()}` : "—"}</td>
                  <td style={{ padding: "12px 16px" }}>
                    <select
                      value={app.status}
                      onChange={e => updateStatus(app._id, e.target.value)}
                      style={{ background: STATUS_COLORS[app.status]?.bg ?? "#f0f0f0", color: STATUS_COLORS[app.status]?.fg ?? "#333", border: "none", padding: "4px 10px", borderRadius: 8, fontWeight: 700, cursor: "pointer", fontSize: 12 }}
                    >
                      {STATUSES.map(s => <option key={s} value={s} style={{ background: "#fff", color: "#333" }}>{s}</option>)}
                    </select>
                  </td>
                  <td style={{ padding: "12px 16px", fontSize: 12, color: "#aaa" }}>
                    {new Date(app.createdAt).toLocaleDateString()}
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <button onClick={() => setEditingApp(app)} style={{ border: "none", background: "rgba(33,150,243,0.10)", color: "#2196f3", padding: "5px 12px", borderRadius: 7, cursor: "pointer", fontWeight: 600, fontSize: 12, marginRight: 8 }}>Edit</button>
                    <button onClick={() => handleDelete(app._id)} style={{ border: "none", background: "rgba(229,57,53,0.10)", color: "#e53935", padding: "5px 12px", borderRadius: 7, cursor: "pointer", fontWeight: 600, fontSize: 12 }}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editingApp && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.35)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <div style={{ background: "#fff", borderRadius: 14, width: "100%", maxWidth: 960, maxHeight: "90vh", overflowY: "auto", padding: 24 }}>
            <h3 style={{ marginTop: 0, marginBottom: 16 }}>Edit Application</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
              {[
                ["name", "Name"], ["email", "Email"], ["phone", "Phone"],
                ["purpose", "Purpose"], ["amount", "Amount"], ["gender", "Gender"],
                ["birth", "Date of Birth"], ["maritalStatus", "Marital Status"], ["dependants", "Dependants"],
                ["city", "City"], ["street", "Street"], ["houseName", "House Name"],
                ["homeTown", "Home Town"], ["timeAtAddress", "Time at Address"], ["timeAtAddress2", "Time at Address 2"],
                ["employmentStatus", "Employment Status"], ["employerName", "Employer Name"],
                ["employmentIndustry", "Employment Industry"], ["employmentLength", "Employment Length"], ["income", "Income"],
              ].map(([key, label]) => (
                <label key={key} style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 12, color: "#666" }}>
                  {label}
                  <input
                    value={String(editingApp[key as keyof App] ?? "")}
                    onChange={(e) => updateField(key as keyof App, e.target.value)}
                    style={{ border: "1px solid #ddd", borderRadius: 8, padding: "8px 10px" }}
                  />
                </label>
              ))}
            </div>
            <div style={{ marginTop: 18, display: "flex", justifyContent: "flex-end", gap: 8 }}>
              <button onClick={() => setEditingApp(null)} style={{ border: "1px solid #ddd", background: "#fff", color: "#444", padding: "8px 14px", borderRadius: 8, cursor: "pointer" }}>Cancel</button>
              <button onClick={saveEdit} style={{ border: "none", background: "#27ae60", color: "#fff", padding: "8px 14px", borderRadius: 8, cursor: "pointer", fontWeight: 600 }}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
