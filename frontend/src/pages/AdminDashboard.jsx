import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isAdminLoggedIn');

    if (!isLoggedIn) {
      navigate('/admin/login');
      return;
    }

    fetchPendingReports();
  }, [navigate]);

    const fetchPendingReports = async () => {
    setLoading(true);
    setError("");

    try {
        const res = await fetch('/api/admin/pending-reports.php', {
        headers: {
            'X-Admin-Token': 'admin-secret-token' // ✅ FIXED
        }
        });

        const data = await res.json();
        console.log("API Response:", data);

        if (data.success) {
        setReports(Array.isArray(data.data) ? data.data : []);
        } else {
        setReports([]);
        setError(data.message || "Failed to fetch reports");
        }

    } catch (err) {
        console.error(err);
        setReports([]);
        setError("Network error. Please try again.");
    } finally {
        setLoading(false);
    }
    };

  const updateStatus = async (id, newStatus) => {
    if (!window.confirm(`Mark this report as ${newStatus}?`)) return;

    try {
      const res = await fetch('/api/admin/update-report.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Admin-Token': 'admin-secret-token'
        },
        body: JSON.stringify({ id, status: newStatus })
      });

      const data = await res.json();

      if (data.success) {
        fetchPendingReports(); // refresh list
      } else {
        alert(data.message);
      }

    } catch (err) {
      alert('Failed to update status');
    }
  };

  // Loading State
  if (loading) {
    return (
      <div className="p-10 text-center text-gray-500">
        Loading reports...
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Pending Reports</h1>

        <button 
          onClick={() => {
            localStorage.removeItem('isAdminLoggedIn');
            navigate('/admin/login');
          }}
          className="text-red-600 hover:underline"
        >
          Logout
        </button>
      </div>

      {/* ❌ Error State */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl">
          {error}
        </div>
      )}

      {/* 📭 Empty State */}
      {!Array.isArray(reports) || reports.length === 0 ? (
        <p className="text-center text-gray-500 py-10">
          No pending reports at the moment.
        </p>
      ) : (

        /* Reports List */
        <div className="space-y-6">
          {Array.isArray(reports) && reports.map(report => (
            <div key={report.id} className="bg-white border rounded-2xl p-6 shadow-sm">

              {/* Top Section */}
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">
                    {report.brand} {report.phone_model}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Reported by {report.full_name}
                  </p>
                </div>

                <span className="px-4 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">
                  Pending
                </span>
              </div>

              {/* Info */}
              <div className="mt-4 text-sm space-y-1">
                <p><strong>Email:</strong> {report.email}</p>
                <p><strong>Source:</strong> {report.phone_source}</p>
              </div>

              {/* Actions */}
              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => updateStatus(report.id, 'approved')}
                  className="flex-1 bg-green-600 text-white py-3 rounded-xl font-medium hover:bg-green-700 transition"
                >
                  Approve
                </button>

                <button
                  onClick={() => updateStatus(report.id, 'rejected')}
                  className="flex-1 bg-red-600 text-white py-3 rounded-xl font-medium hover:bg-red-700 transition"
                >
                  Reject
                </button>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}