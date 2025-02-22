import LandingPage from "./components/Landing/LandingPage";
import { BrowserRouter, Routes, Route, Outlet } from "react-router";
import Navbar from "./components/Landing/Navbar";

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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
