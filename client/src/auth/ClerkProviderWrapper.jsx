import { ClerkProvider } from "@clerk/clerk-react";
import { BrowserRouter } from "react-router-dom";

const ClerkProviderWrapper = ({ children }) => {
  const clerkKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

  return (
    <ClerkProvider
      publishableKey={clerkKey}
      appearance={{
        layout: {
          socialButtonsVariant: "iconButton",
          showOptionalFields: false,
        },
        variables: {
          colorPrimary: "#2563eb", 
          colorBackground: "#ffffff", 
          colorText: "#1f2937", 
        },
      }}>
      <BrowserRouter>{children}</BrowserRouter>
    </ClerkProvider>
  );
};

export default ClerkProviderWrapper;
