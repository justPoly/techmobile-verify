import { useState } from "react";
import { useNavigate } from "react-router-dom";

// ── Icons ──────────────────────────────────────────────────────────────────
const ShieldCheckIcon = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" />
  </svg>
);
const ChevronRightIcon = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);
const MessageIcon = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);


// ── Phone Thumbnail ────────────────────────────────────────────────────────
function PhoneThumbnail({ tint = "gray" }) {
  const colors = {
    gray: { body: "#475569", screen: "#94a3b8" },
    dark: { body: "#1e293b", screen: "#334155" },
    green: { body: "#166534", screen: "#15803d" },
  };
  const c = colors[tint] || colors.gray;
  return (
    <svg viewBox="0 0 40 60" fill="none" className="w-8 h-12">
      <rect x="4" y="2" width="32" height="56" rx="6" fill={c.body} />
      <rect x="8" y="8" width="24" height="38" rx="2" fill={c.screen} />
      <circle cx="20" cy="52" r="2.5" fill={c.screen} />
      <rect x="14" y="4" width="12" height="2.5" rx="1.25" fill={c.screen} />
    </svg>
  );
}

// ── Status badge ───────────────────────────────────────────────────────────
function StatusBadge({ status }) {
  const map = {
    "Pending Review": "bg-yellow-50 text-yellow-700 border border-yellow-200",
    "Approved":       "bg-green-50 text-green-700 border border-green-200",
    "Not Approved":   "bg-red-50 text-red-600 border border-red-200",
  };
  return (
    <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full whitespace-nowrap ${map[status] || "bg-gray-100 text-gray-600"}`}>
      {status}
    </span>
  );
}

// ── Report Row ─────────────────────────────────────────────────────────────
function ReportRow({ report }) {
  return (
    <div className="flex items-start gap-4 p-4 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer group border border-transparent hover:border-gray-100">
      {/* Phone image */}
      <div className="w-12 h-16 bg-gradient-to-b from-gray-100 to-gray-200 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden">
        <PhoneThumbnail tint={report.tint} />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div className="min-w-0">
            <p className="text-sm font-bold text-gray-900 truncate">{report.name}</p>
            <p className="text-xs text-gray-400 mt-0.5">{report.model}</p>
          </div>
          <StatusBadge status={report.status} />
        </div>
        <p className="text-xs text-gray-400 mt-1.5">{report.reportedLabel}</p>
        <p className={`text-xs mt-1.5 font-medium ${
          report.status === "Pending Review" ? "text-gray-500"
          : report.status === "Approved" ? "text-green-600"
          : "text-red-500"}`}>
          {report.statusNote}
        </p>
      </div>

      <ChevronRightIcon className="w-4 h-4 text-gray-300 group-hover:text-gray-400 flex-shrink-0 mt-1 transition-colors" />
    </div>
  );
}

// ── Tab bar ────────────────────────────────────────────────────────────────
const TABS = ["All Reports", "Pending Review", "Approved", "Not Approved"];

// ── Data ───────────────────────────────────────────────────────────────────
const ALL_REPORTS = [
  {
    id: 1,
    name: "Samsung Galaxy S24 Ultra",
    model: "SM-S928B/DS",
    status: "Pending Review",
    reportedLabel: "Reported on May 20, 2024",
    statusNote: "Thank you! We're reviewing your report.",
    tint: "dark",
  },
  {
    id: 2,
    name: "Infinix Zero 30 5G",
    model: "X6731",
    status: "Approved",
    reportedLabel: "Reported on May 15, 2024",
    statusNote: "This device has been approved.",
    tint: "green",
  },
  {
    id: 3,
    name: "Tecno Camon 20 Pro",
    model: "CK6n",
    status: "Not Approved",
    reportedLabel: "Reported on May 10, 2024",
    statusNote: "This device is not approved.",
    tint: "gray",
  },
];

// ── Main: My Reports ───────────────────────────────────────────────────────
export default function SubmitReport() {
  const [activeTab, setActiveTab] = useState("All Reports");

  const filtered = activeTab === "All Reports"
    ? ALL_REPORTS
    : ALL_REPORTS.filter(r => r.status === activeTab);

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800 overflow-x-hidden">
      <div className="w-full px-4 sm:px-6 lg:px-10 max-w-screen-xl mx-auto py-6">

        {/* Page header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">My Reports</h1>
          <p className="text-sm text-gray-400 mt-0.5">Track the status of devices you've reported</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

          {/* Tabs */}
          <div className="flex items-center gap-1 p-2 border-b border-gray-100 overflow-x-auto">
            {TABS.map(tab => (
              <button key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all
                  ${activeTab === tab
                    ? "bg-green-600 text-white shadow-sm"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"}`}>
                {tab}
                {/* Count badge */}
                <span className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full font-bold
                  ${activeTab === tab ? "bg-white/20 text-white" : "bg-gray-100 text-gray-400"}`}>
                  {tab === "All Reports" ? ALL_REPORTS.length : ALL_REPORTS.filter(r => r.status === tab).length}
                </span>
              </button>
            ))}
          </div>

          {/* Report list */}
          <div className="divide-y divide-gray-50 px-2 py-2">
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                  <ShieldCheckIcon className="w-7 h-7 text-gray-300" />
                </div>
                <p className="text-gray-500 font-semibold text-sm">No reports yet</p>
                <p className="text-gray-400 text-xs mt-1">Reports with this status will appear here</p>
              </div>
            ) : (
              filtered.map(report => <ReportRow key={report.id} report={report} />)
            )}
          </div>
        </div>

        {/* Help footer */}
        <div className="flex items-center justify-center gap-2 mt-6">
          <MessageIcon className="w-4 h-4 text-gray-400" />
          <p className="text-sm text-gray-400">
            Need help?{" "}
            <a href="#" className="text-green-600 font-semibold hover:underline">Contact our support team</a>
          </p>
        </div>

      </div>
    </div>
  );
}
