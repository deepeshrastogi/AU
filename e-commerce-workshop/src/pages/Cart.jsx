import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "../redux/cartSlice";

function Cart() {
  const dispatch = useDispatch();

  const items = useSelector(
    (state) => state.cart.items
  );

  const total = items.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );

  if (items.length === 0) {
    return (
      <div className="container">
        <h2>Your cart is empty</h2>
        <Link to="/products">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Shopping Cart</h1>

      {items.map((item) => (
        <div className="cart-item" key={item.id}>
          <img
            src={item.thumbnail}
            alt={item.title}
          />

          <div>
            <h3>{item.title}</h3>

            <p>
              ${item.price} × {item.quantity}
            </p>

            <button
              onClick={() =>
                dispatch(
                  decreaseQuantity(item.id)
                )
              }
            >
              -
            </button>

            <span> {item.quantity} </span>

            <button
              onClick={() =>
                dispatch(
                  increaseQuantity(item.id)
                )
              }
            >
              +
            </button>

            <button
              onClick={() =>
                dispatch(
                  removeFromCart(item.id)
                )
              }
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      <h2>
        Total: ${total.toFixed(2)}
      </h2>

      <Link to="/checkout">
        <button>Checkout</button>
      </Link>
    </div>
  );
}

export default Cart;