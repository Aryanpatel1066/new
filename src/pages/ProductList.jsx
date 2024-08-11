import { ProductDB } from "../data/productDb"
import { useEffect, useState } from "react";
import { FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {  faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "./ProductList.css"
import FilterBar from "./FilterBar";

export default function ProductList() {
    const [data, setData] = useState([]);

    async function getData() {
        try {
            const response = await ProductDB("https://example.com/api/menu");
            setData(response.data.menu);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            <h1>Product List Page</h1>
            {/* <FilterBar/> */}
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
                            <button className="cartButton">   <FontAwesomeIcon className="cartIcon"icon={faCartShopping}   />Add to Cart</button>
                        </div>
                    </li>
                ))}
            </ul>
        </>
    );
}
