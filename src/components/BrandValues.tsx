import { motion } from 'framer-motion'
import { Leaf, Coffee, CupSoda, Sun } from 'lucide-react'

const ease = [0.16, 1, 0.3, 1] as const

const features = [
  {
    icon: Leaf,
    title: 'Thoughtfully sourced',
    desc: 'Direct relationships with farmers. Prices above fair trade. Beans with a story.',
  },
  {
    icon: Coffee,
    title: 'Roasted with care',
    desc: 'Small batch roasting in our craft roastery. Every profile tuned by hand.',
  },
  {
    icon: CupSoda,
    title: 'A slower kind of luxury',
    desc: 'Not rushed. Not mass-produced. Just coffee, given the time it deserves.',
  },
  {
    icon: Sun,
    title: 'For brighter tomorrows',
    desc: 'Sustainable practices from farm to cup. A kinder future, one bag at a time.',
  },
]

export default function BrandValues() {
  return (
    <section className="py-24 md:py-32 bg-cream-dark section-pad">
      <div className="max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, delay: i * 0.1, ease }}
              className="group text-center md:text-left"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.4 }}
                className="inline-flex mb-6"
              >
                <feature.icon size={36} strokeWidth={1} className="text-shadow-olive" />
              </motion.div>
              <h3 className="font-serif text-xl font-normal text-espresso mb-3">
                {feature.title}
              </h3>
              <p className="text-sm text-terracotta leading-relaxed max-w-xs">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
