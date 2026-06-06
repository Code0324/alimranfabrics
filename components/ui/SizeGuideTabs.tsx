"use client";

import { useState } from "react";

type Tab = "women-sk" | "women-western" | "men" | "kids";

const TABS: { id: Tab; label: string }[] = [
  { id: "women-sk",      label: "Women's Shalwar Kameez" },
  { id: "women-western", label: "Women's Western" },
  { id: "men",           label: "Men" },
  { id: "kids",          label: "Kids" },
];

const womenSK = [
  { size: "XS",  chest: "32–33", waist: "26–27", hips: "34–35", length: "52" },
  { size: "S",   chest: "34–35", waist: "28–29", hips: "36–37", length: "53" },
  { size: "M",   chest: "36–37", waist: "30–31", hips: "38–39", length: "54" },
  { size: "L",   chest: "38–39", waist: "32–33", hips: "40–41", length: "54" },
  { size: "XL",  chest: "40–41", waist: "34–35", hips: "42–43", length: "55" },
  { size: "XXL", chest: "42–44", waist: "36–38", hips: "44–46", length: "55" },
];

const womenWestern = [
  { size: "XS",  chest: "32",    waist: "24",    hips: "34",    length: "38" },
  { size: "S",   chest: "34",    waist: "26",    hips: "36",    length: "39" },
  { size: "M",   chest: "36",    waist: "28",    hips: "38",    length: "40" },
  { size: "L",   chest: "38",    waist: "30",    hips: "40",    length: "41" },
  { size: "XL",  chest: "40",    waist: "32",    hips: "42",    length: "42" },
  { size: "XXL", chest: "42",    waist: "34",    hips: "44",    length: "43" },
];

const menSizes = [
  { size: "S",   chest: "36–37", waist: "30–31", shoulder: `17"`,   length: `45"` },
  { size: "M",   chest: "38–39", waist: "32–33", shoulder: `18"`,   length: `46"` },
  { size: "L",   chest: "40–41", waist: "34–35", shoulder: `18.5"`, length: `46"` },
  { size: "XL",  chest: "42–43", waist: "36–37", shoulder: `19"`,   length: `47"` },
  { size: "XXL", chest: "44–46", waist: "38–40", shoulder: `20"`,   length: `47"` },
];

const kidsSizes = [
  { age: "2–3",   chest: `21"`, waist: `20"`, height: `36"`, length: `22"` },
  { age: "4–5",   chest: `23"`, waist: `22"`, height: `42"`, length: `25"` },
  { age: "6–7",   chest: `25"`, waist: `23"`, height: `48"`, length: `28"` },
  { age: "8–9",   chest: `27"`, waist: `24"`, height: `54"`, length: `31"` },
  { age: "10–12", chest: `29"`, waist: `26"`, height: `60"`, length: `34"` },
];

const yardage = [
  { piece: "Shirt (Kameez)",    stitched: "2.5 mtr", unstitched: "2.5 mtr" },
  { piece: "Shalwar / Trouser", stitched: "2.5 mtr", unstitched: "2.5 mtr" },
  { piece: "Dupatta",           stitched: "2.5 mtr", unstitched: "2.5 mtr" },
  { piece: "Full 3-Piece Suit", stitched: "7.5 mtr", unstitched: "7.5 mtr" },
];

function Table({ headers, rows }: { headers: string[]; rows: Record<string, string>[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            {headers.map((h) => (
              <th key={h} className="bg-[#F5F2ED] text-left px-4 py-3 font-dm-sans text-[11px] uppercase tracking-widest font-medium text-[#1A1A1A] border-b border-[#E8E4DE]">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="hover:bg-[#FDFBF8] transition-colors">
              {Object.values(row).map((val, j) => (
                <td key={j} className="px-4 py-3 font-dm-sans text-[13px] text-[#444] border-b border-[#E8E4DE]">
                  {val}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function SizeGuideTabs({ compact = false }: { compact?: boolean }) {
  const [activeTab, setActiveTab] = useState<Tab>("women-sk");

  return (
    <div>
      {/* Tabs */}
      <div className="flex overflow-x-auto scrollbar-hide border-b border-[#E8E4DE] mb-6 gap-0">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-shrink-0 px-4 py-2.5 font-dm-sans text-[11px] uppercase tracking-widest transition-colors whitespace-nowrap
              ${activeTab === tab.id
                ? "border-b-2 border-[#1A1A1A] text-[#1A1A1A] -mb-px"
                : "text-[#999] hover:text-[#555]"}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Table content */}
      <div className={compact ? "space-y-6" : "space-y-10"}>
        {activeTab === "women-sk" && (
          <>
            <div>
              {!compact && (
                <p className="font-dm-sans text-[11px] uppercase tracking-[0.18em] text-charcoal/40 mb-3">
                  Measurements (inches)
                </p>
              )}
              <Table
                headers={["Size", "Chest (inch)", "Waist (inch)", "Hip (inch)", "Length (inch)"]}
                rows={womenSK}
              />
            </div>
            {!compact && (
              <div>
                <p className="font-dm-sans text-[11px] uppercase tracking-[0.18em] text-charcoal/40 mb-3">
                  Unstitched Fabric Yardage
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr>
                        {["Piece", "Stitched", "Unstitched"].map((h) => (
                          <th key={h} className="bg-[#F5F2ED] text-left px-4 py-3 font-dm-sans text-[11px] uppercase tracking-widest font-medium text-[#1A1A1A] border-b border-[#E8E4DE]">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {yardage.map((row) => (
                        <tr key={row.piece} className="hover:bg-[#FDFBF8] transition-colors">
                          <td className="px-4 py-3 font-dm-sans text-[13px] text-[#444] border-b border-[#E8E4DE]">{row.piece}</td>
                          <td className="px-4 py-3 font-dm-sans text-[13px] text-[#444] border-b border-[#E8E4DE]">{row.stitched}</td>
                          <td className="px-4 py-3 font-dm-sans text-[13px] text-[#444] border-b border-[#E8E4DE]">{row.unstitched}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}

        {activeTab === "women-western" && (
          <Table
            headers={["Size", "Chest (inch)", "Waist (inch)", "Hip (inch)", "Length (inch)"]}
            rows={womenWestern}
          />
        )}

        {activeTab === "men" && (
          <Table
            headers={["Size", "Chest", "Waist", "Shoulder", "Length"]}
            rows={menSizes}
          />
        )}

        {activeTab === "kids" && (
          <Table
            headers={["Age", "Chest", "Waist", "Height", "Length"]}
            rows={kidsSizes}
          />
        )}
      </div>
    </div>
  );
}
