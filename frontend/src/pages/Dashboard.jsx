import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// ── Icons ──────────────────────────────────────────────────────────────────
const ShieldCheckIcon = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" d="M12 1.5l-9 3.75v6c0 5.25 3.75 10.125 9 11.25 5.25-1.125 9-6 9-11.25v-6L12 1.5zm-1.5 13.5l-3-3 1.05-1.05L10.5 12.9l4.95-4.95L16.5 9l-6 6z" clipRule="evenodd" />
  </svg>
);
const HomeIcon = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);
const SearchIcon = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
  </svg>
);
const FlagIcon = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/>
  </svg>
);
const BookmarkIcon = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
  </svg>
);
const UserIcon = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);
const LogOutIcon = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
  </svg>
);
const BellIcon = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
  </svg>
);
const ChevronDownIcon = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);
const ChevronRightIcon = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6"/>
  </svg>
);
const ArrowRightIcon = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);
const CheckCircleIcon = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
);
const AlertTriangleIcon = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
    <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
);
const HelpCircleIcon = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
    <line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
);
const ReportIcon = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
  </svg>
);

// ── Data ───────────────────────────────────────────────────────────────────
const RECENT_CHECKS = [
  { id: 1, device: "iPhone 15 Pro Max",      imei: "356789123456789",  result: "Approved",   date: "May 24, 2024 10:45 AM" },
  { id: 2, device: "Samsung Galaxy S24 Ultra", imei: "354123098765432", result: "Approved",   date: "May 23, 2024 09:32 PM" },
  { id: 3, device: "TECNO Camon 20",          imei: "358765432109876",  result: "Suspicious", date: "May 22, 2024 08:15 PM" },
  { id: 4, device: "Infinix Note 30",         imei: "351234567890123",  result: "Approved",   date: "May 21, 2024 07:40 PM" },
];

const NAV_ITEMS = [
  { id: "dashboard",  label: "Dashboard",       icon: HomeIcon },
  { id: "checks",     label: "My Checks",       icon: SearchIcon },
  { id: "reports",    label: "Reports",         icon: FlagIcon },
  { id: "saved",      label: "Saved Devices",   icon: BookmarkIcon },
  { id: "settings",   label: "Account Settings",icon: UserIcon },
];

// ── Status Badge ───────────────────────────────────────────────────────────
function StatusBadge({ status }) {
  if (status === "Approved") return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-700 border border-green-200">
      <CheckCircleIcon className="w-3 h-3" /> Approved
    </span>
  );
  if (status === "Suspicious") return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-yellow-50 text-yellow-700 border border-yellow-200">
      <AlertTriangleIcon className="w-3 h-3" /> Suspicious
    </span>
  );
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-600 border border-red-200">
      {status}
    </span>
  );
}

// ── Stat Card ──────────────────────────────────────────────────────────────
function StatCard({ icon, iconBg, label, value, valueColor }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-5">
      <div className={`w-14 h-14 ${iconBg} rounded-2xl flex items-center justify-center flex-shrink-0`}>
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500 font-medium">{label}</p>
        <p className={`text-3xl font-bold mt-0.5 ${valueColor}`}>{value}</p>
        <p className="text-xs text-gray-400 mt-0.5">All time</p>
      </div>
    </div>
  );
}

