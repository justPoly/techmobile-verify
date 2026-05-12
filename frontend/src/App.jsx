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
import FAQ from './pages/FAQ';

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

function App() {
  return (
    <Router>
      <ScrollToHash />   {/* ← Handles both same-page and cross-page scrolling */}
      <Navbar />
      <Routes>
        <Route 
          path="/" 
          element={
            <>
              
              <Hero />
              <Home />
            </>
          } 
        />

        <Route path="/loading" element={<LoadingState />} />
        <Route path="/result" element={<Result />} />
        <Route path="/report-device" element={<ReportDeviceStepOne />} />
        <Route path="/report-device/step2" element={<ReportDeviceStepTwo />} />
        <Route path="/report-device/step3" element={<ReportDeviceStepThree />} />
        <Route path="/report-success" element={<SubmitReport />} />
        <Route path="/community" element={<CommunityReports />} />
        <Route path="/about" element={<About />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfUse />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/login" element={<Login />} />

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />

        <Route path="*" element={<div className="p-20 text-center text-2xl">Page Not Found</div>} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;