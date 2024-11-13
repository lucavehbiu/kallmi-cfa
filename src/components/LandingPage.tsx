import React from 'react';

const LandingPage: React.FC = () => {
  return (
    <div className="font-cormorant text-gray-800 overflow-hidden">
      {/* Hero Section - Enhanced with parallax-like effect and gradient overlay */}
      <section className="relative h-screen">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50">
          <img
            src="/images/hero-bg.jpg"
            alt="Olive grove"
            className="w-full h-full object-cover scale-110 animate-subtle-zoom"
          />
        </div>

        <div className="relative flex items-center justify-center h-full text-center text-white">
          <div className="max-w-3xl px-8 animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-light tracking-[0.25em] mb-6 transform hover:scale-105 transition-transform duration-500">
              KALLMI ESTATE
            </h1>
            <p className="text-xl md:text-2xl italic mb-12 opacity-90">
              Liquid gold from the sun-kissed shores of Albania
            </p>
            <a
              href="#"
              className="group inline-block px-8 py-4 bg-[#8B7355]/90 hover:bg-[#8B7355]
                         transition-all duration-300 rounded-md text-white border border-white/20
                         hover:border-white/40 backdrop-blur-sm hover:shadow-xl
                         transform hover:-translate-y-1"
            >
              <span className="group-hover:tracking-wider transition-all duration-300">
                Experience Our Heritage
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* Features Section - Enhanced with cards and hover effects */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group text-center p-8 rounded-lg hover:bg-white hover:shadow-2xl
                           transition-all duration-500 transform hover:-translate-y-2"
              >
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-20 h-20 mx-auto mb-6 group-hover:scale-110 transition-transform duration-500"
                />
                <h3 className="text-2xl text-[#8B7355] mb-4 group-hover:text-[#6B563F]">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section - Enhanced with scroll reveal effect */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-5xl font-light text-[#8B7355]">Our Story</h2>
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
            <div className="h-[500px] lg:h-[600px] rounded-lg overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-500">
              <img
                src="/images/story.jpg"
                alt="Kallmi Estate"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Feature data
const features = [
  {
    title: 'Hand-Harvested',
    description: 'Each olive carefully selected at peak ripeness from our century-old groves',
    image: '/images/olive-branch.svg'
  },
  {
    title: 'Cold-Pressed',
    description: 'Pressed within hours of harvest to capture the purest flavors',
    image: '/images/cold-press.svg'
  },
  {
    title: 'Family Legacy',
    description: "Five generations of olive oil craftsmanship on Kallmi's pristine coast",
    image: '/images/family.svg'
  }
];

export default LandingPage;