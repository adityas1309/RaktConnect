import LandingPage from "./components/Landing/LandingPage";
import { BrowserRouter, Routes, Route, Outlet } from "react-router";
import Navbar from "./components/Landing/Navbar";

import About from "./components/Landing/About";
import Contact from "./components/Landing/Contact";
import Auth from "./components/Auth/Auth";
import Patient from "./components/patient/Patient";
import Requests from "./components/patient/Requests";
import PatientProfile from "./components/patient/PatientProfile";
import PatientDashboard from "./components/patient/PatientDashboard";

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
        </Route>
        <Route path="/login" element={<Auth />} />
        <Route path="/patient" element={<Patient />}>
          <Route index element={<PatientDashboard />} />
          <Route path="/patient/dashboard" element={<PatientDashboard />} />
          <Route path="/patient/profile" element={<PatientProfile />} />
          <Route path="/patient/requests" element={<Requests />} />
        </Route>
       
      </Routes>
    </BrowserRouter>
  );
}

export default App;
