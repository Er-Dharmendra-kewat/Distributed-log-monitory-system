import './Home.css'
import { Link } from 'react-router-dom'
import { useLogs } from '../context/LogsContext.jsx'

function Home() {
  const { logs } = useLogs()

  return (
    <section className="hero">
      <div className="hero-content">
        <p className="small-title">DISTRIBUTED E-COMMERCE SYSTEM</p>
        <h1>
          Shop easily.
          <br />
          Monitor everything.
        </h1>
        <p>
          A modern e-commerce application connected with multiple
          microservices and a centralized log monitoring system.
        </p>
        <Link to="/products" className="primary-btn">
          Start Shopping →
        </Link>
      </div>

      <div className="hero-card">
        <div className="server-icon">🖥️</div>
        <h3>System Status</h3>
        <div className="status">
          <span></span>
          All services running
        </div>
        <div className="mini-stats">
          <div>
            <strong>5</strong>
            <small>Services</small>
          </div>
          <div>
            <strong>{logs.length}</strong>
            <small>Logs</small>
          </div>
          <div>
            <strong>99%</strong>
            <small>Health</small>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Home
