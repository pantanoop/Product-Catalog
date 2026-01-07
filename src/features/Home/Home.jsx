import { useEffect, useState } from "react";
import ProductCard from "../Product/ProductCard";
import "./Home.css";
import { productService } from "../../services/product.service";
const LIMIT = 8;

function Home({ searchTerm, addToCart }) {
  const [products, setProducts] = useState([]);
  const [searchedProducts, setSearchedProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, [page]);

  useEffect(() => {
    if (searchTerm.trim()) {
      setPage(1);
      searchProduct();
    }
  }, [searchTerm]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const skip = (page - 1) * LIMIT;
      const data = await productService.getProducts(LIMIT, skip);
      setProducts(data.products);
      setTotal(data.total);
      setSearchedProducts([]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const searchProduct = async () => {
    setLoading(true);
    try {
      const skip = (page - 1) * LIMIT;
      const data = await productService.searchProducts(searchTerm, LIMIT, skip);
      setSearchedProducts(data.products);
      setTotal(data.total);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(total / LIMIT);
  const displayProducts =
    searchedProducts.length > 0 ? searchedProducts : products;

  if (loading) return <h3>Loading products...</h3>;

  return (
    <div className="home">
      <h1>Available Products</h1>

      <div className="product-grid">
        {displayProducts.length > 0 ? (
          displayProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addToCart}
            />
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>

      <div className="pagination">
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          Prev
        </button>

        <span>
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Home;
