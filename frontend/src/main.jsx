import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { AuthProvider } from "./context/AuthContext";

import ReactGA from "react-ga4";

// Initialize with your Measurement ID
ReactGA.initialize("G-RQWJMQSVCQ");

// Send the initial pageview
ReactGA.send({ hitType: "pageview", page: window.location.pathname });

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>
);