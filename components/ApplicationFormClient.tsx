"use client";

import { useState } from "react";

const fields = [
  { name: "amount",        type: "number", placeholder: "Loan amount ($)", required: true },
  { name: "purpose",       type: "text",   placeholder: "Purpose of loan", required: true },
  { name: "gender",        type: "text",   placeholder: "Gender" },
  { name: "birth",         type: "text",   placeholder: "Date of birth" },
  { name: "name",          type: "text",   placeholder: "Name", required: true },
  { name: "email",         type: "email",  placeholder: "Email", required: true },
  { name: "status",        type: "text",   placeholder: "Marital status" },
  { name: "phone",         type: "text",   placeholder: "Phone no.", required: true },
  { name: "dependants",    type: "text",   placeholder: "Dependants" },
  { name: "city",          type: "text",   placeholder: "Town/City" },
  { name: "street",        type: "text",   placeholder: "Street" },
  { name: "house_name",    type: "text",   placeholder: "House name" },
  { name: "home_town",     type: "text",   placeholder: "Home town" },
  { name: "time_address",  type: "text",   placeholder: "Time at address" },
  { name: "time_address2", type: "text",   placeholder: "Time at address 2" },
  { name: "emp_status",    type: "text",   placeholder: "Employment status" },
  { name: "emp_name",      type: "text",   placeholder: "Employer name" },
  { name: "emp_industrie", type: "text",   placeholder: "Employment industry" },
  { name: "emp_length",    type: "text",   placeholder: "Employment length" },
  { name: "income",        type: "number", placeholder: "Monthly income" },
];

export default function ApplicationFormClient() {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((d) => ({ ...d, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await fetch("/api/admin/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name?.trim() ?? "",
          email: formData.email?.trim() ?? "",
          phone: formData.phone?.trim() ?? "",
          loanType: formData.purpose?.trim() || "Personal Loan",
          purpose: formData.purpose?.trim() ?? "",
          amount: Number(formData.amount) || 0,
          gender: formData.gender?.trim() ?? "",
          birth: formData.birth?.trim() ?? "",
          maritalStatus: formData.status?.trim() ?? "",
          dependants: formData.dependants?.trim() ?? "",
          city: formData.city?.trim() ?? "",
          street: formData.street?.trim() ?? "",
          houseName: formData.house_name?.trim() ?? "",
          homeTown: formData.home_town?.trim() ?? "",
          timeAtAddress: formData.time_address?.trim() ?? "",
          timeAtAddress2: formData.time_address2?.trim() ?? "",
          employmentStatus: formData.emp_status?.trim() ?? "",
          employerName: formData.emp_name?.trim() ?? "",
          employmentIndustry: formData.emp_industrie?.trim() ?? "",
          employmentLength: formData.emp_length?.trim() ?? "",
          income: Number(formData.income) || 0,
        }),
      });
      const payload = await response.json().catch(() => null);
      if (!response.ok || payload?.success === false) {
        setError(payload?.message ?? "Submission failed. Please try again.");
        return;
      }
      setSubmitted(true);
    } catch {
      setError("Submission failed. Please check your connection and try again.");
    }
  };

  if (submitted)
    return (
      <div style={{ textAlign: "center", padding: "48px 0" }}>
        <i className="icofont-check-circled" style={{ fontSize: 56, color: "#27ae60" }}></i>
        <h3 style={{ marginTop: 16 }}>Application submitted successfully!</h3>
        <p>Our team will contact you within 24 hours.</p>
      </div>
    );

  return (
    <form className="applicationForm row" onSubmit={handleSubmit}>
      {fields.map((field) => (
        <div key={field.name} className="col-lg-3 col-md-4">
          <input
            type={field.type}
            step={field.type === "number" ? "any" : undefined}
            name={field.name}
            placeholder={field.placeholder}
            value={formData[field.name] ?? ""}
            onChange={handleChange}
            required={Boolean(field.required)}
          />
        </div>
      ))}
      <div className="col-lg-12 col-md-12">
        <button name="submit" type="submit" className="common_btn">
          Apply Now
        </button>
      </div>
      {error && (
        <div className="col-lg-12 col-md-12" style={{ marginTop: 12 }}>
          <p style={{ color: "#e53935", marginBottom: 0 }}>{error}</p>
        </div>
      )}
    </form>
  );
}
