import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-[#1C1C1C] text-white/90 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          <div className="space-y-4 sm:space-y-6 text-center sm:text-left">
            <h3 className="font-cormorant text-2xl tracking-wider">KALLMI ESTATE</h3>
            <p className="text-sm text-white/70 leading-relaxed max-w-xs mx-auto sm:mx-0">
              Crafting exceptional olive oil from the pristine shores of Albania since 2005.
            </p>
          </div>

          <div className="text-center sm:text-left">
            <h4 className="font-cormorant text-xl mb-4">Quick Links</h4>
            <ul className="space-y-3 text-white/70">
              <li className="hover:text-[#8B7355] transition-colors">
                <Link href="/shop">Shop</Link>
              </li>
              <li className="hover:text-[#8B7355] transition-colors">
                <Link href="/#our-story">Our Story</Link>
              </li>
              <li className="hover:text-[#8B7355] transition-colors">
                <Link href="/contact">Contact</Link>
              </li>
            </ul>
          </div>

          <div className="text-center sm:text-left">
            <h4 className="font-cormorant text-xl mb-4">Visit Us</h4>
            <address className="text-white/70 not-italic">
              Kallmi Estate<br />
              Rruga Currila, 2001<br />
              Durrës, Albania<br />
              <a href="tel:+355682450851" className="hover:text-[#8B7355] transition-colors">
                +355 68 24 50 851
              </a>
            </address>
          </div>

          <div className="text-center sm:text-left">
            <h4 className="font-cormorant text-xl mb-4">Newsletter</h4>
            <form className="space-y-4 max-w-xs mx-auto sm:mx-0">
              <input
                type="email"
                placeholder="Your email"
                className="w-full bg-white/10 border border-white/20 rounded px-4 py-3 focus:outline-none focus:border-[#8B7355]"
              />
              <button
                type="submit"
                className="w-full bg-[#8B7355] py-3 rounded hover:bg-[#6B563F] transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 sm:mt-16 pt-8 border-t border-white/10 text-center text-white/50 text-sm">
          © {new Date().getFullYear()} Kallmi Estate. All rights reserved.
        </div>
      </div>
    </footer>
  )
}