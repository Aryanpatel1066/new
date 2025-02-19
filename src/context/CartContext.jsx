import { createContext, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItem, setCartItem] = useState([]);

  // Global Address State
  const [userAddress, setUserAddress] = useState({
    name: "Aryan Patel",
    street: "98, Sundarpur, Vijapur",
    city: "Gandhinagar",
    state: "Gujarat",
    country: "India",
    pincode: "382860",
    phone: "9173258040",
  });

  const addToCart = (item) => {
    setCartItem([...cartItem, { ...item, quantity: 1 }]);
  };

  const removeFromCart = (id) => {
    setCartItem(cartItem.filter((item) => item.id !== id));
  };

  const decreaseQuantity = (id) => {
    setCartItem(
      cartItem.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      )
    );
  };

  const totalPrice = cartItem.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItem,
        addToCart,
        removeFromCart,
        decreaseQuantity,
        totalPrice,
        userAddress,
        setUserAddress, // Allows updates to the address globally
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
