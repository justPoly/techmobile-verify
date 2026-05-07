import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";

// ── Icons ──────────────────────────────────────────────────────────────────
const SearchIcon = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
  </svg>
);
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

// ── FAQ Data ───────────────────────────────────────────────────────────────
// category must match exactly with CATEGORIES keys
const ALL_FAQS = [
  {
    id: 1,
    category: "General",
    question: "What is Techmobile NG?",
    answer: "Techmobile NG is a platform that helps you verify whether a mobile phone is genuine and approved by the Nigerian Communications Commission (NCC). We also provide a community space to report suspicious or stolen devices.",
  },
  {
    id: 2,
    category: "Verification",
    question: "How do I check if a phone is approved?",
    answer: "Simply enter the phone model name on our homepage search bar. Our system will instantly check the NCC database and return the approval status of the device.",
  },
  {
    id: 3,
    category: "General",
    question: "Is Techmobile NG affiliated with the NCC?",
    answer: "No. Techmobile NG is an independent platform. We source data from the publicly available NCC database and community reports. We are not an official NCC service.",
  },
  {
    id: 4,
    category: "General",
    question: "Is it free to use Techmobile NG?",
    answer: "Yes! Techmobile NG is completely free to use. You can search for phone approvals, report devices, and browse community reports without any charges.",
  },
  {
    id: 5,
    category: "Verification",
    question: "What information do I need to check a phone?",
    answer: "You only need the phone model name (e.g. Samsung Galaxy S24 Ultra). Optionally, you can also enter the IMEI number for a more precise lookup.",
  },
  {
    id: 6,
    category: "Verification",
    question: "How accurate is the verification result?",
    answer: "Our results are based on the official NCC database which is updated regularly. However, we recommend cross-checking with the NCC directly for critical purchase decisions.",
  },
  {
    id: 7,
    category: "Reporting",
    question: "Can I report a phone anonymously?",
    answer: "You can submit a report without creating an account, though providing your name and contact helps our team verify the report faster. Your information is never shared publicly.",
  },
  {
    id: 8,
    category: "Reporting",
    question: "What happens after I report a device?",
    answer: "Our team reviews your submission and updates the database accordingly. You'll receive a status update via email if you provided your contact details.",
  },
  {
    id: 9,
    category: "Community",
    question: "How does the community reporting work?",
    answer: "Community members can submit reports about phones they believe are fake, cloned, or not in the NCC database. These reports go through a review process before being published.",
  },
  {
    id: 10,
    category: "Community",
    question: "How can I contact support?",
    answer: "You can reach us via the Contact page, by email at hello@techmobile.ng, or by calling +234 800 123 4567 on weekdays between 9AM and 6PM WAT.",
  },
  {
    id: 11,
    category: "Account",
    question: "Do I need an account to use the platform?",
    answer: "No account is required to search for phone approvals or browse community reports. However, creating an account lets you save searches, track your reports, and get notifications.",
  },
];

// ── Category config ─────────────────────────────────────────────────────────
// Order determines sidebar display order
const CATEGORY_ORDER = ["All Questions", "General", "Verification", "Reporting", "Community", "Account"];

