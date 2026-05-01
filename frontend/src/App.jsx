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
        <Route path="/report-device/step4" element={<SubmitReport />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;