import { Link } from "react-router-dom";
import "./ProductCards.css";

function ProductCard({ product, onAddToCart }) {
  return (
    <div className="product-card">
      <img src={product.thumbnail} alt={product.title} />

      <h3>{product.title}</h3>

      <p>$ {product.price}</p>

      <button className="add-cart-btn" onClick={() => onAddToCart(product)}>
        Cart 🛒
      </button>

      <Link to={`/product/${product.id}`}>
        <button className="details-btn">View Details</button>
      </Link>
    </div>
  );
}

export default ProductCard;
