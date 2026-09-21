import { Link } from "react-router-dom";

function Home() {
  return (
    <section className="hero">
      <div>
        <h1>
          Welcome to ShopZone
        </h1>

        <p>
          Discover amazing products
          at amazing prices.
        </p>

        <Link to="/products">
          <button>
            Shop Now
          </button>
        </Link>
      </div>
    </section>
  );
}

export default Home;