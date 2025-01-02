import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css'; // Import Tailwind CSS
import { BrowserRouter as Router } from 'react-router-dom';
import { CartProvider } from './context/CartContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      {/* CartProvider makes the cart context available throughout the app */}
      <AuthProvider>
      <CartProvider>
        <App />
      </CartProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>
);
