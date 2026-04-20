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

      // Navigate to result page with data
      navigate('/result', { 
        state: response.data 
      });

    } catch (error) {
      console.error(error);
      alert("Could not connect to server. Please check XAMPP.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-16 px-6">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Verify Phone Authenticity
        </h1>
        <p className="text-xl text-gray-600">
          Search by model name and get real community feedback
        </p>
      </div>

      <div className="bg-white shadow-2xl rounded-3xl p-10">
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Enter Phone Model Name
          </label>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g. Tecno Camon 30, Infinix Hot 50, Spark 20, Redmi Note 14"
            className="w-full p-6 border border-gray-300 rounded-2xl text-lg focus:outline-none focus:border-blue-500"
          />
        </div>

        <button
          onClick={handleCheck}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-6 rounded-2xl text-2xl font-semibold transition"
        >
          {loading ? "Searching..." : "Verify This Model"}
        </button>

        <p className="text-center text-sm text-gray-500 mt-6">
          Example: Camon 30 Premier, Hot 50i, Galaxy A55, iTel P55
        </p>
      </div>
    </div>
  );
}