import React from 'react';
import { useParams } from 'react-router-dom';

function CustomerDetailsPage({ customersData }) {
  const { id } = useParams();

  const customer = customersData.find((customer) => customer.id === parseInt(id));

  if (!customer) {
    return <div>Customer not found.</div>;
  }

  return (
    <div>
      <h1>Customer Details</h1>
      <CustomerDetails customer={customer} />
    </div>
  );
}

function CustomerDetails({ customer }) {
  return (
    <div>
      <h2>{customer.name}</h2>
      <p>Age: {customer.age}</p>
      <p>Email: {customer.email}</p>
      <p>Phone: {customer.phone}</p>
      <p>Address: {customer.address}</p>
    </div>
  );
}

export default CustomerDetailsPage;
