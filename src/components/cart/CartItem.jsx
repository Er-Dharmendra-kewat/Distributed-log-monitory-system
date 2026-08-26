import { formatINR } from '../../utils/format.js'

function CartItem({ item, onIncrease, onDecrease, onRemove }) {
  return (
    <div className="cart-item">
      <div className="cart-icon">{item.emoji}</div>

      <div>
        <h3>{item.name}</h3>
        <p>{item.category}</p>
      </div>

      <div className="qty-controls">
        <button onClick={() => onDecrease(item.id)}>−</button>
        <span>{item.quantity}</span>
        <button onClick={() => onIncrease(item.id)}>+</button>
      </div>

      <strong>{formatINR(item.price * item.quantity)}</strong>

      <button className="remove-btn" onClick={() => onRemove(item.id)}>
        ✕
      </button>
    </div>
  )
}

export default CartItem
