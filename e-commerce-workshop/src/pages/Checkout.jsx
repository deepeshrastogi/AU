import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    localStorage.setItem(
      "shippingAddress",
      JSON.stringify(form)
    );

    navigate("/payment");
  }

  return (
    <div className="container">
      <h1>Checkout</h1>

      <form
        className="checkout-form"
        onSubmit={handleSubmit}
      >
        <input
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          required
        />

        <input
          name="phone"
          placeholder="Phone"
          onChange={handleChange}
          required
        />

        <textarea
          name="address"
          placeholder="Address"
          onChange={handleChange}
          required
        />

        <input
          name="city"
          placeholder="City"
          onChange={handleChange}
          required
        />

        <input
          name="pincode"
          placeholder="Pincode"
          onChange={handleChange}
          required
        />

        <button>
          Continue to Payment
        </button>
      </form>
    </div>
  );
}

export default Checkout;