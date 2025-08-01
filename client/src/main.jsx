
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "./ThemeContext";
import ClerkProviderWrapper from "./auth/ClerkProviderWrapper";

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { ThemeProvider } from './ThemeContext';
import { HelmetProvider } from 'react-helmet-async'; // ✅ Import this


createRoot(document.getElementById("root")).render(
  <StrictMode>
 <HelmetProvider>
    <ThemeProvider>
      <ClerkProviderWrapper>
        <App />
      </ClerkProviderWrapper>
    </ThemeProvider>
    </HelmetProvider>
  </StrictMode>
);
