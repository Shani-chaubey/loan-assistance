"use client";

import AdminCrud from "@/components/admin/AdminCrud";

function ConveyancingCard({ item, onEdit, onDelete }: { item: Record<string, unknown>; onEdit: () => void; onDelete: () => void }) {
  const color = (item.color as string) || "#2cbbdf";
  return (
    <div style={{ background: "#fff", borderRadius: 14, padding: 20, boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <div style={{ width: 42, height: 42, borderRadius: 11, background: `${color}22`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <i className={item.icon as string} style={{ color, fontSize: 20 }}></i>
          </div>
          <h4 style={{ margin: 0, fontSize: 15, color: "#1a1a2e" }}>{item.title as string}</h4>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          <button onClick={onEdit} title="Edit" style={{ border: "none", background: "rgba(44,187,223,0.10)", color: "#2cbbdf", width: 34, height: 34, borderRadius: 8, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          </button>
          <button onClick={onDelete} title="Delete" style={{ border: "none", background: "rgba(229,57,53,0.10)", color: "#e53935", width: 34, height: 34, borderRadius: 8, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
          </button>
        </div>
      </div>
      <p style={{ fontSize: 13, color: "#888", margin: "6px 0 8px", lineHeight: 1.5 }}>{(item.desc as string)?.slice(0, 90)}…</p>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        {((item.features as string[]) ?? []).slice(0, 3).map((f) => (
          <span key={f} style={{ background: "#f0f0f8", borderRadius: 6, padding: "3px 8px", fontSize: 12, color: "#555" }}>{f}</span>
        ))}
      </div>
    </div>
  );
}

export default function AdminConveyancingPage() {
  return (
    <AdminCrud
      title="Conveyancing Services"
      apiPath="conveyancing"
      fields={[
        { key: "title",    label: "Service Title",           placeholder: "Residential Conveyancing" },
        { key: "desc",     label: "Description",             type: "textarea", placeholder: "Short description..." },
        { key: "features", label: "Features (Enter to add)", type: "tags" },
        { key: "icon",     label: "Icon Class",              placeholder: "icofont-law-document" },
        { key: "color",    label: "Accent Color",            type: "color" },
        { key: "order",    label: "Sort Order",              type: "number", placeholder: "1" },
      ]}
      defaultValues={{ title: "", desc: "", features: [], icon: "icofont-law-document", color: "#2cbbdf", order: 0 }}
      renderCard={(item, onEdit, onDelete) => (
        <ConveyancingCard key={item._id as string} item={item} onEdit={onEdit} onDelete={onDelete} />
      )}
    />
  );
}
