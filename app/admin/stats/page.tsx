"use client";

import AdminCrud from "@/components/admin/AdminCrud";

function StatCard({ item, onEdit, onDelete }: { item: Record<string, unknown>; onEdit: () => void; onDelete: () => void }) {
  const color = (item.color as string) || "#8180e0";
  return (
    <div style={{ background: "#fff", borderRadius: 14, padding: 20, boxShadow: "0 2px 12px rgba(0,0,0,0.05)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <div style={{ width: 44, height: 44, borderRadius: 12, background: `${color}22`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" fill={color}/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke={color} strokeWidth="2" strokeLinecap="round"/></svg>
        </div>
        <div>
          <div style={{ fontSize: 20, fontWeight: 800, color: "#1a1a2e" }}>{item.value as string}</div>
          <div style={{ color: "#888", fontSize: 13 }}>{item.label as string}</div>
          <div style={{ fontSize: 11, color: "#bbb", marginTop: 2 }}>{item.icon as string}</div>
        </div>
      </div>
      <div style={{ display: "flex", gap: 6 }}>
        <button onClick={onEdit} title="Edit" style={{ border: "none", background: "rgba(129,128,224,0.10)", color: "#8180e0", width: 34, height: 34, borderRadius: 8, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
        </button>
        <button onClick={onDelete} title="Delete" style={{ border: "none", background: "rgba(229,57,53,0.10)", color: "#e53935", width: 34, height: 34, borderRadius: 8, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
        </button>
      </div>
    </div>
  );
}

export default function AdminStatsPage() {
  return (
    <AdminCrud
      title="Stats"
      apiPath="stats"
      fields={[
        { key: "icon",  label: "Icon Class",  placeholder: "icofont-users" },
        { key: "value", label: "Value",        placeholder: "50,000+" },
        { key: "label", label: "Label",        placeholder: "Happy Customers" },
        { key: "color", label: "Color",        type: "color" },
        { key: "order", label: "Sort Order",   type: "number", placeholder: "1" },
      ]}
      defaultValues={{ icon: "icofont-users", value: "", label: "", color: "#8180e0", order: 0 }}
      renderCard={(item, onEdit, onDelete) => (
        <StatCard key={item._id as string} item={item} onEdit={onEdit} onDelete={onDelete} />
      )}
    />
  );
}
