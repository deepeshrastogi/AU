import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "../redux/authSlice";

function Navbar() {
  const dispatch = useDispatch();

  const user = useSelector(
    (state) => state.auth.user
  );

  const cartItems = useSelector(
    (state) => state.cart.items
  );

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <nav className="navbar">
      <Link to="/">
        <strong>ShopZone</strong>
      </Link>

      <div>
        <Link to="/products">
          Products
        </Link>

        <Link to="/cart">
          Cart ({cartCount})
        </Link>

        {user ? (
          <>
            <Link to="/orders">
              Orders
            </Link>

            <button
              onClick={() =>
                dispatch(logout())
              }
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;