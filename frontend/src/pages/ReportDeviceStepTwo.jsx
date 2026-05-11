import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// ── Icons ──────────────────────────────────────────────────────────────────
const ChevronLeftIcon = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const CheckIcon = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

// ── Step Sidebar (unchanged) ───────────────────────────────────────────────
const STEPS = [
  { num: 1, title: "Device Information", desc: "Tell us about the device" },
  { num: 2, title: "Your Information", desc: "Provide your details" },
  { num: 3, title: "Additional Details", desc: "Add more information" },
];

function StepSidebar({ current }) {
  return (
    <div>
      {STEPS.map((step, i) => {
        const isActive = step.num === current;
        const isDone = step.num < current;
        return (
          <div key={step.num} className="flex gap-3">
            <div className="flex flex-col items-center">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0
                ${isActive ? "bg-blue-600 text-white" : isDone ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-400"}`}>
                {isDone ? <CheckIcon className="w-3.5 h-3.5" /> : step.num}
              </div>
              {i < STEPS.length - 1 && <div className={`w-px flex-1 my-1 min-h-[28px] ${isDone ? "bg-blue-200" : "bg-gray-100"}`} />}
            </div>
            <div className="pb-7 pt-0.5">
              <p className={`text-sm font-semibold leading-tight ${isActive ? "text-gray-900" : isDone ? "text-blue-600" : "text-gray-400"}`}>{step.title}</p>
              <p className={`text-xs mt-0.5 ${isActive ? "text-gray-400" : "text-gray-300"}`}>{step.desc}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── Field Component ───────────────────────────────────────────────────────
function Field({ label, required, optional, children }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
        {label}
        {required && <span className="text-red-400 ml-0.5">*</span>}
        {optional && <span className="text-xs font-normal text-gray-400 ml-1">(optional)</span>}
      </label>
      {children}
    </div>
  );
}

// ── Main Component ───────────────────────────────────────────────────────
export default function ReportDeviceStepTwo() {
  const navigate = useNavigate();
  const location = useLocation();

  // Receive data from Step 1
  const step1Data = location.state?.formData || {};

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    notifyMe: true,
  });

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const inputClass = "w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all placeholder-gray-300";

  // Validation & Continue
  const handleContinue = () => {
    if (!form.fullName.trim()) {
      alert("Please enter your Full Name");
      return;
    }
    if (!form.email.trim()) {
      alert("Please enter your Email Address");
      return;
    }

    // Combine data from Step 1 and Step 2
    const combinedData = {
      ...step1Data,
      ...form,
    };

    // Go to Step 3
    navigate("/report-device/step3", { 
      state: { formData: combinedData } 
    });
  };

  const handleBack = () => {
    navigate(-1); // Go back to Step 1
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800 overflow-x-hidden">
      <div className="w-full px-4 sm:px-6 lg:px-10 max-w-screen-xl mx-auto py-6">

        {/* Back Button */}
        <button 
          onClick={handleBack}
          className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600 mb-6 transition-colors"
        >
          <ChevronLeftIcon className="w-4 h-4" /> Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">

          {/* Sidebar */}
          <aside className="lg:col-span-1 bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h1 className="text-base font-bold text-gray-900 mb-0.5">Report a Device</h1>
            <p className="text-xs text-gray-400 mb-6">Help improve our database</p>
            <StepSidebar current={2} />
          </aside>

          {/* Form */}
          <main className="lg:col-span-3 bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6">
            <h2 className="text-base font-bold text-gray-900">Your Information</h2>
            <p className="text-xs text-gray-400 mt-0.5 mb-6">Tell us about yourself (this helps us verify reports)</p>

            <div className="space-y-5">
              <Field label="Full Name" required>
                <input 
                  type="text" 
                  value={form.fullName} 
                  onChange={e => set("fullName", e.target.value)}
                  placeholder="John Doe" 
                  className={inputClass} 
                />
              </Field>

              <Field label="Email Address" required>
                <input 
                  type="email" 
                  value={form.email} 
                  onChange={e => set("email", e.target.value)}
                  placeholder="john.doe@email.com" 
                  className={inputClass} 
                />
              </Field>

              {/* Notify Me Checkbox */}
              <label className={`flex items-start gap-3 cursor-pointer p-4 rounded-xl border-2 transition-all
                ${form.notifyMe ? "border-blue-500 bg-green-50/60" : "border-gray-200 hover:border-gray-300"}`}>
                  <button
                    type="button"
                    onClick={() => set("notifyMe", !form.notifyMe)}
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all
                      ${form.notifyMe ? "bg-blue-600 border-blue-600" : "border-gray-300 bg-white"}`}
                  >
                    {form.notifyMe && <CheckIcon className="w-3 h-3 text-white" />}
                  </button>
                  <p className="text-sm text-gray-700">
                    Notify me when there's an update about this device
                  </p>
              </label>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-8 mt-8 border-t border-gray-100">
              <button 
                onClick={handleBack}
                className="border border-gray-200 hover:border-gray-300 text-gray-600 hover:text-gray-800 font-semibold text-sm px-8 py-3 rounded-xl transition-colors"
              >
                Back
              </button>

              <button 
                onClick={handleContinue}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-8 py-3 rounded-xl transition-colors"
              >
                Continue
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}