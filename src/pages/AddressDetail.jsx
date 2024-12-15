import React, { useState } from "react";
import "./AddressDetail.css"; // Add styles if needed

function AddressDetail() {
  // State to hold the address details
  const [address, setAddress] = useState({
    name: "aryan patel",
    street: "98, sundarpur vijapur",
    city: "gandhinagar",
    state: "Gujarat",
    country: "India",
    pincode: "382860",
    phone: "9173258040",
  });

  const [isEditing, setIsEditing] = useState(false); // Toggle edit modal
  const [formData, setFormData] = useState({ ...address }); // Form input state

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Save updated address
  const handleSave = () => {
    setAddress({ ...formData });
    setIsEditing(false);
  };

  return (
    <div className="account-details-container">
 
      <div className="address-details">
        <h2>{address.name}</h2>
        <p>
          {address.street}, {address.city}, {address.state}, {address.country}
        </p>
        <p>
          <strong>Pincode:</strong> {address.pincode}
        </p>
        <p>
          <strong>Phone Number:</strong> {address.phone}
        </p>
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
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Name"
            />
            <input
              type="text"
              name="street"
              value={formData.street}
              onChange={handleInputChange}
              placeholder="Street"
            />
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              placeholder="City"
            />
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              placeholder="State"
            />
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              placeholder="Country"
            />
            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleInputChange}
              placeholder="Pincode"
            />
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Phone"
            />
            <div className="modal-buttons">
              <button className="save-btn" onClick={handleSave}>
                Save
              </button>
              <button className="cancel-btn" onClick={() => setIsEditing(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddressDetail;
