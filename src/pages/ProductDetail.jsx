import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

function ProductDetail({ addToCart }) {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error("Failed to fetch product", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <h2 style={{ padding: "20px" }}>Loading...</h2>;

  if (!product) return <h2>Product not found</h2>;

  return (
    <div style={{ padding: "20px", maxWidth: "900px", margin: "auto" }}>
      <Link to="/">
        <button style={{ marginBottom: "20px" }}>⬅ Back to Home</button>
      </Link>

      <div style={{ display: "flex", gap: "30px" }}>
       
        <img
          src={product.thumbnail}
          alt={product.title}
          style={{
            width: "300px",
            borderRadius: "10px",
            border: "1px solid #ddd"
          }}
        />

        
        <div>
          <h1>{product.title}</h1>
          <p style={{ color: "#555" }}>{product.description}</p>

          <h2>$ {product.price}</h2>
          <p>
            ⭐ {product.rating} | Stock: {product.stock}
          </p>

          <p>
            <b>Category:</b> {product.category}
          </p>
          <p>
            <b>Brand:</b> {product.brand}
          </p>

          <button
            onClick={() => addToCart(product)}
            style={{
              marginTop: "15px",
              padding: "10px 20px",
              backgroundColor: "#2563eb",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer"
            }}
          >
            Add to Cart 🛒
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
