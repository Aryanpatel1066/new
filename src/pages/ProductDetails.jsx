import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { ProductDB } from "../data/productDb";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
   faStar,
 } from "@fortawesome/free-solid-svg-icons"; 
import "./productDetails.css"
const ProductDetails = () => {
  const { id } = useParams();  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch the product data based on the ID
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <div className="productDetails">
       <div className="productDetailsLeftPart">
       <img src={product.image} alt={product.title} />
        </div>
        <div className="productDetailsRightPart">
      <h1 className="productHeading">{product.title}</h1>
      <p className="productDescription">{product.description}</p>
      <div className="ratingBox">
      <p className="ratingText">Rating: {product.reting}</p><FontAwesomeIcon className="starIcon" icon={faStar}/>
      </div>
      <p>Price: ₹{product.price}</p>
      <p>Size: {product.size}</p>
      <p>Discount: {product.is_off}% off</p>
      </div> 
    </div>
  );
};

export default ProductDetails;
