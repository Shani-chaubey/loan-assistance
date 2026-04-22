"use client";

import { useState } from "react";

const fields = [
  { name: "amount",        type: "number", placeholder: "Loan amount ($)" },
  { name: "purpose",       type: "text",   placeholder: "Purpose of loan" },
  { name: "gender",        type: "text",   placeholder: "Gender" },
  { name: "birth",         type: "text",   placeholder: "Date of birth" },
  { name: "name",          type: "text",   placeholder: "Name" },
  { name: "email",         type: "email",  placeholder: "Email" },
  { name: "status",        type: "text",   placeholder: "Marital status" },
  { name: "phone",         type: "text",   placeholder: "Phone no." },
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((d) => ({ ...d, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      setSubmitted(true);
    } catch {
      /* silent */
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
          />
        </div>
      ))}
      <div className="col-lg-12 col-md-12">
        <button name="submit" type="submit" className="common_btn">
          Apply Now
        </button>
      </div>
    </form>
  );
}
