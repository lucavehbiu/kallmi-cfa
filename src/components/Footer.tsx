import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="bg-[#1C1C1C] text-white/90 py-16">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-6">
            <h3 className="font-cormorant text-2xl tracking-wider">KALLMI ESTATE</h3>
            <p className="text-sm text-white/70 leading-relaxed">
              Crafting exceptional olive oil from the pristine shores of Albania since 1923.
            </p>
          </div>

          <div>
            <h4 className="font-cormorant text-xl mb-4">Quick Links</h4>
            <ul className="space-y-3 text-white/70">
              {['Shop', 'Our Story', 'Process', 'Contact'].map((item) => (
                <motion.li key={item} whileHover={{ x: 5 }} className="transition-colors hover:text-[#8B7355]">
                  <a href={`#${item.toLowerCase()}`}>{item}</a>
                </motion.li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-cormorant text-xl mb-4">Visit Us</h4>
            <address className="text-white/70 not-italic">
              Kallmi Estate<br />
              Coastal Road 23<br />
              Durrës, Albania<br />
              <a href="tel:+355123456789" className="hover:text-[#8B7355] transition-colors">
                +355 123 456 789
              </a>
            </address>
          </div>

          <div>
            <h4 className="font-cormorant text-xl mb-4">Newsletter</h4>
            <form className="space-y-4">
              <input
                type="email"
                placeholder="Your email"
                className="w-full bg-white/10 border border-white/20 rounded px-4 py-2 focus:outline-none focus:border-[#8B7355]"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-[#8B7355] py-2 rounded hover:bg-[#6B563F] transition-colors"
              >
                Subscribe
              </motion.button>
            </form>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 text-center text-white/50 text-sm">
          © {new Date().getFullYear()} Kallmi Estate. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;