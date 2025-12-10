import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiPackage, FiTruck, FiMapPin } from 'react-icons/fi';
import './Order.css';

const Order = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // Mock order data
    const order = {
        id: id,
        date: '2024-12-08',
        status: 'In Transit',
        total: 149.50,
        items: [
            {
                id: 1,
                name: 'Wireless Headphones',
                price: 79.99,
                quantity: 1,
                image: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg'
            },
            {
                id: 2,
                name: 'Phone Case',
                price: 19.99,
                quantity: 2,
                image: 'https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg'
            }
        ],
        shipping: {
            address: '123 Main Street',
            city: 'New York',
            state: 'NY',
            zip: '10001',
            country: 'USA'
        },
        tracking: 'TRK123456789'
    };

    return (
        <div className="order-page">
            <div className="order-container">
                <button onClick={() => navigate(-1)} className="back-btn">
                    <FiArrowLeft /> Back to Dashboard
                </button>

                <div className="order-header-section">
                    <div>
                        <h1 className="order-page-title">Order #{order.id}</h1>
                        <p className="order-date">Placed on {order.date}</p>
                    </div>
                    <div className={`order-status-badge status-${order.status.toLowerCase().replace(' ', '-')}`}>
                        {order.status}
                    </div>
                </div>

                <div className="order-content">
                    {/* Order Items */}
                    <div className="order-items-section">
                        <h2 className="section-heading">
                            <FiPackage /> Order Items
                        </h2>
                        <div className="order-items-list">
                            {order.items.map((item) => (
                                <div key={item.id} className="order-item">
                                    <img src={item.image} alt={item.name} className="item-image" />
                                    <div className="item-details">
                                        <h3>{item.name}</h3>
                                        <p className="item-quantity">Quantity: {item.quantity}</p>
                                    </div>
                                    <div className="item-price">${item.price}</div>
                                </div>
                            ))}
                        </div>

                        <div className="order-summary">
                            <div className="summary-row">
                                <span>Subtotal:</span>
                                <span>${order.total - 10}</span>
                            </div>
                            <div className="summary-row">
                                <span>Shipping:</span>
                                <span>$10.00</span>
                            </div>
                            <div className="summary-row total">
                                <span>Total:</span>
                                <span>${order.total}</span>
                            </div>
                        </div>
                    </div>

                    {/* Shipping Info */}
                    <div className="order-info-section">
                        <div className="info-card">
                            <h2 className="section-heading">
                                <FiTruck /> Tracking Information
                            </h2>
                            <div className="tracking-info">
                                <p className="tracking-number">
                                    <strong>Tracking Number:</strong><br />
                                    {order.tracking}
                                </p>
                                <div className="tracking-status">
                                    <div className="status-step completed">
                                        <div className="step-dot"></div>
                                        <div className="step-label">Order Placed</div>
                                    </div>
                                    <div className="status-step completed">
                                        <div className="step-dot"></div>
                                        <div className="step-label">Processing</div>
                                    </div>
                                    <div className="status-step active">
                                        <div className="step-dot"></div>
                                        <div className="step-label">In Transit</div>
                                    </div>
                                    <div className="status-step">
                                        <div className="step-dot"></div>
                                        <div className="step-label">Delivered</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="info-card">
                            <h2 className="section-heading">
                                <FiMapPin /> Shipping Address
                            </h2>
                            <div className="shipping-address">
                                <p>{order.shipping.address}</p>
                                <p>{order.shipping.city}, {order.shipping.state} {order.shipping.zip}</p>
                                <p>{order.shipping.country}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Order;
