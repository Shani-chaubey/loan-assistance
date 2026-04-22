"use client";

import { useEffect, useState } from "react";

interface FieldConfig {
  _id: string;
  key: string;
  label: string;
  placeholder: string;
  type: string;
  required: boolean;
  enabled: boolean;
  order: number;
}

export default function ApplicationFormClient() {
  const [fields, setFields]       = useState<FieldConfig[]>([]);
  const [formData, setFormData]   = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError]         = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/form-fields")
      .then((r) => r.json())
      .then((r) => setFields(r.data ?? []));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((d) => ({ ...d, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const payload: Record<string, string | number> = {};
    fields.forEach((f) => {
      payload[f.key] =
        f.type === "number"
          ? Number(formData[f.key]) || 0
          : formData[f.key]?.trim() ?? "";
    });
    // ensure loanType mirrors purpose for backwards compat
    if (payload.purpose) payload.loanType = payload.purpose;

    try {
      const response = await fetch("/api/admin/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json().catch(() => null);
      if (!response.ok || result?.success === false) {
        setError(result?.message ?? "Submission failed. Please try again.");
        setSubmitting(false);
        return;
      }
      setSubmitted(true);
    } catch {
      setError("Submission failed. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted)
    return (
      <div style={{ textAlign: "center", padding: "56px 24px" }}>
        <div style={{
          width: 80, height: 80, borderRadius: "50%",
          background: "linear-gradient(135deg,#27ae60,#2ecc71)",
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          marginBottom: 20, boxShadow: "0 8px 24px rgba(39,174,96,0.30)",
        }}>
          <i className="icofont-check-circled" style={{ fontSize: 38, color: "#fff" }}></i>
        </div>
        <h3 style={{ fontSize: 22, fontWeight: 800, color: "#1a1a2e", marginBottom: 8 }}>
          Application Submitted!
        </h3>
        <p style={{ color: "#666", maxWidth: 380, margin: "0 auto" }}>
          Thank you! Our team will review your application and contact you within 24 hours.
        </p>
      </div>
    );

  if (fields.length === 0)
    return (
      <div style={{ textAlign: "center", padding: "40px 24px", color: "#aaa" }}>
        Loading form…
      </div>
    );

  return (
    <div style={{ padding: "8px 0" }}>
      {/* Header */}
      <div style={{ marginBottom: 28, textAlign: "center" }}>
        <p style={{ color: "#888", fontSize: 14, margin: 0 }}>
          Fields marked with <span style={{ color: "#e53935", fontWeight: 700 }}>*</span> are required
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "18px 20px",
        }}>
          {fields.map((field) => (
            <div key={field.key} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: "#444", letterSpacing: 0.2 }}>
                {field.label}
                {field.required && (
                  <span style={{ color: "#e53935", marginLeft: 3, fontWeight: 700 }}>*</span>
                )}
              </label>
              <input
                type={field.type}
                step={field.type === "number" ? "any" : undefined}
                name={field.key}
                placeholder={field.placeholder}
                value={formData[field.key] ?? ""}
                onChange={handleChange}
                required={field.required}
                style={{
                  border: "1.5px solid #dde1f0",
                  borderRadius: 10,
                  padding: "11px 14px",
                  fontSize: 14,
                  color: "#222",
                  background: "#fafbff",
                  outline: "none",
                  transition: "border-color 0.2s, box-shadow 0.2s",
                  width: "100%",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#8180e0";
                  e.target.style.boxShadow = "0 0 0 3px rgba(129,128,224,0.12)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#dde1f0";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>
          ))}
        </div>

        {error && (
          <div style={{
            marginTop: 20, padding: "12px 16px", borderRadius: 10,
            background: "rgba(229,57,53,0.08)", border: "1px solid rgba(229,57,53,0.20)",
            color: "#e53935", fontSize: 14, display: "flex", alignItems: "center", gap: 8,
          }}>
            <i className="icofont-warning-alt"></i>
            {error}
          </div>
        )}

        <div style={{ marginTop: 28, textAlign: "center" }}>
          <button
            type="submit"
            disabled={submitting}
            className="common_btn"
            style={{ opacity: submitting ? 0.7 : 1, cursor: submitting ? "not-allowed" : "pointer", minWidth: 180 }}
          >
            {submitting ? "Submitting…" : "Apply Now"}
          </button>
        </div>
      </form>
    </div>
  );
}
