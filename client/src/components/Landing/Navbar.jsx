import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > window.innerHeight);
    };

    const updatePath = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("popstate", updatePath);
    updatePath();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("popstate", updatePath);
    };
  }, []);

  const navItems = ["banks","eligibility", "about", "campaigns", "FAQ", "contact"];
  const isLandingPage = currentPath === "/";

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
            className="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent"
            onClick={() => setCurrentPath("/")}
          >
            RaktConnect
          </Link>
        </motion.div>

        <nav className="hidden md:flex space-x-8">
          {navItems.map((item) => {
            const formattedItem = item.toLowerCase();
            const textColor = isLandingPage ? "text-white" : "text-black";

            return (
              <motion.div
                key={formattedItem}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Link
                  to={`/${formattedItem}`}
                  className={`${textColor} text-lg font-semibold relative group transition-colors duration-300`}
                  onClick={() => setTimeout(() => setCurrentPath(`/${formattedItem}`), 100)}
                >
                  <span className="transition-colors duration-300 hover:text-red-400">
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </span>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full" />
                </Link>
              </motion.div>
            );
          })}
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
                const formattedItem = item.toLowerCase();
                const textColor = isLandingPage ? "text-white" : "text-black";

                return (
                  <motion.li key={formattedItem} className="text-lg font-semibold">
                    <Link
                      to={`/${formattedItem}`}
                      className={`${textColor} hover:text-red-400 transition-colors`}
                      onClick={() => {
                        setIsOpen(false);
                        setTimeout(() => setCurrentPath(`/${formattedItem}`), 100);
                      }}
                    >
                      {item.charAt(0).toUpperCase() + item.slice(1)}
                    </Link>
                  </motion.li>
                );
              })}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
