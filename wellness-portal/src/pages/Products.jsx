import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import logo from "../assets/logo.png";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch products from the backend (public endpoint)
    fetch("http://localhost:4000/api/products")
      .then(res => res.json())
      .then(data => {
        setProducts(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load products:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="wellness-home">
      <Navbar />

      {/* HERO */}
      <header className="hero" style={{ minHeight: '35vh' }}>
        <h1 className="hero-title" style={{ fontSize: '48px' }}>
          OUR PRODUCTS
        </h1>
        <p className="strip-text" style={{ marginTop: '16px' }}>
          Discover our curated selection of wellness products
        </p>
      </header>

      {/* PRODUCTS GRID */}
      <section className="panel">
        <div className="panel-inner">
          {loading ? (
            <p className="section-text">Loading products...</p>
          ) : products.length === 0 ? (
            <p className="section-text">No products available yet. Check back soon!</p>
          ) : (
            <div className="products-grid">
              {products.map((product) => (
                <div key={product.id} className="product-card">
                  {product.image_url && (
                    <div 
                      className="product-image"
                      style={{ 
                        backgroundImage: `url(${product.image_url})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        height: '200px',
                        borderRadius: '8px',
                        marginBottom: '12px'
                      }}
                    />
                  )}
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-price">${(product.price_cents / 100).toFixed(2)}</p>
                  {product.description && (
                    <p className="product-description">{product.description}</p>
                  )}
                  <button className="btn btn-solid" style={{ width: '100%', marginTop: '12px' }}>
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-inner">
          <div>
            <div className="footer-brand">
              <img src={logo} alt="TrueWellness Logo" className="brand-logo" />
            </div>

            <ul className="footer-links">
              <li>
                <Link to="/">HOME</Link>
              </li>
              <li>
                <Link to="/membership">MEMBERSHIP</Link>
              </li>
              <li>
                <Link to="/products">PRODUCTS</Link>
              </li>
              <li>
                <Link to="/blog">BLOG</Link>
              </li>
              <li>
                <a href="/#about">ABOUT</a>
              </li>
            </ul>
          </div>

          <div>
            <div className="footer-social">
              <a href="#email">✉</a>
              <a href="#instagram">📷</a>
              <a href="#facebook">f</a>
            </div>

            <div className="newsletter">
              <div className="newsletter-title">Stay in the loop</div>
              <div className="newsletter-row">
                <input className="newsletter-input" type="email" placeholder="Email" />
                <button className="btn btn-solid" type="button">
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">© 2025</div>
      </footer>
    </div>
  );
}