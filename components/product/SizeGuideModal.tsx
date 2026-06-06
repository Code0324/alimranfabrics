"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import SizeGuideTabs from "@/components/ui/SizeGuideTabs";

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SizeGuideModal({ isOpen, onClose }: SizeGuideModalProps) {
  // Close on ESC
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 bg-black/50 z-[90] flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Modal box */}
      <div
        className="bg-white w-full max-w-2xl max-h-[80vh] overflow-y-auto animate-fade-in"
        style={{ animation: "sizeModalIn 0.2s ease-out both" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#E8E4DE] sticky top-0 bg-white z-10">
          <div>
            <h2 className="font-cormorant text-[22px] font-normal text-charcoal">
              Size Guide
            </h2>
            <p className="font-dm-sans text-[11px] text-charcoal/40 mt-0.5">
              All measurements in inches
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close size guide"
            className="text-[#999] hover:text-[#1A1A1A] transition-colors p-1"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-6">
          <SizeGuideTabs compact />
          <p className="font-dm-sans text-[11px] text-[#999] mt-6 text-center italic">
            If you are between sizes, we recommend sizing up.{" "}
            <a
              href="https://wa.me/923145690329"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-charcoal"
            >
              Chat on WhatsApp
            </a>{" "}
            for personalised help.
          </p>
        </div>
      </div>

    </div>
  );
}
