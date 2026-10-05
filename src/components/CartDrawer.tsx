import { motion, AnimatePresence } from 'framer-motion'
import { X, Plus, Minus, ArrowRight } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { Link } from 'react-router-dom'

export default function CartDrawer() {
  const { items, isCartOpen, closeCart, updateQuantity, removeFromCart, totalPrice, totalItems } = useCart()

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-espresso/40 backdrop-blur-sm z-[70]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 right-0 bottom-0 w-full sm:w-[440px] bg-cream z-[80] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-8 py-6 border-b border-vellum">
              <h2 className="font-serif text-2xl font-light text-espresso">
                Your Cart <span className="text-terracotta text-base">({totalItems})</span>
              </h2>
              <button onClick={closeCart} className="text-espresso hover:text-terracotta transition-colors">
                <X size={22} strokeWidth={1.5} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-8 py-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <p className="font-serif text-2xl font-light text-espresso mb-4">Your cart is empty</p>
                  <p className="text-sm text-terracotta mb-8">Take your time. Browse our coffees.</p>
                  <button onClick={closeCart} className="btn-primary">
                    Explore coffee
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex gap-4 pb-6 border-b border-vellum/60">
                      <div className="w-20 h-20 rounded-sm overflow-hidden bg-vellum/40 flex-shrink-0">
                        <img src={item.product.image} alt={item.product.imageAlt} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-serif text-lg font-normal text-espresso">{item.product.name}</h3>
                        <p className="text-xs text-terracotta mb-3">{item.product.origin} · {item.product.weight}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 border border-vellum rounded-full px-3 py-1">
                            <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="text-espresso hover:text-terracotta">
                              <Minus size={14} strokeWidth={1.5} />
                            </button>
                            <span className="text-sm text-espresso">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="text-espresso hover:text-terracotta">
                              <Plus size={14} strokeWidth={1.5} />
                            </button>
                          </div>
                          <span className="font-serif text-espresso">${(item.product.price * item.quantity).toFixed(0)}</span>
                        </div>
                      </div>
                      <button onClick={() => removeFromCart(item.product.id)} className="text-terracotta/50 hover:text-terracotta self-start">
                        <X size={16} strokeWidth={1.5} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-8 py-6 border-t border-vellum">
                <div className="flex items-center justify-between mb-6">
                  <span className="meta-label text-terracotta">SUBTOTAL</span>
                  <span className="font-serif text-2xl font-light text-espresso">${totalPrice.toFixed(0)}</span>
                </div>
                <Link to="/checkout" onClick={closeCart} className="btn-primary w-full justify-center group">
                  Secure Checkout
                  <ArrowRight size={16} className="transition-transform duration-500 group-hover:translate-x-1" />
                </Link>
                <Link to="/cart" onClick={closeCart} className="block text-center text-sm text-terracotta mt-4 hover:text-espresso transition-colors">
                  View full cart
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
