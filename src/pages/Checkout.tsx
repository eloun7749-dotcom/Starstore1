import { motion } from 'framer-motion'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, Check, Lock } from 'lucide-react'
import { useCart } from '../context/CartContext'

const ease = [0.16, 1, 0.3, 1] as const

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCart()
  const navigate = useNavigate()
  const [step, setStep] = useState<'info' | 'success'>('info')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep('success')
    setTimeout(() => {
      clearCart()
    }, 500)
  }

  if (step === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease }}
        className="pt-40 pb-24 min-h-screen bg-cream flex items-center justify-center section-pad"
      >
        <div className="text-center max-w-md">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease }}
            className="w-20 h-20 rounded-full bg-shadow-olive flex items-center justify-center mx-auto mb-8"
          >
            <Check size={32} className="text-cream" strokeWidth={1.5} />
          </motion.div>
          <h1 className="font-display text-5xl font-light text-espresso mb-4">
            Thank you.
          </h1>
          <p className="text-terracotta mb-8 leading-relaxed">
            Your order is confirmed. We are roasting your coffee with care. You will receive a tracking email shortly.
          </p>
          <button onClick={() => navigate('/')} className="btn-primary group">
            Return home
            <ArrowRight size={16} className="transition-transform duration-500 group-hover:translate-x-1" />
          </button>
        </div>
      </motion.div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="pt-40 pb-20 text-center min-h-screen bg-cream">
        <p className="font-serif text-3xl font-light text-espresso mb-4">Your cart is empty</p>
        <Link to="/shop" className="btn-primary">Explore coffee</Link>
      </div>
    )
  }

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
          SECURE CHECKOUT
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1, ease }}
          className="font-display text-display text-espresso mb-16"
        >
          Almost <span className="italic">yours.</span>
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <h2 className="meta-label text-terracotta mb-4">CONTACT</h2>
              <input
                type="email"
                required
                placeholder="Email address"
                className="w-full bg-transparent border-b border-vellum py-3 text-espresso placeholder:text-terracotta/50 focus:outline-none focus:border-shadow-olive transition-colors"
              />
            </div>
            <div>
              <h2 className="meta-label text-terracotta mb-4">SHIPPING</h2>
              <div className="space-y-4">
                <input required placeholder="Full name" className="w-full bg-transparent border-b border-vellum py-3 text-espresso placeholder:text-terracotta/50 focus:outline-none focus:border-shadow-olive transition-colors" />
                <input required placeholder="Address" className="w-full bg-transparent border-b border-vellum py-3 text-espresso placeholder:text-terracotta/50 focus:outline-none focus:border-shadow-olive transition-colors" />
                <div className="grid grid-cols-2 gap-4">
                  <input required placeholder="City" className="w-full bg-transparent border-b border-vellum py-3 text-espresso placeholder:text-terracotta/50 focus:outline-none focus:border-shadow-olive transition-colors" />
                  <input required placeholder="ZIP" className="w-full bg-transparent border-b border-vellum py-3 text-espresso placeholder:text-terracotta/50 focus:outline-none focus:border-shadow-olive transition-colors" />
                </div>
              </div>
            </div>
            <div>
              <h2 className="meta-label text-terracotta mb-4">PAYMENT</h2>
              <div className="space-y-4">
                <input required placeholder="Card number" className="w-full bg-transparent border-b border-vellum py-3 text-espresso placeholder:text-terracotta/50 focus:outline-none focus:border-shadow-olive transition-colors" />
                <div className="grid grid-cols-2 gap-4">
                  <input required placeholder="MM / YY" className="w-full bg-transparent border-b border-vellum py-3 text-espresso placeholder:text-terracotta/50 focus:outline-none focus:border-shadow-olive transition-colors" />
                  <input required placeholder="CVC" className="w-full bg-transparent border-b border-vellum py-3 text-espresso placeholder:text-terracotta/50 focus:outline-none focus:border-shadow-olive transition-colors" />
                </div>
              </div>
            </div>
            <button type="submit" className="btn-primary w-full justify-center group">
              <Lock size={16} />
              Secure Ritual Checkout
              <ArrowRight size={16} className="transition-transform duration-500 group-hover:translate-x-1" />
            </button>
          </form>

          {/* Order summary */}
          <div className="bg-cream-dark p-8 rounded-sm h-fit lg:sticky lg:top-28">
            <h2 className="meta-label text-terracotta mb-6">YOUR ORDER</h2>
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-4">
                  <div className="w-16 h-16 rounded-sm overflow-hidden bg-vellum/40 flex-shrink-0">
                    <img src={item.product.image} alt={item.product.imageAlt} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="font-serif text-lg text-espresso">{item.product.name}</p>
                    <p className="text-xs text-terracotta">Qty: {item.quantity} · {item.product.weight}</p>
                  </div>
                  <span className="text-espresso">${(item.product.price * item.quantity).toFixed(0)}</span>
                </div>
              ))}
            </div>
            <div className="space-y-2 py-4 border-t border-vellum text-sm">
              <div className="flex justify-between">
                <span className="text-terracotta">Subtotal</span>
                <span className="text-espresso">${totalPrice.toFixed(0)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-terracotta">Shipping</span>
                <span className="text-espresso">Free</span>
              </div>
              <div className="flex justify-between">
                <span className="text-terracotta">Tax</span>
                <span className="text-espresso">${(totalPrice * 0.08).toFixed(0)}</span>
              </div>
            </div>
            <div className="flex justify-between items-center pt-4 border-t border-vellum">
              <span className="meta-label text-espresso">TOTAL</span>
              <span className="font-serif text-2xl font-light text-espresso">${(totalPrice * 1.08).toFixed(0)}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
