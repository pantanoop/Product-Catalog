import { Link } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar({ searchTerm, setSearchTerm, cartCount = 0 }) {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        MyShop
      </Link>

      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <Link to="/cart" className="cart-link">
        <button className="cart-btn">
          🛒 Cart
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </button>
      </Link>
    </nav>
  );
}

export default Navbar;
