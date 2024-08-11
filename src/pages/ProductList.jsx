import { ProductDB } from "../data/productDb";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faStar } from "@fortawesome/free-solid-svg-icons";
import "./ProductList.css";
import FilterBar from "./FilterBar";
import Loading from "./Loading";

export default function ProductList() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function getData() {
        try {
            setLoading(true);
            setError(null); // Reset error state
            const response = await ProductDB("https://example.com/api/menu");
            setData(response.data.menu);
        } catch (err) {
            setError('Failed to fetch products. Please try again later.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <>
     {loading && <Loading />}
            {error && <p className="error-message">{error}</p>}
            {!loading && !error && (
                <>
                    <h1>Product List Page</h1>
                    {/* <FilterBar /> */}
                    <ul className="product-grid">
                        {data.map((item) => (
                            <li key={item.id}>
                                <div className="outerProductContainer">
                                    <img src={item.image} alt={item.title} />
                                    <div className="nameAndRatinCotainer">
                                        <p className="productName">{item.title}</p>
                                        <div className="ratingAndStarContainer">
                                            <p className="ratingText">{item.reting}</p>
                                            <FontAwesomeIcon icon={faStar} className="starIcon" />
                                        </div>
                                    </div>
                                    <div className="sizeProduct">
                                        ( size:{item.size})
                                    </div>
                                    <div className="productContent">
                                        <div className="productPrice">MRP: <span> ₹{item.price}</span></div>
                                        <div className="productOffPrice">
                                            ₹{item.cancel_price}
                                        </div>
                                        <div className="productOff">
                                            | {item.is_off}% off
                                        </div>
                                    </div>
                                    <button className="cartButton">
                                        <FontAwesomeIcon className="cartIcon" icon={faCartShopping} />
                                        Add to Cart
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </>
    );
}
