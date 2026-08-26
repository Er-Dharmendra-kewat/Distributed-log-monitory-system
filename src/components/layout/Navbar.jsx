import { NavLink } from "react-router-dom";
import { useCart } from "../../context/CartContext.jsx";
import { calcItemCount } from "../../utils/format.js";

function Navbar() {
  const { cart } = useCart();
  const itemCount = calcItemCount(cart);

  return (
    <nav className="navbar">
      <div className="logo">🛒 ShopMonitor</div>

      <div className="nav-links">
        <NavLink to="/">🏠 Home</NavLink>
        <NavLink to="/products">📦 Products</NavLink>
        <NavLink to="/cart">🛒 Cart ({itemCount})</NavLink>
        <NavLink to="/orders">📦 Orders</NavLink>
        <NavLink to="/dashboard" className="dashboard-btn">
          {" "}
          📊 Log Dashboard
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
