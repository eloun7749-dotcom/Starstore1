import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Plus, Minus, Star, Check } from 'lucide-react'
import { useState } from 'react'
import { getProductById, products } from '../data/products'
import { useCart } from '../context/CartContext'
import ProductCard from '../components/ProductCard'

const ease = [0.16, 1, 0.3, 1] as const

export default function ProductDetail() {
  const { id } = useParams()
  const product = getProductById(id || '')
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState<'story' | 'brewing' | 'reviews'>('story')

  if (!product) {
    return (
      <div className="pt-40 pb-20 text-center min-h-screen bg-cream">
        <p className="font-serif text-3xl font-light text-espresso mb-4">Coffee not found</p>
        <Link to="/shop" className="btn-primary">Back to shop</Link>
      </div>
    )
  }

  const related = products.filter((p) => p.id !== product.id).slice(0, 3)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease }}
      className="pt-28 pb-24 bg-cream min-h-screen"
    >
      {/* Breadcrumb */}
      <div className="section-pad mb-8">
        <div className="flex items-center gap-2 text-xs text-terracotta">
          <Link to="/" className="hover:text-espresso transition-colors">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-espresso transition-colors">Shop</Link>
          <span>/</span>
          <span className="text-espresso">{product.name}</span>
        </div>
      </div>

      {/* Main product section - sticky scroll layout */}
      <div className="section-pad grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 max-w-[1600px] mx-auto">
        {/* Left - Image (sticky) */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease }}
            className="relative aspect-square overflow-hidden rounded-sm bg-vellum/40"
          >
            <motion.img
              src={product.image}
              alt={product.imageAlt}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.8 }}
            />
            <div className="absolute top-4 left-4">
              <span className="meta-label text-[10px] bg-cream/80 backdrop-blur-sm px-3 py-1.5 rounded-full text-espresso">
                {product.roastLevel} Roast
              </span>
            </div>
          </motion.div>

          {/* Thumbnails */}
          <div className="grid grid-cols-4 gap-3 mt-4">
            {[product.image, product.image, product.image, product.image].map((img, i) => (
              <div key={i} className="aspect-square overflow-hidden rounded-sm bg-vellum/40 cursor-pointer hover:opacity-70 transition-opacity">
                <img src={img} alt={`${product.name} view ${i + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Right - Details */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
            className="meta-label text-terracotta mb-4"
          >
            {product.origin.toUpperCase()} · {product.region.toUpperCase()}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease }}
            className="font-display text-5xl md:text-6xl font-light text-espresso mb-4"
          >
            {product.name}
          </motion.h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-6">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                strokeWidth={1.5}
                className={i < Math.floor(product.rating) ? 'fill-shadow-olive text-shadow-olive' : 'text-vellum'}
              />
            ))}
            <span className="text-sm text-terracotta ml-2">{product.rating} · {product.reviews} reviews</span>
          </div>

          <p className="text-terracotta leading-relaxed mb-8 max-w-md">{product.description}</p>

          {/* Flavor notes */}
          <div className="mb-8">
            <p className="meta-label text-terracotta mb-3">FLAVOR NOTES</p>
            <div className="flex flex-wrap gap-2">
              {product.flavorNotes.map((note) => (
                <span key={note} className="px-4 py-2 rounded-full border border-vellum text-sm text-espresso">
                  {note}
                </span>
              ))}
            </div>
          </div>

          {/* Specs */}
          <div className="grid grid-cols-3 gap-4 mb-8 py-6 border-y border-vellum">
            {[
              { label: 'Altitude', value: product.altitude },
              { label: 'Process', value: product.process },
              { label: 'Brewing', value: product.brewingMethod },
            ].map((spec) => (
              <div key={spec.label}>
                <p className="meta-label text-terracotta text-[10px] mb-1">{spec.label}</p>
                <p className="text-sm text-espresso">{spec.value}</p>
              </div>
            ))}
          </div>

          {/* Price + Add to cart */}
          <div className="flex items-center gap-6 mb-8">
            <span className="font-serif text-4xl font-light text-espresso">${product.price}</span>
            <span className="text-sm text-terracotta">{product.weight}</span>
          </div>

          <div className="flex items-center gap-4 mb-8">
            <div className="flex items-center gap-3 border border-vellum rounded-full px-5 py-3">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-espresso hover:text-terracotta">
                <Minus size={16} strokeWidth={1.5} />
              </button>
              <span className="text-espresso w-8 text-center">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="text-espresso hover:text-terracotta">
                <Plus size={16} strokeWidth={1.5} />
              </button>
            </div>
            <button
              onClick={() => addToCart(product, quantity)}
              className="btn-primary flex-1 justify-center group"
            >
              Add to Cart
              <ArrowRight size={16} className="transition-transform duration-500 group-hover:translate-x-1" />
            </button>
          </div>

          {/* Tabs */}
          <div className="border-t border-vellum pt-8">
            <div className="flex gap-8 mb-6">
              {(['story', 'brewing', 'reviews'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`meta-label transition-colors duration-300 ${
                    activeTab === tab ? 'text-espresso' : 'text-terracotta hover:text-espresso'
                  }`}
                >
                  {tab === 'story' ? 'The Story' : tab === 'brewing' ? 'Brewing' : 'Reviews'}
                </button>
              ))}
            </div>

            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {activeTab === 'story' && (
                <p className="text-terracotta leading-relaxed">{product.story}</p>
              )}
              {activeTab === 'brewing' && (
                <div className="space-y-4">
                  <p className="text-terracotta leading-relaxed mb-4">
                    Recommended method: <span className="text-espresso font-medium">{product.brewingMethod}</span>
                  </p>
                  {[
                    'Grind 18g of coffee to a medium-fine consistency.',
                    'Heat water to 94°C (just off the boil).',
                    'Bloom with 40g of water for 30 seconds.',
                    'Pour in slow, concentric circles to 300g total.',
                    'Let drawdown complete. Enjoy slowly.',
                  ].map((step, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-shadow-olive text-cream text-xs flex items-center justify-center font-serif">
                        {i + 1}
                      </span>
                      <p className="text-sm text-terracotta leading-relaxed pt-0.5">{step}</p>
                    </div>
                  ))}
                </div>
              )}
              {activeTab === 'reviews' && (
                <div className="space-y-6">
                  {[
                    { name: 'Elena M.', text: 'The most beautiful coffee I have ever tasted. The floral notes are extraordinary.', rating: 5 },
                    { name: 'James K.', text: 'Worth every penny. A truly meditative morning ritual.', rating: 5 },
                    { name: 'Sofia R.', text: 'Exceptional quality. You can taste the care in every cup.', rating: 4 },
                  ].map((review, i) => (
                    <div key={i} className="pb-6 border-b border-vellum/60 last:border-0">
                      <div className="flex items-center gap-2 mb-2">
                        {[...Array(5)].map((_, j) => (
                          <Star key={j} size={12} strokeWidth={1.5} className={j < review.rating ? 'fill-shadow-olive text-shadow-olive' : 'text-vellum'} />
                        ))}
                        <span className="text-sm text-espresso ml-2">{review.name}</span>
                      </div>
                      <p className="text-sm text-terracotta leading-relaxed">{review.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Related products */}
      <div className="section-pad mt-32">
        <h2 className="font-display text-3xl font-light text-espresso mb-12 text-center">
          You may also <span className="italic">enjoy</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[1600px] mx-auto">
          {related.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </div>
    </motion.div>
  )
}
