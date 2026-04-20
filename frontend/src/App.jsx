import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Verify from './pages/Verify';
import Result from './pages/Results';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Verify />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </Router>
  );
}

export default App;