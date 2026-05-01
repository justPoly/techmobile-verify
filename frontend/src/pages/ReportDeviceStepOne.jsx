import { useState } from "react";
import { useNavigate } from "react-router-dom";

// ── Icons ──────────────────────────────────────────────────────────────────
const ShieldCheckIcon = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);

const ChevronLeftIcon = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const UploadCloudIcon = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 16 12 12 8 16" />
    <line x1="12" y1="12" x2="12" y2="21" />
    <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
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
  { num: 4, title: "Review & Submit", desc: "Confirm and submit" },
];

export function StepSidebar({ current }) {
  return (
    <div>
      {STEPS.map((step, i) => {
        const isActive = step.num === current;
        const isDone = step.num < current;
        return (
          <div key={step.num} className="flex gap-3">
            <div className="flex flex-col items-center">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0
                ${isActive ? "bg-green-600 text-white" : isDone ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400"}`}>
                {isDone ? <CheckIcon className="w-3.5 h-3.5" /> : step.num}
              </div>
              {i < STEPS.length - 1 && (
                <div className={`w-px flex-1 my-1 min-h-[28px] ${isDone ? "bg-green-200" : "bg-gray-100"}`} />
              )}
            </div>
            <div className="pb-7 pt-0.5">
              <p className={`text-sm font-semibold leading-tight ${isActive ? "text-gray-900" : isDone ? "text-green-600" : "text-gray-400"}`}>
                {step.title}
              </p>
              <p className={`text-xs mt-0.5 ${isActive ? "text-gray-400" : "text-gray-300"}`}>{step.desc}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────
export default function ReportDeviceStepOne() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    phoneModel: "",
    modelNumber: "",
    deviceStatus: "notInDatabase",
    images: []
  });

  const [dragOver, setDragOver] = useState(false);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const addFiles = (files) => {
    const imgs = Array.from(files).filter(f => f.type.startsWith("image/"));
    setForm(f => ({ ...f, images: [...f.images, ...imgs] }));
  };

  const rmImg = (i) => setForm(f => ({
    ...f,
    images: f.images.filter((_, idx) => idx !== i)
  }));

  // Handle Continue with Validation
  const handleContinue = () => {
    if (!form.phoneModel.trim()) {
      alert("Please enter the Phone Model (required field)");
      return;
    }

    if (!form.deviceStatus) {
      alert("Please select a Device Status");
      return;
    }

    // If validation passes, go to Step 2
    navigate("/report-device/step2", { 
      state: { formData: form }   // Pass form data to next step
    });

    // set file size limit
    const addFiles = (files) => {
      const MAX_SIZE = 10 * 1024 * 1024; // 10MB in bytes
      const validImages = [];
      const oversizedFiles = [];

      Array.from(files).forEach(file => {
        if (!file.type.startsWith("image/")) return;

        if (file.size > MAX_SIZE) {
          oversizedFiles.push(file.name);
        } else {
          validImages.push(file);
        }
      });

      if (oversizedFiles.length > 0) {
        alert(`The following files exceed the 10MB limit and were not added:\n\n${oversizedFiles.join("\n")}`);
      }

      if (validImages.length > 0) {
        setForm(f => ({ 
          ...f, 
          images: [...f.images, ...validImages] 
        }));
      }
    };
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800 overflow-x-hidden">
      <div className="w-full px-4 sm:px-6 lg:px-10 max-w-screen-xl mx-auto py-6">
        
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-green-600 mb-6 transition-colors"
        >
          <ChevronLeftIcon className="w-4 h-4" /> Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
          {/* Sidebar */}
          <aside className="lg:col-span-1 bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h1 className="text-base font-bold text-gray-900 mb-0.5">Report a Device</h1>
            <p className="text-xs text-gray-400 mb-6">Help improve our database</p>
            <StepSidebar current={1} />
          </aside>

          {/* Form */}
          <main className="lg:col-span-3 bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6">
            <h2 className="text-base font-bold text-gray-900">Device Information</h2>
            <p className="text-xs text-gray-400 mt-0.5 mb-6">Tell us about the device you want to report</p>

            <div className="space-y-6">
              {/* Brand - Now Required */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Brand <span className="text-red-400">*</span>
                </label>
                <input 
                  type="text" 
                  value={form.modelNumber}           // We'll keep the key as modelNumber for now (or change it later)
                  onChange={e => set("modelNumber", e.target.value)}
                  placeholder="e.g. Samsung, Tecno, Infinix, Xiaomi"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all" 
                />
              </div>

              {/* Phone Model */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Phone Model <span className="text-red-400">*</span>
                </label>
                <input 
                  type="text" 
                  value={form.phoneModel} 
                  onChange={e => set("phoneModel", e.target.value)}
                  placeholder="e.g. Samsung Galaxy S24 Ultra"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all" 
                />
              </div>



              {/* Device Status */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2.5">
                  Device Status <span className="text-red-400">*</span>
                </label>
                <div className="flex flex-wrap gap-3">
                  {[
                    ["notInDatabase", "Not Found / Not Verified"],
                    ["incorrectInfo", "Suspected Fake"],
                    ["other", "Not Working Properly"]
                  ].map(([val, label]) => (
                    <label 
                      key={val} 
                      className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl border-2 cursor-pointer text-sm font-medium transition-all
                        ${form.deviceStatus === val ? "border-green-500 bg-green-50 text-green-700" : "border-gray-200 text-gray-500 hover:border-gray-300"}`}
                    >
                      <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0
                        ${form.deviceStatus === val ? "border-green-500 bg-green-500" : "border-gray-300"}`}>
                        {form.deviceStatus === val && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </span>
                      <input 
                        type="radio" 
                        name="deviceStatus" 
                        value={val} 
                        checked={form.deviceStatus === val} 
                        onChange={() => set("deviceStatus", val)} 
                        className="sr-only" 
                      />
                      {label}
                    </label>
                  ))}
                </div>
              </div>

              {/* Upload Images - Required */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Upload “About Phone” Screenshot <span className="text-red-400">*</span>
                </label>
                
                <p className="text-xs text-gray-500 mb-3">
                  Please upload a clear screenshot of your phone’s <strong>“About Phone”</strong> section. 
                  This is required so we can properly verify the device details.
                </p>

                <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-4 text-xs text-blue-700">
                  <strong>How to find “About Phone”:</strong><br />
                  Go to <strong>Settings → About Phone</strong> (or Settings → System → About Phone). 
                  Take a clear screenshot of the screen showing model name, Android version, and IMEI.
                </div>

                <label
                  onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={e => { e.preventDefault(); setDragOver(false); addFiles(e.dataTransfer.files); }}
                  className={`flex flex-col items-center justify-center gap-2 w-full border-2 border-dashed rounded-xl py-8 cursor-pointer transition-all
                    ${dragOver ? "border-green-400 bg-green-50" : "border-gray-200 bg-gray-50/60 hover:border-green-300 hover:bg-green-50/40"}`}
                >
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <UploadCloudIcon className="w-5 h-5 text-green-600" />
                  </div>
                  <p className="text-sm font-semibold text-green-600">Upload About Phone Screenshot</p>
                  <p className="text-xs text-gray-400">PNG, JPG • Maximum 10MB per file</p>
                  <input 
                    type="file" 
                    multiple 
                    accept="image/*" 
                    onChange={e => addFiles(e.target.files)} 
                    className="hidden" 
                  />
                </label>

                {form.images.length > 0 && (
                  <div className="mt-4">
                    <p className="text-xs text-gray-500 mb-2">Uploaded images ({form.images.length})</p>
                    <div className="flex flex-wrap gap-2">
                      {form.images.map((file, i) => (
                        <span 
                          key={i} 
                          className="inline-flex items-center gap-1.5 text-xs bg-green-50 border border-green-200 text-green-700 font-medium px-3 py-1.5 rounded-lg"
                        >
                          <span className="truncate max-w-[160px]">{file.name}</span>
                          <button 
                            type="button" 
                            onClick={() => rmImg(i)} 
                            className="text-green-400 hover:text-red-500 font-bold"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {form.images.length === 0 && (
                  <p className="text-red-500 text-xs mt-1">
                    * Please upload at least one screenshot of the About Phone section
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-end pt-8 mt-8 border-t border-gray-100">
              <button 
                onClick={handleContinue}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold text-sm px-8 py-3 rounded-xl transition-colors"
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