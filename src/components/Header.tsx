import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="w-full px-6 py-4">
        <nav className="flex items-center justify-between max-w-[1920px] mx-auto">
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
            className="text-3xl font-cormorant tracking-[0.5em] text-center whitespace-nowrap"
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
  );
};

export default Header;