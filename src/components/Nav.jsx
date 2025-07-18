import React from "react";
import { AnimatePresence, easeOut, motion } from "framer-motion";
import { Home, Info, Phone, LogIn, Menu, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", icon: Home, href: "/home" },
    { name: "Login", icon: LogIn, href: "/login" },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: easeOut }}
      className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-gray-800 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg-px-8 ">
        {/* flex-box */}
        <div className="flex items-center justify-between  h-16">
          {/* logo */}
          <motion.div whileHover={{ scale: 1.05 }} className="flex-shrink-0">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              LaterList
            </h1>
          </motion.div>

          {/* navigations */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -100 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}>
                  <a
                    onClick={() => navigate(item.href)}
                    className="flex items-center gap-2 text-gray-300 hover:text-blue-400 transition-colors duration-200 cursor-pointer px-3 py-2 rounded-md text-sm font-medium">
                    <item.icon size={16} />
                    {item.name}
                  </a>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="md:hidden">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md p-2">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ height: 0, opacity: 0 }}
              transition={{}}>
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 10, color: "#60a5fa" }}
                    className="text-gray-300 hover:text-blue-400 block px-3 py-2 rounded-md text-base font-medium transition-all duration-200 flex items-center gap-2"
                    onClick={() => setIsMenuOpen(false)}>
                    <item.icon size={18} />
                    {item.name}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}

export default Nav;
