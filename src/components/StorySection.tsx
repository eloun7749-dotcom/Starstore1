import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const ease = [0.16, 1, 0.3, 1] as const

export default function StorySection() {
  return (
    <section className="py-0 bg-cream overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[80vh]">
        {/* Left - Image */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease }}
          className="relative overflow-hidden"
        >
          <motion.img
            src="https://images.unsplash.com/photo-1442550528053-c431ecb55509?w=1000&q=80"
            alt="Coffee being poured into a V60 dripper"
            className="w-full h-full object-cover"
            initial={{ scale: 1.15 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease }}
          />
          {/* Overlay text */}
          <div className="absolute inset-0 flex items-end p-8 md:p-12">
            <div className="space-y-1">
              {['SLOWER', 'COFFEE', 'BRIGHTER', 'PEOPLE'].map((word, i) => (
                <motion.p
                  key={word}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 + i * 0.15, ease }}
                  className="font-serif text-4xl md:text-5xl font-light text-cream italic"
                >
                  {word}
                </motion.p>
              ))}
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-espresso/60 via-transparent to-transparent" />
        </motion.div>

        {/* Right - Sage green text block */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease }}
          className="bg-sage-green flex flex-col justify-center px-8 md:px-16 lg:px-20 py-20 relative"
        >
          {/* Botanical line art illustration */}
          <svg
            className="absolute right-4 bottom-4 w-32 h-32 opacity-20"
            viewBox="0 0 200 200"
            fill="none"
            stroke="#2E2824"
            strokeWidth="1"
          >
            <path d="M100 190 Q100 120 100 40" />
            <path d="M100 160 Q70 140 50 110" />
            <path d="M100 140 Q130 120 150 90" />
            <path d="M100 110 Q75 90 60 60" />
            <path d="M100 80 Q125 60 140 30" />
            <ellipse cx="50" cy="110" rx="12" ry="6" transform="rotate(-30 50 110)" />
            <ellipse cx="150" cy="90" rx="12" ry="6" transform="rotate(30 150 90)" />
            <ellipse cx="60" cy="60" rx="10" ry="5" transform="rotate(-20 60 60)" />
            <ellipse cx="140" cy="30" rx="10" ry="5" transform="rotate(20 140 30)" />
            <circle cx="100" cy="35" r="8" />
          </svg>

          <p className="meta-label text-espresso/60 mb-6">THE BREWING STORY</p>
          <h2 className="font-display text-display text-espresso mb-8">
            A ritual worth
            <br />
            <span className="italic">keeping.</span>
          </h2>
          <p className="text-espresso/70 leading-relaxed max-w-md mb-8">
            From bean to cup, we believe in time. Time to source carefully. Time to roast with intention. Time to enjoy what really matters.
          </p>
          <Link to="/about" className="btn-ghost group text-espresso">
            Our story
            <ArrowRight size={16} className="transition-transform duration-500 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
