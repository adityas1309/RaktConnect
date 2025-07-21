import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "./ThemeContext";
import ClerkProviderWrapper from "./auth/ClerkProviderWrapper";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <ClerkProviderWrapper>
        <App />
      </ClerkProviderWrapper>
    </ThemeProvider>
  </StrictMode>
);
