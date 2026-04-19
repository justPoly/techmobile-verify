import { useState } from 'react';

export default function Verify() {
  const [imei, setImei] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCheck = async () => {
    if (!imei) return alert("Please enter IMEI");
    
    setLoading(true);
    // We'll connect to PHP backend here soon
    setTimeout(() => {
      setResult({
        status: "genuine",
        model: "Tecno Camon 30",
        message: "This phone is NCC Approved and clean."
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-6">
      <h1 className="text-4xl font-bold text-center mb-10">Verify Phone Authenticity</h1>

      <div className="bg-white shadow-lg rounded-xl p-8">
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Enter IMEI Number (15 digits)</label>
          <input
            type="text"
            value={imei}
            onChange={(e) => setImei(e.target.value)}
            placeholder="e.g. 356789012345678"
            className="w-full p-4 border rounded-lg text-lg"
            maxLength={15}
          />
        </div>

        <button
          onClick={handleCheck}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-lg text-lg font-semibold disabled:bg-gray-400"
        >
          {loading ? "Checking..." : "Check Phone"}
        </button>
      </div>

      {result && (
        <div className={`mt-8 p-6 rounded-xl ${result.status === 'genuine' ? 'bg-green-50 border-green-500' : 'bg-red-50'}`}>
          <h2 className="text-2xl font-bold mb-2">Result</h2>
          <p className="text-xl">{result.message}</p>
        </div>
      )}
    </div>
  );
}