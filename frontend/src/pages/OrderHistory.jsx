import { useEffect, useState } from "react";
import api from "../api/apiservices"; // Ensure correct path to your api file

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
        <div className="p-4 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Order History</h2>

            {loading && <p>Loading...</p>}
            {/* {error && <p className="text-red-500">{error}</p>} */}
            {/* {orders.length === 0 && !loading && !error && <p>No orders found.</p>} */}
            {!loading && orders.length === 0 && (
                <p className="text-gray-600">No orders found. (0 orders)</p>
            )}
            <ul className="space-y-4">
                {orders.map((order) => (
                    <li key={order.paymentId} className="p-4 border rounded-lg shadow-sm">
                        <p><strong>Order ID:</strong> {order.paymentId}</p>
                        <p><strong>Amount:</strong> ₹{order.amount.toFixed(2)}</p>
                        <p><strong>Status:</strong> {order.status}</p>
                        <p className="text-gray-500"><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
