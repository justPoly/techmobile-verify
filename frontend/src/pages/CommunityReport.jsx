import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// ── Icons ─────────────────────────────────────────────────────
const ShieldCheckIcon = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" d="M12 1.5l-9 3.75v6c0 5.25 3.75 10.125 9 11.25 5.25-1.125 9-6 9-11.25v-6L12 1.5zm-1.5 13.5l-3-3 1.05-1.05L10.5 12.9l4.95-4.95L16.5 9l-6 6z" clipRule="evenodd" />
  </svg>
);

const UsersIcon = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
  </svg>
);

const SearchIcon = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
  </svg>
);

const ChevronDownIcon = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const ChevronLeftIcon = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const ChevronRightIcon = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const PlusIcon = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const CheckCircleIcon = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const AlertTriangleIcon = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

// Phone Icon
function PhoneIcon({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 32 56" fill="none">
      <rect x="2" y="2" width="28" height="52" rx="5" stroke="#93c5fd" strokeWidth="2" fill="#eff6ff" />
      <rect x="6" y="8" width="20" height="34" rx="2" fill="#bfdbfe" />
      <circle cx="16" cy="48" r="2.5" fill="#93c5fd" />
      <rect x="11" y="4" width="10" height="2" rx="1" fill="#93c5fd" />
    </svg>
  );
}

// Status Badge
function StatusBadge({ status }) {
  const normalized = status?.toLowerCase();
  if (normalized === "approved") {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold bg-green-50 text-green-700 border border-green-200">
        <CheckCircleIcon className="w-4 h-4" /> Approved
      </span>
    );
  }
  if (normalized === "pending") {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold bg-yellow-50 text-yellow-700 border border-yellow-200">
        <AlertTriangleIcon className="w-4 h-4" /> Pending
      </span>
    );
  }
  return <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold bg-red-50 text-red-600 border border-red-200">{status}</span>;
}

