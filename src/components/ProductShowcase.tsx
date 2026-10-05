import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import ProductCard from './ProductCard'
import { products } from '../data/products'

const ease = [0.16, 1, 0.3, 1] as const

export default function ProductShowcase() {
  return (
    <section className="py-24 md:py-32 bg-cream section-pad">
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Left column */}
        <div className="lg:col-span-4 lg:sticky lg:top-32 lg:self-start">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease }}
            className="meta-label text-terracotta mb-6"
          >
            OUR COFFEES
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.1, ease }}
            className="font-display text-display text-espresso mb-6"
          >
            Distinct flavours.
            <br />
            <span className="italic">A calmer pace.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease }}
            className="text-terracotta leading-relaxed mb-8 max-w-sm"
          >
            Three coffees. A more meaningful morning. Each one tells a story of origin, craft, and the people who made it possible.
          </motion.p>
          <Link to="/shop" className="btn-ghost group">
            View all coffee
            <ArrowRight size={16} className="transition-transform duration-500 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Right - Product grid */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.slice(0, 3).map((product, i) => (
            <div key={product.id} className={i === 1 ? 'lg:mt-16' : ''}>
              <ProductCard product={product} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
