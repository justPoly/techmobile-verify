import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Home from './pages/Home';
import Result from './pages/Results';
import LoadingState from './pages/LoadingState';

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
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;