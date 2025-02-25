import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import cartEmptyImg from "../assets/cartEmptyImg.webp";
import Header from "../component/Header"
 export default function Cart() {
  const { cartItem, addToCart, removeFromCart, decreaseQuantity } = useContext(CartContext);

  // Calculate total price
  const totalPrice = cartItem.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <>  <Header/>
       <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Cart Title */}
      <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
        Total items in cart: {cartItem.length}
      </h1>

      {/* If cart is empty */}
      {cartItem.length === 0 ? (
        <div className="flex flex-col items-center text-center">
          <img src={cartEmptyImg} alt="Empty Cart" className="w-64 mb-4" />
          <p className="text-gray-600 mb-4">
            Explore exclusive products and add your favorites to the cart!
          </p>
          <NavLink to="/productlist">
            <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-indigo-700 transition">
              Shop Now
            </button>
          </NavLink>
        </div>
      ) : (
        <div className="bg-white shadow-lg rounded-lg p-6">
          {/* Cart Items List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cartItem.map((item) => (
              <div key={item.id} className="flex flex-col items-center p-4 border rounded-lg shadow-sm">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-32 h-32 object-cover rounded-lg mb-3"
                />
                <p className="text-lg font-semibold text-gray-800">{item.title}</p>
                <p className="text-gray-600 text-sm">Price: ₹{item.price}</p>
                <p className="text-gray-600 text-sm">Quantity: {item.quantity}</p>

                {/* Buttons to Adjust Quantity */}
                <div className="flex gap-2 mt-3">
                  <button
                    className="bg-green-700 text-white px-3 py-1 rounded-md shadow-md hover:bg-emerald-700 transition"
                    onClick={() => addToCart(item)}
                  >
                    + Add More
                  </button>
                  <button
                    className="bg-red-600 text-white px-3 py-1 rounded-md shadow-md hover:bg-rose-700 transition"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                  <button
                    className={`px-3 py-1 rounded-md shadow-md transition ${
                      item.quantity <= 1 ? "bg-gray-400 cursor-not-allowed" : "bg-yellow-500 hover:bg-amber-600"
                    } text-white`}
                    onClick={() => item.quantity > 1 && decreaseQuantity(item.id)}
                    disabled={item.quantity <= 1}
                  >
                    - Decrease
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Total Price & Checkout Button */}
          <div className="flex flex-col items-center mt-6">
            <p className="text-xl font-bold text-gray-800 mb-4">
              Total Price: ₹{totalPrice}
            </p>
            <NavLink to="/checkout">
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition">
                Proceed to Checkout
              </button>
            </NavLink>
          </div>
        </div>
      )}
    </div>
    </>

  );
}
