import { useSelector } from "react-redux";

function Orders() {
  const orders = useSelector(
    (state) => state.orders.orders
  );

  return (
    <div className="container">
      <h1>My Orders</h1>

      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        orders.map((order) => (
          <div
            className="order-card"
            key={order.id}
          >
            <h3>{order.id}</h3>

            <p>
              Status: {order.status}
            </p>

            <p>
              Payment: {order.paymentMethod}
            </p>

            <p>
              Total: $
              {order.total.toFixed(2)}
            </p>

            <p>
              Date:{" "}
              {new Date(
                order.createdAt
              ).toLocaleString()}
            </p>

            <ul>
              {order.items.map((item) => (
                <li key={item.id}>
                  {item.title} ×{" "}
                  {item.quantity}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}

export default Orders;