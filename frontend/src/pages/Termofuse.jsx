import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// ── Icons ──────────────────────────────────────────────────────────────────
const ChevronDownIcon = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);
const ArrowRightIcon = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);

const FacebookIcon = () => (<svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>);
const TwitterIcon = () => (<svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>);
const InstagramIcon = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/></svg>);
const YoutubeIcon = () => (<svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.4 19.54C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/></svg>);

// ── Terms icons ────────────────────────────────────────────────────────────
const termsIcons = [
  // Doc / acceptance
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
  // Users / services
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  // User check / responsibility
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  // Copyright / IP
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>,
  // Shield / liability
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  // Refresh / changes
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="16" y2="17"/><polyline points="14 2 14 8 20 8"/></svg>,
];

const TERMS_ITEMS = [
  {
    title: "1. Acceptance of Terms",
    content: "By using Techmobile NG, you agree to these Terms of Use and our policies.",
  },
  {
    title: "2. Use of Our Services",
    content: "You agree to use our platform only for lawful purposes and not to misuse or attempt to disrupt our services.",
  },
  {
    title: "3. User Responsibilities",
    content: "You are responsible for the accuracy of the information you provide when reporting a device.",
  },
  {
    title: "4. Intellectual Property",
    content: "All content, logos, and materials on this site are the property of Techmobile NG and may not be used without permission.",
  },
  {
    title: "5. Limitation of Liability",
    content: "Techmobile NG is not liable for any loss or damage arising from the use of our services.",
  },
  {
    title: "6. Changes to Terms",
    content: "We may update these terms from time to time. Continued use of the platform means you accept the changes.",
  },
];

// ── Accordion Item ─────────────────────────────────────────────────────────
function AccordionItem({ icon, title, content }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`border rounded-2xl transition-all overflow-hidden ${open ? "border-blue-200 shadow-sm" : "border-gray-100"}`}>
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-gray-50 transition-colors">
        <div className="flex items-center gap-4">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${open ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-500"}`}>
            {icon}
          </div>
          <span className="text-sm font-semibold text-gray-900">{title}</span>
        </div>
        <ChevronDownIcon className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="px-5 pb-5 pt-1 border-t border-gray-50">
          <p className="text-sm text-gray-500 leading-relaxed">{content}</p>
        </div>
      )}
    </div>
  );
}

// ── Main ───────────────────────────────────────────────────────────────────
export default function TermsOfUse() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800 overflow-x-hidden">

      <div className="w-full px-4 sm:px-6 lg:px-10 max-w-screen-xl mx-auto">

        {/* ── Hero ── */}
        <section className="py-12 md:py-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center border-b border-gray-100">
          <div>
            {/* <span className="inline-block text-xs font-bold text-blue-600 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full mb-4 tracking-wide uppercase">
              Terms of Use
            </span> */}
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-5">
              Terms of Use
            </h1>
            <p className="text-gray-500 text-base leading-relaxed">
              Please read these terms carefully before using Techmobile NG.
            </p>
          </div>

          {/* Illustration */}
          <div className="flex justify-center">
            <div className="relative w-56 h-56">
              <div className="absolute inset-0 bg-blue-50 rounded-full opacity-70" />
              {/* Document */}
              <div className="absolute top-6 left-1/2 -translate-x-1/2 w-32 h-40 bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col p-4 gap-2">
                <div className="h-2 bg-gray-200 rounded w-full" />
                <div className="h-2 bg-gray-200 rounded w-5/6" />
                <div className="h-2 bg-gray-200 rounded w-4/5" />
                <div className="h-2 bg-gray-100 rounded w-full mt-1" />
                <div className="h-2 bg-gray-100 rounded w-3/4" />
                <div className="h-2 bg-gray-100 rounded w-5/6" />
                <div className="h-2 bg-gray-100 rounded w-2/3" />
              </div>
              {/* Check badge */}
              <div className="absolute bottom-4 right-4 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" className="w-6 h-6" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              {/* Person icon */}
              <div className="absolute top-8 left-4 w-9 h-9 bg-blue-200 rounded-full flex items-center justify-center shadow">
                <svg viewBox="0 0 24 24" fill="none" stroke="#1d4ed8" strokeWidth="2" className="w-4 h-4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* ── Accordion ── */}
        <section className="py-10 max-w-3xl mx-auto">
          <div className="space-y-3">
            {TERMS_ITEMS.map((item, i) => (
              <AccordionItem key={i} icon={termsIcons[i]} title={item.title} content={item.content} />
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-6">Last updated: May 7, 2026</p>
        </section>

        {/* ── Questions CTA ── */}
        <section className="max-w-3xl mx-auto pb-12">
          <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" className="w-6 h-6" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                  <line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
              </div>
              <div>
                <p className="font-bold text-gray-900 text-base">Questions?</p>
                <p className="text-gray-500 text-sm mt-0.5">
                  If you have any questions about these terms, please contact us.
                </p>
              </div>
            </div>
            <button
              onClick={() => navigate("/contact")}
              className="w-full sm:w-auto flex-shrink-0 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold text-sm px-6 py-3 rounded-xl flex items-center justify-center gap-2 transition-colors">
              Contact Us
              <ArrowRightIcon className="w-4 h-4" />
            </button>
          </div>
        </section>

      </div>
    </div>
  );
}
