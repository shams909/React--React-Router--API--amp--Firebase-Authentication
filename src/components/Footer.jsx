import { Link } from 'react-router-dom';
import { FiGithub, FiTwitter, FiLinkedin, FiMail } from 'react-icons/fi';
import './Footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-content">
                    <div className="footer-section">
                        <h3 className="footer-title">ShopHub</h3>
                        <p className="footer-description">
                            Your one-stop destination for quality products at amazing prices.
                        </p>
                        <div className="social-links">
                            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-link">
                                <FiGithub />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link">
                                <FiTwitter />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link">
                                <FiLinkedin />
                            </a>
                            <a href="mailto:contact@shophub.com" className="social-link">
                                <FiMail />
                            </a>
                        </div>
                    </div>

                    <div className="footer-section">
                        <h4 className="footer-heading">Quick Links</h4>
                        <ul className="footer-links">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/products">Products</Link></li>
                            <li><Link to="/login">Login</Link></li>
                            <li><Link to="/register">Sign Up</Link></li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h4 className="footer-heading">Support</h4>
                        <ul className="footer-links">
                            <li><a href="#">Help Center</a></li>
                            <li><a href="#">Terms of Service</a></li>
                            <li><a href="#">Privacy Policy</a></li>
                            <li><a href="#">Contact Us</a></li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; {currentYear} ShopHub. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
