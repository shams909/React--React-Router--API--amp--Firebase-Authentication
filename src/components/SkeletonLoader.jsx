import './SkeletonLoader.css';

export const ProductCardSkeleton = () => {
    return (
        <div className="skeleton-card">
            <div className="skeleton-image"></div>
            <div className="skeleton-content">
                <div className="skeleton-title"></div>
                <div className="skeleton-title short"></div>
                <div className="skeleton-meta">
                    <div className="skeleton-rating"></div>
                    <div className="skeleton-price"></div>
                </div>
            </div>
        </div>
    );
};

export const ProductDetailSkeleton = () => {
    return (
        <div className="skeleton-detail-container">
            <div className="skeleton-detail-image"></div>
            <div className="skeleton-detail-info">
                <div className="skeleton-category"></div>
                <div className="skeleton-detail-title"></div>
                <div className="skeleton-detail-title short"></div>
                <div className="skeleton-rating-section"></div>
                <div className="skeleton-price-large"></div>
                <div className="skeleton-description"></div>
                <div className="skeleton-description"></div>
                <div className="skeleton-description short"></div>
                <div className="skeleton-buttons">
                    <div className="skeleton-button"></div>
                    <div className="skeleton-button"></div>
                </div>
            </div>
        </div>
    );
};

export const DashboardSkeleton = () => {
    return (
        <div className="skeleton-dashboard">
            <div className="skeleton-profile-card">
                <div className="skeleton-avatar"></div>
                <div className="skeleton-profile-info">
                    <div className="skeleton-name"></div>
                    <div className="skeleton-email"></div>
                </div>
            </div>
            <div className="skeleton-orders">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="skeleton-order-card">
                        <div className="skeleton-order-header"></div>
                        <div className="skeleton-order-details"></div>
                    </div>
                ))}
            </div>
        </div>
    );
};
