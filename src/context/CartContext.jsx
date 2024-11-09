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

    // Function to decrease the quantity of an item in the cart
    const decreaseQuantity = (id) => {
        setCartItem(cartItem.map(item => {
            if (item.id === id) {
                return item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item;   
            }
            return item;
        }));
    };

    // Function to completely remove an item from the cart
    const removeFromCart = (id) => {
        setCartItem(cartItem.filter(item => item.id !== id));
    };

    return (
        <CartContext.Provider value={{ cartItem, addToCart, decreaseQuantity, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};
