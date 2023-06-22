import React, { useState, useEffect } from 'react';
import { BsArrowRight, BsPhone, BsChat, BsPerson, BsTrash } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './styles/Customer.css';

import RImage from './assects/image-user.jpg';

const Customers = () => {
  const [showAll, setShowAll] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCustomer, setNewCustomer] = useState(() => {
    const savedCustomer = localStorage.getItem('newCustomer');
    return savedCustomer
      ? JSON.parse(savedCustomer)
      : {
          id: null,
          name: '',
          title: '',
          imgSrc: '',
          age: null,
          email: '',
          phone: '',
          address: '',
        };
  });
  const [customerList, setCustomerList] = useState([]);

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
    setNewCustomer({ ...newCustomer, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const blob = new Blob([file], { type: file.type });
    setNewCustomer((prevState) => ({ ...prevState, imgSrc: blob }));
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
          imgSrc: '',
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
              <Link to={`/customers/${customer.id}`}>
                <img src={customer.imgSrc} alt={`Customer ${customer.id}`} className="customer-img" />
              </Link>
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
              value={newCustomer.age}
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
    </div>
  );
};

export default Customers;
