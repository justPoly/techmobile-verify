import { useState } from 'react';
import axios from 'axios';

export default function Verify() {
  const [input, setInput] = useState('');
  const [searchType, setSearchType] = useState('imei'); // 'imei' or 'model'
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCheck = async () => {
    if (!input.trim()) {
      alert("Please enter IMEI or Phone Model");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const response = await axios.post(
        '/api/check-imei.php',           // This should work with correct proxy
        { input: input.trim() },
        { headers: { 'Content-Type': 'application/json' } }
      );

      setResult(response.data);
    } catch (error) {
      console.error("Full Error:", error);
      setResult({
        status: 'error',
        verdict: 'error',
        message: 'Could not connect to server. Please check XAMPP and restart React.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-6">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">
          Verify Phone Authenticity
        </h1>
        <p className="text-gray-600">Check by IMEI or Phone Model Name</p>
      </div>

      <div className="bg-white shadow-xl rounded-2xl p-8">
        {/* Search Type Tabs */}
        <div className="flex gap-2 mb-6 bg-gray-100 p-1 rounded-xl w-fit mx-auto">
          <button
            onClick={() => setSearchType('imei')}
            className={`px-6 py-2 rounded-xl font-medium transition ${searchType === 'imei' ? 'bg-white shadow' : 'hover:bg-gray-200'}`}
          >
            IMEI Number
          </button>
          <button
            onClick={() => setSearchType('model')}
            className={`px-6 py-2 rounded-xl font-medium transition ${searchType === 'model' ? 'bg-white shadow' : 'hover:bg-gray-200'}`}
          >
            Phone Model
          </button>
        </div>

        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {searchType === 'imei' 
              ? 'Enter IMEI Number (15 digits)' 
              : 'Enter Phone Model Name (e.g. Camon 30, Spark 20)'}
          </label>
          
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={searchType === 'imei' ? "865456789012345" : "Tecno Camon 30 Premier"}
            className="w-full p-5 border border-gray-300 rounded-xl text-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </div>

        <button
          onClick={handleCheck}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-5 rounded-xl text-xl font-semibold transition-all duration-200"
        >
          {loading ? "🔍 Checking..." : "Verify Now"}
        </button>
      </div>

      {/* Result Section */}
      {result && (
        <div className={`mt-8 p-8 rounded-2xl border-2 text-lg ${
          result.verdict === 'genuine' 
            ? 'bg-green-50 border-green-500' 
            : result.verdict === 'suspicious' 
            ? 'bg-yellow-50 border-yellow-500' 
            : 'bg-red-50 border-red-500'
        }`}>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">
              {result.verdict === 'genuine' ? '✅' : 
               result.verdict === 'suspicious' ? '⚠️' : '❌'}
            </span>
            <h2 className="text-3xl font-bold">
              {result.verdict === 'genuine' ? 'Genuine Device' : 
               result.verdict === 'suspicious' ? 'Suspicious Device' : 'Error'}
            </h2>
          </div>

          <p className="text-gray-700 leading-relaxed mb-4">{result.message}</p>

          {result.brand && (
            <div className="bg-white p-5 rounded-lg mt-4 border">
              <p><strong>Brand:</strong> {result.brand}</p>
              <p><strong>Model:</strong> {result.model || result.equipment_name}</p>
              {result.applicant && <p><strong>Applicant:</strong> {result.applicant}</p>}
            </div>
          )}
        </div>
      )}

      <p className="text-center text-sm text-gray-500 mt-10">
        Powered by Official NCC Approved Database • TechMobile.ng
      </p>
    </div>
  );
}