import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (location.state) {
      setResult(location.state);
    } else {
      navigate('/');
    }
  }, [location, navigate]);

  if (!result) return <p className="text-center py-20">Loading...</p>;

  const isApproved = result.verdict === 'genuine';
  const modelForImage = (result.model || result.equipment_name || '').replace(/ /g, '-').toLowerCase();
  const brandForImage = (result.brand || '').split(' ')[0].toLowerCase();
  const imageUrl = `https://fdn2.gsmarena.com/vv/bigpic/${brandForImage}-${modelForImage}.jpg`;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl overflow-hidden">

        {/* Header with Flag & NCC Logo */}
        <div className="flex items-center justify-between px-8 py-4 border-b bg-white">
          <div className="flex items-center gap-4">
            <span className="text-2xl font-bold text-blue-600">TechMobile.ng</span>
          </div>

          <div className="flex items-center gap-3">
            <img 
              src="https://ncc.gov.ng/images/ncc-logo.png" 
              alt="NCC Logo" 
              className="h-9" 
              onError={(e) => e.target.style.display = 'none'}
            />
            <span className="text-sm font-semibold text-gray-500">VERIFY</span>
          </div>

          <button 
            onClick={() => navigate('/')}
            className="text-sm font-medium text-gray-500 hover:text-gray-900"
          >
            ← Check Another Phone
          </button>
        </div>

        <div className="p-6 md:p-10 flex flex-col md:flex-row gap-8">

          {/* Left - Phone Image */}
          <div className="md:w-1/2 flex justify-center items-center">

            <img 
              src={imageUrl}
              alt={result.model}
              className="w-64 h-64 object-contain drop-shadow-xl"
              onError={(e) => {
                e.target.src = `https://source.unsplash.com/400x400/?${brandForImage}+smartphone`;
                e.target.onerror = () => {
                  e.target.src = 'https://via.placeholder.com/400x400/EEF2FF/3B82F6?text=📱';
                };
              }}
            />
          </div>

          {/* Right - Details */}
          <div className="md:w-1/2 flex flex-col justify-center">

            {/* Status */}
            <div className={`inline-flex items-center gap-2 px-6 py-2 rounded-full text-sm font-bold mb-6 w-fit
              ${isApproved ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>

            <img 
              src="https://flagcdn.com/w80/ng.png" 
              alt="Nigeria Flag" 
              className="w-8 h-5 rounded-sm" 
            />

              {isApproved ? '✅ VERIFICATION COMPLETE' : '⚠️ VERIFICATION COMPLETE'}
            </div>

            <h1 className={`text-4xl font-bold mb-3 ${isApproved ? 'text-green-700' : 'text-red-600'}`}>
              {isApproved ? 'NCC APPROVED' : 'SUSPICIOUS / HIGH RISK'} 
            </h1>

            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              {result.message}
            </p>

            {/* Phone Info */}
            <div className="space-y-5 mb-10">
              <div>
                <p className="text-gray-500 text-sm">Brand</p>
                <p className="text-2xl font-semibold">{result.brand}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Model</p>
                <p className="text-2xl font-semibold">{result.model || result.equipment_name}</p>
              </div>
              {result.applicant && (
                <div>
                  <p className="text-gray-500 text-sm">Manufacturer</p>
                  <p className="text-lg">{result.applicant}</p>
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-3">
              <button
                onClick={() => alert("Submit Report feature coming soon...")}
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
      </div>
    </div>
  );
}