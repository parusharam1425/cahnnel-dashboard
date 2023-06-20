import React, { useState } from 'react';
import { BsArrowRight, BsPhone, BsChat, BsPerson } from 'react-icons/bs';
import './styles/Project.css';

import RImage from './assects/image-user.jpg'

const customersData = [
  {
    id: 1,
    name: 'Yadav',
    title: 'CEO Expert',
    imgSrc: RImage,
  },
  {
    id: 2,
    name: 'Swathi',
    title: 'BTS',
    imgSrc: 'customer2.jpg',
  },
  {
    id: 3,
    name: 'Mani Deep',
    title: 'Dev',
    imgSrc: 'customer3.jpg',
  },
  {
    id: 4,
    name: 'Anudeep',
    title: 'Pyt',
    imgSrc: 'customer4.jpg',
  },
];

function Customers() {
  const [showAll, setShowAll] = useState(false);
  const displayedCustomers = showAll ? customersData : customersData.slice(0, 2);

  const toggleShowAll = () => {
    setShowAll(!showAll);
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
              <img src={customer.imgSrc} alt={`Customer ${customer.id}`} className="customer-img" />
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
      </div>
    </div>
  );
}

export default Customers;
