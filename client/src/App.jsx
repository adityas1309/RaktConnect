import LandingPage from "./components/Landing/LandingPage";
import { Routes, Route, Outlet } from "react-router";
import Navbar from "./components/Landing/Navbar";
import Footer from "./components/Landing/Footer";
import Blog from "./components/Landing/Blog";
import Donor from "./components/donor/Donor";
import About from "./components/Landing/About";
import Contact from "./components/Landing/Contact";
import Campaigns from "./components/Landing/Campaigns";
import FAQ from "./components/Landing/FAQ";
import BloodBanks from "./components/Landing/BloodBank";
import Auth from "./components/Auth/Auth";
import Patient from "./components/patient/Patient";
import Requests from "./components/patient/Requests";
import PatientProfile from "./components/patient/PatientProfile";
import PatientDashboard from "./components/patient/PatientDashboard";
import HospitalHome from "./components/hospital/HospitalHome";
import HaemoglobinPredictor from "./components/patient/Haemoglobin";
import DonorDashboard from "./components/donor/DonorDashboard";
import DonorProfile from "./components/donor/DonorProfile";
import Donations from "./components/donor/Donations";
import EligibilityChecker from "./components/donor/EligibilityChecker";
import BloodRequestManagement from "./components/hospital/BloodRequestManagement";
import Disease from "./components/patient/Disease";
import Eligibility from "./components/Landing/Eligibility";

import { ToastContainer } from "react-toastify";
import { SignIn, SignUp } from "@clerk/clerk-react";
import CompleteProfile from "./components/Auth/CompleteProfile";

const AppLayout = () => (
  <div className="app">
    <Navbar />
    <Outlet />
    <Footer />
  </div>
);

function App() {
  return (
    <>
      <Routes>
        {/* Layout routes */}
        <Route path="/" element={<AppLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/campaigns" element={<Campaigns />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/eligibility" element={<Eligibility />} />
          <Route path="/banks" element={<BloodBanks />} />
        </Route>

        {/*  Clerk Auth Routes */}
        <Route path="/login" element={<Auth />} />
        <Route
          path="/login/patient"
          element={<SignIn routing="path" path="/login/patient" />}
        />
        <Route
          path="/login/donor"
          element={<SignIn routing="path" path="/login/donor" />}
        />
        <Route
          path="/login/hospital"
          element={<SignIn routing="path" path="/login/hospital" />}
        />
        <Route
          path="/sign-up"
          element={<SignUp routing="path" path="/sign-up" />}
        />
        <Route path="/complete-profile" element={<CompleteProfile />} />

        {/* Donor Routes */}
        <Route path="/donor" element={<Donor />}>
          <Route index element={<DonorDashboard />} />
          <Route path="/donor/dashboard" element={<DonorDashboard />} />
          <Route path="/donor/profile" element={<DonorProfile />} />
          <Route path="/donor/donations" element={<Donations />} />
          <Route path="/donor/eligibility" element={<EligibilityChecker />} />
        </Route>

        {/* Patient Routes */}
        <Route path="/patient" element={<Patient />}>
          <Route index element={<PatientDashboard />} />
          <Route path="/patient/dashboard" element={<PatientDashboard />} />
          <Route path="/patient/profile" element={<PatientProfile />} />
          <Route path="/patient/requests" element={<Requests />} />
          <Route
            path="/patient/haemoglobin"
            element={<HaemoglobinPredictor />}
          />
          <Route path="/patient/disease" element={<Disease />} />
        </Route>

        {/* Hospital Routes */}
        <Route path="/hospital" element={<HospitalHome />} />
        <Route
          path="/hospital/requestmanagement"
          element={<BloodRequestManagement />}
        />
      </Routes>

      <ToastContainer />
    </>
  );
}

export default App;
