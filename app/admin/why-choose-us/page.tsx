"use client";

import AdminCrud from "@/components/admin/AdminCrud";

function WhyCard({ item, onEdit, onDelete }: { item: Record<string, unknown>; onEdit: () => void; onDelete: () => void }) {
  const color = (item.color as string) || "#2cbbdf";
  return (
    <div style={{ background: "#fff", borderRadius: 14, padding: 20, boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ display: "flex", gap: 10, alignItems: "center", flex: 1 }}>
          <div style={{ width: 42, height: 42, borderRadius: 11, background: (item.bg as string) || `${color}18`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill={color} opacity=".85"/></svg>
          </div>
          <div>
            <h4 style={{ margin: 0, fontSize: 15, color: "#1a1a2e" }}>{item.title as string}</h4>
            <p style={{ margin: "4px 0 0", fontSize: 12, color: "#aaa" }}>{(item.desc as string)?.slice(0, 60)}…</p>
          </div>
        </div>
        <div style={{ display: "flex", gap: 6, flexShrink: 0, marginLeft: 8 }}>
          <button onClick={onEdit} title="Edit" style={{ border: "none", background: "rgba(44,187,223,0.10)", color: "#2cbbdf", width: 34, height: 34, borderRadius: 8, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          </button>
          <button onClick={onDelete} title="Delete" style={{ border: "none", background: "rgba(229,57,53,0.10)", color: "#e53935", width: 34, height: 34, borderRadius: 8, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminWhyPage() {
  return (
    <AdminCrud
      title="Why Choose Us"
      apiPath="why-choose-us"
      fields={[
        { key: "title", label: "Feature Title",  placeholder: "Lightning Fast Approval" },
        { key: "desc",  label: "Description",    type: "textarea", placeholder: "Explain this feature..." },
        { key: "icon",  label: "Icon Class",     placeholder: "icofont-flash" },
        { key: "color", label: "Icon Color",     type: "color" },
        { key: "bg",    label: "Background (e.g. rgba(...))", placeholder: "rgba(44,187,223,0.10)" },
        { key: "order", label: "Sort Order",     type: "number", placeholder: "1" },
      ]}
      defaultValues={{ title: "", desc: "", icon: "icofont-flash", color: "#2cbbdf", bg: "rgba(44,187,223,0.10)", order: 0 }}
      renderCard={(item, onEdit, onDelete) => (
        <WhyCard key={item._id as string} item={item} onEdit={onEdit} onDelete={onDelete} />
      )}
    />
  );
}
