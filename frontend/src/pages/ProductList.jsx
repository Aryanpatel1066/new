import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faStar, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { ProductDB } from "../data/productDb";
import { CartContext } from "../context/CartContext";
import Header from "../component/Header";
import Loading from "./Loading";
import Footer from "./Footer";

export default function ProductList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const { cartItem, addToCart } = useContext(CartContext);
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const selectedCategory = query.get("category") || "all";

  useEffect(() => {
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
    getData();
  }, []);

  const handleSearch = (event) => {
    setSearchInput(event.target.value);
  };

  const handleCategoryChange = (category) => {
    navigate(`/productlist?category=${category}`, { replace: true });
  };

  const filteredData = data.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchInput.toLowerCase());
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <Header />
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Search and Category Filter */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Search Bar */}
          <div className="relative w-full md:w-96">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="absolute left-3 top-3 text-gray-500" />
            <input
              type="text"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
              placeholder="Search on StyleSavvy"
              value={searchInput}
              onChange={handleSearch}
            />
          </div>

          {/* Category Buttons */}
          <div className="flex gap-2 flex-wrap">
            {["all", "men", "women", "kids"].map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                  selectedCategory === category
                    ? "bg-purple-700 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
                onClick={() => handleCategoryChange(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Product List */}
        <div className="mt-8">
          {loading && <Loading />}
          {error && <p className="text-center text-red-500">{error}</p>}

          {!loading && !error && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredData.length > 0 ? (
                filteredData.map((item) => {
                  const isInCart = cartItem.some((cartItem) => cartItem.id === item.id);
                  return (
                    <div
                      key={item.id}
                      className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition"
                    >
                      <NavLink to={`/productdetails/${item.id}`} className="block">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-48 object-cover rounded-md"
                        />
                        <h3 className="text-lg font-semibold text-gray-800 mt-4">{item.title}</h3>
                        <div className="flex items-center gap-1 mt-2">
                          <span className="text-yellow-500">{item.reting}</span>
                          <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
                        </div>
                        <div className="text-gray-500 text-sm">Size: {item.size}</div>
                        <div className="flex items-center gap-2 mt-3">
                          <span className="text-purple-700 font-bold text-lg">₹{item.price}</span>
                          <span className="text-gray-500 line-through">₹{item.cancel_price}</span>
                          <span className="text-green-600 text-sm font-semibold">{item.is_off}% OFF</span>
                        </div>
                      </NavLink>

                      {/* Cart Button */}
                      <button
                        className={`w-full mt-4 py-2 rounded-lg font-semibold transition ${
                          isInCart
                            ? "bg-green-600 text-white hover:bg-green-700"
                            : "bg-purple-700 text-white hover:bg-purple-800"
                        }`}
                        onClick={() => (isInCart ? navigate("/cart") : addToCart(item))}
                      >
                        {isInCart ? "Go to Cart" : "Add to Cart"}
                        <FontAwesomeIcon className="ml-2" icon={faCartShopping} />
                      </button>
                    </div>
                  );
                })
              ) : (
                <p className="text-center col-span-full text-gray-600">No products found.</p>
              )}
            </div>
          )}
        </div>
      </div>
      <Footer/>
    </>
  );
}
