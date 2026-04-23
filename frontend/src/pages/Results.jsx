import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const [result, setResult] = useState(null);
  const [reports, setReports] = useState([]);
  const [loadingReports, setLoadingReports] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [reportForm, setReportForm] = useState({
    imei: '',
    verdict: '',
    used_duration: '',
    buyer_location: '',
    comment: ''
  });

  const [photos, setPhotos] = useState({ photo1: null, photo2: null });

  useEffect(() => {
    if (location.state) {
      setResult(location.state);
      fetchReports(location.state.model || location.state.equipment_name);
    } else {
      navigate('/');
    }
  }, [location, navigate]);

  const fetchReports = async (modelName) => {
    if (!modelName) return;
    setLoadingReports(true);
    try {
      const res = await axios.get(`/api/get-reports.php?model=${encodeURIComponent(modelName)}`);
      setReports(res.data);
    } catch (error) {
      console.error("Failed to load reports");
      setReports([]);
    } finally {
      setLoadingReports(false);
    }
  };

  const handleSubmitReport = async () => {
    if (!reportForm.imei || reportForm.imei.length !== 15) {
      return alert("Please enter a valid 15-digit IMEI");
    }
    if (!reportForm.verdict) return alert("Please select a verdict");
    if (!photos.photo1 || !photos.photo2) return alert("Please upload 2 photos");

    setSubmitting(true);

    const formData = new FormData();
    formData.append('imei', reportForm.imei);
    formData.append('model_name', result.model || result.equipment_name);
    formData.append('brand', result.brand);
    formData.append('verdict', reportForm.verdict);
    formData.append('used_duration', reportForm.used_duration);
    formData.append('buyer_location', reportForm.buyer_location);
    formData.append('comment', reportForm.comment);
    formData.append('photo1', photos.photo1);
    formData.append('photo2', photos.photo2);

    try {
      const res = await axios.post('/api/submit-report.php', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert(res.data.message || "Report submitted successfully!");
      setShowReportModal(false);
      setReportForm({ imei: '', verdict: '', used_duration: '', buyer_location: '', comment: '' });
      setPhotos({ photo1: null, photo2: null });
      fetchReports(result.model || result.equipment_name); // Refresh reports
    } catch (error) {
      alert("Failed to submit report. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!result) return <p className="text-center py-20">Loading...</p>;

  const isApproved = result.verdict === 'genuine';

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-8 py-4 border-b bg-white">
          <div className="flex items-center gap-4">
            <img src="https://flagcdn.com/w80/ng.png" alt="Nigeria Flag" className="w-8 h-5 rounded-sm" />
            <span className="text-2xl font-bold text-blue-600">TechMobile.ng</span>
          </div>

          <div className="flex items-center gap-3">
            <img src="https://ncc.gov.ng/images/ncc-logo.png" alt="NCC Logo" className="h-9" onError={(e) => e.target.style.display = 'none'} />
            <span className="text-sm font-semibold text-gray-500">VERIFY</span>
          </div>

          <button onClick={() => navigate('/')} className="text-sm font-medium text-gray-500 hover:text-gray-900">
            ← Check Another Phone
          </button>
        </div>

        <div className="p-8 md:p-12">

          {/* Status */}
          <div className="text-center mb-8">
            <div className={`inline-flex items-center gap-2 px-6 py-2 rounded-full text-sm font-bold mb-6 w-fit mx-auto
              ${isApproved ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {isApproved ? '✅ VERIFICATION COMPLETE' : '⚠️ VERIFICATION COMPLETE'}
            </div>

            <h1 className={`text-4xl font-bold mb-3 ${isApproved ? 'text-green-700' : 'text-red-600'}`}>
              {isApproved ? 'NCC APPROVED' : 'SUSPICIOUS / HIGH RISK'}
            </h1>

            <p className="text-gray-600 text-lg max-w-lg mx-auto">
              {result.message}
            </p>
          </div>

          {/* Phone Info */}
          <div className="max-w-md mx-auto space-y-6 mb-12 text-center">
            <div>
              <p className="text-gray-500 text-sm">Brand</p>
              <p className="text-3xl font-semibold">{result.brand}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Model</p>
              <p className="text-3xl font-semibold">{result.model || result.equipment_name}</p>
            </div>
          </div>

          {/* Community Reports Section */}
          <div className="border-t pt-10">
            <h3 className="text-2xl font-bold mb-6">Community Reports ({reports.length})</h3>

            {loadingReports ? (
              <p className="text-center py-8">Loading reports...</p>
            ) : reports.length > 0 ? (
              <div className="space-y-6">
                {reports.slice(0, 5).map((report, index) => (
                  <div key={index} className="bg-gray-50 p-6 rounded-2xl">
                    <div className="flex justify-between items-start">
                      <span className={`font-semibold ${report.verdict === 'genuine' ? 'text-green-600' : 'text-red-600'}`}>
                        {report.verdict === 'genuine' ? '✅ Genuine' : report.verdict === 'fake' ? '❌ Fake' : '🔄 Refurbished'}
                      </span>
                      <span className="text-sm text-gray-500">{report.used_duration}</span>
                    </div>
                    {report.comment && <p className="mt-3 text-gray-700">{report.comment}</p>}
                    <p className="text-xs text-gray-500 mt-3">Bought from: {report.buyer_location}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">No reports yet. Be the first to submit one!</p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 mt-12 max-w-md mx-auto">
            <button
              onClick={() => setShowReportModal(true)}
              className="w-full bg-gray-900 hover:bg-black text-white py-4 rounded-2xl font-semibold text-lg"
            >
              Submit Report
            </button>

            <button
              onClick={() => navigate('/')}
              className="w-full border border-gray-300 py-4 rounded-2xl font-semibold text-lg hover:bg-gray-50"
            >
              Check Another Phone
            </button>
          </div>
        </div>
      </div>

      {/* Submit Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-auto">
            <div className="p-8">
              <h2 className="text-2xl font-bold mb-6">Submit Your Report</h2>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium mb-2">IMEI Number (15 digits) *</label>
                  <input
                    type="text"
                    maxLength={15}
                    value={reportForm.imei}
                    onChange={(e) => setReportForm({...reportForm, imei: e.target.value.replace(/\D/g, '')})}
                    className="w-full p-4 border rounded-2xl"
                    placeholder="865456789012345"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Verdict *</label>
                  <select
                    value={reportForm.verdict}
                    onChange={(e) => setReportForm({...reportForm, verdict: e.target.value})}
                    className="w-full p-4 border rounded-2xl"
                  >
                    <option value="">Select Verdict</option>
                    <option value="genuine">✅ Genuine / Original</option>
                    <option value="fake">❌ Fake / Counterfeit</option>
                    <option value="refurbished">🔄 Refurbished sold as New</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">How long have you used it?</label>
                  <select
                    value={reportForm.used_duration}
                    onChange={(e) => setReportForm({...reportForm, used_duration: e.target.value})}
                    className="w-full p-4 border rounded-2xl"
                  >
                    <option value="">Select duration</option>
                    <option value="Less than 1 month">Less than 1 month</option>
                    <option value="1-3 months">1-3 months</option>
                    <option value="3-6 months">3-6 months</option>
                    <option value="6-12 months">6-12 months</option>
                    <option value="1 year+">1 year and above</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Upload 2 Photos (Required) *</label>
                  <div className="grid grid-cols-2 gap-4">
                    <input type="file" accept="image/*" onChange={(e) => setPhotos({...photos, photo1: e.target.files[0]})} />
                    <input type="file" accept="image/*" onChange={(e) => setPhotos({...photos, photo2: e.target.files[0]})} />
                  </div>
                </div>

                <button
                  onClick={handleSubmitReport}
                  disabled={submitting}
                  className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white py-4 rounded-2xl font-semibold text-lg mt-6"
                >
                  {submitting ? "Submitting..." : "Submit My Report"}
                </button>

                <button
                  onClick={() => setShowReportModal(false)}
                  className="w-full py-4 text-gray-500 hover:text-gray-700"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}