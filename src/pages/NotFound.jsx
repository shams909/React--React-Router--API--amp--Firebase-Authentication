import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
    return (
        <div className="not-found-page">
            <div className="not-found-content">
                <div className="not-found-animation">
                    <div className="number">4</div>
                    <div className="circle"></div>
                    <div className="number">4</div>
                </div>
                <h1 className="not-found-title">Page Not Found</h1>
                <p className="not-found-message">
                    Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
                </p>
                <Link to="/" className="home-btn">
                    Go Back Home
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
