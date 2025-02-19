import { useContext } from "react";
import {NavLink} from "react-router-dom"
import { CartContext } from "../context/CartContext";
import "../App.css";
import "./Cart.css"
import cartEmptyImg from "../assets/cartEmptyImg.webp";
export default function Cart() {
  const { cartItem, addToCart, removeFromCart,decreaseQuantity } = useContext(CartContext);

  // Calculate total price for all items in the cart
  const totalPrice = cartItem.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <>
 
      {/* Display total items in cart */}
      <h1 className="cart-title">Total items in cart: {cartItem.length}</h1>

      {/* Check if cart is empty */}
      {cartItem.length === 0 ? (
        <div>
           <div className="cartEmptyContainer">
            {" "}
            <img className="emptyImg" src={cartEmptyImg} />
            <p className="cartEmptyDescription">
              Explore exclusive products and add your favourites to Wishlist!
            </p>
            <button className="cartEmptyButton">
              <NavLink className="cartEmptyLink" to="/products">
                Shop Now
              </NavLink>
            </button>
          </div>
         </div>
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
        <div className="flex justify-between mt-4">
           <NavLink to="/checkout">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Checkout
              </button>
              </NavLink>
              </div>
    </>
  );
}
