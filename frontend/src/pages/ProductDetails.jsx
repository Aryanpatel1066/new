import { useParams, NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { ProductDB } from "../data/productDb";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faTag, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { CartContext } from "../context/CartContext";
import NavBar from "./NavBar";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // ✅ Added navigate
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { cartItem, addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        const response = await ProductDB("https://example.com/api/menu");
        const productData = response.data.menu.find((item) => item.id === parseInt(id));
        setProduct(productData);
      } catch (err) {
        setError("Failed to fetch product details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  if (loading) return <p className="text-center text-lg font-semibold">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!product) return <p className="text-center text-gray-600">Product not found</p>;

  const isInCart = cartItem.some((cartItem) => cartItem.id === product.id); // ✅ Fixed this line

  return (
    <>
    <NavBar/>
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white shadow-lg rounded-lg p-6">
        {/* Left Side - Product Image */}
        <div className="flex justify-center">
          <img 
            src={product.image} 
            alt={product.title} 
            className="w-full max-w-md h-auto rounded-lg shadow-md"
          />
        </div>

        {/* Right Side - Product Details */}
        <div className="flex flex-col space-y-4">
          <h1 className="text-2xl font-bold text-gray-800">{product.title}</h1>
          <p className="text-gray-600 text-md">{product.description}</p>

          {/* Rating & Size */}
          <div className="flex items-center gap-4">
            <div className="flex items-center bg-yellow-100 px-3 py-1 rounded-lg">
              <span className="text-yellow-600 font-semibold">{product.reting}</span>
              <FontAwesomeIcon className="ml-2 text-yellow-500" icon={faStar} />
            </div>
            <span className="text-sm text-gray-700 bg-gray-200 px-3 py-1 rounded-lg">
              Size: {product.size}
            </span>
          </div>

          {/* Price Section */}
          <div className="flex items-center gap-4">
            <span className="text-2xl font-bold text-purple-700">₹{product.price}</span>
            <span className="text-gray-500 line-through">₹{product.cancel_price}</span>
            <span className="text-green-600 font-semibold">{product.is_off}% OFF</span>
          </div>

          <hr className="border-t border-gray-300" />

          {/* Additional Details */}
          <div className="space-y-2">
            <p className="flex items-center text-gray-700">
              <FontAwesomeIcon icon={faTag} className="text-purple-700 mr-2" /> Fastest Delivery
            </p>
            <p className="flex items-center text-gray-700">
              <FontAwesomeIcon icon={faTag} className="text-purple-700 mr-2" /> Inclusive of All Taxes
            </p>
            <p className="flex items-center text-gray-700">
              <FontAwesomeIcon icon={faTag} className="text-purple-700 mr-2" /> Cash On Delivery Available
            </p>
          </div>

          <hr className="border-t border-gray-300" />

          {/* Add to Cart Button */}
          <button
            className={`w-full mt-4 py-2 rounded-lg font-semibold transition ${
              isInCart
                ? "bg-green-600 text-white hover:bg-green-700"
                : "bg-purple-700 text-white hover:bg-purple-800"
            }`}
            onClick={() => (isInCart ? navigate("/cart") : addToCart(product))} // ✅ Fixed "product" here
          >
            {isInCart ? "Go to Cart" : "Add to Cart"}
            <FontAwesomeIcon className="ml-2" icon={faCartShopping} />
          </button>
        </div>
      </div>

      {/* View More Products Link */}
      <div className="text-center mt-6">
        <NavLink 
          to="/productlist"
          className="text-purple-700 font-semibold hover:underline"
        >
          View More Products...
        </NavLink>
      </div>
    </div></>
  );
};

export default ProductDetails;
