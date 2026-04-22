"use client";

import AdminCrud from "@/components/admin/AdminCrud";

const TYPE_OPTIONS = [
  { value: "partner",       label: "Banking Partner" },
  { value: "award",         label: "Award" },
  { value: "certification", label: "Certification" },
];

export default function PartnersAdminPage() {
  return (
    <AdminCrud
      title="Partners, Awards & Certifications"
      apiPath="partners"
      fields={[
        { key: "type",  label: "Type",        placeholder: "partner", options: TYPE_OPTIONS },
        { key: "name",  label: "Name / Title", placeholder: "HDFC Bank" },
        { key: "icon",  label: "Icon Class",   placeholder: "icofont-bank" },
        { key: "color", label: "Accent Color", placeholder: "#8180e0" },
        { key: "org",   label: "Organisation (awards only)", placeholder: "Finance India Awards" },
        { key: "text",  label: "Text (certifications only)", placeholder: "256-bit SSL Encrypted" },
        { key: "order", label: "Order", placeholder: "1", type: "number" },
      ]}
      defaultValues={{ type: "partner", name: "", icon: "icofont-bank", color: "#8180e0", org: "", text: "", order: 0 }}
      renderCard={(rawItem, onEdit, onDelete) => {
        const item = rawItem as { _id?: string; icon?: string; color?: string; name?: string; type?: string; org?: string; text?: string };
        const color = item.color ?? "#8180e0";
        return (
          <div style={{ background: "#fff", borderRadius: 14, padding: 16, boxShadow: "0 2px 12px rgba(0,0,0,0.05)", display: "flex", alignItems: "center", gap: 12, justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, flex: 1 }}>
              <div style={{ width: 42, height: 42, borderRadius: 10, background: `${color}20`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="2" y="6" width="20" height="12" rx="2" stroke={color} strokeWidth="2"/><path d="M2 10h20" stroke={color} strokeWidth="2"/><path d="M6 14h4" stroke={color} strokeWidth="2" strokeLinecap="round"/></svg>
              </div>
              <div>
                <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                  <strong style={{ fontSize: 14, color: "#222" }}>{item.name}</strong>
                  <span style={{ fontSize: 11, background: "#f0f0f8", padding: "2px 8px", borderRadius: 8, color: "#8180e0", fontWeight: 600, textTransform: "capitalize" }}>{item.type}</span>
                </div>
                {item.org  && <div style={{ fontSize: 12, color: "#aaa" }}>{item.org}</div>}
                {item.text && <div style={{ fontSize: 12, color: "#aaa" }}>{item.text}</div>}
                <div style={{ fontSize: 11, color: "#ccc", marginTop: 2 }}>{item.icon}</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
              <button onClick={onEdit} title="Edit" style={{ border: "none", background: "rgba(129,128,224,0.10)", color: "#8180e0", width: 34, height: 34, borderRadius: 8, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              </button>
              <button onClick={onDelete} title="Delete" style={{ border: "none", background: "rgba(229,57,53,0.10)", color: "#e53935", width: 34, height: 34, borderRadius: 8, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
              </button>
            </div>
          </div>
        );
      }}
    />
  );
}
