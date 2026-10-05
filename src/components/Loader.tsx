import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function Loader() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1800)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] bg-espresso flex items-center justify-center"
        >
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="font-serif text-4xl font-light text-cream mb-8"
            >
              SLOW <span className="italic font-extralight">/</span> ROAST
            </motion.div>
            {/* Pouring line */}
            <div className="w-48 h-px bg-cream/20 mx-auto overflow-hidden">
              <motion.div
                className="h-full bg-cream"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformOrigin: 'left' }}
              />
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="meta-label text-cream/40 mt-6"
            >
              BREWING YOUR EXPERIENCE
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
