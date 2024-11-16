import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed w-full z-50 transition-all duration-500 ${
          isScrolled ? 'bg-white/90 backdrop-blur-md shadow-md' : 'bg-transparent'
        }`}
      >
        <div className="w-full px-4 sm:px-6 py-4">
          <nav className="flex items-center justify-between max-w-[1920px] mx-auto">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-2xl p-2"
            >
              <span className={`${isScrolled ? 'text-gray-800' : 'text-white'}`}>
                {isMobileMenuOpen ? '×' : '☰'}
              </span>
            </button>

            <div className="hidden md:flex space-x-16 flex-1 justify-start">
              {['Shop', 'Our Story'].map((item) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  className={`font-cormorant text-lg ${
                    isScrolled ? 'text-gray-800' : 'text-white'
                  } hover:text-[#8B7355] transition-colors`}
                  whileHover={{ y: -2 }}
                >
                  {item}
                </motion.a>
              ))}
            </div>

            <motion.a
              href="/"
              className="text-2xl sm:text-3xl font-cormorant tracking-[0.3em] sm:tracking-[0.5em] text-center whitespace-nowrap"
              whileHover={{ scale: 1.05 }}
            >
              KALLMI
            </motion.a>

            <div className="hidden md:flex space-x-16 flex-1 justify-end">
              {['Process', 'Contact'].map((item) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  className={`font-cormorant text-lg ${
                    isScrolled ? 'text-gray-800' : 'text-white'
                  } hover:text-[#8B7355] transition-colors`}
                  whileHover={{ y: -2 }}
                >
                  {item}
                </motion.a>
              ))}
            </div>
          </nav>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed inset-0 z-40 bg-black/95 pt-24"
          >
            <nav className="flex flex-col items-center space-y-8 p-8">
              {['Shop', 'Our Story', 'Process', 'Contact'].map((item) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  className="font-cormorant text-2xl text-white hover:text-[#8B7355] transition-colors"
                  whileHover={{ x: 10 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;