import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isAdminLoggedIn');
    if (!isLoggedIn) {
      navigate('/admin/login');
      return;
    }

    fetchPendingReports();
  }, [navigate]);

  const fetchPendingReports = async () => {
    try {
      const res = await fetch('/api/admin/pending-reports.php', {
        headers: {
          'Authorization': 'admin-secret-token'   // Temporary protection
        }
      });
      const data = await res.json();
      setReports(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, newStatus) => {
    if (!window.confirm(`Mark this report as ${newStatus}?`)) return;

    try {
      await fetch('/api/admin/update-report.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus })
      });
      fetchPendingReports(); // Refresh list
    } catch (err) {
      alert('Failed to update status');
    }
  };

  if (loading) return <div className="p-10 text-center">Loading reports...</div>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
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

      {reports.length === 0 ? (
        <p className="text-center text-gray-500 py-10">No pending reports at the moment.</p>
      ) : (
        <div className="space-y-6">
          {reports.map(report => (
            <div key={report.id} className="bg-white border rounded-2xl p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">{report.brand} {report.phone_model}</h3>
                  <p className="text-sm text-gray-500">Reported by {report.full_name}</p>
                </div>
                <span className="px-4 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">Pending</span>
              </div>

              <div className="mt-4 text-sm space-y-1">
                <p><strong>Email:</strong> {report.email}</p>
                <p><strong>Source:</strong> {report.phone_source}</p>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => updateStatus(report.id, 'approved')}
                  className="flex-1 bg-green-600 text-white py-3 rounded-xl font-medium hover:bg-green-700"
                >
                  Approve
                </button>
                <button
                  onClick={() => updateStatus(report.id, 'rejected')}
                  className="flex-1 bg-red-600 text-white py-3 rounded-xl font-medium hover:bg-red-700"
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