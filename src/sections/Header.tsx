"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LogoIcon from "@/assets/logo.svg";
import MenuIcon from "@/assets/icon-menu.svg";
import Button from "@/components/ui/Button";

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="py-4 border-b border-white/15 md:border-none sticky top-0 z-20">
      {/* Blur bg for sticky header */}
      <div className="absolute inset-0 backdrop-blur -z-10 md:hidden"></div>

      <div className="container">
        <div className="flex justify-between items-center md:border border-white/15 md:p-2.5 rounded-xl max-w-2xl mx-auto relative">
          <div className="absolute inset-0 backdrop-blur -z-10 hidden md:block"></div>

          {/* Logo */}
          <div>
            <div className="border h-10 w-10 rounded-lg inline-flex justify-center items-center border-white/15">
              <LogoIcon className="h-8 w-8" />
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:block">
            <nav className="flex gap-8">
              <a className="text-white/70 hover:text-white transition" href="#">
                Features
              </a>
              <a className="text-white/70 hover:text-white transition" href="#">
                Developers
              </a>
              <a className="text-white/70 hover:text-white transition" href="#">
                Pricing
              </a>
              <a className="text-white/70 hover:text-white transition" href="#">
                Changelog
              </a>
            </nav>
          </div>

          {/* Right side */}
          <div className="flex gap-4 items-center">
            <Button>Get Started</Button>
            {/* Mobile menu toggle */}
            <button
              className="md:hidden"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label="Toggle menu"
            >
              <MenuIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu with Animation */}
      <AnimatePresence>
  {menuOpen && (
    <motion.div
      key="mobile-menu"
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.45, ease: "easeInOut" }}
      className="md:hidden overflow-hidden absolute top-full left-0 w-full bg-black shadow-2xl z-20 rounded-b-xl"
    >
      <nav className="flex flex-col p-6 gap-6 text-center border-t border-white/10">
        {/* Menu links */}
        {["Features", "Developers", "Pricing", "Changelog"].map((item, index) => (
          <motion.a
            key={item}
            href="#"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative text-lg font-medium text-white/80 hover:text-white transition group uppercase"
          >
            {item}
            <span className="absolute left-1/2 -bottom-1 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-500 transition-all duration-300 group-hover:w-1/2 group-hover:left-1/4"></span>
          </motion.a>
        ))}

        {/* Divider */}
        <div className="border-t border-white/10 my-4"></div>

        {/* CTA button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex justify-center"
        >
          <Button>
            ConnectUs
          </Button>
        </motion.div>

        {/* Close button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          whileHover={{ opacity: 1, scale: 1.1 }}
          transition={{ delay: 0.5 }}
          onClick={() => setMenuOpen(false)}
          className="mt-4 text-sm text-white/50 hover:text-white transition"
        >
          ✕ Close Menu
        </motion.button>
      </nav>
    </motion.div>
  )}
</AnimatePresence>

    </header>
  );
};
