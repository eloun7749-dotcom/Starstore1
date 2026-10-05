import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Plus, Minus, X, ArrowRight } from 'lucide-react'
import { useCart } from '../context/CartContext'

const ease = [0.16, 1, 0.3, 1] as const

export default function Cart() {
  const { items, updateQuantity, removeFromCart, totalPrice, totalItems } = useCart()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease }}
      className="pt-32 pb-24 min-h-screen bg-cream section-pad"
    >
      <div className="max-w-[1200px] mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
          className="meta-label text-terracotta mb-4"
        >
          YOUR SELECTION
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1, ease }}
          className="font-display text-display text-espresso mb-16"
        >
          The <span className="italic">cart.</span>
        </motion.h1>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-serif text-3xl font-light text-espresso mb-4">Your cart is empty</p>
            <p className="text-terracotta mb-8">Take your time. Browse our coffees.</p>
            <Link to="/shop" className="btn-primary group">
              Explore coffee
              <ArrowRight size={16} className="transition-transform duration-500 group-hover:translate-x-1" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Items */}
            <div className="lg:col-span-2 space-y-8">
              {items.map((item) => (
                <motion.div
                  key={item.product.id}
                  layout
                  className="flex gap-6 pb-8 border-b border-vellum"
                >
                  <Link to={`/product/${item.product.id}`} className="w-32 h-32 rounded-sm overflow-hidden bg-vellum/40 flex-shrink-0">
                    <img src={item.product.image} alt={item.product.imageAlt} className="w-full h-full object-cover" />
                  </Link>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-serif text-2xl font-light text-espresso">{item.product.name}</h3>
                        <p className="text-sm text-terracotta">{item.product.origin} · {item.product.weight}</p>
                        <p className="text-sm text-espresso/60 mt-1">{item.product.flavorNotes.join(' · ')}</p>
                      </div>
                      <button onClick={() => removeFromCart(item.product.id)} className="text-terracotta/50 hover:text-terracotta">
                        <X size={18} strokeWidth={1.5} />
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-3 border border-vellum rounded-full px-4 py-2">
                        <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="text-espresso hover:text-terracotta">
                          <Minus size={14} strokeWidth={1.5} />
                        </button>
                        <span className="text-sm text-espresso w-6 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="text-espresso hover:text-terracotta">
                          <Plus size={14} strokeWidth={1.5} />
                        </button>
                      </div>
                      <span className="font-serif text-xl text-espresso">${(item.product.price * item.quantity).toFixed(0)}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="bg-cream-dark p-8 rounded-sm sticky top-28">
                <h2 className="meta-label text-terracotta mb-6">ORDER SUMMARY</h2>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-terracotta">Items ({totalItems})</span>
                    <span className="text-espresso">${totalPrice.toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-terracotta">Shipping</span>
                    <span className="text-espresso">Free</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-terracotta">Tax</span>
                    <span className="text-espresso">${(totalPrice * 0.08).toFixed(0)}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center py-4 border-t border-vellum mb-6">
                  <span className="meta-label text-espresso">TOTAL</span>
                  <span className="font-serif text-3xl font-light text-espresso">${(totalPrice * 1.08).toFixed(0)}</span>
                </div>
                <Link to="/checkout" className="btn-primary w-full justify-center group">
                  Proceed to Checkout
                  <ArrowRight size={16} className="transition-transform duration-500 group-hover:translate-x-1" />
                </Link>
                <Link to="/shop" className="block text-center text-sm text-terracotta mt-4 hover:text-espresso transition-colors">
                  Continue shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}
