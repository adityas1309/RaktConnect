import React from "react";
import { motion } from "framer-motion";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaHeart } from "react-icons/fa";
import { Link, useNavigate } from "react-router";

const Footer = () => {
  const links = [
    { title: "About Us", url: "/about" },
    { title: "Blog", url: "/blog" },
    { title: "Careers", url: "/careers" },
    { title: "Privacy Policy", url: "/privacy" },
  ];

  const socialLinks = [
    { icon: <FaFacebook />, url: "#" },
    { icon: <FaTwitter />, url: "#" },
    { icon: <FaInstagram />, url: "#" },
    { icon: <FaLinkedin />, url: "#" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <>
    <motion.footer 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-gradient-to-b from-slate-950 to-black border-t border-slate-700/50" >
      <div className="max-w-7xl mx-auto px-8 py-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left"
        >
          {/* Brand Section */}
          <motion.div variants={itemVariants} className="mb-8 md:mb-0">
            <div className="flex items-center justify-center md:justify-start">
              <FaHeart className="text-red-500 text-3xl mr-2 animate-pulse" />
              
              <Link
                to="/"
                className="text-2xl font-bold bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent transition-all duration-300"
                onClick={() => setCurrentPath && setCurrentPath("/")}
              >
                RaktConnect
              </Link>
              
            </div>
            <p className="mt-4 text-gray-400">
              Connecting lives through compassionate giving
            </p>
          </motion.div>


          {/* Quick Links */}
          <motion.div variants={itemVariants} className="mb-8 md:mb-0">
            <h4 className="text-lg font-semibold text-gray-200 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {links.map((link, index) => (
                <motion.li 
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="text-gray-400 hover:text-red-400 transition-colors"
                >
                  <a href={link.url} className="block py-1">
                    {link.title}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-semibold text-gray-200 mb-4">Connect With Us</h4>
            <div className="flex justify-center md:justify-start space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5, color: "#f87171" }}
                  className="text-2xl text-gray-400 hover:text-red-400 transition-colors"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-12 pt-8 border-t border-gray-700/30 text-center"
        >
          <p className="text-gray-400">
            © {new Date().getFullYear()} RaktConnect. All rights reserved.
          </p>
          <p className="text-sm mt-2 text-gray-500">
            Made with <FaHeart className="inline text-red-500 animate-pulse" /> to save lives
          </p>
        </motion.div>
      </div>
    </motion.footer>
    </>
  );
};

export default Footer;