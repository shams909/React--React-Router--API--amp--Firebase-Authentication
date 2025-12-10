import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import toast from 'react-hot-toast';
import { FiStar, FiShoppingCart, FiZap } from 'react-icons/fi';
import './ProductCard.css';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product);
        toast.success(`${product.title.substring(0, 30)}... added to cart!`, {
            icon: '🛒',
        });
    };

    const handleBuyNow = (e) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product);
        toast.success('Added to cart! View details...', {
            icon: '⚡',
        });
        // Navigate to product details page
        setTimeout(() => {
            window.location.href = `/product/${product.id}`;
        }, 500);
    };

    return (
        <div className="product-card">
            <Link to={`/product/${product.id}`} className="product-card-link">
                <div className="product-image-container">
                    <img src={product.image} alt={product.title} className="product-image" />
                </div>

                <div className="product-info">
                    <h3 className="product-title">{product.title}</h3>

                    <div className="product-rating">
                        <FiStar className="star-icon" />
                        <span>{product.rating?.rate || 'N/A'}</span>
                        <span className="rating-count">({product.rating?.count || 0})</span>
                    </div>

                    <div className="product-price-row">
                        <p className="product-price">${product.price}</p>
                        <span className="product-category">{product.category}</span>
                    </div>
                </div>
            </Link>

            <div className="product-actions">
                <button onClick={handleAddToCart} className="action-btn add-to-cart">
                    <FiShoppingCart /> Add
                </button>
                <button onClick={handleBuyNow} className="action-btn buy-now">
                    <FiZap /> Buy
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
