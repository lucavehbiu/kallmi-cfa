'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface Product {
  id: number
  name: string
  price: number
  image: string
}

interface CartItem extends Product {
  quantity: number,
  image: string
}

interface CartContextType {
  cartCount: number
  setCartCount: (count: number | ((prev: number) => number)) => void
  cartItems: CartItem[]
  addToCart: (product: Product) => void
  removeFromCart: (productId: number) => void
}

export const CartContext = createContext<CartContextType>({} as CartContextType)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartCount, setCartCount] = useState(0)
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id)
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { ...product, quantity: 1 }]
    })
    setCartCount(prev => prev + 1)
  }

  const removeFromCart = (productId: number) => {
    setCartItems(prev => {
      const item = prev.find(item => item.id === productId)
      if (item?.quantity === 1) {
        return prev.filter(item => item.id !== productId)
      }
      return prev.map(item =>
        item.id === productId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    })
    setCartCount(prev => prev - 1)
  }

  return (
    <CartContext.Provider value={{ cartCount, setCartCount, cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}