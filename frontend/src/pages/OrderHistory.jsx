import { useEffect, useState } from "react";
import api from "../api/apiservices"; // Ensure correct path to your API file

export default function OrderHistory() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const userId = localStorage.getItem("userId"); // Get userId from localStorage
        if (!userId) {
            setError("User not found. Please log in.");
            setLoading(false);
            return;
        }

        const fetchOrders = async () => {
            try {
                const response = await api.get(`/orders/${userId}`);
                if (response.data.success) {
                    setOrders(response.data.orders);
                } else {
                    setError(response.data.message);
                }
            } catch (err) {
                setError("Failed to fetch orders. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
            <div className="bg-white shadow-lg rounded-lg p-6 md:p-10 w-full max-w-3xl">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Order History</h2>

                {loading && <p className="text-center text-gray-600">Loading...</p>}

                {error && <p className="text-center text-red-500">{error}</p>}

                {!loading && orders.length === 0 && !error && (
                    <p className="text-center text-gray-600">No orders found.</p>
                )}

                <ul className="space-y-4">
                    {orders.map((order) => (
                        <li key={order.paymentId} className="p-4 border rounded-lg shadow-sm bg-gray-50 hover:shadow-md transition">
                            <p className="text-lg font-semibold text-gray-800"><strong>Order ID:</strong> {order.paymentId}</p>
                            <p className="text-gray-700"><strong>Amount:</strong> ₹{order.amount.toFixed(2)}</p>
                            <p className={`font-semibold ${order.status === "Completed" ? "text-green-600" : "text-red-500"}`}>
                                <strong>Status:</strong> {order.status}
                            </p>
                            <p className="text-gray-500"><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
