import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { FiUser, FiMail, FiTrash2, FiPlus, FiMinus, FiLogOut, FiArrowRight, FiShoppingBag } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import './Dashboard.css';

const Dashboard = () => {
    const { user, signOut } = useAuth();
    const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOut();
            navigate('/login');
            toast.success('Logged out successfully');
        } catch (error) {
            toast.error('Failed to log out');
        }
    };

    const handleRemoveItem = (productId, productName) => {
        removeFromCart(productId);
        toast.success('Item removed');
    };

    const handleCheckout = () => {
        if (cart.length === 0) {
            toast.error('Your cart is empty!');
            return;
        }
        toast.success('Processing checkout...', { icon: '💳' });
        setTimeout(() => {
            clearCart();
            toast.success('Order placed successfully!', { icon: '🎉' });
        }, 1500);
    };

    return (
        <div className="dashboard-page">
            <div className="dashboard-container">
                {/* Header */}
                <header className="dashboard-header-section">
                    <div className="header-title-group">
                        <h1>Welcome Back, {user.displayName?.split(' ')[0] || 'User'}</h1>
                        <p>Manage your profile and orders</p>
                    </div>
                    <button onClick={handleLogout} className="logout-btn">
                        <FiLogOut /> Sign Out
                    </button>
                </header>

                <div className="dashboard-grid">
                    {/* Left Sidebar: Profile */}
                    <aside className="profile-card">
                        <div className="profile-avatar-container">
                            {user.photoURL ? (
                                <img src={user.photoURL} alt="Profile" className="profile-avatar" />
                            ) : (
                                <div className="profile-initials">
                                    {user.displayName ? user.displayName[0].toUpperCase() : <FiUser />}
                                </div>
                            )}
                        </div>
                        <div className="profile-info">
                            <h2>{user.displayName || 'Guest User'}</h2>
                            <p className="profile-email"><FiMail /> {user.email}</p>
                        </div>

                        <div className="profile-stats">
                            <div className="stat-box">
                                <span className="stat-number">{cart.length}</span>
                                <span className="stat-label">Cart Items</span>
                            </div>
                        </div>
                    </aside>

                    {/* Right Content: Cart */}
                    <main className="content-panel">
                        <div className="panel-header">
                            <h2 className="panel-title">Shopping Cart</h2>
                            {cart.length > 0 && (
                                <span className="item-count-badge">{cart.length} Items</span>
                            )}
                        </div>

                        {cart.length > 0 ? (
                            <>
                                <div className="cart-list">
                                    {cart.map((item) => (
                                        <div key={item.id} className="cart-item">
                                            <div className="item-image">
                                                <img src={item.image} alt={item.title} />
                                            </div>

                                            <div className="item-details">
                                                <h3>{item.title}</h3>
                                                <p className="item-price">${item.price}</p>
                                            </div>

                                            <div className="quantity-controls">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="qty-btn"
                                                >
                                                    <FiMinus size={14} />
                                                </button>
                                                <span className="qty-value">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="qty-btn"
                                                >
                                                    <FiPlus size={14} />
                                                </button>
                                            </div>

                                            <button
                                                onClick={() => handleRemoveItem(item.id, item.title)}
                                                className="remove-item-btn"
                                                title="Remove item"
                                            >
                                                <FiTrash2 size={18} />
                                            </button>
                                        </div>
                                    ))}
                                </div>

                                <div className="cart-footer">
                                    <div className="total-section">
                                        <span className="total-label">Total Amount</span>
                                        <span className="total-amount">${getCartTotal().toFixed(2)}</span>
                                    </div>
                                    <button onClick={handleCheckout} className="checkout-btn">
                                        Proceed to Checkout <FiArrowRight />
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="empty-state">
                                <div className="empty-icon"><FiShoppingBag /></div>
                                <h3>Your cart is empty</h3>
                                <p>Looks like you haven't added anything to your cart yet.</p>
                                <Link to="/" className="start-shopping-btn">
                                    Start Shopping
                                </Link>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
