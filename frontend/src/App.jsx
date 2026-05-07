import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        {/* Hero only appears on the homepage */}
        <Route 
          path="/" 
          element={
            <>
              <Hero />
              <Home />
            </>
          } 
        />

        {/* Result page - No Hero */}
        <Route path="/loading" element={<LoadingState />} />
        <Route path="/result" element={<Result />} />
        <Route path="/report-device" element={<ReportDeviceStepOne />} />
        <Route path="/report-device/step2" element={<ReportDeviceStepTwo />} />
        <Route path="/report-device/step3" element={<ReportDeviceStepThree />} />
        <Route path="/report-success" element={<SubmitReport />} />
        <Route path="/community" element={<CommunityReports />} />
        <Route path="/about" element={<About />}/>

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />

        {/* Placeholder pages */}
        <Route path="*" element={<div className="p-20 text-center text-2xl">Page Not Found</div>} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;