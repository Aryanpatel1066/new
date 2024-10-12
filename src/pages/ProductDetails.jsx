import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { ProductDB } from "../data/productDb";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import {
  faStar, faTag, faCartShopping
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

  return (<div>
    <div className="productDetails">
      <div className="productDetailsLeftPart">
        <img src={product.image} alt={product.title} />
      </div>
      <div className="productDetailsRightPart">
        <h1 className="productHeading">{product.title}</h1>
        <p className="productDescription">{product.description}</p><div className="combineRatingSize">
          <div className="ratingBox">
            <p className="ratingText">Rating: {product.reting}</p><FontAwesomeIcon className="starIcon" icon={faStar} />
          </div>
          <div className="sizeProduct2">( size: {product.size})</div></div>
        <div className="productContent2">
          <div className="productPrice">
            MRP: <span> ₹{product.price}</span>
          </div>
          <div className="productOffPrice">
            ₹{product.cancel_price}
          </div>
          <div className="productOff">| {product.is_off}% off</div>
        </div>
        <div className="grayLine"></div>
        <div className="moreDetailBox">
          <div className="moreDetailText">
            <span className="facilitiesIcon2">            <FontAwesomeIcon icon={faTag} /></span>
            Fastest Delivery</div>
          <div className="moreDetailText">
            <span className="facilitiesIcon2">            <FontAwesomeIcon icon={faTag} /></span>
            Inclusive of All Taxes</div>
          <div className="moreDetailText"><span className="facilitiesIcon2">
            <FontAwesomeIcon icon={faTag} /></span>
            Cash On Delivery Available</div>

        </div>
        <div className="grayLine"></div>
        <button className="cartButton">
          <FontAwesomeIcon
            className="cartIcon"
            icon={faCartShopping}
          />
          Add to Cart
        </button>
      </div>
    </div>
    <NavLink className="link"to="/products">View More Products ...</NavLink>
    </div>
  );
};

export default ProductDetails;
