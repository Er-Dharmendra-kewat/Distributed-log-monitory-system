import { createContext, useContext, useState } from 'react'
import { useLogs } from './LogsContext.jsx'
import { useOrders } from './OrdersContext.jsx'
import { calcSubtotal, calcGST, calcTotal } from '../utils/format.js'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [cart, setCart] = useState([])
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const { addLog } = useLogs()
  const { addOrder } = useOrders()

  // ---------- CART OPERATIONS ----------

  function addToCart(product) {
    addLog('Product Service', 'INFO', `Stock check passed for "${product.name}"`)

    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { ...product, quantity: 1 }]
    })

    addLog('Order Service', 'INFO', `"${product.name}" added to cart`)
  }

  function removeFromCart(productId) {
    const item = cart.find((i) => i.id === productId)
    setCart((prev) => prev.filter((item) => item.id !== productId))
    if (item) {
      addLog('Order Service', 'INFO', `"${item.name}" removed from cart`)
    }
  }

  function increaseQuantity(productId) {
    const item = cart.find((i) => i.id === productId)
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    )
    if (item) {
      addLog('Order Service', 'INFO', `Quantity increased for "${item.name}"`)
    }
  }

  function decreaseQuantity(productId) {
    const item = cart.find((i) => i.id === productId)
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    )
    if (item) {
      addLog('Order Service', 'INFO', `Quantity decreased for "${item.name}"`)
    }
  }

  function clearCart() {
    setCart([])
  }

  // ---------- CHECKOUT / ORDER PIPELINE ----------
  // Simulates a request travelling through distributed microservices,
  // each emitting its own log line — mirroring how a real Order Service
  // would call out to User, Payment, and Shipping services.

  async function placeOrder() {
    if (cart.length === 0) {
      alert('Cart is empty')
      return false
    }

    setIsCheckingOut(true)

    const subtotal = calcSubtotal(cart)
    const gst = calcGST(subtotal)
    const total = calcTotal(subtotal, gst)
    const orderId = `ORD-${Date.now()}`

    const step = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

    // 1. User Service — auth/session check
    addLog('User Service', 'INFO', `Validating user session for checkout (${orderId})`)
    await step(300)

    // 2. Product Service — stock re-validation
    addLog('Product Service', 'INFO', `Re-verifying stock for ${cart.length} item(s)`)
    await step(300)

    const outOfStock = cart.find((item) => item.quantity > item.stock)
    if (outOfStock) {
      addLog('Product Service', 'ERROR', `Insufficient stock for "${outOfStock.name}"`)
      setIsCheckingOut(false)
      alert(`Insufficient stock for "${outOfStock.name}"`)
      return false
    }

    // 3. Order Service — order creation
    addLog('Order Service', 'INFO', `Order ${orderId} created successfully`)
    await step(300)

    // 4. Payment Service — payment processing
    addLog('Payment Service', 'INFO', `Payment request received for ${orderId}`)
    await step(400)
    addLog('Payment Service', 'INFO', `Payment of ₹${total} processed successfully`)
    await step(200)

    // 5. Shipping Service — shipment scheduling
    addLog('Shipping Service', 'INFO', `Shipment scheduled for ${orderId}`)
    await step(200)

    addOrder({
      id: orderId,
      items: cart,
      subtotal,
      gst,
      total,
      status: 'Confirmed',
      placedAt: new Date().toLocaleString(),
    })

    addLog('Order Service', 'INFO', `Order ${orderId} completed end-to-end`)

    alert(`Order ${orderId} placed successfully!`)
    clearCart()
    setIsCheckingOut(false)
    return true
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        placeOrder,
        isCheckingOut,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
