import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    createUserWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    GithubAuthProvider,
    updateProfile
} from 'firebase/auth';
import { auth } from '../firebase.config';
import { FiMail, FiLock, FiUser, FiEye, FiEyeOff } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import './Auth.css';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleEmailRegister = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        if (password.length < 6) {
            setError('Password must be at least 6 characters long');
            setLoading(false);
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            // Update user profile with name
            await updateProfile(userCredential.user, {
                displayName: name
            });

            navigate('/dashboard');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleRegister = async () => {
        setError('');
        const provider = new GoogleAuthProvider();

        try {
            await signInWithPopup(auth, provider);
            navigate('/dashboard');
        } catch (err) {
            setError(err.message);
        }
    };

    const handleGithubRegister = async () => {
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
                    <h1 className="auth-title">Create Account</h1>
                    <p className="auth-subtitle">Join ShopHub and start shopping today</p>

                    {error && (
                        <div className="error-alert">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleEmailRegister} className="auth-form">
                        <div className="form-group">
                            <label htmlFor="name">Full Name</label>
                            <div className="input-wrapper">
                                <FiUser className="input-icon" />
                                <input
                                    type="text"
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Enter your full name"
                                    required
                                />
                            </div>
                        </div>

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
                                    placeholder="Create a password (min. 6 characters)"
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
                            {loading ? 'Creating account...' : 'Create Account'}
                        </button>
                    </form>

                    <div className="divider">
                        <span>OR</span>
                    </div>

                    <div className="social-auth">
                        <button onClick={handleGoogleRegister} className="auth-btn social google">
                            <FcGoogle size={20} />
                            Continue with Google
                        </button>
                        <button onClick={handleGithubRegister} className="auth-btn social github">
                            <FaGithub size={20} />
                            Continue with GitHub
                        </button>
                    </div>

                    <p className="auth-footer">
                        Already have an account? <Link to="/login">Sign in</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
