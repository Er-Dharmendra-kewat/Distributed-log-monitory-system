export function formatINR(amount) {
  return `₹${amount}`
}

export function calcSubtotal(cart) {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
}

export function calcGST(subtotal, rate = 0.18) {
  return Math.round(subtotal * rate)
}

export function calcTotal(subtotal, gst) {
  return subtotal + gst
}

export function calcItemCount(cart) {
  return cart.reduce((sum, item) => sum + item.quantity, 0)
}
