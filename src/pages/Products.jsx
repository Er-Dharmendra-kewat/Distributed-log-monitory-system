import './Products.css'
import { products } from '../data/products.js'
import { useCart } from '../context/CartContext.jsx'
import ProductGrid from '../components/product/ProductGrid.jsx'

function Products() {
  const { addToCart } = useCart()

  return (
    <section className="page">
      <div className="page-heading">
        <div>
          <p className="small-title">OUR STORE</p>
          <h1>Products</h1>
        </div>
        <div className="service-status">🟢 Product Service Online</div>
      </div>

      
    </section>
  )
}

export default Products
