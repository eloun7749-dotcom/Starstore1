import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ShoppingBag, User, Menu, X } from 'lucide-react'
import { useCart } from '../context/CartContext'

const navLinks = [
  { label: 'Coffee', path: '/shop' },
  { label: 'Our Story', path: '/about' },
  { label: 'Journal', path: '/journal' },
  { label: 'Accessories', path: '/shop?cat=accessories' },
  { label: 'Shop', path: '/shop' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { totalItems, openCart } = useCart()
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const transparent = isHome && !scrolled

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          transparent
            ? 'bg-transparent py-6'
            : 'bg-cream/80 backdrop-blur-xl py-4 border-b border-vellum/50'
        }`}
      >
        <div className="section-pad flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="group">
            <span className={`font-serif text-2xl font-light tracking-tight transition-colors duration-500 ${transparent ? 'text-cream' : 'text-espresso'}`}>
              SLOW <span className="italic font-extralight">/</span> ROAST
            </span>
          </Link>

          {/* Center nav */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.path}
                className={`meta-label transition-colors duration-300 hover:opacity-60 ${
                  transparent ? 'text-cream/90' : 'text-espresso'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right icons */}
          <div className="flex items-center gap-5">
            <button
              className={`hidden md:block transition-colors duration-300 hover:opacity-60 ${
                transparent ? 'text-cream' : 'text-espresso'
              }`}
              aria-label="Search"
            >
              <Search size={18} strokeWidth={1.5} />
            </button>
            <button
              onClick={openCart}
              className={`relative transition-colors duration-300 hover:opacity-60 ${
                transparent ? 'text-cream' : 'text-espresso'
              }`}
              aria-label="Cart"
            >
              <ShoppingBag size={18} strokeWidth={1.5} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-shadow-olive text-cream text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
            <button
              className={`hidden md:block transition-colors duration-300 hover:opacity-60 ${
                transparent ? 'text-cream' : 'text-espresso'
              }`}
              aria-label="Account"
            >
              <User size={18} strokeWidth={1.5} />
            </button>
            <button
              onClick={() => setMobileOpen(true)}
              className={`lg:hidden transition-colors ${transparent ? 'text-cream' : 'text-espresso'}`}
              aria-label="Menu"
            >
              <Menu size={22} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-espresso lg:hidden"
          >
            <div className="flex items-center justify-between px-6 py-6">
              <span className="font-serif text-2xl font-light text-cream">SLOW / ROAST</span>
              <button onClick={() => setMobileOpen(false)} className="text-cream">
                <X size={24} strokeWidth={1.5} />
              </button>
            </div>
            <div className="flex flex-col gap-8 px-6 mt-12">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * i, duration: 0.5 }}
                >
                  <Link
                    to={link.path}
                    onClick={() => setMobileOpen(false)}
                    className="font-serif text-4xl font-light text-cream"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
