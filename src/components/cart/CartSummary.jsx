import { formatINR, calcSubtotal, calcGST, calcTotal, calcItemCount } from '../../utils/format.js'

function CartSummary({ cart, onCheckout, isCheckingOut }) {
  const subtotal = calcSubtotal(cart)
  const gst = calcGST(subtotal)
  const total = calcTotal(subtotal, gst)

  return (
    <div className="order-summary">
      <h2>Order Summary</h2>

      <div className="summary-row">
        <span>Items</span>
        <span>{calcItemCount(cart)}</span>
      </div>

      <div className="summary-row">
        <span>Subtotal</span>
        <span>{formatINR(subtotal)}</span>
      </div>

      <div className="summary-row">
        <span>GST</span>
        <span>{formatINR(gst)}</span>
      </div>

      <hr />

      <div className="total">
        <span>Total</span>
        <strong>{formatINR(total)}</strong>
      </div>

      <button
        className="checkout-btn"
        onClick={onCheckout}
        disabled={isCheckingOut}
      >
        {isCheckingOut ? 'Processing…' : 'Place Order'}
      </button>
    </div>
  )
}

export default CartSummary
