import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import "./AddressDetail.css";

function AddressDetail() {
  const { userAddress, setUserAddress } = useContext(CartContext);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...userAddress });

  // Handle form changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Save address and update globally
  const handleSave = () => {
    setUserAddress(formData); // Update in context
    setIsEditing(false);
  };

  return (
    <div className="account-details-container">
      <div className="address-details">
        <h2>{userAddress.name}</h2>
        <p>
          {userAddress.street}, {userAddress.city}, {userAddress.state}, {userAddress.country}
        </p>
        <p><strong>Pincode:</strong> {userAddress.pincode}</p>
        <p><strong>Phone Number:</strong> {userAddress.phone}</p>
        <div className="buttons">
          <button className="edit-btn" onClick={() => setIsEditing(true)}>
            Edit
          </button>
        </div>
      </div>

      {isEditing && (
        <div className="edit-modal">
          <div className="modal-content">
            <h2>Edit Address</h2>
            <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Name" />
            <input type="text" name="street" value={formData.street} onChange={handleInputChange} placeholder="Street" />
            <input type="text" name="city" value={formData.city} onChange={handleInputChange} placeholder="City" />
            <input type="text" name="state" value={formData.state} onChange={handleInputChange} placeholder="State" />
            <input type="text" name="country" value={formData.country} onChange={handleInputChange} placeholder="Country" />
            <input type="text" name="pincode" value={formData.pincode} onChange={handleInputChange} placeholder="Pincode" />
            <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Phone" />
            <div className="modal-buttons">
              <button className="save-btn" onClick={handleSave}>Save</button>
              <button className="cancel-btn" onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddressDetail;
