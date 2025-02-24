import { createContext, useState, useEffect } from "react";
import axios from "../api/apiservices"; // Axios instance

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItem, setCartItem] = useState([]);
  const [userAddress, setUserAddress] = useState(null); // No default hardcoded value

  // ✅ Get userId from localStorage
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchAddress = async () => {
      if (!userId) return;

      try {
        const response = await axios.get(`/address/${userId}`);
        if (response.data.addresses.length > 0) {
          setUserAddress(response.data.addresses[0]); // Load user address from backend
        }
      } catch (error) {
        console.error("❌ Error fetching user address:", error);
      }
    };

    fetchAddress();
  }, [userId]);

  const addToCart = (item) => {
    setCartItem((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
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
