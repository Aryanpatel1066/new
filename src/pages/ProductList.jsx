import { ProductDB } from "../data/productDb";
import { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faStar,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import "./ProductList.css";
import Loading from "./Loading";
import { NavLink, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

export default function ProductList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all"); // Track selected category

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

  // Filter data based on search input and selected category
  const filteredData = data.filter((item) => {
    const matchesSearch = item.title
      .toLowerCase()
      .includes(searchInput.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
    <div className="centerSerachAndFilter">
    {/* serach bar */}
     <div className="inputBox">
        <FontAwesomeIcon className="searchIcon" icon={faMagnifyingGlass} />
        <input
          className="searchBar"
          placeholder="Search on StyleSavvy"
          value={searchInput}
          onChange={handleSearch}
        />
      </div>
      {/* Category Buttons */}
      <div className="category-container">
        <button
          className={`category-button ${
            selectedCategory === "all" ? "active" : ""
          }`}
          onClick={() => setSelectedCategory("all")}
        >
          All
        </button>
        <button
          className={`category-button ${
            selectedCategory === "men" ? "active" : ""
          }`}
          onClick={() => setSelectedCategory("men")}
        >
          Men
        </button>
        <button
          className={`category-button ${
            selectedCategory === "women" ? "active" : ""
          }`}
          onClick={() => setSelectedCategory("women")}
        >
          Women
        </button>
        <button
          className={`category-button ${
            selectedCategory === "kids" ? "active" : ""
          }`}
          onClick={() => setSelectedCategory("kids")}
        >
          Kids
        </button>
      </div>
      </div>
      {/* Search Bar */}
     

      {/* Product List */}
      <div className="parentComponent">
        {loading && <Loading />}
        {error && <p className="error-message">{error}</p>}
        {!loading && !error && (
          <>
            <ul className="product-grid">
              {filteredData.length > 0 ? (
                filteredData.map((item) => {
                  const isInCart = cartItem.some(
                    (cartItem) => cartItem.id === item.id
                  );

                  return (
                    <li key={item.id}>
                      <div className="outerProductContainer">
                        <NavLink to={`/productdetails/${item.id}`}>
                          <img src={item.image} alt={item.title} />
                          <div className="nameAndRatinCotainer">
                            <p className="productName">{item.title}</p>
                            <div className="ratingAndStarContainer">
                              <p className="ratingText">{item.reting}</p>
                              <FontAwesomeIcon
                                icon={faStar}
                                className="starIcon"
                              />
                            </div>
                          </div>
                          <div className="sizeProduct">
                            ( size: {item.size})
                          </div>
                          <div className="productContent">
                            <div className="productPrice">
                              MRP: <span> ₹{item.price}</span>
                            </div>
                            <div className="productOffPrice">
                              ₹{item.cancel_price}
                            </div>
                            <div className="productOff">
                              | {item.is_off}% off
                            </div>
                          </div>
                        </NavLink>
                        {isInCart ? (
                          <button
                            className="cartButton"
                            onClick={() => navigate("/cart")}
                          >
                            Go to Cart{" "}
                            <FontAwesomeIcon
                              className="cartIcon"
                              icon={faCartShopping}
                            />
                          </button>
                        ) : (
                          <button
                            className="cartButton"
                            onClick={() => addToCart(item)}
                          >
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
