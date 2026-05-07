import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

// ── Icons ──────────────────────────────────────────────────────────────────
const ShieldIcon = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-1.5 13.5l-3-3 1.06-1.06L10.5 12.38l4.94-4.94 1.06 1.06-6 6z"/>
  </svg>
);

const TargetIcon = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
  </svg>
);

const EyeIcon = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
  </svg>
);

const UsersIcon = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const CheckIcon = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const ArrowRightIcon = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);
const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
  </svg>
);
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
  </svg>
);
const YoutubeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.4 19.54C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/>
  </svg>
);

const PhoneQuestionIcon = () => (
  <svg viewBox="0 0 60 80" fill="none" className="w-14 h-14 flex-shrink-0">
    <rect x="8" y="4" width="44" height="72" rx="6" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2" />
    <rect x="14" y="12" width="32" height="48" rx="2" fill="#dcfce7" />
    <circle cx="30" cy="68" r="3" fill="#16a34a" />
    <text x="21" y="44" fontSize="22" fontWeight="bold" fill="#16a34a">?</text>
    <circle cx="46" cy="16" r="10" fill="#f59e0b" />
    <text x="42" y="21" fontSize="14" fontWeight="bold" fill="white">?</text>
  </svg>
);



// ── Values data ────────────────────────────────────────────────────────────
const values = [
  {
    icon: <ShieldIcon className="w-7 h-7 text-blue-600" />,
    title: "Transparency",
    desc: "We believe in clear and honest information you can trust.",
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-7 h-7 text-blue-600" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>,
    title: "Safety",
    desc: "Helping protect users from scams, theft, and fraud.",
  },
  {
    icon: <UsersIcon className="w-7 h-7 text-blue-600" />,
    title: "Community",
    desc: "Stronger together. We grow by looking out for one another.",
  },
  {
    icon: <CheckIcon className="w-7 h-7 text-blue-600" />,
    title: "Integrity",
    desc: "We are committed to accuracy, fairness, and responsible reporting.",
  },
];

// ── Main ───────────────────────────────────────────────────────────────────
export default function About() {
  const navigate = useNavigate();
  // Shared container: full-width mobile, centred with padding on desktop
  const container = "w-full px-4 sm:px-6 lg:px-8 xl:px-12 max-w-screen-xl mx-auto";

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800 overflow-x-hidden">

      <div className="w-full px-4 sm:px-6 lg:px-10 max-w-screen-xl mx-auto">

        {/* ── Hero ── */}
        <section className="py-12 md:py-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            {/* <span className="inline-block text-xs font-bold text-blue-600 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full mb-4 tracking-wide uppercase">
              About Us
            </span> */}
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-4">
              About
            </h1>
            <p className="text-gray-500 text-sm font-medium mb-5">
              Building trust. Promoting safety. Empowering smarter choices for everyone.
            </p>
            <p className="text-gray-500 text-sm leading-relaxed mb-4">
              Techmobile NG is a platform that helps people verify mobile phones in Nigeria. We make it easy to check if a phone is genuine and approved by the Nigerian Communications Commission (NCC).
            </p>
            <p className="text-gray-500 text-sm leading-relaxed">
              We also provide a community-driven space where people can report suspicious or stolen devices to help protect others and reduce phone-related fraud.
            </p>
          </div>

          {/* Illustration */}
          <div className="flex justify-center">
            <div className="relative w-64 h-64">
              {/* Soft bg circle */}
              <div className="absolute inset-0 bg-blue-50 rounded-full opacity-60" />
              {/* Big shield */}
              <div className="absolute top-6 left-1/2 -translate-x-1/2 w-36 h-36 bg-blue-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-blue-300">
                <ShieldIcon className="w-20 h-20 text-white" />
              </div>
              {/* Check badge */}
              <div className="absolute bottom-10 right-4 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                <CheckIcon className="w-6 h-6 text-white" />
              </div>
              {/* Warning badge */}
              <div className="absolute top-12 left-4 w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
                  <path d="M12 2L1 21h22L12 2zm0 3.5L20.5 19h-17L12 5.5zM11 10v4h2v-4h-2zm0 6v2h2v-2h-2z"/>
                </svg>
              </div>
              {/* Users badge */}
              <div className="absolute bottom-6 left-8 w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center shadow-lg">
                <UsersIcon className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </section>

        {/* ── Mission & Vision ── */}
        <section className="py-10 grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-gray-100">
          <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                <TargetIcon className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-base font-bold text-gray-900">Our Mission</h2>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              To promote a safer mobile ecosystem in Nigeria by providing a simple and easy-to-use platform for phone verification and community reporting.
            </p>
          </div>
          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center">
                <EyeIcon className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-base font-bold text-gray-900">Our Vision</h2>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              A Nigeria where every mobile phone user can buy, sell, and use devices with confidence and peace of mind.
            </p>
          </div>
        </section>

        {/* ── What We Stand For ── */}
        <section className="py-12 border-t border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 text-center mb-8">What We Stand For</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {values.map(v => (
              <div key={v.title} className="flex flex-col items-center text-center p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all">
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-3">
                  {v.icon}
                </div>
                <p className="font-bold text-gray-900 text-sm mb-1">{v.title}</p>
                <p className="text-xs text-gray-500 leading-snug">{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CAN'T FIND A PHONE BANNER */}
        <section className="w-full pb-10 md:pb-14">
        <div className={container}>
            <div className="bg-yellow-50 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row 
            items-start sm:items-center justify-between gap-4 border border-yellow-100">
            
            <div className="flex items-start sm:items-center gap-4">
                <PhoneQuestionIcon />
                <div>
                <p className="font-bold text-gray-900 text-base">Can't find a phone? Help Us Improve</p>
                <p className="text-gray-500 text-sm mt-0.5">
                    If the phone you're looking for is not listed yet (especially new releases), you can submit a 
                    report and help others avoid bad purchases.
                </p>
                </div>
            </div>

            <Link 
                to="/report-device"
                className="w-full sm:w-auto flex-shrink-0 bg-yellow-400 hover:bg-yellow-500 
                text-gray-900 font-semibold text-sm px-5 py-2.5 rounded-xl flex items-center 
                justify-center gap-2 transition-colors"
            >
                Report a Device
                <ArrowRightIcon className="w-4 h-4" />
            </Link>
            </div>
        </div>
        </section>

      </div>
    </div>
  );
}
