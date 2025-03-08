import { useState } from "react";
import api from "../api/apiservices"; // Axios instance
import { FaUsers, FaShoppingCart } from "react-icons/fa";
import Header from "../component/Header"
export default function AdminDashboard() {
    const [users, setUsers] = useState([]);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState(null);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await api.get("/admin/users/count");
            setUsers(response.data.users);
            setActiveTab("users");
        } catch (error) {
            console.error("Error fetching users:", error);
        }
        setLoading(false);
    };

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const response = await api.get("/admin/orders/count");
            setOrders(response.data.orders);
            setActiveTab("orders");
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
        setLoading(false);
    };

    return (
        <><Header/>
        <div className="p-6 max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-6">👋 Welcome Admin</h2>

            {/* Icons Section */}
            <div className="flex justify-center gap-10">
                <button onClick={fetchUsers} className="text-center p-4 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition">
                    <FaUsers size={50} />
                    <p className="mt-2 text-lg">Users</p>
                </button>

                <button onClick={fetchOrders} className="text-center p-4 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition">
                    <FaShoppingCart size={50} />
                    <p className="mt-2 text-lg">Orders</p>
                </button>
            </div>

            {/* Data Section */}
            <div className="mt-8">
                {loading && <p className="text-center text-gray-600">Loading...</p>}

                {/* Users List */}
                {activeTab === "users" && (
                    <div>
                        <h3 className="text-2xl font-bold mb-4">Total Users: {users.length}</h3>
                        <ul className="bg-white shadow-lg p-4 rounded-lg">
                            {users.map((user) => (
                                <li key={user.email} className="border-b py-2">
                                    <span className="font-semibold">{user.name}</span> - {user.email}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Orders List */}
                {activeTab === "orders" && (
                    <div>
                        <h3 className="text-2xl font-bold mb-4">Total Orders: {orders.length}</h3>
                        <ul className="bg-white shadow-lg p-4 rounded-lg">
                            {orders.map((order) => (
                                 <li key={order._id} className="border-b py-4 px-3 bg-white rounded-lg shadow-md">
                                 <span className="font-semibold">{order.userId.name}</span> - ₹{order.amount}
                                 
                                 {/* Status with dynamic color */}
                                 <span 
                                     className={`ml-2 px-2 py-1 rounded-full text-white text-sm 
                                         ${order.status === "Success" ? "bg-green-500" : order.status === "Failed" ? "bg-red-500" : "bg-gray-500"}`}>
                                     {order.status}
                                 </span>
                                 
                                 <p className="text-gray-500 text-sm mt-1">
                                     <strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}
                                 </p>
                             </li>
                             
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div></>
    );
}
