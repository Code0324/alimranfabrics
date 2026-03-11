"use client";

import { useState } from "react";
import { X, MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "923145690329";
const WHATSAPP_MESSAGE = "Hi! I'm interested in your products at Al Imran Fabrics. Can you help me?";

export default function WhatsAppFloat() {
  const [tooltip, setTooltip] = useState(true);

  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <div className="fixed bottom-6 right-4 z-50 flex flex-col items-end gap-2 md:bottom-8 md:right-6">
      {/* Tooltip bubble */}
      {tooltip && (
        <div className="relative flex items-center gap-2 bg-white rounded-lg shadow-lg px-3 py-2 border border-[#E0D8CC] max-w-[200px]">
          <p className="font-inter text-xs text-charcoal leading-snug">
            Chat with us on WhatsApp!
          </p>
          <button
            onClick={() => setTooltip(false)}
            className="text-charcoal/40 hover:text-charcoal flex-shrink-0 transition"
            aria-label="Close"
          >
            <X size={12} />
          </button>
          {/* Arrow */}
          <span className="absolute -bottom-1.5 right-5 w-3 h-3 bg-white border-r border-b border-[#E0D8CC] rotate-45" />
        </div>
      )}

      {/* WhatsApp button */}
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110 active:scale-95"
        style={{ backgroundColor: "#25D366" }}
        onClick={() => setTooltip(false)}
      >
        {/* WhatsApp SVG icon */}
        <svg viewBox="0 0 32 32" fill="white" width="28" height="28" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 2C8.268 2 2 8.268 2 16c0 2.478.655 4.897 1.898 7.03L2 30l7.188-1.875A13.915 13.915 0 0016 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.5a11.41 11.41 0 01-5.812-1.594l-.416-.248-4.266 1.113 1.135-4.147-.273-.43A11.42 11.42 0 014.5 16C4.5 9.649 9.649 4.5 16 4.5S27.5 9.649 27.5 16 22.351 27.5 16 27.5zm6.258-8.548c-.343-.172-2.03-1.001-2.344-1.115-.315-.114-.545-.172-.774.172-.228.344-.887 1.115-1.087 1.344-.2.229-.4.258-.743.086-.343-.172-1.449-.534-2.76-1.703-1.02-.91-1.71-2.034-1.91-2.377-.2-.344-.021-.53.15-.7.154-.153.344-.4.515-.6.172-.2.229-.344.344-.572.114-.229.057-.43-.029-.601-.086-.172-.774-1.866-1.06-2.556-.28-.672-.563-.58-.774-.591l-.659-.011c-.229 0-.601.086-.916.43-.315.344-1.201 1.173-1.201 2.862 0 1.689 1.23 3.32 1.401 3.549.172.229 2.421 3.697 5.867 5.186.82.354 1.46.565 1.958.723.823.261 1.572.224 2.164.136.66-.099 2.03-.83 2.316-1.631.287-.802.287-1.489.2-1.631-.086-.143-.314-.229-.657-.4z" />
        </svg>
      </a>
    </div>
  );
}
