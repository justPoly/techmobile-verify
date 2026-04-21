import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Verify() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCheck = async () => {
    if (!input.trim()) {
      alert("Please enter a phone model name");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('/api/check-imei.php', {
        input: input.trim()
      });

      navigate('/result', { state: response.data });
    } catch (error) {
      console.error(error);
      alert("Could not connect to server. Please make sure XAMPP is running.");
    } finally {
      setLoading(false);
    }
  };

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
            <img 
              src="https://ncc.gov.ng/images/ncc-logo.png" 
              alt="NCC Logo" 
              className="h-9" 
              onError={(e) => e.target.style.display = 'none'}
            />
            <span className="text-sm font-semibold text-gray-500">VERIFY</span>
          </div>
        </div>

        <div className="p-12 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Verify Phone Authenticity
          </h1>
          
          <p className="text-xl text-gray-600 mb-12 max-w-md mx-auto">
            Check if a phone model is NCC Approved and see real experiences from Nigerian buyers
          </p>

          <div className="max-w-lg mx-auto">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Tecno Camon 30, Infinix Hot 50, Spark 20, Redmi Note 14..."
              className="w-full p-6 border border-gray-300 rounded-3xl text-lg focus:outline-none focus:border-blue-500 mb-8"
            />

            <button
              onClick={handleCheck}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-6 rounded-3xl text-xl font-semibold transition-all"
            >
              {loading ? "Verifying Model..." : "Verify This Model"}
            </button>
          </div>

          <p className="text-sm text-gray-500 mt-8">
            Tip: You can type partial names like "Camon 30" or "Hot 50"
          </p>
        </div>
      </div>
    </div>
  );
}