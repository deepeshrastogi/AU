import { useEffect, useState } from "react";

import ProductCard from "../components/ProductCard";
import { apiRequest } from "../services/api";

function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCategories();
    loadProducts();
  }, []);

  async function loadCategories() {
    const data = await apiRequest("/products/categories");

    setCategories(data);
  }

  async function loadProducts() {
    setLoading(true);

    try {
      const data = await apiRequest("/products?limit=30");

      setProducts(data.products);
    } finally {
      setLoading(false);
    }
  }

  async function loadCategory(category) {
    setSelectedCategory(category);

    setLoading(true);

    try {
      const endpoint =
        category === "all"
          ? "/products?limit=30"
          : `/products/category/${category}`;

      const data = await apiRequest(endpoint);

      setProducts(data.products);
    } finally {
      setLoading(false);
    }
  }

  async function handleSearch(e) {
    e.preventDefault();

    if (!search.trim()) {
      loadProducts();
      return;
    }

    setLoading(true);

    const data = await apiRequest(
      `/products/search?q=${encodeURIComponent(search)}`
    );

    setProducts(data.products);

    setLoading(false);
  }

  return (
    <div className="container">
      <h1>Products</h1>

      <form className="search" onSubmit={handleSearch}>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
        />

        <button>Search</button>
      </form>

      <div className="categories">
        <button onClick={() => loadCategory("all")}>
          All
        </button>

        {categories.map((category) => (
          <button
            key={category.slug}
            onClick={() => loadCategory(category.slug)}
          >
            {category.name}
          </button>
        ))}
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Products;