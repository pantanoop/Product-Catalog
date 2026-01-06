import { Link } from "react-router-dom";
import "../styles/ProductCards.css";


function ProductCard({ product, onAddToCart }) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "15px",
        width: "220px",
        margin: "10px",
        textAlign: "center"
      }}
    >
      
      <img
        src={product.thumbnail}
        alt={product.title}
        style={{
          width: "100%",
          height: "150px",
          objectFit: "cover",
          borderRadius: "6px",
          marginBottom: "10px"
        }}
      />

      
      <h3 style={{ fontSize: "16px" }}>{product.title}</h3>

   
      <p>
        <b>$ {product.price}</b>
      </p>

     
      <button
        onClick={() => onAddToCart(product)}
        style={{ marginRight: "5px", padding: "6px 10px", backgroundColor: "#e9971dd2", color: "white",fontWeight: "bold", border: "none", borderRadius: "4px", cursor: "pointer"  }}
      >
       Cart 🛒
      </button>

      <Link to={`/product/${product.id}`}>
        <button  style={{ marginRight: "5px", padding: "6px 10px",fontWeight: "bold", border: "none", borderRadius: "4px", cursor: "pointer"  }} >View Details</button>
      </Link>
    </div>
  );
}

export default ProductCard; 