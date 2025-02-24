import React from "react";
import { Link } from "react-router-dom";

export default function OrderSuccessFully() {
    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>🎉 Order Successful!</h1>
            <p>Your payment has been processed successfully.</p>
            <Link to="/">
                <button style={{ padding: "10px 20px", backgroundColor: "green", color: "white", border: "none", cursor: "pointer" }}>
                    Go to Home
                </button>
            </Link>
        </div>
    );
}
