import { useState } from "react";
import { Link } from "react-router-dom";

// ── Icons ──────────────────────────────────────────────────────────────────
const ChevronDownIcon = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);
const ShieldCheckIcon = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-1.5 13.5l-3-3 1.06-1.06L10.5 12.38l4.94-4.94 1.06 1.06-6 6z"/>
  </svg>
);

const FacebookIcon = () => (<svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>);
const TwitterIcon = () => (<svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>);
const InstagramIcon = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/></svg>);
const YoutubeIcon = () => (<svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.4 19.54C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/></svg>);

// ── Icons for policy items ─────────────────────────────────────────────────
const policyIcons = [
  // Info collect
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>,
  // Bar chart
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
  // Share
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>,
  // Lock
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
  // User
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  // Refresh
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5" strokeLinecap="round" strokeLinejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-4.95"/></svg>,
];

const POLICY_ITEMS = [
  {
    title: "1. Information We Collect",
    content: "We collect information you provide directly to us, such as when you report a device, as well as automatically when you use our platform.",
  },
  {
    title: "2. How We Use Your Information",
    content: "We use your information to verify devices, process reports, improve our services, and keep our community safe.",
  },
  {
    title: "3. Information Sharing",
    content: "We do not sell your personal information. We may share data only when required by law or to protect our users and the public.",
  },
  {
    title: "4. Data Security",
    content: "We implement industry-standard measures to protect your information from unauthorized access, alteration, or disclosure.",
  },
  {
    title: "5. Your Rights",
    content: "You have the right to access, update, or delete your information. Contact us if you have any concerns.",
  },
  {
    title: "6. Changes to This Policy",
    content: "We may update this policy from time to time. We will notify users of any significant changes.",
  },
];

// ── Accordion Item ─────────────────────────────────────────────────────────
function AccordionItem({ icon, title, content, index }) {
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
          <p className="text-sm text-gray-500 leading-relaxed pl-13">{content}</p>
        </div>
      )}
    </div>
  );
}

// ── Main ───────────────────────────────────────────────────────────────────
export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-800 overflow-x-hidden">

      <div className="w-full px-4 sm:px-6 lg:px-10 max-w-screen-xl mx-auto">

        {/* ── Hero ── */}
        <section className="py-12 md:py-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center border-b border-gray-100">
          <div>
            {/* <span className="inline-block text-xs font-bold text-blue-600 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full mb-4 tracking-wide uppercase">
              Privacy Policy
            </span> */}
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-5">
              Privacy Policy
            </h1>
            <p className="text-gray-500 text-base leading-relaxed">
              Your privacy is important to us. This policy explains how we collect, use, and protect your information.
            </p>
          </div>

          {/* Illustration */}
          <div className="flex justify-center">
            <div className="relative w-56 h-56">
              <div className="absolute inset-0 bg-blue-50 rounded-full opacity-70" />
              <div className="absolute top-8 left-1/2 -translate-x-1/2 w-32 h-32 bg-blue-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-blue-300">
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" className="w-20 h-20" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  <circle cx="12" cy="16" r="1" fill="white"/>
                </svg>
              </div>
              <div className="absolute bottom-8 right-6 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" className="w-5 h-5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <div className="absolute top-10 left-4 w-8 h-8 bg-blue-300 rounded-full flex items-center justify-center shadow">
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-4 h-4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* ── Accordion ── */}
        <section className="py-10 max-w-3xl mx-auto">
          <div className="space-y-3">
            {POLICY_ITEMS.map((item, i) => (
              <AccordionItem key={i} icon={policyIcons[i]} title={item.title} content={item.content} index={i} />
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-6">Last updated: May 7, 2026</p>
        </section>

        {/* ── Your Privacy Matters Banner ── */}
        <section className="max-w-3xl mx-auto pb-12">
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 flex items-start gap-4">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <ShieldCheckIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-bold text-gray-900 text-sm">Your Privacy Matters</p>
              <p className="text-xs text-gray-500 leading-relaxed mt-1">
                We are committed to protecting your data and being transparent about how it is used.
              </p>
            </div>
          </div>
        </section>

      </div>

    </div>
  );
}
