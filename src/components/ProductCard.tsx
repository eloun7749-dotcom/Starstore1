import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Product } from '../data/products'
import { useCart } from '../context/CartContext'

const ease = [0.16, 1, 0.3, 1] as const

export default function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { addToCart } = useCart()

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, delay: index * 0.15, ease }}
      className="group"
    >
      <div className="relative overflow-hidden rounded-sm bg-vellum/40 aspect-square mb-5">
        <Link to={`/product/${product.id}`}>
          <motion.img
            src={product.image}
            alt={product.imageAlt}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-espresso/0 group-hover:bg-espresso/10 transition-colors duration-500" />
        </Link>

        {/* Quick add button */}
        <motion.button
          onClick={() => addToCart(product)}
          className="absolute bottom-4 right-4 w-11 h-11 rounded-full bg-espresso text-cream flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 hover:bg-shadow-olive hover:scale-110"
          aria-label={`Add ${product.name} to cart`}
          initial={{ scale: 0.6 }}
          whileHover={{ scale: 1.1 }}
        >
          <Plus size={18} strokeWidth={1.5} />
        </motion.button>

        {/* Roast level badge */}
        <div className="absolute top-4 left-4">
          <span className="meta-label text-[10px] bg-cream/80 backdrop-blur-sm px-3 py-1.5 rounded-full text-espresso">
            {product.roastLevel}
          </span>
        </div>
      </div>

      {/* Product info */}
      <Link to={`/product/${product.id}`} className="block">
        <h3 className="font-serif text-2xl font-light text-espresso mb-1 group-hover:text-shadow-olive transition-colors duration-300">
          {product.name}
        </h3>
        <p className="text-sm text-terracotta mb-2">{product.origin}</p>
        <p className="text-sm text-espresso/60 mb-3">
          {product.flavorNotes.join(' · ')}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-serif text-espresso">${product.price}</span>
          <span className="text-xs text-terracotta">{product.weight}</span>
        </div>
      </Link>
    </motion.div>
  )
}
