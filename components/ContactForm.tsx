"use client";

import { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({
    f_name: "", l_name: "", email: "", phone: "", address: "", message: "",
  });
  const [status, setStatus] = useState("Send Message");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Processing...");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("Done!");
        setForm({ f_name: "", l_name: "", email: "", phone: "", address: "", message: "" });
        setTimeout(() => setStatus("Send Message"), 2500);
      } else {
        setStatus("Failed!");
        setTimeout(() => setStatus("Send Message"), 2500);
      }
    } catch {
      setStatus("Failed!");
      setTimeout(() => setStatus("Send Message"), 2500);
    }
  };

  return (
    <form className="contactFrom row" id="contactForm" onSubmit={handleSubmit}>
      <div className="col-md-6">
        <input className="required" type="text" name="f_name" placeholder="First name*"
          value={form.f_name} onChange={handleChange} />
      </div>
      <div className="col-md-6">
        <input className="required" type="text" name="l_name" placeholder="Last name*"
          value={form.l_name} onChange={handleChange} />
      </div>
      <div className="col-md-12">
        <input className="required" type="email" name="email" placeholder="Email here*"
          value={form.email} onChange={handleChange} />
      </div>
      <div className="col-md-6">
        <input className="required" type="text" name="phone" placeholder="Phone*"
          value={form.phone} onChange={handleChange} />
      </div>
      <div className="col-md-6">
        <input className="required" type="text" name="address" placeholder="Address*"
          value={form.address} onChange={handleChange} />
      </div>
      <div className="col-md-12">
        <textarea className="required" name="message" placeholder="Text here...."
          value={form.message} onChange={handleChange}></textarea>
      </div>
      <div className="col-md-12">
        <button name="submit" type="submit" id="con_submit" className="common_btn">
          {status}
        </button>
      </div>
    </form>
  );
}
