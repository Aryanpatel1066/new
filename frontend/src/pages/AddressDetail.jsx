import React, { useEffect, useState, useContext } from "react";
import axios from "../api/apiservices"; // Axios instance
import { CartContext } from "../context/CartContext"; // Import CartContext
import { toast } from "react-toastify"; // Toast notifications
import "react-toastify/dist/ReactToastify.css";
import "./AddressDetail.css";

function AddressDetail() {
  const { userAddress, setUserAddress } = useContext(CartContext); // Access global address state

  // ✅ Provide a default object to prevent null errors
  const [formData, setFormData] = useState(userAddress || { 
    street: "", city: "", state: "", country: "", pincode: "", phone: "" 
  });

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) {
      toast.error("User ID not found! Please log in.", { position: "top-right" });
      setLoading(false);
      return;
    }

    const fetchAddress = async () => {
      try {
        const response = await axios.get(`/address/${userId}`);
        
        if (response.data.addresses.length > 0) {
          setUserAddress(response.data.addresses[0]); // Update global state
          setFormData(response.data.addresses[0]); // Pre-fill form
        } else {
          // ✅ If no address exists, set empty defaults
          setUserAddress({});
          setFormData({ street: "", city: "", state: "", country: "", pincode: "", phone: "" });
        }
      } catch (error) {
        console.error("❌ Error fetching address:", error);
        toast.error("Failed to load address!", { position: "top-right" });
      }
      setLoading(false);
    };

    fetchAddress();
  }, [userId, setUserAddress]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateFields = () => {
    const { street, city, state, country, pincode, phone } = formData;
    if (!street || !city || !state || !country || !pincode || !phone) {
      toast.error("All fields are required!", { position: "top-right" });
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (!validateFields()) return;

    try {
      if (!userId) {
        toast.error("User ID is missing!", { position: "top-right" });
        return;
      }

      let response;
      if (userAddress?.street) { // ✅ Check if address exists before updating
        response = await axios.put(`/address/${userAddress._id}`, formData);
        toast.success("Address updated successfully!", { position: "top-right" });
      } else {
        response = await axios.post(`/address/${userId}`, formData);
        setUserAddress(response.data.address); // Store globally
        toast.success("Address saved successfully!", { position: "top-right" });
      }

      setUserAddress(formData); // Update global state
      setIsEditing(false);
    } catch (error) {
      console.error("❌ Error saving address:", error);
      toast.error(error.response?.data?.message || "Failed to save address!", { position: "top-right" });
    }
  };

  return (
    <div className="account-details-container">
      {loading ? (
        <p>Loading...</p>
      ) : !userAddress?.street || isEditing ? ( // ✅ Safe check using optional chaining
        <div className="edit-modal">
          <div className="modal-content">
            <h2>{userAddress?.street ? "Edit Address" : "Enter Your Address"}</h2>
            <input type="text" name="street" value={formData.street} onChange={handleInputChange} placeholder="Street" required />
            <input type="text" name="city" value={formData.city} onChange={handleInputChange} placeholder="City" required />
            <input type="text" name="state" value={formData.state} onChange={handleInputChange} placeholder="State" required />
            <input type="text" name="country" value={formData.country} onChange={handleInputChange} placeholder="Country" required />
            <input type="text" name="pincode" value={formData.pincode} onChange={handleInputChange} placeholder="Pincode" required />
            <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Phone" required />
            <div className="modal-buttons">
              <button className="save-btn" onClick={handleSave}>Save</button>
              <button className="cancel-btn" onClick={() => { setIsEditing(false); setFormData(userAddress || {}); }}>Cancel</button>
            </div>
          </div>
        </div>
      ) : (
        <div className="address-details">
          <h2>Saved Address</h2>
          <p>{userAddress?.street}, {userAddress?.city}, {userAddress?.state}, {userAddress?.country}</p>
          <p><strong>Pincode:</strong> {userAddress?.pincode}</p>
          <p><strong>Phone Number:</strong> {userAddress?.phone}</p>
          <div className="buttons">
            <button className="edit-btn" onClick={() => setIsEditing(true)}>Edit</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddressDetail;
