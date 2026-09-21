import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { addToCart } from "../redux/cartSlice";

function ProductCard({ product }) {
  const dispatch = useDispatch();

  return (
    <div className="product-card">
      <Link to={`/products/${product.id}`}>
        <img
          src={product.thumbnail}
          alt={product.title}
        />

        <h3>{product.title}</h3>
      </Link>

      <p className="price">
        ${product.price}
      </p>

      <button
        onClick={() => dispatch(addToCart(product))}
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;