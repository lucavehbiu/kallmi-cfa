import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { CartProvider } from '@/context/CartContext'

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <CartProvider>
      <Header />
      {children}
      <Footer />
    </CartProvider>
  )
}