// Dropdown
function Dropdown({ value, onChange, options, placeholder }) {
  const [open, setOpen] = useState(false);
  const selected = options.find(o => o.value === value);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className={`flex items-center justify-between gap-3 px-4 py-2.5 border rounded-xl text-sm font-medium transition-all bg-white min-w-[160px]
          ${open ? "border-blue-400 ring-2 ring-blue-100" : "border-gray-200 hover:border-gray-300"}`}
      >
        <span className={selected ? "text-gray-800" : "text-gray-400"}>{selected ? selected.label : placeholder}</span>
        <ChevronDownIcon className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute top-full mt-1.5 left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-lg z-20 overflow-hidden min-w-[180px]">
          {options.map(opt => (
            <button
              key={opt.value}
              type="button"
              onClick={() => { onChange(opt.value); setOpen(false); }}
              className={`w-full flex items-center px-4 py-2.5 text-sm text-left transition-colors ${value === opt.value ? "bg-blue-50 text-blue-700 font-semibold" : "text-gray-700 hover:bg-gray-50"}`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

const STATUS_OPTIONS = [
  { value: "", label: "All Status" },
  { value: "approved", label: "Approved" },
  { value: "pending", label: "Pending" },
];

const ITEMS_PER_PAGE = 5;

// Time Ago Function
const timeAgo = (dateString) => {
  if (!dateString) return "Unknown";
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);

  if (seconds < 60) return "Just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)} mins ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
  return `${Math.floor(seconds / 86400)} days ago`;
};

// Main Component
export default function CommunityReports() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [brand, setBrand] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [communityReports, setCommunityReports] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch reports
  useEffect(() => {
    fetch('/api/get-latest-reports.php')
      .then(res => res.json())
      .then(data => {
        setCommunityReports(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setCommunityReports([]);
        setLoading(false);
      });
  }, []);

  // Filter
  const filtered = communityReports.filter(r => {
    const matchSearch = !search ||
      (r.brand?.toLowerCase().includes(search.toLowerCase())) ||
      (r.phone_model?.toLowerCase().includes(search.toLowerCase()));

    const matchBrand = !brand || (r.brand?.toLowerCase().includes(brand.toLowerCase()));
    const matchStatus = !status || r.status?.toLowerCase() === status.toLowerCase();

    return matchSearch && matchBrand && matchStatus;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE) || 1;
  const paginatedReports = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800 overflow-x-hidden">
      <div className="w-full px-4 sm:px-6 lg:px-10 max-w-screen-xl mx-auto py-8">

        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-8 flex-wrap">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center shadow-md shadow-blue-200 flex-shrink-0">
              <UsersIcon className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">Community Reports</h1>
              <p className="text-gray-400 text-sm mt-0.5">See real reports from people and help keep others safe.</p>
            </div>
          </div>
          <button
            onClick={() => navigate('/report-device')}
            className="flex items-center gap-2 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-all"
          >
            <PlusIcon className="w-4 h-4" /> Report a Device
          </button>
        </div>

        {/* Search + Filters */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
            <div className="flex-1 relative">
              <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              <input
                type="text"
                value={search}
                onChange={e => { setSearch(e.target.value); setPage(1); }}
                placeholder="Search by phone model"
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all placeholder-gray-300"
              />
            </div>
            <Dropdown
              value={status}
              onChange={v => { setStatus(v); setPage(1); }}
              options={STATUS_OPTIONS}
              placeholder="All Status"
            />
          </div>
        </div>

        {/* Reports Table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-6">
          <div className="hidden sm:grid grid-cols-[2fr_1fr_1fr_1fr] gap-4 px-6 py-3 bg-gray-50 border-b border-gray-100">
            {["DEVICE", "STATUS", "REPORTED"].map(col => (
              <span key={col} className="text-xs font-bold text-gray-400 tracking-wider uppercase">{col}</span>
            ))}
          </div>

          {paginatedReports.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center px-4">
              <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                <SearchIcon className="w-7 h-7 text-gray-300" />
              </div>
              <p className="text-gray-500 font-semibold text-sm">No reports found</p>
              <p className="text-gray-400 text-xs mt-1">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {paginatedReports.map(report => (
                <div
                  key={report.id}
                  className="grid grid-cols-1 sm:grid-cols-[2fr_1fr_1fr_1fr] gap-3 sm:gap-4 px-4 sm:px-6 py-4 hover:bg-blue-50/30 transition-colors cursor-pointer group items-center"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-14 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0 border border-blue-100">
                      <PhoneIcon className="w-7 h-10" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm group-hover:text-blue-700 transition-colors">
                        {report.brand} {report.phone_model}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5 font-mono">
                        Reported by: {report.full_name}
                      </p>
                    </div>
                  </div>

                  <div className="sm:flex sm:items-center">
                    <StatusBadge status={report.status} />
                  </div>

                  <div className="text-sm text-gray-500">
                    {timeAgo(report.created_at)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

       {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mb-8 flex-wrap">

          {/* Previous */}
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="flex items-center gap-1 px-3 py-2 rounded-xl text-sm font-medium text-gray-600 hover:bg-white border border-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronLeftIcon className="w-4 h-4" />
            Prev
          </button>

          {/* Page numbers with simple smart rendering */}
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter(n =>
              n === 1 ||
              n === totalPages ||
              Math.abs(n - page) <= 1
            )
            .map((n, i, arr) => {
              const prev = arr[i - 1];
              const showDots = prev && n - prev > 1;

              return (
                <div key={n} className="flex items-center gap-2">
                  {showDots && <span className="text-gray-400 px-1">...</span>}

                  <button
                    onClick={() => setPage(n)}
                    className={`w-9 h-9 rounded-xl text-sm font-semibold transition-all ${
                      page === n
                        ? "bg-blue-600 text-white shadow-sm"
                        : "text-gray-600 hover:bg-white border border-transparent hover:border-gray-200"
                    }`}
                  >
                    {n}
                  </button>
                </div>
              );
            })}

          {/* Next */}
          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="flex items-center gap-1 px-3 py-2 rounded-xl text-sm font-medium text-gray-600 hover:bg-white border border-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Next
            <ChevronRightIcon className="w-4 h-4" />
          </button>
        </div>
      )}

        {/* CTA Banner */}
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white border border-blue-200 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
              <ShieldCheckIcon className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="font-bold text-gray-900 text-base">Your report can help others</p>
              <p className="text-gray-500 text-sm mt-0.5">By sharing real information, you help build a safer community.</p>
            </div>
          </div>
          <button
            onClick={() => navigate('/report-device')}
            className="w-full sm:w-auto flex-shrink-0 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-6 py-3 rounded-xl transition-colors shadow-sm shadow-blue-200 whitespace-nowrap"
          >
            Report a Device
          </button>
        </div>
      </div>
    </div>
  );
}