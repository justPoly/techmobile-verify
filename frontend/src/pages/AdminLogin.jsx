import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const handleLogin = () => {
    // For now, hard-coded (change later to real authentication)
    if (credentials.username === 'admin' && credentials.password === 'admin123') {
      localStorage.setItem('isAdmin', 'true');
      navigate('/admin');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-sm w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-8">Admin Login</h1>
        
        <input
          type="text"
          placeholder="Username"
          className="w-full border rounded-xl px-4 py-3 mb-4"
          onChange={(e) => setCredentials({...credentials, username: e.target.value})}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border rounded-xl px-4 py-3 mb-6"
          onChange={(e) => setCredentials({...credentials, password: e.target.value})}
        />

        <button 
          onClick={handleLogin}
          className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold"
        >
          Login as Admin
        </button>
      </div>
    </div>
  );
}