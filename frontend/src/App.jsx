import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from "react";

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Home from './pages/Home';
import Result from './pages/Results';
import LoadingState from './pages/LoadingState';
import ReportDeviceStepOne from './pages/ReportDeviceStepOne';
import ReportDeviceStepTwo from './pages/ReportDeviceStepTwo';
import ReportDeviceStepThree from './pages/ReportDeviceStepThree';
import SubmitReport from './pages/SubmitReport';
import CommunityReports from './pages/CommunityReport';
import About from './pages/About';
import PrivacyPolicy from './pages/Privacypolicy';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import TermsOfUse from './pages/Termofuse';
import Contact from './pages/Contact';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import UserDashboard from './pages/Dashboard';
import FAQ from './pages/FAQ';
import ProtectedRoute from "./components/ProtectedRoute";

function ScrollToHash() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);

      if (element) {
        // Different delay based on whether we're navigating or already on page
        const delay = location.pathname === '/' ? 50 : 300;
        
        setTimeout(() => {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }, delay);
      }
    }
  }, [location]);

  return null;
}


function AppContent() {
  const location = useLocation();

  // Hide Navbar/Footer on admin pages
      const hiddenLayoutRoutes = [
        "/dashboard",
        "/admin",
      ];

      const hideLayout = hiddenLayoutRoutes.some(route =>
        location.pathname.startsWith(route)
      );

  return (
    <>
      {!hideLayout && <Navbar />}

      <Routes>
        {/* Home */}
        <Route
          path="/"
          element={
            <>
              <Hero />
              <Home />
            </>
          }
        />

        {/* Verification */}
        <Route path="/loading" element={<LoadingState />} />
        <Route path="/result" element={<Result />} />

        {/* Report Device */}
        <Route path="/report-device" element={<ReportDeviceStepOne />} />
        <Route path="/report-device/step2" element={<ReportDeviceStepTwo />} />
        <Route path="/report-device/step3" element={<ReportDeviceStepThree />} />
        <Route path="/report-success" element={<SubmitReport />} />

        {/* Community */}
        <Route path="/community" element={<CommunityReports />} />

        {/* Pages */}
        <Route path="/about" element={<About />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfUse />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<FAQ />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* User Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        {/* Admin */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        {/* 404 */}
        <Route
          path="*"
          element={
            <div className="min-h-screen flex items-center justify-center text-2xl font-bold">
              Page Not Found
            </div>
          }
        />
      </Routes>

      {!hideLayout && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <ScrollToHash />
      <AppContent />
    </Router>
  );
}

export default App;