import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { FiShoppingCart, FiUser, FiMenu, FiX, FiLogOut } from 'react-icons/fi';
import './Navbar.css';

const Navbar = () => {
    const { user, signOut } = useAuth();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);

    const handleSignOut = async () => {
        try {
            await signOut();
            navigate('/');
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    <FiShoppingCart className="logo-icon" />
                    <span>ShopHub</span>
                </Link>

                <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
                    <Link to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                        Home
                    </Link>
                    <Link to="/products" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                        Products
                    </Link>
                    {user ? (
                        <>
                            <Link to="/dashboard" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                                Dashboard
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                                Login
                            </Link>
                            <Link to="/register" className="nav-link nav-link-cta" onClick={() => setIsMenuOpen(false)}>
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>

                <div className="navbar-actions">
                    {user && (
                        <div className="user-menu-container">
                            <button
                                className="user-btn"
                                onClick={() => setShowUserMenu(!showUserMenu)}
                            >
                                <FiUser />
                                <span className="user-name">{user.displayName || user.email}</span>
                            </button>
                            {showUserMenu && (
                                <div className="user-dropdown">
                                    <div className="user-info">
                                        <p className="user-email">{user.email}</p>
                                    </div>
                                    <Link to="/dashboard" className="dropdown-link" onClick={() => setShowUserMenu(false)}>
                                        Dashboard
                                    </Link>
                                    <button onClick={handleSignOut} className="dropdown-link logout-btn">
                                        <FiLogOut /> Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    <button className="menu-toggle" onClick={toggleMenu}>
                        {isMenuOpen ? <FiX /> : <FiMenu />}
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