// ── Accordion Item ─────────────────────────────────────────────────────────
function FaqItem({ faq, isFirst }) {
  const [open, setOpen] = useState(isFirst);
  return (
    <div className={`border-b border-gray-100 last:border-0 transition-colors ${open ? "bg-white" : ""}`}>
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between gap-4 py-4 text-left hover:text-blue-600 transition-colors group">
        <span className={`text-sm font-semibold leading-snug transition-colors ${open ? "text-blue-600" : "text-gray-900 group-hover:text-blue-600"}`}>
          {faq.question}
        </span>
        <ChevronDownIcon className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 ${open ? "rotate-180 text-blue-600" : "text-gray-400"}`} />
      </button>
      {open && (
        <div className="pb-4">
          <p className="text-sm text-gray-500 leading-relaxed">{faq.answer}</p>
        </div>
      )}
    </div>
  );
}

// ── Main ───────────────────────────────────────────────────────────────────
export default function FAQ() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("All Questions");
  const [search, setSearch] = useState("");

  // Build category counts from all FAQs (not filtered by search, to always show real counts)
  const categoryCounts = useMemo(() => {
    const counts = { "All Questions": ALL_FAQS.length };
    ALL_FAQS.forEach(f => {
      counts[f.category] = (counts[f.category] || 0) + 1;
    });
    return counts;
  }, []);

  // Filter FAQs by active category AND search query
  const filteredFaqs = useMemo(() => {
    return ALL_FAQS.filter(f => {
      const matchCategory = activeCategory === "All Questions" || f.category === activeCategory;
      const matchSearch = !search.trim() ||
        f.question.toLowerCase().includes(search.toLowerCase()) ||
        f.answer.toLowerCase().includes(search.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [activeCategory, search]);

  // When search changes, reset category to All Questions for best UX
  const handleSearch = (val) => {
    setSearch(val);
    if (val.trim()) setActiveCategory("All Questions");
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800 overflow-x-hidden">

      <div className="w-full px-4 sm:px-6 lg:px-10 max-w-screen-xl mx-auto py-10">

        {/* ── Hero ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-10 border-b border-gray-100 pb-10">
          <div>
            {/* <span className="inline-block text-xs font-bold text-blue-600 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full mb-4 tracking-wide uppercase">
              FAQ
            </span> */}
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
              Frequently Asked <span className="text-blue-600">Questions</span>
            </h1>
            <p className="text-gray-500 text-base leading-relaxed mb-6">
              Find answers to the most common questions about Techmobile NG.
            </p>

            {/* Search */}
            <div className="relative max-w-md">
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              <input
                type="text"
                value={search}
                onChange={e => handleSearch(e.target.value)}
                placeholder="Search questions..."
                className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl text-sm outline-none
                  focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all placeholder-gray-300"
              />
            </div>
          </div>

          {/* Illustration */}
          <div className="flex justify-center">
            <div className="relative w-60 h-52">
              {/* Big chat bubble */}
              <div className="absolute top-0 left-8 w-44 h-36 bg-blue-600 rounded-3xl rounded-bl-sm shadow-2xl shadow-blue-300 flex items-center justify-center">
                <span className="text-white font-black text-6xl leading-none">?</span>
              </div>
              {/* Small chat bubble */}
              <div className="absolute bottom-2 right-0 w-28 h-20 bg-gray-100 rounded-2xl rounded-br-sm shadow-lg flex flex-col gap-1.5 p-3">
                <div className="h-1.5 bg-gray-300 rounded w-full" />
                <div className="h-1.5 bg-gray-200 rounded w-4/5" />
                <div className="h-1.5 bg-gray-200 rounded w-3/4" />
              </div>
              {/* Check badge */}
              <div className="absolute bottom-0 left-4 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" className="w-5 h-5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* ── Two-column: sidebar categories + FAQ list ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8">

          {/* ── Category Sidebar ── */}
          <aside>
            <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-3">Categories</h2>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              {CATEGORY_ORDER.map((cat, i) => {
                const count = categoryCounts[cat] || 0;
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => { setActiveCategory(cat); setSearch(""); }}
                    className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium transition-all text-left border-b border-gray-50 last:border-0
                      ${isActive
                        ? "bg-blue-600 text-white"
                        : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"}`}>
                    <span>{cat}</span>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full transition-colors
                      ${isActive ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"}`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Still have questions card */}
            <div className="mt-5 bg-yellow-50 border border-yellow-100 rounded-2xl p-5 flex flex-col items-center text-center">
              <div className="text-4xl mb-3">🎧</div>
              <p className="font-bold text-gray-900 text-sm">Still have questions?</p>
              <p className="text-xs text-gray-500 mt-1 mb-4">We're here to help you.</p>
              <button
                onClick={() => navigate("/contact")}
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold text-sm py-2.5 rounded-xl flex items-center justify-center gap-2 transition-colors">
                Contact Us
                <ArrowRightIcon className="w-4 h-4" />
              </button>
            </div>
          </aside>

          {/* ── FAQ List ── */}
          <main>
            {/* Active category header */}
            {!search && (
              <div className="flex items-center gap-2 mb-4">
                <span className="text-sm font-semibold text-gray-700">{activeCategory}</span>
                <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-0.5 rounded-full">
                  {filteredFaqs.length}
                </span>
              </div>
            )}

            {search && (
              <div className="flex items-center gap-2 mb-4">
                <span className="text-sm text-gray-500">
                  Showing <span className="font-semibold text-gray-900">{filteredFaqs.length}</span> result{filteredFaqs.length !== 1 ? "s" : ""} for
                </span>
                <span className="bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold px-2.5 py-1 rounded-full">
                  "{search}"
                </span>
                <button onClick={() => setSearch("")}
                  className="text-xs text-gray-400 hover:text-gray-600 ml-1 underline">
                  Clear
                </button>
              </div>
            )}

            {filteredFaqs.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center bg-gray-50 rounded-2xl border border-gray-100">
                <div className="text-5xl mb-4">🔍</div>
                <p className="text-gray-700 font-semibold text-base">No questions found</p>
                <p className="text-gray-400 text-sm mt-1">Try a different search term or category</p>
                <button onClick={() => { setSearch(""); setActiveCategory("All Questions"); }}
                  className="mt-4 text-blue-600 text-sm font-medium hover:underline">
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-5 divide-y divide-gray-50">
                {filteredFaqs.map((faq, i) => (
                  <FaqItem key={faq.id} faq={faq} isFirst={i === 0} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

    </div>
  );
}
