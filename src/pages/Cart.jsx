import './Cart.css'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import CartItem from '../components/cart/CartItem.jsx'
import CartSummary from '../components/cart/CartSummary.jsx'

function Cart() {
  const {
    cart,
    placeOrder,
    isCheckingOut,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart()

  return (
    <section className="page">
      <div className="page-heading">
        <div>
          <p className="small-title">ORDER SERVICE</p>
          <h1>Your Cart</h1>
        </div>
      </div>

      {cart.length === 0 ? (
        <div className="empty">
          <div>🛒</div>
          <h2>Your cart is empty</h2>
          <p>Add some products to continue.</p>
          <Link to="/products" className="primary-btn">
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="cart-container">
          <div className="cart-items">
            {cart.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onIncrease={increaseQuantity}
                onDecrease={decreaseQuantity}
                onRemove={removeFromCart}
              />
            ))}
          </div>

          <CartSummary
            cart={cart}
            onCheckout={placeOrder}
            isCheckingOut={isCheckingOut}
          />
        </div>
      )}
    </section>
  )
}

export default Cart
