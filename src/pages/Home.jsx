import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import "../styles/Home.css";

// const Limit=6;

function Home({ searchTerm, addToCart }) {
  console.log(searchTerm, "term");
  const [products, setProducts] = useState([]);
  // const[page,setPage]= useState(1);
  // const[totalPage,setTotalPage]= useState(0);
  const [loading, setLoading] = useState(true);
  const [SearchedProducts, setSearchedProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch("https://dummyjson.com/products");
      const data = await res.json();
      setProducts(data.products);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };



  const SearchProduct = async () => {
    console.log("searching", searchTerm);
    setLoading(true);
    try {
      const res = await fetch(`https://dummyjson.com/products/search?q=${searchTerm}`);
      const data = await res.json();
      setSearchedProducts(data.products);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

    useEffect(() => {
    searchTerm.trim() && SearchProduct();
  }, [searchTerm]);



  console.log(products, "prod", SearchedProducts, "search");
  const filteredProducts = SearchedProducts.length >0 ? SearchedProducts : products;
  if (loading) return <h3>Loading products...</h3>;
  

  return (
    <div className="home">
  <h1>Available Products</h1>
  <div className="product-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
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
    </div>
  );
}

export default Home;
