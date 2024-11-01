import { createContext, useState } from "react";

// Step 2: Create and export CartContext
export const CartContext = createContext();

// Step 3: Define and export CartProvider
export const CartProvider = ({ children }) => {
    const [cartItem, setCartItem] = useState([]);

    // Function to add an item to the cart
    const addToCart = (product) => {
        const existingProduct = cartItem.find(item => item.id === product.id);

        if (existingProduct) {
            setCartItem(cartItem.map(item =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            ));
        } else {
            setCartItem([...cartItem, { ...product, quantity: 1 }]);
        }
    };

    // Function to remove an item from the cart
    const removeFromCart = (productId) => {
        setCartItem(cartItem.filter(item => item.id !== productId));
    };

     
    return (
        <CartContext.Provider value={{ cartItem, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};
