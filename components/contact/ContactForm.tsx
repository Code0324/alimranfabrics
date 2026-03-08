"use client";

import { useState } from "react";
import { Send } from "lucide-react";

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
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-emerald/10 flex items-center justify-center mx-auto mb-4">
          <Send size={24} className="text-emerald" />
        </div>
        <h3 className="font-playfair text-xl font-semibold text-charcoal mb-2">
          Message Sent!
        </h3>
        <p className="font-inter text-sm text-charcoal/60 mb-6">
          Thank you for reaching out. We&apos;ll get back to you within 24 hours.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setFormData({ name: "", email: "", orderNumber: "", message: "" });
          }}
          className="btn-outline"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block font-inter text-xs font-medium text-charcoal uppercase tracking-wide mb-2">
            Your Name *
          </label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="Fatima Malik"
            className="w-full px-4 py-3 border border-charcoal/20 font-inter text-sm focus:outline-none focus:border-emerald transition-colors bg-ivory"
          />
        </div>
        <div>
          <label className="block font-inter text-xs font-medium text-charcoal uppercase tracking-wide mb-2">
            Email Address *
          </label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="fatima@example.com"
            className="w-full px-4 py-3 border border-charcoal/20 font-inter text-sm focus:outline-none focus:border-emerald transition-colors bg-ivory"
          />
        </div>
      </div>

      <div>
        <label className="block font-inter text-xs font-medium text-charcoal uppercase tracking-wide mb-2">
          Order Number{" "}
          <span className="text-charcoal/40 normal-case tracking-normal font-normal">(optional)</span>
        </label>
        <input
          type="text"
          name="orderNumber"
          value={formData.orderNumber}
          onChange={handleChange}
          placeholder="AIF-2025-XXXXX"
          className="w-full px-4 py-3 border border-charcoal/20 font-inter text-sm focus:outline-none focus:border-emerald transition-colors bg-ivory"
        />
      </div>

      <div>
        <label className="block font-inter text-xs font-medium text-charcoal uppercase tracking-wide mb-2">
          Message *
        </label>
        <textarea
          name="message"
          required
          rows={5}
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell us how we can help you..."
          className="w-full px-4 py-3 border border-charcoal/20 font-inter text-sm focus:outline-none focus:border-emerald transition-colors bg-ivory resize-none"
        />
      </div>

      <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
        <Send size={16} />
        Send Message
      </button>

      <p className="font-inter text-xs text-charcoal/40 text-center">
        We typically respond within 24 hours during business days.
      </p>
    </form>
  );
}
