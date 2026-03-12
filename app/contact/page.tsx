import type { Metadata } from "next";
import { Mail, Phone, MapPin, Clock, Instagram, Facebook, Youtube } from "lucide-react";
import ContactForm from "@/components/contact/ContactForm";
import PageHero from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Al Imran Fabrics for order inquiries, sizing help, or custom orders.",
};

export default function ContactPage() {
  return (
    <div>
      <PageHero
        eyebrow="Get in Touch"
        title="We'd Love to Hear From You"
        description="Have a question about sizing, shipping, or a custom order? Our team is here to help."
        backgroundImage="/image/women-banner-silk.png"
        breadcrumbItems={[{ label: "Contact" }]}
      />

      <section className="py-16 px-4 bg-ivory">
        <div className="max-w-6xl mx-auto grid md:grid-cols-5 gap-12">
          {/* Contact info */}
          <div className="md:col-span-2 space-y-8">
            <div>
              <h2 className="font-playfair text-2xl font-bold text-charcoal mb-6">
                Contact Information
              </h2>

              <div className="space-y-5">
                {[
                  { icon: Mail, label: "Email", value: "support@alimranfabrics.com", href: "mailto:support@alimranfabrics.com" },
                  { icon: Phone, label: "USA Phone", value: "+1 (555) 000-0000", href: "tel:+15550000000" },
                  { icon: MapPin, label: "Address", value: "Model Town, Lahore, Pakistan", href: null },
                  { icon: Clock, label: "Hours", value: "Mon–Sat: 9 AM – 8 PM PKT", href: null },
                ].map((item) => (
                  <div key={item.label} className="flex gap-4">
                    <div className="w-10 h-10 flex items-center justify-center flex-shrink-0 bg-navy/10">
                      <item.icon size={18} style={{ color: "#C9A84C" }} />
                    </div>
                    <div>
                      <p className="font-inter text-xs text-charcoal/50 uppercase tracking-wide mb-0.5">
                        {item.label}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="font-inter text-sm text-charcoal hover:text-gold transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="font-inter text-sm text-charcoal">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* WhatsApp CTA */}
            <div className="bg-[#25D366]/10 border border-[#25D366]/30 p-5">
              <div className="flex items-center gap-3 mb-3">
                <svg viewBox="0 0 24 24" fill="#25D366" width="20" height="20">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <h3 className="font-playfair font-semibold text-charcoal">Chat on WhatsApp</h3>
              </div>
              <p className="font-inter text-sm text-charcoal/60 mb-4">
                Get instant answers about orders, sizing, and custom requests.
              </p>
              <a
                href="https://wa.me/15550000000"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] text-white px-5 py-2.5 font-inter text-sm font-medium hover:bg-[#20bf5b] transition-colors"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Start WhatsApp Chat
              </a>
            </div>

            {/* Social links */}
            <div>
              <h3 className="font-playfair font-semibold text-charcoal mb-4">Follow Us</h3>
              <div className="flex gap-3">
                {[
                  { icon: Facebook, label: "Facebook", href: "https://facebook.com" },
                  { icon: Instagram, label: "Instagram", href: "https://instagram.com" },
                  { icon: Youtube, label: "YouTube", href: "https://youtube.com" },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="w-10 h-10 bg-charcoal text-ivory hover:bg-navy flex items-center justify-center transition-colors"
                  >
                    <s.icon size={16} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="md:col-span-3">
            <div className="bg-white p-8 shadow-card">
              <h2 className="font-playfair text-2xl font-bold text-charcoal mb-6">
                Send a Message
              </h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
