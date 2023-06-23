import React, { useState, useEffect } from 'react';
import { BsArrowRight, BsPhone, BsChat, BsPerson, BsTrash } from 'react-icons/bs';
import { FcBusinessman } from 'react-icons/fc';
import axios from 'axios';

import './styles/Customer.css';

const Customers = ({ setCustomerLength }) => {
  const [showAll, setShowAll] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    id: null,
    name: '',
    title: '',
    imgSrc: null,
    age: null,
    email: '',
    phone: '',
    address: '',
  });
  const [customerList, setCustomerList] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    // Fetch customer data from the API
    axios
      .get('http://localhost:3001/customers')
      .then((response) => {
        // Customer data fetched successfully
        setCustomerList(response.data);
      })
      .catch((error) => {
        // Error occurred while fetching customer data
        console.error('Error fetching customer data:', error);
      });
  }, []);

  useEffect(() => {
    // Save newCustomer data to local storage
    localStorage.setItem('newCustomer', JSON.stringify(newCustomer));
  }, [newCustomer]);

  const displayedCustomers = showAll ? customerList : customerList.slice(0, 2);

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  const toggleAddModal = () => {
    setShowAddModal(!showAddModal);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewCustomer((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setNewCustomer((prevState) => ({ ...prevState, imgSrc: file }));
  };

  const addCustomer = () => {
    // Create a FormData object to send customer data and image separately
    const formData = new FormData();
    formData.append('name', newCustomer.name);
    formData.append('title', newCustomer.title);
    formData.append('age', newCustomer.age);
    formData.append('email', newCustomer.email);
    formData.append('phone', newCustomer.phone);
    formData.append('address', newCustomer.address);
    formData.append('image', newCustomer.imgSrc);

    axios
      .post('http://localhost:3001/customers', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        // Customer data added successfully
        const addedCustomer = {
          id: response.data.id,
          name: newCustomer.name,
          title: newCustomer.title,
          imgSrc: URL.createObjectURL(newCustomer.imgSrc),
          age: newCustomer.age,
          email: newCustomer.email,
          phone: newCustomer.phone,
          address: newCustomer.address,
        };
        setCustomerList([...customerList, addedCustomer]);
        setNewCustomer({
          id: null,
          name: '',
          title: '',
          imgSrc: null,
          age: null,
          email: '',
          phone: '',
          address: '',
        });
        toggleAddModal();
      })
      .catch((error) => {
        // Error occurred while adding customer data
        console.error('Error adding customer data:', error);
      });
  };

  const deleteCustomer = (id) => {
    axios
      .delete(`http://localhost:3001/customers/${id}`)
      .then(() => {
        // Customer data deleted successfully
        setCustomerList(customerList.filter((customer) => customer.id !== id));
      })
      .catch((error) => {
        // Error occurred while deleting customer data
        console.error('Error deleting customer data:', error);
      });
  };

  const getDefaultUserIcon = () => {
    return (
      <div className="default-user-icon">
        <FcBusinessman size={33} />
      </div>
    );
  };

  const customerCount = customerList.length;
  setCustomerLength(customerCount);

  return (
    <div className="customer-container row">
      <div className="project-card">
        <div className="card-header">
          <h6 className="card-title">New Customers</h6>
          <button className="button" onClick={toggleShowAll}>
            {showAll ? 'Collapse' : 'See All'} <BsArrowRight className="arrow" />
          </button>
        </div>
        <hr />
        <div className="customer-info">
          {displayedCustomers.map((customer) => (
            <div className="customer" key={customer.id}>
              <div onClick={() => setSelectedCustomer(customer)}>
                {customer.imgSrc ? (
                  <img src={customer.imgSrc} alt={`Customer ${customer.id}`} className="customer-img" />
                ) : (
                  getDefaultUserIcon()
                )}
              </div>
              <div className="customer-details">
                <h4 className="customer-name">
                  {customer.name}
                  <br />
                  <span className="span-name">{customer.title}</span>
                </h4>
              </div>
              <div className="customer-actions">
                <span className="action-icon">
                  <BsPerson />
                </span>
                <span className="action-icon">
                  <BsChat />
                </span>
                <span className="action-icon">
                  <BsPhone />
                </span>
                <span className="action-icon text-danger" onClick={() => deleteCustomer(customer.id)}>
                  <BsTrash />
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="add-customer">
          <button className="add-button" onClick={toggleAddModal}>
            Add Customer
          </button>
        </div>
      </div>

      {showAddModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add Customer</h2>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={newCustomer.name}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={newCustomer.title}
              onChange={handleInputChange}
            />
            <input type="file" name="image" onChange={handleImageUpload} />
            <input
              type="number"
              name="age"
              placeholder="Age"
              value={newCustomer.age || ''}
              onChange={handleInputChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={newCustomer.email}
              onChange={handleInputChange}
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              value={newCustomer.phone}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={newCustomer.address}
              onChange={handleInputChange}
            />
            <div className="modal-actions">
              <button className="btn btn-primary" onClick={addCustomer}>
                Add
              </button>
              <button className="btn btn-secondary" onClick={toggleAddModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

{selectedCustomer && (
  <div className="customer-details-popup">
    <div className="popup-content">
      <div className="customer-details-header">
        <h4 className="customer-name">{selectedCustomer.name}</h4>
        <span className="span-name">{selectedCustomer.title}</span>
      </div>
      <div className="customer-details-info">
        <div className="detail">
          <span className="detail-label">Age:</span>
          <span className="detail-value">{selectedCustomer.age}</span>
        </div>
        <div className="detail">
          <span className="detail-label">Email:</span>
          <span className="detail-value">{selectedCustomer.email}</span>
        </div>
        <div className="detail">
          <span className="detail-label">Phone:</span>
          <span className="detail-value">{selectedCustomer.phone}</span>
        </div>
        <div className="detail">
          <span className="detail-label">Address:</span>
          <span className="detail-value">{selectedCustomer.address}</span>
        </div>
      </div>
      <button className="btn btn-secondary" onClick={() => setSelectedCustomer(null)}>
        Close
      </button>
    </div>
  </div>
)}

    </div>
  );
};

export default Customers;
