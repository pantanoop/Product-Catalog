import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { productService } from "../../services/product.service";
import "./productDetail.css";

function ProductDetail({ addToCart }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const data = await productService.getProductById(id);
        setProduct(data);
      } catch (error) {
        console.error("Failed to fetch product", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <h2 className="pd-loading">Loading...</h2>;
  if (!product) return <h2>Product not found</h2>;

  return (
    <div className="product-detail">
      <Link to="/">
        <button className="back-btn">⬅ Back to Home</button>
      </Link>

      <div className="product-wrapper">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="product-img"
        />

        <div className="product-info">
          <h1>{product.title}</h1>
          <p className="product-desc">{product.description}</p>

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

          <button className="add-cart-btn" onClick={() => addToCart(product)}>
            Add to Cart 🛒
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
