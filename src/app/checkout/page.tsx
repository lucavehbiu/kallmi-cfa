'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useCart } from '@/context/CartContext'
import { XMarkIcon } from '@heroicons/react/24/outline'

export default function Checkout() {
  const { cartItems, removeFromCart } = useCart()
  const [isProcessing, setIsProcessing] = useState(false)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR'
    }).format(price)
  }

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = 5.90
  const total = subtotal + shipping

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    // Here you would typically integrate with your payment processor
    // For now, we'll just simulate a delay
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsProcessing(false)
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-stone-50 pt-32 pb-16 px-4 font-cormorant">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl text-[#8B7355] mb-6">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8">Looks like you haven't added any items yet.</p>
          <a href="/shop" className="inline-block px-8 py-3 bg-[#8B7355] text-white rounded hover:bg-[#6B563F] transition-colors">
            Continue Shopping
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-stone-50 pt-32 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl text-[#8B7355] mb-12 font-cormorant text-center">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Order Summary */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl text-[#8B7355] mb-6 font-cormorant">Order Summary</h2>
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center space-x-4">
                  <div className="relative w-20 h-20">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg text-gray-900">{item.name}</h3>
                    <p className="text-gray-600">
                      {item.quantity} × {formatPrice(item.price)}
                    </p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <XMarkIcon className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-8 border-t border-gray-200 space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>{formatPrice(shipping)}</span>
              </div>
              <div className="flex justify-between text-xl text-[#8B7355] pt-4">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
          </div>

          {/* Checkout Form */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl text-[#8B7355] mb-6 font-cormorant">Payment Details</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#8B7355] focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="name" className="block text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#8B7355] focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="address" className="block text-gray-700 mb-2">Shipping Address</label>
                  <textarea
                    id="address"
                    required
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#8B7355] focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="card" className="block text-gray-700 mb-2">Card Number</label>
                  <input
                    type="text"
                    id="card"
                    required
                    placeholder="1234 1234 1234 1234"
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#8B7355] focus:border-transparent"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="expiry" className="block text-gray-700 mb-2">Expiry Date</label>
                    <input
                      type="text"
                      id="expiry"
                      required
                      placeholder="MM/YY"
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#8B7355] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="cvc" className="block text-gray-700 mb-2">CVC</label>
                    <input
                      type="text"
                      id="cvc"
                      required
                      placeholder="123"
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#8B7355] focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className={`w-full py-3 px-6 text-white rounded
                  ${isProcessing
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-[#8B7355] hover:bg-[#6B563F]'}
                  transition-colors duration-200`}
              >
                {isProcessing ? 'Processing...' : `Pay ${formatPrice(total)}`}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
} 