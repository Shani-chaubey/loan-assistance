"use client";

import AdminCrud from "@/components/admin/AdminCrud";

export default function ProcessStepsAdminPage() {
  return (
    <AdminCrud
      title="Application Process Steps"
      apiPath="process-steps"
      fields={[
        { key: "num",   label: "Step Number", placeholder: "01" },
        { key: "title", label: "Title",        placeholder: "Apply Bank Loan" },
        { key: "desc",  label: "Description",  placeholder: "Fill out our simple online form...", multiline: true },
        { key: "icon",  label: "Icon Class",   placeholder: "icofont-paper" },
        { key: "order", label: "Order",        placeholder: "1", type: "number" },
      ]}
      defaultValues={{ num: "", title: "", desc: "", icon: "icofont-paper", order: 0 }}
      renderCard={(rawItem, onEdit, onDelete) => {
        const item = rawItem as { icon?: string; num?: string; title?: string; desc?: string };
        return (
          <div style={{ background: "#fff", borderRadius: 14, padding: 18, boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1 }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(129,128,224,0.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M9 11l3 3L22 4" stroke="#8180e0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" stroke="#8180e0" strokeWidth="2" strokeLinecap="round"/></svg>
                </div>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontWeight: 800, fontSize: 20, color: "#8180e0" }}>{item.num}</span>
                    <strong style={{ fontSize: 14, color: "#222" }}>{item.title}</strong>
                  </div>
                  <p style={{ color: "#888", fontSize: 12, margin: "4px 0 0", lineHeight: 1.4 }}>{(item.desc ?? "").slice(0, 70)}…</p>
                </div>
              </div>
              <div style={{ display: "flex", gap: 6, flexShrink: 0, marginLeft: 8 }}>
                <button onClick={onEdit} title="Edit" style={{ border: "none", background: "rgba(129,128,224,0.10)", color: "#8180e0", width: 34, height: 34, borderRadius: 8, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                </button>
                <button onClick={onDelete} title="Delete" style={{ border: "none", background: "rgba(229,57,53,0.10)", color: "#e53935", width: 34, height: 34, borderRadius: 8, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
                </button>
              </div>
            </div>
          </div>
        );
      }}
    />
  );
}
