import './Orders.css'
import { Link } from 'react-router-dom'
import { useOrders } from '../context/OrdersContext.jsx'
import { formatINR } from '../utils/format.js'

function Orders() {
  const { orders } = useOrders()

  return (
    <section className="page">
      <div className="page-heading">
        <div>
          <p className="small-title">ORDER SERVICE</p>
          <h1>Order History</h1>
        </div>
        <div className="service-status">🟢 Order Service Online</div>
      </div>

      {orders.length === 0 ? (
        <div className="empty">
          <div>📦</div>
          <h2>No orders yet</h2>
          <p>Your placed orders will show up here.</p>
          <Link to="/products" className="primary-btn">
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div className="order-card" key={order.id}>
              <div className="order-card-header">
                <div>
                  <h3>{order.id}</h3>
                  <p className="order-date">{order.placedAt}</p>
                </div>
                <span className="order-status">{order.status}</span>
              </div>

              <div className="order-items">
                {order.items.map((item) => (
                  <div className="order-item-row" key={item.id}>
                    <span>
                      {item.emoji} {item.name} × {item.quantity}
                    </span>
                    <span>{formatINR(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              <div className="order-card-footer">
                <span>Total</span>
                <strong>{formatINR(order.total)}</strong>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default Orders
