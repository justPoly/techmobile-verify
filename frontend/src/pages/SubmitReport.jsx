import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import confetti from "canvas-confetti";

const CheckIcon = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="3"
    strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const CopyIcon = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

export default function ReportSuccess() {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const reportId = "RPT-2026-05-01-00123";

  // 🎉 Confetti burst (clean + short)
  useEffect(() => {
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
    });
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(reportId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-16 sm:py-20 flex items-center justify-center">

      <div className="w-full max-w-lg bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center">

        {/* Success Icon */}
        <div className="w-20 h-20 mx-auto rounded-full bg-green-100 flex items-center justify-center mb-4">
          <CheckIcon className="w-10 h-10 text-green-600" />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-900">
          Report Submitted!
        </h1>

        {/* Subtitle */}
        <p className="text-gray-500 text-sm mt-2 leading-relaxed">
          Thank you for helping the community.  
          Your report has been received and is now under review.
        </p>

        {/* Report ID */}
        <div className="mt-6 border border-gray-200 rounded-xl p-4 text-left">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-400">Report ID</p>
              <p className="font-semibold text-gray-800">{reportId}</p>
            </div>

            <button
              onClick={handleCopy}
              className="p-2 rounded-lg hover:bg-gray-100 transition"
            >
              <CopyIcon className="w-4 h-4 text-gray-500" />
            </button>
          </div>

          <p className="text-xs text-gray-400 mt-3">
            Submitted  
            <br />
            {new Date().toLocaleString()}
          </p>

          {copied && (
            <p className="text-xs text-green-600 mt-2">Copied!</p>
          )}
        </div>

        {/* What happens next */}
        <div className="mt-5 border border-gray-100 rounded-xl p-4 text-left bg-gray-50">
          <h3 className="text-sm font-semibold text-gray-800 mb-2">
            What happens next?
          </h3>

          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-center gap-2">
              <CheckIcon className="w-4 h-4 text-green-500" />
              Our system and community will review your report
            </li>
            <li className="flex items-center gap-2">
              <CheckIcon className="w-4 h-4 text-green-500" />
              You’ll be notified of any updates
            </li>
            <li className="flex items-center gap-2">
              <CheckIcon className="w-4 h-4 text-green-500" />
              This helps protect other buyers
            </li>
          </ul>
        </div>

        {/* Buttons */}
        <div className="mt-6 space-y-3">
          <button
            onClick={() => navigate("/my-reports")}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition"
          >
            Track This Report
          </button>

          <button
            onClick={() => navigate("/")}
            className="w-full border border-gray-200 hover:border-green-500 hover:text-green-600 text-gray-700 py-3 rounded-xl font-semibold transition"
          >
            Check Another Phone
          </button>
        </div>

      </div>
    </div>
  );
}