// ── Main Dashboard ─────────────────────────────────────────────────────────
export default function Dashboard() {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState("dashboard");
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const userName = "User";

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800 flex overflow-x-hidden">

      {/* ── Sidebar ── */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-100 shadow-sm flex flex-col
        transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static lg:flex
       `}>

        {/* Logo */}
        <div className="px-5 py-5 border-b border-gray-100">
          <Link to="/" className="flex items-center gap-2">
            <img 
              src="/tm-logo.png" // Make sure this file is in public/ folder
              alt="TechMobile NG Logo" 
              className="w-9 h-9 object-contain" 
            />
            <div>
              <div className="flex items-center gap-1">
                <span className="font-bold text-blue-900 text-base leading-tight">Techmobile</span>
                <span className="bg-blue-600 text-white text-[9px] font-bold px-1 py-0.5 rounded leading-none">
                  NG
                </span>
              </div>
              <p className="text-[9px] text-gray-400 leading-none">Verify. Trust. Buy Smart.</p>
            </div>
          </Link>
        </div>

        {/* Nav items */}
        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {NAV_ITEMS.map(item => {
            const Icon = item.icon;
            const isActive = activeNav === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveNav(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left
                  ${isActive
                    ? "bg-blue-50 text-blue-600 font-semibold"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}`}>
                <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? "text-blue-600" : "text-gray-400"}`} />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Log out */}
        <div className="px-3 py-4 border-t border-gray-100">
          <button
            onClick={() => navigate("/login")}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-red-50 hover:text-red-600 transition-all">
            <LogOutIcon className="w-5 h-5 text-gray-400" />
            Log Out
          </button>
        </div>
      </aside>

      {/* Sidebar overlay on mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-30 bg-black/20 lg:hidden"
          onClick={() => setSidebarOpen(false)} />
      )}

      {/* ── Main content ── */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Top bar */}
        <header className="bg-white border-b border-gray-100 px-6 py-3.5 flex items-center justify-between sticky top-0 z-20 shadow-sm">
          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 text-gray-500 hover:text-gray-700 -ml-2"
            onClick={() => setSidebarOpen(s => !s)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
              <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>

          <div className="flex-1" />

          <div className="flex items-center gap-3">
            {/* Bell */}
            <button className="relative w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-50 border border-gray-100 transition-colors">
              <BellIcon className="w-5 h-5 text-gray-500" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white" />
            </button>

            {/* User menu */}
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(o => !o)}
                className="flex items-center gap-2 pl-1 pr-3 py-1.5 rounded-xl hover:bg-gray-50 border border-gray-100 transition-colors">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-blue-700 font-bold text-sm">{userName[0]}</span>
                </div>
                <span className="text-sm font-semibold text-gray-700">{userName}</span>
                <ChevronDownIcon className={`w-4 h-4 text-gray-400 transition-transform ${userMenuOpen ? "rotate-180" : ""}`} />
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-44 bg-white border border-gray-100 rounded-xl shadow-lg z-30 overflow-hidden">
                  <button onClick={() => { setActiveNav("settings"); setUserMenuOpen(false); }}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                    <UserIcon className="w-4 h-4 text-gray-400" /> Account Settings
                  </button>
                  <div className="border-t border-gray-100" />
                  <button onClick={() => navigate("/login")}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors">
                    <LogOutIcon className="w-4 h-4" /> Log Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 px-6 py-7 max-w-5xl w-full mx-auto">

          {/* Welcome */}
          <div className="mb-7">
            <h1 className="text-2xl font-bold text-gray-900">Welcome back, {userName} 👋</h1>
            <p className="text-gray-500 text-sm mt-1">Here's what's happening with your account.</p>
          </div>

          {/* ── Stat cards ── */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-7">
            <StatCard
              iconBg="bg-blue-50"
              icon={<SearchIcon className="w-7 h-7 text-blue-500" />}
              label="Total Checks"
              value="12"
              valueColor="text-gray-900"
            />
            <StatCard
              iconBg="bg-green-50"
              icon={<ShieldCheckIcon className="w-7 h-7 text-green-600" />}
              label="Approved Devices"
              value="8"
              valueColor="text-green-600"
            />
            <StatCard
              iconBg="bg-orange-50"
              icon={<FlagIcon className="w-7 h-7 text-orange-500" />}
              label="Reports Submitted"
              value="2"
              valueColor="text-orange-500"
            />
          </div>

          {/* ── Recent Checks table ── */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm mb-6">
            <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-gray-50">
              <h2 className="text-base font-bold text-gray-900">Recent Checks</h2>
              <button
                onClick={() => setActiveNav("checks")}
                className="text-sm text-blue-600 font-semibold hover:underline">
                View all
              </button>
            </div>

            {/* Table header */}
            <div className="hidden sm:grid grid-cols-[2fr_1.8fr_1.2fr_2fr_auto] gap-4 px-5 py-3 bg-gray-50/60 border-b border-gray-100">
              {["Device", "IMEI", "Result", "Checked On", ""].map((col, i) => (
                <span key={i} className="text-xs font-bold text-gray-400 uppercase tracking-wider">{col}</span>
              ))}
            </div>

            {/* Rows */}
            <div className="divide-y divide-gray-50">
              {RECENT_CHECKS.map(row => (
                <div key={row.id}
                  className="grid grid-cols-1 sm:grid-cols-[2fr_1.8fr_1.2fr_2fr_auto] gap-3 sm:gap-4 items-center
                    px-5 py-4 hover:bg-gray-50/60 transition-colors cursor-pointer group">
                  <span className="text-sm font-semibold text-gray-900 group-hover:text-blue-700 transition-colors truncate">
                    {row.device}
                  </span>
                  <span className="text-sm text-gray-500 font-mono truncate">{row.imei}</span>
                  <StatusBadge status={row.result} />
                  <span className="text-sm text-gray-500">{row.date}</span>
                  <ChevronRightIcon className="w-4 h-4 text-gray-300 group-hover:text-gray-500 transition-colors hidden sm:block" />
                </div>
              ))}
            </div>
          </div>

          {/* ── Bottom row: Quick Actions + Need Help ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <h2 className="text-base font-bold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-3">

                {/* Check a Phone */}
                <Link to="/"
                  className="flex items-center justify-between gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100 hover:bg-blue-100 hover:border-blue-200 transition-all group">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center shadow-sm flex-shrink-0">
                      <SearchIcon className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-blue-700">Check a Phone</p>
                      <p className="text-xs text-blue-500">Verify any phone instantly</p>
                    </div>
                  </div>
                  <ArrowRightIcon className="w-4 h-4 text-blue-500 group-hover:translate-x-0.5 transition-transform" />
                </Link>

                {/* Report a Device */}
                <Link to="/report-device"
                  className="flex items-center justify-between gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100 hover:bg-gray-100 hover:border-gray-200 transition-all group">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center shadow-sm flex-shrink-0">
                      <ReportIcon className="w-4 h-4 text-gray-500" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-700">Report a Device</p>
                      <p className="text-xs text-gray-400">Submit a new report</p>
                    </div>
                  </div>
                  <ArrowRightIcon className="w-4 h-4 text-gray-400 group-hover:translate-x-0.5 transition-transform" />
                </Link>

                {/* My Reports */}
                <button
                  onClick={() => setActiveNav("reports")}
                  className="w-full flex items-center justify-between gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100 hover:bg-gray-100 hover:border-gray-200 transition-all group">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center shadow-sm flex-shrink-0">
                      <FlagIcon className="w-4 h-4 text-orange-500" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-700">My Reports</p>
                      <p className="text-xs text-gray-400">Track your submissions</p>
                    </div>
                  </div>
                  <ArrowRightIcon className="w-4 h-4 text-gray-400 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>

            {/* Need Help */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <h2 className="text-base font-bold text-gray-900 mb-4">Need Help?</h2>
              <div className="space-y-3">

                <Link to="/faq"
                  className="flex items-center justify-between gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100 hover:bg-gray-100 hover:border-gray-200 transition-all group">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center shadow-sm flex-shrink-0">
                      <HelpCircleIcon className="w-4 h-4 text-gray-500" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-700">Visit our FAQ section</p>
                      <p className="text-xs text-gray-400">Get answers to common questions</p>
                    </div>
                  </div>
                  <ChevronRightIcon className="w-4 h-4 text-gray-300 group-hover:text-gray-500 transition-colors flex-shrink-0" />
                </Link>

                <Link to="/contact"
                  className="flex items-center justify-between gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100 hover:bg-gray-100 hover:border-gray-200 transition-all group">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center shadow-sm flex-shrink-0">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-gray-500" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                        <polyline points="22,6 12,13 2,6"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-700">Contact Support</p>
                      <p className="text-xs text-gray-400">We're here to help you</p>
                    </div>
                  </div>
                  <ChevronRightIcon className="w-4 h-4 text-gray-300 group-hover:text-gray-500 transition-colors flex-shrink-0" />
                </Link>

                <Link to="/about"
                  className="flex items-center justify-between gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100 hover:bg-gray-100 hover:border-gray-200 transition-all group">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center shadow-sm flex-shrink-0">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-gray-500" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"/>
                        <line x1="12" y1="8" x2="12" y2="12"/>
                        <line x1="12" y1="16" x2="12.01" y2="16"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-700">About PhoneCheck NG</p>
                      <p className="text-xs text-gray-400">Learn how we work</p>
                    </div>
                  </div>
                  <ChevronRightIcon className="w-4 h-4 text-gray-300 group-hover:text-gray-500 transition-colors flex-shrink-0" />
                </Link>
              </div>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}
