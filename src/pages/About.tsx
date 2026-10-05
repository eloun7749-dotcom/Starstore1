import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import BrandValues from '../components/BrandValues'

const ease = [0.16, 1, 0.3, 1] as const

export default function About() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease }}
      className="bg-cream"
    >
      {/* Hero */}
      <section className="pt-40 pb-24 section-pad">
        <div className="max-w-4xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
            className="meta-label text-terracotta mb-6"
          >
            OUR STORY
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease }}
            className="font-display text-hero text-espresso mb-8"
          >
            From carefully sourced beans to perfectly <span className="italic">roasted coffee.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease }}
            className="text-xl text-terracotta leading-relaxed max-w-2xl"
          >
            We started SLOW / ROAST with a simple belief: that coffee deserves time. Time to grow. Time to roast. Time to brew. Time to enjoy.
          </motion.p>
        </div>
      </section>

      {/* Image */}
      <section className="overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease }}
          className="aspect-[16/8] overflow-hidden"
        >
          <img
            src="https://images.unsplash.com/photo-1486428128344-5413e434ad35?w=1600&q=80"
            alt="Coffee plantation in misty highlands"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </section>

      {/* Story text */}
      <section className="py-24 md:py-32 section-pad">
        <div className="max-w-3xl mx-auto space-y-8">
          {[
            'It began with a single trip to the highlands of Yirgacheffe. Standing in the mist at 2,100 meters, watching farmers hand-pick heirloom varietals with a care that bordered on reverence, we understood something: great coffee is not made. It is cultivated, patiently, over generations.',
            'We returned home with a mission — to bring that same patience to every step of the process. To roast in small batches. To source directly. To pay above fair trade. To treat each bag as if it were the only one.',
            'Today, SLOW / ROAST is more than a coffee company. It is a philosophy. A reminder that the best things in life are not rushed. That a morning cup, brewed with intention, can be a daily act of beauty.',
            'We invite you to slow down with us. To taste the difference that time makes. To join a community of people who believe that better coffee leads to brighter days.',
          ].map((paragraph, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1, ease }}
              className="text-lg text-terracotta leading-relaxed"
            >
              {paragraph}
            </motion.p>
          ))}
        </div>
      </section>

      {/* Split image + text */}
      <section className="grid grid-cols-1 lg:grid-cols-2 min-h-[70vh]">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease }}
          className="relative overflow-hidden"
        >
          <img
            src="https://images.unsplash.com/photo-1559563458-527698bf5295?w=1000&q=80"
            alt="Coffee roasting process"
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="bg-sage-green flex flex-col justify-center px-8 md:px-16 lg:px-20 py-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease }}
            className="meta-label text-espresso/60 mb-6"
          >
            OUR PROMISE
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.1, ease }}
            className="font-display text-4xl md:text-5xl font-light text-espresso mb-8"
          >
            Every bean, <span className="italic">accounted for.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease }}
            className="text-espresso/70 leading-relaxed mb-8 max-w-md"
          >
            We publish our prices. We name our farmers. We trace every bean from the hillside to your cup. Because transparency is not a feature — it is a responsibility.
          </motion.p>
          <Link to="/shop" className="btn-ghost group text-espresso">
            Explore our coffees
            <ArrowRight size={16} className="transition-transform duration-500 group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      <BrandValues />
    </motion.div>
  )
}
