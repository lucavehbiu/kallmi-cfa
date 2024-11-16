import { motion } from 'framer-motion';
import { useState } from 'react';

interface Product {
  id: number;
  name: string;
  year: number;
  size: string;
  price: number;
  image: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Estate Reserve Olive Oil",
    year: 2023,
    size: "500ml",
    price: 29.99,
    image: "/images/bottle-1.webp"
  },
  {
    id: 2,
    name: "Limited Harvest",
    year: 2023,
    size: "750ml",
    price: 39.99,
    image: "/images/bottle-2.webp"
  },
  // Add more products as needed
];

const Shop = () => {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-stone-50 font-cormorant">
      {/* Hero Section */}
      <div className="h-[40vh] relative overflow-hidden">
        <div className="absolute inset-0 bg-black/40" />
        <img
          src="/images/hand_harvested.webp"
          alt="Olive Oil Collection"
          className="w-full h-full object-cover object-center"
        />
        <h1 className="absolute inset-0 flex items-center justify-center text-5xl text-white font-light tracking-wider">
          Our Collection
        </h1>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            <div>
              <h3 className="text-2xl font-light mb-4">Harvest Year</h3>
              <div className="space-y-2">
                {[2023, 2022, 2021].map((year) => (
                  <button
                    key={year}
                    onClick={() => setSelectedYear(year === selectedYear ? null : year)}
                    className={`block w-full text-left px-4 py-2 transition-colors ${
                      year === selectedYear
                        ? 'bg-stone-800 text-white'
                        : 'hover:bg-stone-100'
                    }`}
                  >
                    {year}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-light mb-4">Bottle Size</h3>
              <div className="space-y-2">
                {['250ml', '500ml', '750ml'].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size === selectedSize ? null : size)}
                    className={`block w-full text-left px-4 py-2 transition-colors ${
                      size === selectedSize
                        ? 'bg-stone-800 text-white'
                        : 'hover:bg-stone-100'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {products.map((product) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="group"
                >
                  <div className="aspect-[3/4] overflow-hidden bg-stone-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="mt-4 space-y-1">
                    <h3 className="text-xl font-light">{product.name}</h3>
                    <p className="text-sm text-stone-600">
                      {product.size} • {product.year} Harvest
                    </p>
                    <p className="text-lg">${product.price}</p>
                    <button className="w-full py-2 px-4 bg-stone-800 text-white hover:bg-stone-700 transition-colors">
                      Add to Cart
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;