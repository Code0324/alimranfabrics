"use client";

import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    orderNumber: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  if (submitted) {
    return (
      <div className="py-12">
        <h3 className="font-cormorant text-[24px] font-normal text-charcoal mb-3">
          Message Sent
        </h3>
        <p className="font-dm-sans text-[13px] text-charcoal/55 mb-6 leading-relaxed">
          Thank you for reaching out. We&apos;ll get back to you within 24 hours.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setFormData({ name: "", email: "", orderNumber: "", message: "" });
          }}
          className="font-dm-sans text-[12px] uppercase tracking-[0.15em] border border-[#E8E4DE] text-charcoal/60 px-6 py-3 hover:border-charcoal hover:text-charcoal transition-colors"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label className="block font-dm-sans text-[10px] uppercase tracking-[0.18em] text-charcoal/40 mb-2">
            Your Name *
          </label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="Fatima Malik"
            className="w-full pb-2.5 border-b border-[#E8E4DE] bg-transparent font-dm-sans text-[13px] text-charcoal placeholder:text-charcoal/25 focus:outline-none focus:border-charcoal/50 transition-colors"
          />
        </div>
        <div>
          <label className="block font-dm-sans text-[10px] uppercase tracking-[0.18em] text-charcoal/40 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="fatima@example.com"
            className="w-full pb-2.5 border-b border-[#E8E4DE] bg-transparent font-dm-sans text-[13px] text-charcoal placeholder:text-charcoal/25 focus:outline-none focus:border-charcoal/50 transition-colors"
          />
        </div>
      </div>

      <div>
        <label className="block font-dm-sans text-[10px] uppercase tracking-[0.18em] text-charcoal/40 mb-2">
          Order Number <span className="normal-case tracking-normal text-charcoal/25">(optional)</span>
        </label>
        <input
          type="text"
          name="orderNumber"
          value={formData.orderNumber}
          onChange={handleChange}
          placeholder="AIF-2025-XXXXX"
          className="w-full pb-2.5 border-b border-[#E8E4DE] bg-transparent font-dm-sans text-[13px] text-charcoal placeholder:text-charcoal/25 focus:outline-none focus:border-charcoal/50 transition-colors"
        />
      </div>

      <div>
        <label className="block font-dm-sans text-[10px] uppercase tracking-[0.18em] text-charcoal/40 mb-2">
          Message *
        </label>
        <textarea
          name="message"
          required
          rows={5}
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell us how we can help you..."
          className="w-full pb-2.5 border-b border-[#E8E4DE] bg-transparent font-dm-sans text-[13px] text-charcoal placeholder:text-charcoal/25 focus:outline-none focus:border-charcoal/50 transition-colors resize-none"
        />
      </div>

      <div className="flex items-center justify-between pt-1">
        <button
          type="submit"
          className="font-dm-sans text-[12px] uppercase tracking-[0.2em] bg-[#111111] text-white px-8 py-4 hover:bg-[#2a2a2a] transition-colors"
        >
          Send Message
        </button>
        <p className="font-dm-sans text-[11px] text-charcoal/35">
          Reply within 24 hours
        </p>
      </div>
    </form>
  );
}
