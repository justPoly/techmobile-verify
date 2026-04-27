import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const SearchIcon = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

function PulsingSearchIcon() {
  return (
    <div className="relative flex items-center justify-center w-28 h-28">
      <span className="absolute inline-flex h-full w-full rounded-full bg-green-100 opacity-60 animate-ping" />
      <span className="absolute inline-flex h-20 w-20 rounded-full bg-green-100 opacity-40 animate-ping" style={{ animationDelay: "0.3s" }} />
      <div className="relative z-10 w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center border border-gray-100">
        <SearchIcon className="w-8 h-8 text-green-600" />
      </div>
    </div>
  );
}

function ProgressBar({ progress }) {
  return (
    <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
      <div
        className="h-full bg-green-600 rounded-full transition-all duration-500 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

export default function LoadingState() {
  const navigate = useNavigate();
  const location = useLocation();
  const phoneName = location.state?.phoneName || "Unknown Phone";

  const [progress, setProgress] = useState(0);

  // Progress animation
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval);
          return 95;
        }
        const increment = prev < 60 ? 10 : prev < 80 ? 5 : 2;
        return Math.min(prev + increment, 95);
      });
    }, 280);

    return () => clearInterval(interval);
  }, []);

  // Call backend when loading is almost done
  useEffect(() => {
    if (progress >= 95) {
      const timer = setTimeout(async () => {
        try {
          const response = await fetch('/api/check-imei.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ input: phoneName })
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const resultData = await response.json();

          navigate('/result', { state: resultData });

        } catch (error) {
          console.error("API Error:", error);
          navigate('/result', { 
            state: {
              status: "error",
              verdict: "error",
              message: "Could not connect to server. Please try again."
            }
          });
        }
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [progress, navigate, phoneName]);

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800 flex flex-col overflow-x-hidden">

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-16">
        <div className="w-full max-w-sm sm:max-w-md bg-white rounded-3xl border border-gray-100 shadow-sm p-8 sm:p-10 flex flex-col items-center text-center gap-6">

          <PulsingSearchIcon />

          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              Searching NCC Database...
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              Please wait while we verify the status of
            </p>
            <p className="text-gray-900 font-semibold text-base">{phoneName}</p>
          </div>

          <div className="w-full space-y-2">
            <ProgressBar progress={progress} />
            <p className="text-xs text-gray-400">{progress}% complete</p>
          </div>
        </div>

        {/* Sign up nudge card - unchanged */}
        <div className="w-full max-w-sm sm:max-w-md mt-4 bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-green-50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <SearchIcon className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">Why wait?</p>
              <p className="text-xs text-gray-500 mt-0.5 leading-snug">
                Create an account to save your searches and get notified about new devices.
              </p>
            </div>
          </div>
          <button className="flex-shrink-0 bg-green-600 hover:bg-green-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors whitespace-nowrap">
            Sign Up Free
          </button>
        </div>
      </main>
    </div>
  );
}