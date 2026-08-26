import { formatINR } from '../../utils/format.js'

function ProductCard({ product, onAdd }) {
  return (
    <div className="product-card">
      <div className="product-image">{product.emoji}</div>
      <p className="category">{product.category}</p>
      <h3>{product.name}</h3>
      <div className="product-bottom">
        <strong>{formatINR(product.price)}</strong>
        <button onClick={() => onAdd(product)}>Add +</button>
      </div>
    </div>
  )
}

export default ProductCard
