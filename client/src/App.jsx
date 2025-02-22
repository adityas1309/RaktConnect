import LandingPage from "./components/Landing/LandingPage";
import { BrowserRouter, Routes, Route, Outlet } from "react-router";
import Navbar from "./components/Landing/Navbar";

import About from "./components/Landing/About";
import Contact from "./components/Landing/Contact";
import Auth from "./components/Auth/Auth";
import DonorHome from "./components/patient/Patient";

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
        <Route path="/patient" element={<DonorHome />} />
       
      </Routes>
    </BrowserRouter>
  );
}

export default App;
