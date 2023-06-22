import React, { useState } from 'react';
import { BsArrowRight, BsPhone, BsChat, BsPerson } from 'react-icons/bs';
import { Link } from 'react-router-dom';

import './styles/Customer.css';

import RImage from './assects/image-user.jpg';

const customersData = [
  {
    id: 1,
    name: 'Yadav',
    title: 'CEO Expert',
    imgSrc: RImage,
    age: 30,
    email: 'yadav@example.com',
    phone: '1234567890',
    address: '123 Main St, City',
  },
  {
    id: 2,
    name: 'swathi',
    title: 'BTS Expert',
    imgSrc: 'imh.jpg',
    age: 30,
    email: 'yadav@example.com',
    phone: '1234567890',
    address: '123 Main St, City',
  },
];

function Customers() {
  const [showAll, setShowAll] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    id: null,
    name: '',
    title: '',
    imgSrc: '',
    age: null,
    email: '',
    phone: '',
    address: '',
  });
  const [customerList, setCustomerList] = useState(customersData);

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

  const addCustomer = () => {
    const newId = customerList.length + 1;
    const newCustomerData = { ...newCustomer, id: newId };
    setCustomerList([...customerList, newCustomerData]);
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
  };
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      setNewCustomer((prevState) => ({ ...prevState, imgSrc: event.target.result }));
    };

    reader.readAsDataURL(file);
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
              </div>
            </div>
          ))}
        </div>
        <div className="add-customer">
        <button className='add-button' onClick={toggleAddModal}>Add Customer</button>
      </div>
      </div>

      

      {showAddModal && (
       <div className="modal">
       <div className="modal-content">
         <h2>Add Customer</h2>
         <input type="text" name="name" placeholder="Name" value={newCustomer.name} onChange={handleInputChange} />
         <input type="text" name="title" placeholder="Title" value={newCustomer.title} onChange={handleInputChange} />
         <input type="file" name="image" onChange={handleImageUpload} />
         <input type="number" name="age" placeholder="Age" value={newCustomer.age} onChange={handleInputChange} />
         <input type="email" name="email" placeholder="Email" value={newCustomer.email} onChange={handleInputChange} />
         <input type="tel" name="phone" placeholder="Phone" value={newCustomer.phone} onChange={handleInputChange} />
         <input type="text" name="address" placeholder="Address" value={newCustomer.address} onChange={handleInputChange} />
         <div className="modal-actions">
           <button className='btn btn-primary' onClick={addCustomer}>Add</button>
           <button className='btn btn-secondary' onClick={toggleAddModal}>Cancel</button>
         </div>
       </div>
     </div>
     
      )}
    </div>
  );
}

export default Customers;
