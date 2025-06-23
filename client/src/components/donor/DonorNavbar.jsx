import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaUserCircle, FaBell } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";
import { Link, useNavigate } from "react-router";
import PageMeta from "../common/PageMeta";
const DonorNavbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = ["Dashboard", "Donations", "Eligibility"];

  const menuVariants = {
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1,
        staggerDirection: -1,
      },
    },
  };

  const itemVariants = {
    open: { opacity: 1, y: 0 },
    closed: { opacity: 0, y: -20 },
  };

  return (
    <>
     <PageMeta title="DonorDashboard | RaktConnect" />
    <header className={`w-full bg-gray-100 transition-all duration-400 text-black`}>
      <div className="flex justify-between items-center w-full mx-auto px-4 sm:px-6 lg:px-8 py-3">
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
          <span className="bg-gradient-to-r bg-slate-950 bg-clip-text text-transparent">
            RaktConnect
          </span>
        </motion.div>

        <nav className="hidden md:flex space-x-10">
          {navItems.map((item) => (
            <motion.div
              key={item}
              className="text-lg font-semibold relative group"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link to={`/donor/${item.toLowerCase()}`}>
                <span className="transition-colors duration-300 hover:text-blue-400">
                  {item}
                </span>
              </Link>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full" />
            </motion.div>
          ))}
          <Link to="/donor/profile">
            <motion.div
              className="text-lg font-semibold relative group"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <FaUserCircle className="text-3xl transition-colors duration-300 hover:text-blue-400" />
            </motion.div>
          </Link>
          <Link to="/donor/notification">
            <motion.div
              className="text-lg font-semibold relative group"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <FaBell className="text-3xl transition-colors duration-300 hover:text-blue-400" />
            </motion.div>
          </Link>
          
          <TbLogout
            className="text-3xl transition-colors duration-300 hover:text-blue-400 cursor-pointer"
            onClick={() => {
              localStorage.clear();
              navigate("/login");
            }}
          />
        </nav>

        <motion.button
          className="md:hidden p-2 rounded-lg hover:bg-gray-800/50 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          whileTap={{ scale: 0.95 }}
        >
          <div className="w-6 h-6 relative">
            <motion.span
              className="absolute block w-full h-0.5 bg-blue-400 rounded-full"
              animate={isOpen ? "open" : "closed"}
              variants={{
                closed: { top: "0.25rem", rotate: 0 },
                open: { top: "0.25rem", rotate: 45 },
              }}
            />
            <motion.span
              className="absolute block w-full h-0.5 bg-blue-400 rounded-full"
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
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="md:hidden overflow-hidden"
          >
            <ul className="flex flex-col items-center py-4 space-y-4">
              {navItems.map((item) => (
                <motion.li
                  key={item}
                  variants={itemVariants}
                  className="text-lg font-semibold"
                >
                  <Link
                    to={`/donor/${item.toLowerCase()}`}
                    className=" hover:text-blue-400 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {item}
                  </Link>
                </motion.li>
              ))}
              <Link to="/donor/profile">
                <motion.div
                  className="text-lg font-semibold relative group"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <FaUserCircle className="text-3xl transition-colors duration-300 hover:text-blue-400" />
                </motion.div>
              </Link>
              <Link to="/donor/notification">
                <motion.div
                  className="text-lg font-semibold relative group"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <FaBell className="text-3xl transition-colors duration-300 hover:text-blue-400" />
                </motion.div>
              </Link>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
    </>
  );
};

export default DonorNavbar;