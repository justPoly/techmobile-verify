import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem('isAdmin')) {
      navigate('/admin/login');
      return;
    }
    fetchPendingReports();
  }, []);

  const fetchPendingReports = async () => {
    try {
      const res = await fetch('/api/admin/pending-reports.php');
      const data = await res.json();
      setReports(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, newStatus, notes = '') => {
    try {
      await fetch('/api/admin/update-report.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus, notes })
      });
      fetchPendingReports(); // refresh list
    } catch (err) {
      alert('Failed to update');
    }
  };

  if (loading) return <div className="p-10">Loading reports...</div>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard - Pending Reports</h1>
        <button onClick={() => { localStorage.removeItem('isAdmin'); navigate('/'); }}
          className="text-red-600 hover:underline">
          Logout
        </button>
      </div>

      <div className="grid gap-6">
        {reports.map(report => (
          <div key={report.id} className="bg-white border rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between">
              <div>
                <h3 className="font-semibold">{report.brand} {report.phone_model}</h3>
                <p className="text-sm text-gray-500">Reported by {report.full_name}</p>
              </div>
              <span className="text-xs bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">Pending</span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
              <div><strong>Email:</strong> {report.email}</div>
              <div><strong>Source:</strong> {report.phone_source}</div>
            </div>

            <div className="mt-6 flex gap-3">
              <button 
                onClick={() => updateStatus(report.id, 'approved')}
                className="flex-1 bg-green-600 text-white py-3 rounded-xl font-medium">
                Approve
              </button>
              <button 
                onClick={() => updateStatus(report.id, 'rejected')}
                className="flex-1 bg-red-600 text-white py-3 rounded-xl font-medium">
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}