import { Link, useLocation } from "react-router-dom";

function OrderSuccess() {
  const location = useLocation();

  const orderId =
    location.state?.orderId;

  return (
    <div className="success">
      <h1>🎉 Order Placed!</h1>

      <p>
        Your order has been successfully
        placed.
      </p>

      <h3>
        Order ID: {orderId}
      </h3>

      <Link to="/orders">
        View Orders
      </Link>
    </div>
  );
}

export default OrderSuccess;