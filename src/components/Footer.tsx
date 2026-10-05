import { Link } from 'react-router-dom'
import { Instagram, ArrowRight } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-espresso text-cream px-6 md:px-12 lg:px-20 pt-24 pb-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-16 max-w-7xl mx-auto">
        {/* Left */}
        <div>
          <h3 className="font-serif text-3xl font-light mb-4">
            SLOW <span className="italic font-extralight">/</span> ROAST
          </h3>
          <p className="meta-label text-cream/50">GOOD COFFEE / A KINDER TOMORROW</p>
        </div>

        {/* Center */}
        <div>
          <ul className="space-y-3">
            {['Coffee', 'Our Story', 'Journal', 'Contact'].map((item) => (
              <li key={item}>
                <Link
                  to={item === 'Coffee' ? '/shop' : item === 'Our Story' ? '/about' : item === 'Journal' ? '/journal' : '/'}
                  className="text-cream/70 hover:text-cream transition-colors duration-300 text-sm"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Right - Newsletter */}
        <div>
          <p className="meta-label text-cream/50 mb-4">JOIN A CALMER INBOX</p>
          <div className="flex items-center gap-3 border-b border-cream/30 pb-3 max-w-xs">
            <input
              type="email"
              placeholder="Your email"
              className="bg-transparent text-cream placeholder:text-cream/40 text-sm w-full focus:outline-none"
            />
            <button className="text-cream/60 hover:text-cream transition-colors" aria-label="Subscribe">
              <ArrowRight size={18} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-cream/15 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-cream/40 text-xs">© 2026 SLOW / ROAST. All rights reserved.</p>
        <div className="flex items-center gap-5">
          <a href="#" className="text-cream/50 hover:text-cream transition-colors" aria-label="Instagram">
            <Instagram size={18} strokeWidth={1.5} />
          </a>
          <a href="#" className="text-cream/50 hover:text-cream transition-colors text-xs meta-label">
            Pinterest
          </a>
          <a href="#" className="text-cream/50 hover:text-cream transition-colors text-xs meta-label">
            Spotify
          </a>
        </div>
      </div>
    </footer>
  )
}
