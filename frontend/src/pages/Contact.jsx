import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// ── Icons ──────────────────────────────────────────────────────────────────
const MailIcon = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
  </svg>
);
const PhoneIcon = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.62 3.18 2 2 0 0 1 3.62 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.69a16 16 0 0 0 6.29 6.29l1.06-1.06a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);
const MessageCircleIcon = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
);
const MapPinIcon = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);
const SendIcon = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
);
const LockIcon = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);
const UsersIcon = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);
const ArrowRightIcon = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);
const CheckIcon = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);


// ── Contact reach options ──────────────────────────────────────────────────
const REACH_OPTIONS = [
  {
    icon: <MailIcon className="w-5 h-5 text-blue-600" />,
    title: "Email Us",
    detail: "hello@techmobile.ng",
    sub: "We aim to respond within 24 hours.",
    bg: "bg-blue-50",
    border: "border-blue-100",
  },
  {
    icon: <PhoneIcon className="w-5 h-5 text-green-600" />,
    title: "Call Us",
    detail: "+234 800 123 4567",
    sub: "Mon – Fri, 9:00 AM – 6:00 PM (WAT)",
    bg: "bg-green-50",
    border: "border-green-100",
  },
  {
    icon: <MessageCircleIcon className="w-5 h-5 text-purple-600" />,
    title: "Live Chat",
    detail: "Available on our website",
    sub: "Mon – Fri, 9:00 AM – 6:00 PM (WAT)",
    bg: "bg-purple-50",
    border: "border-purple-100",
  },
  {
    icon: <MapPinIcon className="w-5 h-5 text-red-500" />,
    title: "Our Office",
    detail: "Lagos, Nigeria",
    sub: "Visit us by appointment.",
    bg: "bg-red-50",
    border: "border-red-100",
  },
];

// ── Main ───────────────────────────────────────────────────────────────────
export default function Contact() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSending(true);
    await new Promise(r => setTimeout(r, 1200)); // simulate send
    setSending(false);
    setSent(true);
  };

  const inputClass = "w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all placeholder-gray-300 bg-white";

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800 overflow-x-hidden">

      <div className="w-full px-4 sm:px-6 lg:px-10 max-w-screen-xl mx-auto py-10">

        {/* ── Hero ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-12 border-b border-gray-100 pb-12">
          <div>
            {/* <span className="inline-block text-xs font-bold text-blue-600 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full mb-4 tracking-wide uppercase">
              Contact Us
            </span> */}
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
              Get in <span className="text-blue-600">Touch</span>
            </h1>
            <p className="text-gray-500 text-base leading-relaxed max-w-sm">
              We're here to help! Whether you have a question, suggestion, or need support, reach out to us and we'll get back to you as soon as possible.
            </p>
          </div>

          {/* Envelope illustration */}
          <div className="flex justify-center">
            <div className="relative w-64 h-52">
              {/* Envelope body */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-52 h-36 bg-blue-600 rounded-2xl shadow-2xl shadow-blue-300 flex items-end overflow-hidden">
                <div className="w-full h-20 bg-blue-500 rounded-t-[60%]" />
              </div>
              {/* Letter */}
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-44 h-28 bg-white rounded-xl shadow-lg flex flex-col gap-1.5 p-4">
                <div className="h-2 bg-blue-200 rounded w-full" />
                <div className="h-2 bg-gray-100 rounded w-4/5" />
                <div className="h-2 bg-gray-100 rounded w-5/6" />
                <div className="h-2 bg-gray-100 rounded w-3/4" />
                <div className="h-2 bg-gray-100 rounded w-full" />
              </div>
              {/* Phone badge */}
              <div className="absolute top-0 right-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center border border-gray-100">
                <PhoneIcon className="w-5 h-5 text-blue-600" />
              </div>
              {/* Chat badge */}
              <div className="absolute top-8 left-0 w-10 h-10 bg-green-400 rounded-full shadow-lg flex items-center justify-center">
                <MessageCircleIcon className="w-4 h-4 text-white" />
              </div>
              {/* @ badge */}
              <div className="absolute top-2 right-16 w-9 h-9 bg-orange-400 rounded-full shadow-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">@</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Two column: form + reach options ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">

          {/* Contact form */}
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-5">Send us a Message</h2>
            {sent ? (
              <div className="flex flex-col items-center justify-center py-14 bg-green-50 rounded-2xl border border-green-200 text-center">
                <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center mb-4 shadow-lg shadow-green-200">
                  <CheckIcon className="w-7 h-7 text-white" />
                </div>
                <p className="text-lg font-bold text-gray-900 mb-1">Message Sent!</p>
                <p className="text-sm text-gray-500">We'll get back to you within 24 hours.</p>
                <button onClick={() => setSent(false)}
                  className="mt-5 text-sm text-blue-600 hover:underline font-medium">
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Your Name</label>
                  <input type="text" value={form.name} onChange={e => set("name", e.target.value)}
                    placeholder="Enter your full name" required className={inputClass} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address</label>
                  <input type="email" value={form.email} onChange={e => set("email", e.target.value)}
                    placeholder="Enter your email address" required className={inputClass} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Subject</label>
                  <input type="text" value={form.subject} onChange={e => set("subject", e.target.value)}
                    placeholder="What is this about?" className={inputClass} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Message</label>
                  <textarea value={form.message} onChange={e => set("message", e.target.value)}
                    placeholder="Type your message here..." rows={5} required
                    className={`${inputClass} resize-none leading-relaxed`} />
                </div>
                <button type="submit" disabled={sending}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold text-sm py-3 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm shadow-blue-200">
                  {sending ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <SendIcon className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </button>
                <p className="flex items-center justify-center gap-1.5 text-xs text-gray-400 mt-2">
                  <LockIcon className="w-3 h-3" />
                  We respect your privacy. Your information is safe with us.
                </p>
              </form>
            )}
          </div>

          {/* Other ways to reach */}
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-1">Other Ways to Reach Us</h2>
            <p className="text-sm text-gray-400 mb-5">Choose the option that works best for you.</p>
            <div className="space-y-3">
              {REACH_OPTIONS.map(opt => (
                <div key={opt.title} className={`flex items-start gap-4 p-4 rounded-2xl border ${opt.bg} ${opt.border}`}>
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm border border-white">
                    {opt.icon}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">{opt.title}</p>
                    <p className="text-sm text-gray-700 mt-0.5">{opt.detail}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{opt.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Bottom CTA banner ── */}
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center flex-shrink-0">
              <UsersIcon className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="font-bold text-gray-900 text-base">We value your feedback</p>
              <p className="text-gray-500 text-sm mt-0.5">Your feedback helps us improve and serve you better.</p>
            </div>
          </div>
          <button onClick={() => navigate("/report-device")}
            className="w-full sm:w-auto flex-shrink-0 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold text-sm px-6 py-3 rounded-xl flex items-center justify-center gap-2 transition-all">
            Report a Device
            <ArrowRightIcon className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
