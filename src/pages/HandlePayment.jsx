import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";

// Load Stripe with your publishable key
const stripePromise = loadStripe("pk_test_51QtUH7ITbzACmJQ84vwNDHBKGRz2zaL9QEZ18Cb05jBm6ImOJkLEaFC9qs3IwKP5BT6XkxH6ePCAbfgFiFFI3wF7000tQqF2dx");

function CheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();

    const handlePayment = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement),
        });

        if (error) {
            console.error(error);
            alert("Payment Failed! Try again.");
        } else {
            console.log("Payment Success:", paymentMethod);
            alert("Payment Successful!");
            navigate("/ordersuccessfully"); // Redirect after success
        }
    };

    return (
        <form onSubmit={handlePayment} style={{ maxWidth: "400px", margin: "auto", textAlign: "center" }}>
            <h2>Enter Card Details</h2>
            <CardElement style={{ border: "1px solid #ccc", padding: "10px" }} />
            <button type="submit" disabled={!stripe} style={{ marginTop: "20px", padding: "10px 20px", backgroundColor: "blue", color: "white", border: "none", cursor: "pointer" }}>
                Pay Now
            </button>
        </form>
    );
}

export default function HandlePayment() {
    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm />
        </Elements>
    );
}
