import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { journalPosts } from '../data/journal'

const ease = [0.16, 1, 0.3, 1] as const

export default function Journal() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease }}
      className="pt-32 pb-24 min-h-screen bg-cream"
    >
      {/* Header */}
      <div className="section-pad mb-16">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
          className="meta-label text-terracotta mb-4"
        >
          THE JOURNAL
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1, ease }}
          className="font-display text-display text-espresso"
        >
          Stories, brewed <span className="italic">slowly.</span>
        </motion.h1>
      </div>

      {/* Featured post */}
      <div className="section-pad mb-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-[1600px] mx-auto"
        >
          <Link to={`/journal`} className="group overflow-hidden rounded-sm">
            <div className="aspect-[4/3] overflow-hidden">
              <motion.img
                src={journalPosts[0].image}
                alt={journalPosts[0].title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </Link>
          <div>
            <p className="meta-label text-terracotta mb-4">
              {journalPosts[0].category} · {journalPosts[0].readTime}
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-light text-espresso mb-4">
              {journalPosts[0].title}
            </h2>
            <p className="text-terracotta leading-relaxed mb-6 max-w-md">
              {journalPosts[0].excerpt}
            </p>
            <p className="text-sm text-terracotta/60 mb-6">{journalPosts[0].date}</p>
            <Link to="/journal" className="btn-ghost group">
              Read article
              <ArrowRight size={16} className="transition-transform duration-500 group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Grid */}
      <div className="section-pad">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 max-w-[1600px] mx-auto">
          {journalPosts.slice(1).map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, delay: i * 0.1, ease }}
            >
              <Link to="/journal" className="group block">
                <div className="aspect-[4/3] overflow-hidden rounded-sm mb-5">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <p className="meta-label text-terracotta mb-2 text-[10px]">
                  {post.category} · {post.readTime}
                </p>
                <h3 className="font-serif text-2xl font-light text-espresso mb-2 group-hover:text-shadow-olive transition-colors duration-300">
                  {post.title}
                </h3>
                <p className="text-sm text-terracotta leading-relaxed mb-3">{post.excerpt}</p>
                <p className="text-xs text-terracotta/60">{post.date}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
