import type { Metadata } from "next";
import { Mail, Phone, MapPin, Clock, Instagram, Facebook, Youtube } from "lucide-react";
import ContactForm from "@/components/contact/ContactForm";
import Breadcrumb from "@/components/ui/Breadcrumb";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Al Imran Fabrics for order inquiries, sizing help, or custom orders.",
};

export default function ContactPage() {
  return (
    <div className="bg-cream min-h-screen pt-28 md:pt-36">
      <div className="max-w-6xl mx-auto px-4 md:px-6">

        {/* ── Breadcrumb + Header ── */}
        <div className="mb-10">
          <div className="mb-6">
            <Breadcrumb items={[{ label: "Contact" }]} />
          </div>
          <p className="font-dm-sans text-[11px] uppercase tracking-[0.22em] text-charcoal/40 mb-3">Get in Touch</p>
          <h1 className="font-cormorant text-[36px] md:text-[48px] font-normal text-charcoal">
            We&apos;d Love to Hear From You
          </h1>
        </div>

        {/* ── Contact details row ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-14 border-b border-[#E8E4DE] pb-10">
          {[
            { icon: Mail, label: "Email", value: "support@alimranfabrics.com", href: "mailto:support@alimranfabrics.com" },
            { icon: Phone, label: "Phone", value: "+92 314 5690329", href: "tel:+923145690329" },
            { icon: MapPin, label: "Address", value: "Model Town, Lahore, Pakistan", href: null },
            { icon: Clock, label: "Hours", value: "Mon–Sat, 9 AM – 8 PM PKT", href: null },
          ].map((item) => (
            <div key={item.label}>
              <p className="font-dm-sans text-[10px] uppercase tracking-[0.18em] text-charcoal/35 mb-2 flex items-center gap-1.5">
                <item.icon size={11} />
                {item.label}
              </p>
              {item.href ? (
                <a href={item.href} className="font-dm-sans text-[13px] text-charcoal hover:text-charcoal/60 transition-colors">
                  {item.value}
                </a>
              ) : (
                <p className="font-dm-sans text-[13px] text-charcoal">{item.value}</p>
              )}
            </div>
          ))}
        </div>

        {/* ── Two columns: form + info ── */}
        <div className="grid md:grid-cols-[1fr_280px] gap-14 mb-20 items-start">

          {/* Contact form */}
          <div>
            <p className="font-dm-sans text-[11px] uppercase tracking-[0.22em] text-charcoal/40 mb-6">Send a Message</p>
            <ContactForm />
          </div>

          {/* Side info */}
          <div className="space-y-8">
            {/* WhatsApp */}
            <div className="border border-[#E8E4DE] p-5">
              <div className="flex items-center gap-2.5 mb-3">
                <svg viewBox="0 0 24 24" fill="#25D366" width="16" height="16">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <p className="font-dm-sans text-[12px] font-medium text-charcoal uppercase tracking-[0.1em]">WhatsApp</p>
              </div>
              <p className="font-dm-sans text-[12px] text-charcoal/55 leading-relaxed mb-4">
                Get instant answers about orders, sizing, and custom requests.
              </p>
              <a
                href="https://wa.me/c/923145690329"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] text-white px-4 py-2.5 font-dm-sans text-[11px] uppercase tracking-[0.15em] hover:bg-[#20bf5b] transition-colors"
              >
                Start Chat
              </a>
            </div>

            {/* Social */}
            <div>
              <p className="font-dm-sans text-[10px] uppercase tracking-[0.18em] text-charcoal/35 mb-3">Follow Us</p>
              <div className="flex gap-2">
                {[
                  { icon: Facebook, label: "Facebook", href: "https://www.facebook.com/alimranfabricsonline" },
                  { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/invites/contact/?igsh=k3pgbig93ea2&utm_content=typ780n" },
                  { icon: Youtube, label: "YouTube", href: "https://youtube.com/@alimranfabrics?si=KWZm342myl_oCMNy" },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="w-9 h-9 border border-[#E8E4DE] text-charcoal/40 hover:border-charcoal hover:text-charcoal flex items-center justify-center transition-colors"
                  >
                    <s.icon size={14} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
