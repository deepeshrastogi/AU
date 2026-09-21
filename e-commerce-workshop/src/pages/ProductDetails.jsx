import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import { apiRequest } from "../services/api";
import { addToCart } from "../redux/cartSlice";

function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [product, setProduct] =
    useState(null);

  useEffect(() => {
    async function loadProduct() {
      const data = await apiRequest(
        `/products/${id}`
      );

      setProduct(data);
    }

    loadProduct();
  }, [id]);

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container product-details">
      <img
        src={product.images?.[0]}
        alt={product.title}
      />

      <div>
        <h1>{product.title}</h1>

        <p>{product.description}</p>

        <h2>
          ${product.price}
        </h2>

        <p>
          Rating: ⭐ {product.rating}
        </p>

        <p>
          Stock: {product.stock}
        </p>

        <button
          onClick={() =>
            dispatch(addToCart(product))
          }
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductDetails;