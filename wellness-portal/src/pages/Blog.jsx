import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import logo from "../assets/logo.png";

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch blog posts from the backend (public endpoint - only published posts)
    fetch("http://localhost:4000/api/blog-posts")
      .then(res => res.json())
      .then(data => {
        setPosts(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load blog posts:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="wellness-home">
      <Navbar />

      {/* HERO */}
      <header className="hero" style={{ minHeight: '35vh' }}>
        <h1 className="hero-title" style={{ fontSize: '48px' }}>
          BLOG
        </h1>
        <p className="strip-text" style={{ marginTop: '16px' }}>
          Wellness insights, tips, and stories from our community
        </p>
      </header>

      {/* BLOG POSTS */}
      <section className="panel">
        <div className="panel-inner">
          {loading ? (
            <p className="section-text">Loading posts...</p>
          ) : posts.length === 0 ? (
            <p className="section-text">No blog posts available yet. Check back soon!</p>
          ) : (
            <div className="blog-grid">
              {posts.map((post) => (
                <article key={post.id} className="blog-card">
                  {post.cover_image_url && (
                    <div 
                      className="blog-image"
                      style={{ 
                        backgroundImage: `url(${post.cover_image_url})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        height: '200px',
                        borderRadius: '8px',
                        marginBottom: '12px'
                      }}
                    />
                  )}
                  <h2 className="blog-title">{post.title}</h2>
                  {post.excerpt && (
                    <p className="blog-excerpt">{post.excerpt}</p>
                  )}
                  <Link to={`/blog/${post.slug}`} className="blog-link">
                    Read More →
                  </Link>
                </article>
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