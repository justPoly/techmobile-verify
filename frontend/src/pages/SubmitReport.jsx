import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";

const CheckIcon = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default function ReportSuccess() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [submitting, setSubmitting] = useState(true);
  const [success, setSuccess] = useState(false);
  const [reportId, setReportId] = useState("");
  const [error, setError] = useState("");

  const formData = state?.formData || {};

  useEffect(() => {
    const submitReport = async () => {
      try {
        const fd = new FormData();

        // Text fields
        fd.append('brand', formData.brand || formData.modelNumber || '');
        fd.append('phoneModel', formData.phoneModel || '');
        fd.append('deviceStatus', formData.deviceStatus || '');
        fd.append('fullName', formData.fullName || '');
        fd.append('email', formData.email || '');
        fd.append('phoneSource', formData.phoneSource || '');
        fd.append('additionalInfo', formData.additionalInfo || '');

        // Images (if any)
        if (formData.images && formData.images.length > 0) {
          formData.images.forEach((file, index) => {
            fd.append(`photo${index + 1}`, file);
          });
        }

        const response = await fetch('/api/submit-report.php', {
          method: 'POST',
          body: fd,
        });

        const result = await response.json();

        if (result.status === "success") {
          setReportId(result.report_id || `RPT-${Date.now()}`);
          setSuccess(true);

          // Celebration confetti
          confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 }
          });
        } else {
          setError(result.message || "Failed to submit report");
        }
      } catch (err) {
        console.error(err);
        setError("Network error. Please check your connection.");
      } finally {
        setSubmitting(false);
      }
    };

    submitReport();
  }, [formData]);

  // Loading State
  if (submitting) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full mx-auto"></div>
          <p className="mt-6 text-gray-600 font-medium">Submitting your report...</p>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <p className="text-red-600 text-lg font-medium">{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-6 px-6 py-3 bg-gray-800 text-white rounded-xl"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Success State
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-16 flex items-center justify-center">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-sm p-10 text-center">

        <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6">
          <CheckIcon className="w-12 h-12 text-green-600" />
        </div>

        <h1 className="text-3xl font-bold text-gray-900">Report Submitted Successfully!</h1>
        <p className="text-gray-600 mt-3">Thank you for helping keep Nigeria safe from fake phones.</p>

        {/* Report ID Card */}
        <div className="mt-8 bg-gray-50 border border-gray-100 rounded-2xl p-6 text-left">
          <p className="text-sm text-gray-500">Report ID</p>
          <p className="font-mono font-semibold text-xl tracking-wider mt-1">{reportId}</p>
          <p className="text-xs text-gray-400 mt-3">
            Submitted on {new Date().toLocaleString()}
          </p>
        </div>

        {/* Buttons */}
        <div className="mt-8 space-y-3">
          <button
            onClick={() => navigate('/my-reports')}   // Change this route later when you build tracking page
            className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-2xl font-semibold transition"
          >
            Track This Report
          </button>

          <button
            onClick={() => navigate('/')}
            className="w-full border border-gray-300 hover:bg-gray-50 py-4 rounded-2xl font-semibold transition"
          >
            Check Another Phone
          </button>
        </div>
      </div>
    </div>
  );
}