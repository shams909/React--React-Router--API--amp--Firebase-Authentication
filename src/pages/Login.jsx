import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    GithubAuthProvider
} from 'firebase/auth';
import { auth } from '../firebase.config';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import './Auth.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleEmailLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/dashboard');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setError('');
        const provider = new GoogleAuthProvider();

        try {
            await signInWithPopup(auth, provider);
            navigate('/dashboard');
        } catch (err) {
            setError(err.message);
        }
    };

    const handleGithubLogin = async () => {
        setError('');
        const provider = new GithubAuthProvider();

        try {
            await signInWithPopup(auth, provider);
            navigate('/dashboard');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-container">
                <div className="auth-card">
                    <h1 className="auth-title">Welcome Back</h1>
                    <p className="auth-subtitle">Sign in to your account to continue</p>

                    {error && (
                        <div className="error-alert">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleEmailLogin} className="auth-form">
                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <div className="input-wrapper">
                                <FiMail className="input-icon" />
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <div className="input-wrapper">
                                <FiLock className="input-icon" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    required
                                />
                                <button
                                    type="button"
                                    className="toggle-password"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <FiEyeOff /> : <FiEye />}
                                </button>
                            </div>
                        </div>

                        <button type="submit" className="auth-btn primary" disabled={loading}>
                            {loading ? 'Signing in...' : 'Sign In'}
                        </button>
                    </form>

                    <div className="divider">
                        <span>OR</span>
                    </div>

                    <div className="social-auth">
                        <button onClick={handleGoogleLogin} className="auth-btn social google">
                            <FcGoogle size={20} />
                            Continue with Google
                        </button>
                        <button onClick={handleGithubLogin} className="auth-btn social github">
                            <FaGithub size={20} />
                            Continue with GitHub
                        </button>
                    </div>

                    <p className="auth-footer">
                        Don't have an account? <Link to="/register">Sign up</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
