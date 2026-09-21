import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { createOrder } from "../redux/orderSlice";
import { clearCart } from "../redux/cartSlice";

function Payment() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const items = useSelector(
    (state) => state.cart.items
  );

  const user = useSelector(
    (state) => state.auth.user
  );

  const [card, setCard] = useState({
    number: "",
    expiry: "",
    cvv: "",
  });

  function handleChange(e) {
    setCard({
      ...card,
      [e.target.name]: e.target.value,
    });
  }

  function handlePayment(e) {
    e.preventDefault();

    const total = items.reduce(
      (sum, item) =>
        sum + item.price * item.quantity,
      0
    );

    const order = {
      id: `ORD-${Date.now()}`,
      userId: user?.id,
      items,
      total,
      paymentMethod: "Card",
      status: "Confirmed",
      createdAt: new Date().toISOString(),
    };

    dispatch(createOrder(order));
    dispatch(clearCart());

    navigate("/order-success", {
      state: {
        orderId: order.id,
      },
    });
  }

  return (
    <div className="container">
      <h1>Payment</h1>

      <form
        className="checkout-form"
        onSubmit={handlePayment}
      >
        <input
          name="number"
          placeholder="Card Number"
          maxLength="16"
          onChange={handleChange}
          required
        />

        <input
          name="expiry"
          placeholder="MM/YY"
          onChange={handleChange}
          required
        />

        <input
          name="cvv"
          placeholder="CVV"
          maxLength="3"
          onChange={handleChange}
          required
        />

        <button>
          Pay Now
        </button>
      </form>
    </div>
  );
}

export default Payment;