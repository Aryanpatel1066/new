import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { NavLink, useNavigate } from "react-router-dom";

export default function Checkout() {
  const { cartItem, totalPrice, userAddress } = useContext(CartContext);
  const navigate = useNavigate();

   

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Address Section */}
        <div className="border p-4 rounded-lg shadow-lg bg-white">
          <h2 className="text-xl font-semibold mb-2">Shipping Address</h2>
          <p><strong>Name:</strong> {userAddress.name}</p>
          <p><strong>Address:</strong> {userAddress.street}, {userAddress.city}, {userAddress.state}, {userAddress.country}</p>
          <p><strong>Pincode:</strong> {userAddress.pincode}</p>
          <p><strong>Phone:</strong> {userAddress.phone}</p>
        </div>

        {/* Cart Items and Price Details */}
        <div className="border p-4 rounded-lg shadow-lg bg-white">
          <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
          {cartItem.length === 0 ? (
            <p>Your cart is empty!</p>
          ) : (
            <div>
              {cartItem.map((item) => (
                <div key={item.id} className="flex justify-between border-b py-2">
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p>₹{item.price} x {item.quantity}</p>
                  </div>
                  <p className="font-semibold">₹{item.price * item.quantity}</p>
                </div>
              ))}
              <div className="flex justify-between mt-4">
                <p className="text-lg font-semibold">Total:</p>
                <p className="text-lg font-bold">₹{totalPrice}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Place Order Button */}
      <div className="flex justify-end mt-6">
        <NavLink to="/handlepayment">
        <button
           className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition"
        >
          Place Order
        </button>
        </NavLink>
      </div>
    </div>
  );
}
