import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// ── Icons ──────────────────────────────────────────────────────────────────
const ShieldCheckIcon = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" d="M12 1.5l-9 3.75v6c0 5.25 3.75 10.125 9 11.25 5.25-1.125 9-6 9-11.25v-6L12 1.5zm-1.5 13.5l-3-3 1.05-1.05L10.5 12.9l4.95-4.95L16.5 9l-6 6z" clipRule="evenodd" />
  </svg>
);

const MailIcon = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

const LockIcon = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);

const EyeIcon = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const EyeOffIcon = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
);

const LogInIcon = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
    <polyline points="10 17 15 12 10 7"/>
    <line x1="15" y1="12" x2="3" y2="12"/>
  </svg>
);

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const AppleIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
  </svg>
);

// ── Background decorative dots ─────────────────────────────────────────────
function DotGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg width="100%" height="100%" className="opacity-[0.06]">
        <defs>
          <pattern id="dots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.5" fill="#3b82f6" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>
    </div>
  );
}

// ── Phone illustration ─────────────────────────────────────────────────────
function PhoneIllustration() {
  return (
    <div className="absolute bottom-6 left-6 w-28 select-none pointer-events-none">
      {/* Shield badge */}
      <div className="absolute -top-4 -right-2 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-300 z-10">
        <ShieldCheckIcon className="w-6 h-6 text-white" />
      </div>
      {/* Phone body */}
      <div className="w-24 h-36 bg-white rounded-2xl shadow-xl border border-blue-100 flex flex-col overflow-hidden rotate-[-6deg]">
        <div className="h-2 bg-blue-50 flex items-center justify-center">
          <div className="w-8 h-1 bg-blue-200 rounded-full" />
        </div>
        <div className="flex-1 bg-gradient-to-b from-blue-50 to-white p-2 flex flex-col gap-1.5">
          <div className="h-1.5 bg-blue-200 rounded w-full" />
          <div className="h-1.5 bg-blue-100 rounded w-4/5" />
          <div className="h-1.5 bg-blue-100 rounded w-3/4" />
          <div className="h-4 bg-blue-600 rounded-lg mt-1 flex items-center justify-center">
            <div className="h-1 bg-white/60 rounded w-8" />
          </div>
        </div>
        <div className="h-5 bg-blue-50 flex items-center justify-center">
          <div className="w-4 h-4 rounded-full border-2 border-blue-200" />
        </div>
      </div>
    </div>
  );
}

// ── Divider ────────────────────────────────────────────────────────────────
function Divider({ label }) {
  return (
    <div className="flex items-center gap-3 my-5">
      <div className="flex-1 h-px bg-gray-200" />
      <span className="text-xs text-gray-400 font-medium">{label}</span>
      <div className="flex-1 h-px bg-gray-200" />
    </div>
  );
}

// ── Security note ──────────────────────────────────────────────────────────
function SecurityNote() {
  return (
    <div className="flex items-center gap-3 mt-6 p-3 bg-blue-50 rounded-xl border border-blue-100">
      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
        <ShieldCheckIcon className="w-4 h-4 text-blue-600" />
      </div>
      <div>
        <p className="text-xs font-semibold text-gray-800">Your data is secure with us.</p>
        <p className="text-xs text-gray-500">We never share your information with third parties.</p>
      </div>
    </div>
  );
}


// ── Main: Login ────────────────────────────────────────────────────────────
export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/login.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      });

      const data = await response.json();

      if (data.status === "success") {
        // Save login session
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);

        // Redirect to dashboard
        navigate("/dashboard");
      } else {
        setError(data.message || "Invalid login credentials");
      }
    } catch (err) {
      console.error(err);
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputBase = "w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all placeholder-gray-300 bg-white";

  return (
    <div className="min-h-screen bg-[#f0f4ff] font-sans overflow-x-hidden flex flex-col">

      {/* Top bar */}
      <header className="w-full flex justify-center px-4 py-6">
        <div className="bg-white border border-gray-200 shadow-sm rounded-2xl px-6 py-3">
          <p className="text-sm sm:text-base text-gray-600 text-center">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-600 font-semibold hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="relative w-full max-w-md">

          {/* Background card with dots */}
          <div className="absolute -inset-6 bg-[#e8eeff] rounded-3xl opacity-60" />
          <DotGrid />
          <PhoneIllustration />

          {/* Form card */}
          <div className="relative z-10 bg-white rounded-2xl shadow-xl shadow-blue-100/50 border border-blue-50 p-8 mx-4 sm:mx-0">

            {/* Heading */}
            <div className="text-center mb-7">
              <h1 className="text-2xl font-bold text-gray-900">Welcome back 👋</h1>
              <p className="text-sm text-gray-500 mt-1">Login to your account to continue</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email address</label>
                <div className="relative">
                  <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    value={form.email}
                    onChange={e => set("email", e.target.value)}
                    placeholder="Enter your email"
                    required
                    className={inputBase}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
                <div className="relative">
                  <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={e => set("password", e.target.value)}
                    placeholder="Enter your password"
                    required
                    className={`${inputBase} pr-10`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(s => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                    {showPassword ? <EyeOffIcon className="w-4 h-4" /> : <EyeIcon className="w-4 h-4" />}
                  </button>
                </div>
                <div className="flex justify-end mt-1.5">
                  <Link to="/forgot-password" className="text-xs text-blue-600 font-semibold hover:underline">
                    Forgot password?
                  </Link>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3">
                  {error}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold text-sm py-3 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-md shadow-blue-200 mt-2">
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <LogInIcon className="w-4 h-4" />
                    Login
                  </>
                )}
              </button>
            </form>

            {/* <Divider label="or continue with" /> */}

            {/* OAuth
            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2.5 border border-gray-200 hover:border-gray-300 hover:bg-gray-50 rounded-xl py-2.5 text-sm font-medium text-gray-700 transition-all">
                <GoogleIcon />
                Continue with Google
              </button>
              <button className="flex items-center justify-center gap-2.5 border border-gray-200 hover:border-gray-300 hover:bg-gray-50 rounded-xl py-2.5 text-sm font-medium text-gray-700 transition-all">
                <AppleIcon />
                Continue with Apple
              </button>
            </div> */}

            <SecurityNote />
          </div>
        </div>
      </main>
    </div>
  );
}
