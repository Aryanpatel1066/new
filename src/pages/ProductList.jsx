import { ProductDB } from "../data/productDb";
import { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faStar, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "./ProductList.css";
import FilterBar from "../component/Filterbar";
import Loading from "./Loading";
import ProductDetails from "./ProductDetails";
import { NavLink, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

export default function ProductList() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchInput, setSearchInput] = useState("");
    
    const { cartItem, addToCart } = useContext(CartContext);
    const navigate = useNavigate(); // For navigation
    
    async function getData() {
        try {
            setLoading(true);
            setError(null);
            const response = await ProductDB("https://example.com/api/menu");
            setData(response.data.menu);
        } catch (err) {
            setError("Failed to fetch products. Please try again later.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    const handleSearch = (event) => {
        setSearchInput(event.target.value);
    };

    // Filter the data based on the search input
    const filteredData = data.filter((item) =>
        item.title.toLowerCase().includes(searchInput.toLowerCase())
    );

    return (
        <>
            <div className="inputBox">
                <FontAwesomeIcon className="searchIcon" icon={faMagnifyingGlass} />
                <input
                    className="searchBar"
                    placeholder="Search on StyleSavvy"
                    value={searchInput}
                    onChange={handleSearch}
                />
            </div>
            <div className="parentComponent">
                <FilterBar />
                {loading && <Loading />}
                {error && <p className="error-message">{error}</p>}
                {!loading && !error && (
                    <>
                        <ul className="product-grid">
                            {filteredData.length > 0 ? (
                                filteredData.map((item) => {
                                    // Check if item is already in cart
                                    const isInCart = cartItem.some(cartItem => cartItem.id === item.id);

                                    return (
                                        <li key={item.id}>
                                            <div className="outerProductContainer">
                                                <NavLink to={`/productdetails/${item.id}`}>
                                                    <img src={item.image} alt={item.title} />
                                                    <div className="nameAndRatinCotainer">
                                                        <p className="productName">{item.title}</p>
                                                        <div className="ratingAndStarContainer">
                                                            <p className="ratingText">{item.reting}</p>
                                                            <FontAwesomeIcon icon={faStar} className="starIcon" />
                                                        </div>
                                                    </div>
                                                    <div className="sizeProduct">( size: {item.size})</div>
                                                    <div className="productContent">
                                                        <div className="productPrice">
                                                            MRP: <span> ₹{item.price}</span>
                                                        </div>
                                                        <div className="productOffPrice">
                                                            ₹{item.cancel_price}
                                                        </div>
                                                        <div className="productOff">| {item.is_off}% off</div>
                                                    </div>
                                                </NavLink>
                                                
                                                {/* Conditionally render "Add to Cart" or "Go to Cart" button */}
                                                {isInCart ? (
                                                    <button className="cartButton" onClick={() => navigate("/cart")}>
                                                        Go to Cart
                                                    </button>
                                                ) : (
                                                    <button className="cartButton" onClick={() => addToCart(item)}>
                                                        <FontAwesomeIcon
                                                            className="cartIcon"
                                                            icon={faCartShopping}
                                                        />
                                                        Add to Cart
                                                    </button>
                                                )}
                                            </div>
                                        </li>
                                    );
                                })
                            ) : (
                                <p className="no-results-message">No products found.</p>
                            )}
                        </ul>
                    </>
                )}
            </div>
        </>
    );
}
