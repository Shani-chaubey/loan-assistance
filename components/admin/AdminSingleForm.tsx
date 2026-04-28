"use client";

import { useState, useEffect, useCallback } from "react";

interface Field {
  key: string;
  label: string;
  type?: "text" | "textarea" | "url";
  placeholder?: string;
}

interface AdminSingleFormProps {
  title: string;
  description?: string;
  apiPath: string;
  fields: Field[];
}

export default function AdminSingleForm({ title, description, apiPath, fields }: AdminSingleFormProps) {
  const [form, setForm] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/${apiPath}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      if (json.data) setForm(json.data);
    } catch (e) {
      console.error(`[AdminSingleForm] Failed to load "${apiPath}":`, e);
    } finally {
      setLoading(false);
    }
  }, [apiPath]);

  useEffect(() => { load(); }, [load]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/${apiPath}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      if (!res.ok) throw new Error();
      showToast("Saved successfully!");
    } catch {
      showToast("Save failed", "error");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div style={{ padding: 40, textAlign: "center", color: "#aaa" }}>Loading…</div>;

  return (
    <div>
      {toast && (
        <div style={{ position: "fixed", top: 20, right: 20, background: toast.type === "success" ? "#27ae60" : "#e53935", color: "#fff", padding: "10px 20px", borderRadius: 10, zIndex: 9999, fontWeight: 600 }}>
          {toast.msg}
        </div>
      )}

      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: "#1a1a2e", margin: "0 0 6px" }}>{title}</h2>
        {description && <p style={{ color: "#888", margin: 0 }}>{description}</p>}
      </div>

      <div style={{ background: "#fff", borderRadius: 16, padding: 28, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
        <form onSubmit={handleSubmit}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
            {fields.map((f) => (
              <div key={f.key} style={{ gridColumn: f.type === "textarea" ? "1 / -1" : "auto" }}>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#555", marginBottom: 6 }}>{f.label}</label>
                {f.type === "textarea" ? (
                  <textarea
                    rows={4}
                    value={form[f.key] ?? ""}
                    onChange={(e) => setForm((p) => ({ ...p, [f.key]: e.target.value }))}
                    placeholder={f.placeholder}
                    style={{ width: "100%", padding: "10px 12px", border: "1.5px solid #cceffa", borderRadius: 8, fontSize: 14, resize: "vertical", outline: "none", boxSizing: "border-box" }}
                  />
                ) : (
                  <input
                    type={f.type ?? "text"}
                    value={form[f.key] ?? ""}
                    onChange={(e) => setForm((p) => ({ ...p, [f.key]: e.target.value }))}
                    placeholder={f.placeholder}
                    style={{ width: "100%", padding: "10px 12px", border: "1.5px solid #cceffa", borderRadius: 8, fontSize: 14, outline: "none", boxSizing: "border-box" }}
                  />
                )}
              </div>
            ))}
          </div>

          <div style={{ marginTop: 24, display: "flex", gap: 10 }}>
            <button type="submit" disabled={saving} style={{ padding: "12px 28px", background: "linear-gradient(135deg,#2cbbdf,#38cfe8)", border: "none", color: "#fff", borderRadius: 10, fontWeight: 700, cursor: "pointer", fontSize: 15 }}>
              {saving ? "Saving…" : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
