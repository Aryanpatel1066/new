import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import "../App.css";
import "./Cart.css"
export default function Cart() {
  const { cartItem, addToCart, removeFromCart,decreaseQuantity } = useContext(CartContext);

  // Calculate total price for all items in the cart
  const totalPrice = cartItem.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <>
      <h1 className="cart-title">Cart Page</h1>

      {/* Display total items in cart */}
      <h1 className="cart-total-items">Total items in cart: {cartItem.length}</h1>

      {/* Check if cart is empty */}
      {cartItem.length === 0 ? (
        <p className="empty-cart-message">Your cart is empty.</p>
      ) : (
        <div className="cart-items">
          {/* List each item in the cart */}
          {cartItem.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.title} className="cart-item-image" />

              <div className="cart-item-details">
                <p className="cart-item-title">{item.title}</p>
                <p className="cart-item-price">Price: ₹{item.price}</p>
                <p className="cart-item-quantity">
                  Quantity: {item.quantity}
                </p>

                {/* Buttons to adjust quantity */}
                <button
                  className="cart-item-add"
                  onClick={() => addToCart(item)}
                >
                  + Add more
                </button>
                <button
                  className="cart-item-remove"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
                <button 
    className="cart-item-remove" 
    onClick={() => item.quantity > 1 && decreaseQuantity(item.id)}
    disabled={item.quantity <= 1} // Disables the button if quantity is 1
    style={{
        backgroundColor: item.quantity <= 1 ? 'lightgray' : '#007bff', 
        cursor: item.quantity <= 1 ? 'not-allowed' : 'pointer'
    }}
>
    Decrease
</button>



              </div>
            </div>
          ))}

          {/* Display total price */}
          <div className="cart-total-price">
            <p>Total Price: ₹{totalPrice}</p>
          </div>
        </div>
      )}
    </>
  );
}
