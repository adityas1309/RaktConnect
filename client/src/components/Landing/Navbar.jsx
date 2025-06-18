import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > window.innerHeight);
    };

    const updatePath = () => {
      setCurrentPath(window.location.pathname);
    };

    // Check authentication status on component mount
    const checkAuthStatus = () => {
      const authToken = localStorage.getItem("authToken");
      const storedUserType = localStorage.getItem("userType");
      
      if (authToken && storedUserType) {
        setIsLoggedIn(true);
        setUserType(storedUserType);
      } else {
        setIsLoggedIn(false);
        setUserType("");
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("popstate", updatePath);
    updatePath();
    checkAuthStatus();

    // Listen for storage changes (in case user logs in/out in another tab)
    window.addEventListener("storage", checkAuthStatus);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("popstate", updatePath);
      window.removeEventListener("storage", checkAuthStatus);
    };
  }, []);
  const navItems = ["Home","banks","eligibility", "about", "campaigns", "FAQ", "contact"];
  const isLandingPage = currentPath === "/";

  // Helper function to get the correct path for each nav item
  const getNavPath = (item) => {
    return item.toLowerCase() === "home" ? "/" : `/${item.toLowerCase()}`;
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of your account",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, logout!"
    }).then((result) => {
      if (result.isConfirmed) {
        // Clear localStorage
        localStorage.removeItem("authToken");
        localStorage.removeItem("userType");
        
        // Update state
        setIsLoggedIn(false);
        setUserType("");
        
        // Show success message
        Swal.fire({
          icon: "success",
          title: "Logged Out",
          text: "You have been successfully logged out!",
          timer: 2000,
          showConfirmButton: false
        });
        
        // Redirect to home page
        navigate("/");
      }
    });
  };

  return (
    <header
      className={`fixed w-full top-0 z-50 backdrop-blur-lg transition-all duration-400 ${
        isScrolled ? "bg-black/60" : "bg-black/10"
      }`}
    >
      <div className="flex justify-between items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-extrabold flex items-center"
        >
          <img
            src="https://www.nicepng.com/png/full/364-3647802_blood-symbol-png.png"
            alt="RaktConnect Logo"
            className="h-12 w-auto mr-3 drop-shadow-lg transition-transform duration-300 hover:scale-110"
          />
          <Link
            to="/"
            className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent hover:scale-110 hover:bg-red-300 transition-all duration-300"
            onClick={() => setCurrentPath("/")}
          >
            RaktConnect
          </Link>
        </motion.div>

        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => {
            const navPath = getNavPath(item);
            const textColor = isLandingPage ? "text-white" : "text-black";

            return (
              <motion.div
                key={item}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Link
                  to={navPath}
                  className={`${textColor} text-lg font-semibold relative group transition-colors duration-300`}
                  onClick={() => setTimeout(() => setCurrentPath(navPath), 100)}
                >
                  <span className="transition-colors duration-300 hover:text-red-400">
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </span>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full" />
                </Link>
              </motion.div>
            );
          })}
          
          {/* Auth Buttons */}
          <div className="flex items-center space-x-3 ml-6">
            {!isLoggedIn ? (
              <motion.button
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 bg-gradient-to-r from-red-700 to-red-800 text-white font-semibold rounded-full hover:from-red-800 hover:to-red-900 transition-all duration-300 shadow-lg hover:shadow-red-500/25"
                onClick={handleLogin}
              >
                Login
              </motion.button>
            ) : (
              <div className="flex items-center space-x-3">
                <span className={`text-sm font-medium ${isLandingPage ? "text-white" : "text-gray-700"}`}>
                  Welcome, {userType}
                </span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 border-2 border-red-500 text-red-500 font-semibold rounded-full hover:bg-red-500 hover:text-white transition-all duration-300"
                  onClick={handleLogout}
                >
                  Logout
                </motion.button>
              </div>
            )}
          </div>
        </nav>

        <motion.button
          className="md:hidden p-2 rounded-lg hover:bg-gray-800/50 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          whileTap={{ scale: 0.95 }}
        >
          <div className="w-6 h-6 relative">
            <motion.span
              className="absolute block w-full h-0.5 bg-red-400 rounded-full"
              animate={isOpen ? "open" : "closed"}
              variants={{
                closed: { top: "0.25rem", rotate: 0 },
                open: { top: "0.25rem", rotate: 45 },
              }}
            />
            <motion.span
              className="absolute block w-full h-0.5 bg-red-400 rounded-full"
              animate={isOpen ? "open" : "closed"}
              variants={{
                closed: { top: "0.75rem", rotate: 0 },
                open: { top: "0.75rem", rotate: -45 },
              }}
            />
          </div>
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden"
          >
            <ul className="flex flex-col items-center py-4 space-y-4">
              {navItems.map((item) => {
                const navPath = getNavPath(item);
                const textColor = isLandingPage ? "text-white" : "text-black";

                return (
                  <motion.li key={item} className="text-lg font-semibold">
                    <Link
                      to={navPath}
                      className={`${textColor} hover:text-red-400 transition-colors`}
                      onClick={() => {
                        setIsOpen(false);
                        setTimeout(() => setCurrentPath(navPath), 100);
                      }}
                    >
                      {item.charAt(0).toUpperCase() + item.slice(1)}
                    </Link>
                  </motion.li>
                );
              })}
              
              {/* Mobile Auth Buttons */}
              <motion.li className="pt-2">
                {!isLoggedIn ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-full hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg"
                    onClick={() => {
                      handleLogin();
                      setIsOpen(false);
                    }}
                  >
                    Login
                  </motion.button>
                ) : (
                  <div className="flex flex-col items-center space-y-3">
                    <span className={`text-sm font-medium ${isLandingPage ? "text-white" : "text-gray-700"}`}>
                      Welcome, {userType}
                    </span>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-3 border-2 border-red-500 text-red-500 font-semibold rounded-full hover:bg-red-500 hover:text-white transition-all duration-300"
                      onClick={() => {
                        handleLogout();
                        setIsOpen(false);
                      }}
                    >
                      Logout
                    </motion.button>
                  </div>
                )}
              </motion.li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;