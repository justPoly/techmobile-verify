import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// ── Icons (keep all your existing icons) ──────────────────────────────────
const ShieldIcon = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);

const ChevronLeftIcon = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const ChevronRightIcon = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const SearchIcon = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

const CopyIcon = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
  </svg>
);

const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

// ── Main Component ─────────────────────────────────────────────────────────
export default function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  // Data coming from LoadingState → Backend
  const result = location.state || {};

  // The name the user actually searched for
  const searchedName = location.state?.searchedName || 
                      result.model || 
                      result.equipment_name || 
                      "Unknown Phone";

  const deviceInfo = {
    name: searchedName,                    // ← This will show prominently
    brand: result.brand || "Unknown Brand",
    model: result.model || result.equipment_name || searchedName,
    status: result.verdict === "genuine" ? "Approved" : "Not Found",
    approvalDate: "N/A",
    networks: "All Networks",
    modelNumber: "N/A",
    searchDate: new Date().toLocaleString(),
  };

  const isApproved = result.verdict === "genuine";

  const handleCopy = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSearchAgain = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800 overflow-x-hidden">

      <div className="w-full px-4 sm:px-6 lg:px-10 max-w-screen-xl mx-auto py-6">

        {/* Back link */}
        <button 
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-green-600 transition-colors mb-6"
        >
          <ChevronLeftIcon className="w-4 h-4" />
          Back to Home
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* LEFT COLUMN */}
          <div className="lg:col-span-2 space-y-4">

            {/* Device Card */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-5 sm:p-6">
                <div className="flex flex-col sm:flex-row gap-5">

                  {/* Phone Image Placeholder */}
                  <div className="flex-shrink-0 flex justify-center sm:justify-start">
                    <div className="w-28 h-36 sm:w-32 sm:h-44 bg-gradient-to-b from-gray-100 to-gray-200 rounded-xl overflow-hidden flex items-center justify-center shadow-inner">
                      <svg viewBox="0 0 80 120" fill="none" className="w-20 h-28 opacity-40">
                        <rect x="10" y="5" width="60" height="110" rx="10" fill="#94a3b8" />
                        <rect x="16" y="16" width="48" height="78" rx="3" fill="#cbd5e1" />
                        <circle cx="40" cy="108" r="4" fill="#94a3b8" />
                        <rect x="30" y="8" width="20" height="4" rx="2" fill="#94a3b8" />
                      </svg>
                    </div>
                  </div>

                  {/* Info Section - Searched name is shown here */}
                  <div className="flex-1">
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                      {deviceInfo.name}
                    </h1>
                    <p className="text-gray-400 text-sm mt-0.5">
                      {deviceInfo.brand} • {deviceInfo.model}
                    </p>

                    {/* Status Badge */}
                    <div className={`inline-flex items-center gap-1.5 mt-3 rounded-full px-3 py-1 ${isApproved ? 'bg-green-50 border border-green-200' : 'bg-yellow-50 border border-yellow-200'}`}>
                      <ShieldIcon className={`w-4 h-4 ${isApproved ? 'text-green-600' : 'text-yellow-600'}`} />
                      <span className={`text-xs font-semibold ${isApproved ? 'text-green-700' : 'text-yellow-700'}`}>
                        {isApproved ? 'NCC Approved' : 'Not Found in Database'}
                      </span>
                    </div>

                    {/* Specs Table */}
                    <div className="mt-5 space-y-2.5">
                      {[
                        { label: "Brand", value: deviceInfo.brand },
                        { label: "Model", value: deviceInfo.model },
                        { 
                          label: "Status", 
                          value: (
                            <span className={`flex items-center gap-1.5 font-semibold text-sm ${isApproved ? 'text-green-600' : 'text-yellow-600'}`}>
                              <span className={`w-2 h-2 rounded-full inline-block ${isApproved ? 'bg-green-500' : 'bg-yellow-500'}`} />
                              {deviceInfo.status}
                            </span>
                          )
                        },
                        { label: "Approval Date", value: deviceInfo.approvalDate },
                        { label: "Networks", value: deviceInfo.networks },
                        { label: "Search Date", value: deviceInfo.searchDate },
                      ].map(({ label, value }) => (
                        <div key={label} className="flex items-start gap-4 text-sm">
                          <span className="w-28 sm:w-36 text-gray-400 flex-shrink-0">{label}</span>
                          <span className="text-gray-800 font-medium">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Approved Notice */}
              <div className={`mx-5 sm:mx-6 mb-5 sm:mb-6 rounded-xl p-4 flex items-start gap-3 ${isApproved ? 'bg-green-50 border border-green-200' : 'bg-yellow-50 border border-yellow-200'}`}>
                <div className="w-9 h-9 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <ShieldIcon className="w-5 h-5 text-green-600" />
                </div>
                <p className="text-sm leading-relaxed">
                  {result.message || "This device status could not be verified from the NCC database."}
                </p>
              </div>
            </div>

            {/* What does this mean? */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6">
              <h2 className="text-base font-bold text-gray-900 mb-2">What does this mean?</h2>
              <p className="text-gray-500 text-sm leading-relaxed">
                {isApproved 
                  ? "NCC approval means this device has met all regulatory requirements and is authorized for use in Nigeria."
                  : "This model was not found in the current NCC Approved list. It may be a new release or grey import."}
              </p>
              <button
                onClick={handleSearchAgain}
                className="mt-5 inline-flex items-center gap-2 bg-white border border-gray-200 hover:border-green-400 hover:text-green-600 text-gray-700 text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors">
                <SearchIcon className="w-4 h-4" />
                Search Another Device
              </button>
            </div>

            {/* Share Result */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6">
              <h2 className="text-base font-bold text-gray-900 mb-1">Share Result</h2>
              <p className="text-gray-400 text-xs mb-4">Help others by sharing this result</p>
              {/* Your share buttons code remains unchanged */}
            </div>

          </div>

          {/* RIGHT COLUMN - Community Reports (unchanged) */}
          <div className="space-y-4">
            {/* Your existing community reports section */}
          </div>
        </div>
      </div>
    </div>
  );
}