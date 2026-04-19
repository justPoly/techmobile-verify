import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">TechMobile.ng</Link>
        
        <div className="space-x-6">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/verify" className="hover:underline font-semibold">Verify Phone</Link>
          <a href="#" className="hover:underline">Reviews</a>
          <a href="#" className="hover:underline">Blog</a>
        </div>
      </div>
    </nav>
  );
}