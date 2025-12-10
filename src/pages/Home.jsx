import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getLimitedProducts } from '../services/api';
import ProductCard from '../components/ProductCard';
import { ProductCardSkeleton } from '../components/SkeletonLoader';
import ErrorMessage from '../components/ErrorMessage';
import { FiArrowRight, FiShoppingBag, FiStar, FiTruck, FiShield } from 'react-icons/fi';
import './Home.css';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await getLimitedProducts(8);
            setProducts(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    if (error) return <ErrorMessage message={error} onRetry={fetchProducts} />;

    return (
        <div className="home-page">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-overlay"></div>
                <div className="hero-content">
                    <h1 className="hero-title">
                        Discover Premium <span className="gradient-text">Quality</span>
                    </h1>
                    <p className="hero-subtitle">
                        Curated collection of exceptional products for the discerning shopper
                    </p>
                    <div className="hero-actions">
                        <Link to="/products" className="btn btn-primary">
                            <FiShoppingBag /> Explore Collection
                        </Link>
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="featured-section">
                <div className="section-header">
                    <div>
                        <h2 className="section-title">Featured Products</h2>
                        <p className="section-subtitle">Handpicked selections just for you</p>
                    </div>
                    <Link to="/products" className="view-all-link">
                        View All <FiArrowRight />
                    </Link>
                </div>

                <div className="products-grid">
                    {loading
                        ? Array.from({ length: 8 }).map((_, index) => (
                            <ProductCardSkeleton key={index} />
                        ))
                        : products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section">
                <h2 className="section-title">Why Choose Us</h2>
                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon">
                            <FiTruck />
                        </div>
                        <h3>Free Shipping</h3>
                        <p>Complimentary shipping on all orders over $50</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">
                            <FiStar />
                        </div>
                        <h3>Premium Quality</h3>
                        <p>Carefully curated products that meet our high standards</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">
                            <FiShield />
                        </div>
                        <h3>Secure Shopping</h3>
                        <p>Your transactions are protected with industry-leading encryption</p>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="testimonials-section">
                <h2 className="section-title">What Our Customers Say</h2>
                <div className="testimonials-grid">
                    <div className="testimonial-card">
                        <div className="testimonial-stars">
                            <FiStar className="star-filled" />
                            <FiStar className="star-filled" />
                            <FiStar className="star-filled" />
                            <FiStar className="star-filled" />
                            <FiStar className="star-filled" />
                        </div>
                        <p className="testimonial-text">
                            "Exceptional quality and service. The products exceeded my expectations!"
                        </p>
                        <p className="testimonial-author">— Sarah M.</p>
                    </div>
                    <div className="testimonial-card">
                        <div className="testimonial-stars">
                            <FiStar className="star-filled" />
                            <FiStar className="star-filled" />
                            <FiStar className="star-filled" />
                            <FiStar className="star-filled" />
                            <FiStar className="star-filled" />
                        </div>
                        <p className="testimonial-text">
                            "Fast shipping and beautiful packaging. Will definitely shop here again!"
                        </p>
                        <p className="testimonial-author">— James K.</p>
                    </div>
                    <div className="testimonial-card">
                        <div className="testimonial-stars">
                            <FiStar className="star-filled" />
                            <FiStar className="star-filled" />
                            <FiStar className="star-filled" />
                            <FiStar className="star-filled" />
                            <FiStar className="star-filled" />
                        </div>
                        <p className="testimonial-text">
                            "Premium products at great prices. The customer service is outstanding!"
                        </p>
                        <p className="testimonial-author">— Emily R.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
