import { useState, useContext, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruck, faCloudArrowDown, faTag, faRotateLeft, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import HeroSection from "../pages/HeroSection";
import Footer from "../pages/Footer";
import { ProductDB } from "../data/productDb";
import { NavLink } from "react-router-dom";
import menImage from "../assets/men3.jpg"
import girlImage from "../assets/girl2.jpg"
import kidsImage from "../assets/kids2.jpg"
import { CartContext } from "../context/CartContext";
 export default function Home() {
  const [products, setProducts] = useState([]);
  const { cartItem, addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    ProductDB("https://example.com/api/menu")
      .then((response) => setProducts(response.data.menu.slice(0, 6)))
      .catch((error) => console.error(error));
  }, []);

  const handleCategoryClick = (category) => {
    navigate(`/productlist?category=${category}`);
  };

  return (
    <>
      <HeroSection />

      {/* Category Cards Section */}
      <div className="py-10 bg-gray-100">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Shop by Category</h2>
        <div className="flex flex-wrap justify-center gap-6 sm:flex-row">
          <CategoryCard title="Men" image={menImage} onClick={() => handleCategoryClick("men")} />
          <CategoryCard title="Women" image={girlImage} onClick={() => handleCategoryClick("women")} />
          <CategoryCard title="Kids" image={kidsImage} onClick={() => handleCategoryClick("kids")} />
        </div>
      </div>

      {/* Product List Section */}
      <div className="py-10 bg-gray-50">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Trending Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
          {products.map((product) => {
            const isInCart = cartItem.some((item) => item.id === product.id);
            return (
              <div key={product.id} className="bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition">
                <NavLink to={`/productdetails/${product.id}`} className="block">
                  <img src={product.image} alt={product.title} className="w-full h-60 object-cover rounded-lg" />
                  <h3 className="text-lg font-semibold text-gray-800 mt-4">{product.title}</h3>
                  <p className="text-gray-600 text-sm mt-1">{product.description}</p>
                </NavLink>
                <div className="flex justify-between items-center mt-3">
                  <span className="text-purple-700 font-bold text-lg">₹{product.price}</span>
                  {isInCart ? (
                    <button className="cartButton" onClick={() => navigate("/cart")}>Go to Cart <FontAwesomeIcon className="cartIcon" icon={faCartShopping} /></button>
                  ) : (
                    <button className="cartButton" onClick={() => addToCart(product)}>
                      <FontAwesomeIcon className="cartIcon" icon={faCartShopping} /> Add to Cart
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-purple-900 text-white text-center py-10">
        <h2 className="text-3xl font-bold">Newsletter</h2>
        <p className="text-gray-300 mt-2">Get timely updates from your favorite products.</p>
        <div className="flex justify-center sm:flex-row sm:gap-0 mt-4">
          <input
            type="email"
            placeholder="Your email"
            className="px-4 py-2 w-80 rounded-l-lg border-none focus:ring-2 focus:ring-purple-500 outline-none text-black     "
          />
          <button className="bg-white text-purple-700 font-semibold px-6 py-2 rounded-r-lg hover:bg-gray-200 transition sm:w-20">
            Send
          </button>
        </div>
      </div>

      {/* Facilities Section */}
      <div className="flex flex-wrap justify-center items-center bg-gray-100 py-10 gap-8">
        <FacilityCard icon={faTruck} title="FREE SHIPPING" color="text-purple-700" />
        <FacilityCard icon={faTag} title="TOP BRANDS" color="text-purple-700" />
        <FacilityCard icon={faCloudArrowDown} title="100% ORIGINAL PRODUCTS" color="text-purple-700" />
        <FacilityCard icon={faRotateLeft} title="EASY RETURNS" color="text-purple-700" />
      </div>

      <Footer />
    </>
  );
}

function CategoryCard({ title, image, onClick }) {
  return (
    <div className="cursor-pointer bg-white shadow-lg rounded-lg overflow-hidden w-64" onClick={onClick}>
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="text-center p-4">
        <h3 className="text-xl font-bold text-gray-800">{title}</h3>
      </div>
    </div>
  );
}

function FacilityCard({ icon, title, color }) {
  return (
    <div className="flex flex-col items-center text-gray-700">
      <FontAwesomeIcon icon={icon} className={`text-3xl ${color}`} />
      <p className="mt-2 font-semibold">{title}</p>
    </div>
  );
}
