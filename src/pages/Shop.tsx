import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { products, accessories, allProducts } from '../data/products'

const ease = [0.16, 1, 0.3, 1] as const
const categories = ['All', 'Coffee', 'Accessories'] as const
const roasts = ['All', 'Light', 'Medium', 'Dark'] as const

export default function Shop() {
  const [searchParams] = useSearchParams()
  const initialCat = searchParams.get('cat') === 'accessories' ? 'Accessories' : 'All'
  const [category, setCategory] = useState<typeof categories[number]>(initialCat)
  const [roast, setRoast] = useState<typeof roasts[number]>('All')

  const filtered = useMemo(() => {
    let list = allProducts
    if (category === 'Coffee') list = products
    else if (category === 'Accessories') list = accessories
    if (roast !== 'All' && category !== 'Accessories') {
      list = list.filter((p) => p.roastLevel === roast)
    }
    return list
  }, [category, roast])

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
          THE COLLECTION
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1, ease }}
          className="font-display text-display text-espresso"
        >
          Every cup, <span className="italic">a journey.</span>
        </motion.h1>
      </div>

      {/* Filters */}
      <div className="section-pad mb-12 flex flex-wrap items-center gap-6 border-y border-vellum py-6">
        <div className="flex items-center gap-4">
          <span className="meta-label text-terracotta text-[10px]">CATEGORY</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`text-sm transition-colors duration-300 ${
                category === cat ? 'text-espresso font-medium' : 'text-terracotta hover:text-espresso'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        {category !== 'Accessories' && (
          <div className="flex items-center gap-4 ml-auto">
            <span className="meta-label text-terracotta text-[10px]">ROAST</span>
            {roasts.map((r) => (
              <button
                key={r}
                onClick={() => setRoast(r)}
                className={`text-sm transition-colors duration-300 ${
                  roast === r ? 'text-espresso font-medium' : 'text-terracotta hover:text-espresso'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Grid */}
      <div className="section-pad">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 max-w-[1600px] mx-auto">
          {filtered.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="font-serif text-2xl font-light text-terracotta">No coffees match this filter.</p>
          </div>
        )}
      </div>
    </motion.div>
  )
}
