import React from 'react';
import { motion } from 'framer-motion';

const LandingPage: React.FC = () => {
  return (
    <div className="font-cormorant text-gray-800 overflow-hidden">
      {/* Hero Section - Adding subtle text animation and enhanced overlay */}
      <section className="relative h-[90vh] sm:h-screen">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60 backdrop-blur-[2px]">
          <motion.img
            src="/images/hero_3rd.webp"
            alt="Olive grove"
            loading="lazy"
            className="w-full h-full object-cover scale-110"
            initial={{ scale: 1.2 }}
            animate={{ scale: 1.1 }}
            transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
          />
        </div>

        <div className="relative flex items-center justify-center h-full text-center text-white">
          <motion.div
            className="max-w-3xl px-4 sm:px-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-light tracking-[0.15em] sm:tracking-[0.25em] mb-4 sm:mb-6
                         transform hover:scale-105 transition-transform duration-500 drop-shadow-2xl">
              KALLMI ESTATE
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl italic mb-8 sm:mb-12 opacity-90">
              Liquid gold from the sun-kissed shores of Albania
            </p>
            <a
              href="/shop"
              className="group inline-block px-8 py-4 bg-[#8B7355]/90 hover:bg-[#8B7355]
                         transition-all duration-300 rounded-md text-white border border-white/20
                         hover:border-white/40 backdrop-blur-sm hover:shadow-xl
                         transform hover:-translate-y-1"
            >
              <span className="group-hover:tracking-wider transition-all duration-300">
                Experience Our Heritage
              </span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Features Section - Adding sophisticated hover states */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-gray-50 to-white">
        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="group text-center p-8 rounded-lg hover:bg-white/80 hover:shadow-2xl
                           backdrop-blur-sm transition-all duration-500 transform hover:-translate-y-2
                           border border-transparent hover:border-gray-100"
              >
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-40 h-40 mx-auto mb-6 rounded-full object-cover
                             group-hover:scale-110 transition-transform duration-500
                             shadow-md"
                />
                <h3 className="text-2xl text-[#8B7355] mb-4 group-hover:text-[#6B563F]">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Story Section - Adding parallax effect */}
      <section className="py-20 sm:py-32 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/subtle-pattern.png')] opacity-5"></div>
        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-8 relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-16 items-center">
            <div className="space-y-6 sm:space-y-8">
              <h2 className="text-4xl sm:text-5xl font-light text-[#8B7355]">Our Story</h2>
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p>
                  Nestled along the pristine beaches of Kallmi, our olive groves have been
                  cultivated by our family for generations. The unique microclimate, where
                  sea breezes meet mountain air, creates olives of exceptional character.
                </p>
                <p>
                  Our extra virgin olive oil captures the essence of this magical place -
                  bright, peppery, with notes of fresh herbs and a velvety finish that
                  lingers on the palate.
                </p>
                <p>
                  Every bottle tells the story of our land, our family, and our unwavering
                  commitment to producing the finest olive oil in Albania.
                </p>
              </div>
            </div>
            <div className="h-[400px] sm:h-[500px] lg:h-[600px] rounded-lg overflow-hidden shadow-2xl">
              <img
                src="/images/history.webp"
                alt="Kallmi Estate"
                className="w-full h-full object-cover object-[50%_35%] scale-[1.15] hover:scale-100 transition-transform duration-700"
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* WhatsApp button - Fixed z-index and animation issues */}
      <motion.a
        href="https://wa.me/355682450851"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-[100] bg-[#25D366] p-4 rounded-full shadow-lg
                   hover:shadow-2xl transition-all duration-300 group
                   hover:bg-[#1ea952] focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 1 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        aria-label="Chat with us on WhatsApp"
      >
        <span className="absolute -inset-1 rounded-full animate-ping bg-[#25D366] opacity-40"></span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="w-6 h-6 fill-white group-hover:scale-110 transition-transform duration-300"
          aria-hidden="true"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>

        <span className="absolute right-full mr-3 bg-black/80 text-white px-3 py-1 rounded
                        text-sm whitespace-nowrap opacity-0 group-hover:opacity-100
                        transition-opacity duration-300 pointer-events-none
                        before:content-[''] before:absolute before:-right-2 before:top-1/2 before:-mt-2
                        before:border-l-8 before:border-y-[8px] before:border-y-transparent
                        before:border-l-black/80">
          Chat with us
        </span>
      </motion.a>

    </div>
  );
};

// Feature data
const features = [
  {
    title: 'Hand-Harvested',
    description: 'Each olive carefully selected at peak ripeness from our century-old groves',
    image: '/images/hand_harvested.webp'
  },
  {
    title: 'Cold-Pressed',
    description: 'Pressed within hours of harvest to capture the purest flavors',
    image: '/images/cold_pressed.webp'
  },
  {
    title: 'Family Legacy',
    description: "Five generations of olive oil craftsmanship on Kallmi's pristine coast",
    image: '/images/family_legacy.webp'
  }
];

export default LandingPage;