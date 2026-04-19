import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto text-center py-20 px-6">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Nigeria's Most Trusted Phone Checker
        </h1>
        <p className="text-xl text-gray-600 mb-10">
          Stop buying fake phones. Verify any phone before you pay.
        </p>

        <Link
          to="/verify"
          className="bg-blue-600 hover:bg-blue-700 text-white text-xl font-semibold px-10 py-4 rounded-lg inline-block"
        >
          Verify a Phone Now →
        </Link>

        <p className="mt-8 text-gray-500">Over 2,300+ NCC Approved phones in our database</p>
      </div>
    </div>
  );
}