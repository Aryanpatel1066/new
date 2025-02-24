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
        <form onSubmit={handlePayment} className="max-w-md mx-auto text-center p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Enter Card Details</h2>
            <div className="border border-gray-300 p-3 rounded mb-4">
                <CardElement className="w-full p-2" />
            </div>
            <button type="submit" disabled={!stripe} className="mt-4 px-6 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600">
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
