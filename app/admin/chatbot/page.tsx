"use client";

import AdminCrud from "@/components/admin/AdminCrud";

export default function ChatbotAdminPage() {
  return (
    <AdminCrud
      title="Chatbot Q&A Manager"
      apiPath="chatbot-qa"
      fields={[
        { key: "question",     label: "Question / Trigger",          placeholder: "What is the interest rate?" },
        { key: "answer",       label: "Bot Answer",                  placeholder: "Our interest rates start from 8.5% p.a.", multiline: true },
        { key: "keywords",     label: "Keywords (comma-separated)",  placeholder: "interest, rate, percentage, charges", type: "tags" },
        { key: "isQuickReply", label: "Show as Quick Reply Button",  placeholder: "", type: "select", options: [{ value: "false", label: "No" }, { value: "true", label: "Yes — show as button" }] },
        { key: "order",        label: "Order",                       placeholder: "1", type: "number" },
      ]}
      defaultValues={{ question: "", answer: "", keywords: [], isQuickReply: false, order: 0 }}
      renderCard={(rawItem, onEdit, onDelete) => {
        const item = rawItem as { question?: string; answer?: string; keywords?: string[]; isQuickReply?: boolean };
        return (
          <div style={{ background: "#fff", borderRadius: 14, padding: 16, boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
              <div style={{ width: 34, height: 34, borderRadius: "50%", background: "linear-gradient(135deg,#2cbbdf,#21a8c8)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" fill="#fff"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/></svg>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 4 }}>
                  <strong style={{ fontSize: 14, color: "#222" }}>{item.question}</strong>
                  {item.isQuickReply && (
                    <span style={{ fontSize: 11, background: "rgba(44,187,223,0.12)", color: "#2cbbdf", padding: "2px 8px", borderRadius: 10, fontWeight: 600, flexShrink: 0 }}>Quick Reply</span>
                  )}
                </div>
                <p style={{ color: "#666", fontSize: 12, margin: "0 0 6px", lineHeight: 1.5, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{item.answer}</p>
                {item.keywords && item.keywords.length > 0 && (
                  <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                    {item.keywords.slice(0, 5).map((kw: string, i: number) => (
                      <span key={i} style={{ fontSize: 11, background: "#f5f5ff", color: "#2cbbdf", padding: "2px 8px", borderRadius: 8, border: "1px solid #e8e8f5" }}>{kw}</span>
                    ))}
                    {item.keywords.length > 5 && <span style={{ fontSize: 11, color: "#aaa" }}>+{item.keywords.length - 5}</span>}
                  </div>
                )}
              </div>
              <div style={{ display: "flex", gap: 5, flexShrink: 0 }}>
                <button onClick={onEdit} title="Edit" style={{ border: "none", background: "rgba(44,187,223,0.10)", color: "#2cbbdf", width: 32, height: 32, borderRadius: 8, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                </button>
                <button onClick={onDelete} title="Delete" style={{ border: "none", background: "rgba(229,57,53,0.10)", color: "#e53935", width: 32, height: 32, borderRadius: 8, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
                </button>
              </div>
            </div>
          </div>
        );
      }}
    />
  );
}
