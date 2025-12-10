import { useState, useEffect } from 'react';
import { getAllProducts } from '../services/api';
import ProductCard from '../components/ProductCard';
import { ProductCardSkeleton } from '../components/SkeletonLoader';
import ErrorMessage from '../components/ErrorMessage';
import { FiSearch } from 'react-icons/fi';
import './Products.css';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchProducts = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await getAllProducts();
            setProducts(data);
            setFilteredProducts(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        const filtered = products.filter(product =>
            product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.category.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredProducts(filtered);
    }, [searchTerm, products]);

    if (error) return <ErrorMessage message={error} onRetry={fetchProducts} />;

    return (
        <div className="products-page">
            <div className="products-container">
                <div className="products-header">
                    <h1 className="page-title">All Products</h1>
                    <p className="page-subtitle">Discover our complete collection of amazing products</p>

                    <div className="search-bar">
                        <FiSearch className="search-icon" />
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="search-input"
                        />
                    </div>
                </div>

                {filteredProducts.length === 0 && !loading ? (
                    <div className="no-results">
                        <p>No products found matching "{searchTerm}"</p>
                    </div>
                ) : (
                    <>
                        {!loading && (
                            <p className="results-count">
                                Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
                            </p>
                        )}
                        <div className="products-grid">
                            {loading
                                ? Array.from({ length: 20 }).map((_, index) => (
                                    <ProductCardSkeleton key={index} />
                                ))
                                : filteredProducts.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Products;
