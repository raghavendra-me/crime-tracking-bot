import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Toaster } from "react-hot-toast";

// Import components with updated names
import Hero from "./components/Hero";
import Features from "./components/Features"; // Previously About
import HowItWorks from "./components/HowItWorks"; // Previously Features
import Footer from "./components/Footer";
import ChatBot from "./components/ChatBot";

const App = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  useEffect(() => {
    // Handle initial page load animation
    setIsPageLoaded(true);

    // Scroll progress handler
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.pageYOffset / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle chat open/close
  const handleChatToggle = (state) => {
    setIsChatOpen(state);
    // Prevent body scroll when chat is open on mobile
    document.body.style.overflow = state ? 'hidden' : 'unset';
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative bg-[#1a1a1a] min-h-screen overflow-x-hidden"
    >
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 to-purple-600 z-50"
        style={{ 
          scaleX: scrollProgress / 100,
          transformOrigin: "left"
        }}
        initial={{ scaleX: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
      />

      {/* Main Content */}
      <main className="relative z-10">
        <Hero 
          onOpenChat={() => handleChatToggle(true)} 
          isPageLoaded={isPageLoaded}
        />
        <Features /> {/* Previous About content */}
        <HowItWorks /> {/* Previous Features content */}
        <Footer />
      </main>

      {/* Floating Chat Button */}
      <AnimatePresence>
        {!isChatOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleChatToggle(true)}
            className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg flex items-center justify-center z-50 hover:shadow-xl transition-shadow duration-300"
          >
            <div className="relative">
              <motion.div
                className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-4l-4 4-4-4z"
                />
              </svg>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chatbot */}
      <AnimatePresence mode="wait">
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ 
              type: "spring",
              stiffness: 300,
              damping: 30 
            }}
            className="fixed inset-0 z-50 flex items-center justify-center md:items-end md:justify-end md:inset-auto md:right-6 md:bottom-6"
          >
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => handleChatToggle(false)}
            />
            <ChatBot 
              isOpen={isChatOpen} 
              onClose={() => handleChatToggle(false)} 
              key={isChatOpen ? 'open' : 'closed'} // Force remount when opened
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast Notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#2a2a2a",
            color: "#fff",
            borderRadius: "0.5rem",
            border: "1px solid rgba(255,255,255,0.1)",
          },
          success: {
            iconTheme: {
              primary: '#10B981',
              secondary: '#fff',
            },
            duration: 3000,
          },
          error: {
            iconTheme: {
              primary: '#EF4444',
              secondary: '#fff',
            },
            duration: 4000,
          },
        }}
      />
    </motion.div>
  );
};

export default App;