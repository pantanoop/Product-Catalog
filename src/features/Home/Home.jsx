import { useEffect, useState } from "react";
import ProductCard from "../Product/ProductCard";
import "./Home.css";
import { productService } from "../../services/product.service";

const LIMIT = 16;

function Home({ searchTerm, addToCart }) {
  const [products, setProducts] = useState([]);
  const [searchedProducts, setSearchedProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [debouncedTerm, setDebouncedTerm] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm);
      setPage(1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    if (debouncedTerm.trim()) {
      searchProduct();
    } else {
      fetchProducts();
    }
  }, [debouncedTerm, page]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const skip = (page - 1) * LIMIT;
      const data = await productService.getProducts(LIMIT, skip);
      setProducts(data.products);
      setTotal(data.total);
      setSearchedProducts([]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const searchProduct = async () => {
    setLoading(true);
    try {
      const skip = (page - 1) * LIMIT;
      const data = await productService.searchProducts(
        debouncedTerm,
        LIMIT,
        skip
      );
      setSearchedProducts(data.products);
      setTotal(data.total);
    } catch (error) {
      console.error(error);
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
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Prev
        </button>

        <span>
          {page}....{totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Home;
