import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// ── Icons ──────────────────────────────────────────────────────────────────
const ShieldCheckIcon = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" />
  </svg>
);
const ChevronLeftIcon = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);
const ChevronDownIcon = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);
const CheckIcon = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

// ── Step Sidebar ───────────────────────────────────────────────────────────
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
                ${isActive
                  ? "bg-green-600 text-white"
                  : isDone
                  ? "bg-green-100 text-green-600"
                  : "bg-gray-100 text-gray-400"}`}>
                {isDone ? <CheckIcon className="w-3.5 h-3.5" /> : step.num}
              </div>
              {i < STEPS.length - 1 && (
                <div className={`w-px flex-1 my-1 min-h-[28px] ${isDone ? "bg-green-200" : "bg-gray-100"}`} />
              )}
            </div>
            <div className="pb-7 pt-0.5">
              <p className={`text-sm font-semibold leading-tight
                ${isActive ? "text-gray-900" : isDone ? "text-green-600" : "text-gray-400"}`}>
                {step.title}
              </p>
              <p className={`text-xs mt-0.5 ${isActive ? "text-gray-400" : "text-gray-300"}`}>
                {step.desc}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── Custom Select ──────────────────────────────────────────────────────────
const SOURCE_OPTIONS = [
  { value: "", label: "Select an option" },
  { value: "online", label: "Online Store (Jumia, Konga, etc.)" },
  { value: "physical", label: "Physical Shop / Market" },
  { value: "friend", label: "From a Friend / Gift" },
  { value: "notsure", label: "Not Sure" },
];

function CustomSelect({ value, onChange, error }) {
  const [open, setOpen] = useState(false);
  const selected = SOURCE_OPTIONS.find(o => o.value === value) || SOURCE_OPTIONS[0];

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className={`w-full flex items-center justify-between px-4 py-2.5 border-2 rounded-xl text-sm text-left transition-all outline-none
          ${open ? "border-green-500 ring-2 ring-green-100" : error ? "border-red-300" : "border-gray-200 hover:border-gray-300"}
          ${value ? "text-gray-800" : "text-gray-400"}`}>
        <span>{selected.label}</span>
        <ChevronDownIcon className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute top-full mt-1.5 left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-lg z-20 overflow-hidden">
          {SOURCE_OPTIONS.filter(o => o.value !== "").map(opt => (
            <button
              key={opt.value}
              type="button"
              onClick={() => { onChange(opt.value); setOpen(false); }}
              className={`w-full flex items-center justify-between px-4 py-3 text-sm text-left transition-colors
                ${value === opt.value
                  ? "bg-green-50 text-green-700 font-semibold"
                  : "text-gray-700 hover:bg-gray-50"}`}>
              <span>{opt.label}</span>
              {value === opt.value && <CheckIcon className="w-4 h-4 text-green-600" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Main ───────────────────────────────────────────────────────────────────
export default function ReportDeviceStepThree({ onBack, onContinue }) {
  const [form, setForm] = useState({ phoneSource: "", additionalInfo: "" });
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const location = useLocation();

  // Get data passed from Step 2
  const previousData = location.state?.formData || {};

  const set = (k, v) => {
    setForm(f => ({ ...f, [k]: v }));
    if (errors[k]) setErrors(e => ({ ...e, [k]: "" }));
  };

  const handleContinue = () => {
  const newErrors = {};
  if (!form.phoneSource) {
     newErrors.phoneSource = "Please select where you got this phone.";
  }

  if (Object.keys(newErrors).length > 0) {
       setErrors(newErrors);
       return;
  }

  // Combine ALL steps data
  const combinedData = {
    ...previousData,
    ...form,
  };

  // Navigate to Step 4
  navigate("/report-device/step4", {
        state: { formData: combinedData },
  });
  };

  const charLimit = 500;
  const remaining = charLimit - form.additionalInfo.length;

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800 overflow-x-hidden">
      <div className="w-full px-4 sm:px-6 lg:px-10 max-w-screen-xl mx-auto py-6">

        {/* Back */}
        <button onClick={onBack}
          className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-green-600 transition-colors mb-6">
          <ChevronLeftIcon className="w-4 h-4" /> Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">

          {/* ── Sidebar ── */}
          <aside className="lg:col-span-1 bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h1 className="text-base font-bold text-gray-900 mb-0.5">Report a Device</h1>
            <p className="text-xs text-gray-400 mb-6">Track the status of devices you've reported</p>
            <StepSidebar current={3} />
          </aside>

          {/* ── Form card ── */}
          <main className="lg:col-span-3 bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6">
            <h2 className="text-base font-bold text-gray-900">Additional Details</h2>
            <p className="text-xs text-gray-400 mt-0.5 mb-7">
              Provide any additional information that can help us
            </p>

            <div className="space-y-6">

              {/* Where did you get this phone? */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Where did you get this phone?{" "}
                  <span className="text-red-400">*</span>
                </label>
                <CustomSelect
                  value={form.phoneSource}
                  onChange={v => set("phoneSource", v)}
                  error={!!errors.phoneSource}
                />
                {errors.phoneSource && (
                  <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
                    <span className="w-3.5 h-3.5 rounded-full bg-red-100 text-red-500 flex items-center justify-center text-[10px] font-bold flex-shrink-0">!</span>
                    {errors.phoneSource}
                  </p>
                )}
              </div>

              {/* Any other information */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Any other information{" "}
                  <span className="text-xs font-normal text-gray-400">(optional)</span>
                </label>
                <div className="relative">
                  <textarea
                    value={form.additionalInfo}
                    onChange={e => {
                      if (e.target.value.length <= charLimit) set("additionalInfo", e.target.value);
                    }}
                    rows={5}
                    placeholder="e.g. I bought this phone from a market in Lagos, the seller said it was brand new but it didn't come with a box..."
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 outline-none
                      focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all
                      placeholder-gray-300 resize-none leading-relaxed"
                  />
                  <span className={`absolute bottom-3 right-3 text-xs font-medium transition-colors
                    ${remaining < 50 ? "text-orange-400" : remaining < 20 ? "text-red-400" : "text-gray-300"}`}>
                    {remaining}/{charLimit}
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-1.5">
                  Any details about where/how you bought it, the seller, packaging, or anything else you think is relevant.
                </p>
              </div>

              {/* Info callout */}
              <div className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-xl p-4">
                <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-600 text-[11px] font-bold">i</span>
                </div>
                <p className="text-xs text-blue-700 leading-relaxed">
                  The more detail you provide, the faster our team can review and process your report.
                  All information is kept confidential and used only for verification purposes.
                </p>
              </div>

            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-8 mt-8 border-t border-gray-100">
              <button onClick={onBack}
                className="border border-gray-200 hover:border-gray-300 text-gray-600 hover:text-gray-800 font-semibold text-sm px-8 py-3 rounded-xl transition-colors">
                Back
              </button>
              <button onClick={handleContinue}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold text-sm px-8 py-3 rounded-xl transition-colors shadow-sm shadow-green-200">
                Submit
              </button>
            </div>
          </main>

        </div>
      </div>
    </div>
  );
}
