import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { getProductById } from '../services/api';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { ProductDetailSkeleton } from '../components/SkeletonLoader';
import ErrorMessage from '../components/ErrorMessage';
import { FiStar, FiShoppingCart, FiArrowLeft, FiZap } from 'react-icons/fi';
import './ProductDetails.css';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const { user } = useAuth();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchProduct = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await getProductById(id);
            setProduct(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        addToCart(product);
        toast.success(`${product.title.substring(0, 30)}... added to cart!`, {
            icon: '🛒',
        });
    };

    const handleBuyNow = () => {
        addToCart(product);

        if (!user) {
            toast.error('Please login to complete your purchase', {
                icon: '🔒',
            });
            setTimeout(() => {
                navigate('/login', { state: { from: `/product/${id}` } });
            }, 1000);
        } else {
            toast.success('Redirecting to checkout...', {
                icon: '⚡',
            });
            setTimeout(() => {
                navigate('/dashboard');
            }, 1000);
        }
    };

    if (loading) return (
        <div className="product-details-page">
            <div className="product-details-container">
                <ProductDetailSkeleton />
            </div>
        </div>
    );

    if (error) return <ErrorMessage message={error} onRetry={fetchProduct} />;
    if (!product) return <ErrorMessage message="Product not found" />;

    return (
        <div className="product-details-page">
            <div className="product-details-container">
                <button onClick={() => navigate(-1)} className="back-btn">
                    <FiArrowLeft /> Back
                </button>

                <div className="product-details-content">
                    <div className="product-image-section">
                        <div className="product-image-wrapper">
                            <img src={product.image} alt={product.title} className="product-detail-image" />
                        </div>
                    </div>

                    <div className="product-info-section">
                        <div className="product-category">{product.category}</div>
                        <h1 className="product-detail-title">{product.title}</h1>

                        <div className="product-rating-section">
                            <div className="rating-stars">
                                <FiStar className="star-filled" />
                                <span className="rating-value">{product.rating?.rate || 'N/A'}</span>
                            </div>
                            <span className="rating-reviews">({product.rating?.count || 0} reviews)</span>
                        </div>

                        <div className="product-price-section">
                            <span className="product-detail-price">${product.price}</span>
                            <span className="price-label">Price</span>
                        </div>

                        <div className="product-description">
                            <h3>Description</h3>
                            <p>{product.description}</p>
                        </div>

                        <div className="product-actions">
                            <button className="add-to-cart-btn" onClick={handleAddToCart}>
                                <FiShoppingCart /> Add to Cart
                            </button>
                            <button className="buy-now-btn" onClick={handleBuyNow}>
                                <FiZap /> Buy Now
                            </button>
                        </div>

                        <div className="product-features">
                            <div className="feature-item">
                                <span className="feature-icon">✓</span>
                                <span>Free Shipping</span>
                            </div>
                            <div className="feature-item">
                                <span className="feature-icon">✓</span>
                                <span>30-Day Returns</span>
                            </div>
                            <div className="feature-item">
                                <span className="feature-icon">✓</span>
                                <span>Secure Payment</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
