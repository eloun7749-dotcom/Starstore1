import { motion } from 'framer-motion'
import Hero from '../components/Hero'
import ProductShowcase from '../components/ProductShowcase'
import StorySection from '../components/StorySection'
import BrandValues from '../components/BrandValues'

const ease = [0.16, 1, 0.3, 1] as const

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease }}
    >
      <Hero />
      <ProductShowcase />
      <StorySection />
      <BrandValues />

      {/* Quote section */}
      <section className="py-32 md:py-40 bg-cream section-pad">
        <div className="max-w-3xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease }}
            className="font-display text-3xl md:text-5xl font-light text-espresso leading-relaxed italic"
          >
            "Coffee is a language in itself, a quiet conversation between the earth and the cup."
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="meta-label text-terracotta mt-8"
          >
            — THE SLOW / ROAST PHILOSOPHY
          </motion.p>
        </div>
      </section>
    </motion.div>
  )
}
