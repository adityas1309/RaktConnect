import LandingPage from "./components/Landing/LandingPage";
import { BrowserRouter, Routes, Route, Outlet } from "react-router";
import Navbar from "./components/Landing/Navbar";
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

const AppLayout = () => {
  return (
    <div className="app">
      <Navbar />
      <Outlet />
    </div>
  );
};


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/campaigns" element={<Campaigns />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/banks" element={<BloodBanks />} />
        </Route>
        <Route path="/login" element={<Auth />} />
        <Route path="/patient" element={<Patient />}>
          <Route index element={<PatientDashboard />} />
          <Route path="/patient/dashboard" element={<PatientDashboard />} />
          <Route path="/patient/profile" element={<PatientProfile />} />
          <Route path="/patient/requests" element={<Requests />} />
          <Route
            path="/patient/haemoglobin"
            element={<HaemoglobinPredictor />}
          />
        </Route>
        <Route path="/donor" element={<Donor />}>
          <Route index element={<DonorDashboard />} />
          <Route path="/donor/dashboard" element={<DonorDashboard />} />
          <Route path="/donor/profile" element={<DonorProfile />} />
          <Route path="/donor/donations" element={<Donations />} />
          <Route path="/donor/eligibility" element={<EligibilityChecker />} />
        </Route>
        <Route path="/hospital" element={<HospitalHome />} />
        <Route path="/hospital/requestmanagement" element={<BloodRequestManagement />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
