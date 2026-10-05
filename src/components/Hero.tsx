import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const ease = [0.16, 1, 0.3, 1] as const

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-cream-dark">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-cream via-cream to-cream-dark" />

      <div className="section-pad relative z-10 w-full max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pt-20">
        {/* Left - Text */}
        <div className="order-2 lg:order-1">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease }}
            className="meta-label text-terracotta mb-8"
          >
            BETTER COFFEE / BRIGHTER DAYS
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease }}
            className="font-display text-hero text-espresso"
          >
            Good mornings
            <br />
            take their
            <br />
            <span className="italic">time.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9, ease }}
            className="text-lg text-terracotta mt-8 max-w-md leading-relaxed"
          >
            Thoughtfully sourced coffee for a more human day.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2, ease }}
            className="mt-10"
          >
            <Link to="/shop" className="btn-primary group">
              Explore our coffee
              <ArrowRight size={16} className="transition-transform duration-500 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>

        {/* Right - Image */}
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.8, delay: 0.4, ease }}
          className="order-1 lg:order-2 relative aspect-[4/5] lg:aspect-[3/4] overflow-hidden rounded-sm"
        >
          <motion.img
            src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=1000&q=80"
            alt="Coffee bag with cup and plant in soft window light"
            className="w-full h-full object-cover"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          />
          {/* Steam animation */}
          <div className="absolute bottom-1/3 left-1/3 pointer-events-none">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-20 bg-gradient-to-t from-transparent via-white/20 to-transparent rounded-full blur-sm"
                style={{ left: `${i * 12}px` }}
                animate={{ opacity: [0, 0.4, 0], y: [0, -60], scaleX: [1, 1.5, 2] }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.8, ease: 'easeOut' }}
              />
            ))}
          </div>
          {/* Floating particles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-cream/40"
              style={{ left: `${15 + i * 12}%`, top: `${20 + (i % 3) * 25}%` }}
              animate={{ y: [0, -20, 0], opacity: [0, 0.6, 0] }}
              transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.5 }}
            />
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="meta-label text-terracotta/50 text-[10px]">SCROLL</span>
        <motion.div
          className="w-px h-12 bg-terracotta/30"
          animate={{ scaleY: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ transformOrigin: 'top' }}
        />
      </motion.div>
    </section>
  )
}
