import React, { useState, useEffect } from 'react';
// import './data.css'
const Data = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001")
      .then(res => res.json())
      .then(
        (data) => {
          setIsLoaded(true);
          setUsers(data);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:3001/users/${id}`, {
      method: 'DELETE'
    })
      .then(() => {
        setUsers(users.filter(user => user.id !== id));
      })
      .catch(error => {
        setError(error);
      });
  };

  if (error) {
    return <div className='content-container'>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div className='content-container'>Loading...</div>;
  } else if (users.length === 0) {
    return <div className='db_data'>

    </div>
  } else {
    return (
      <div className='content-container'>
        <table className='table'>
          <thead>
            <tr>
              <td>UserName</td>
              <td>Password</td>
              
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.username}</td>
                <td>{user.password}</td>
                
                <td>
                  <button className='btn btn-danger' onClick={() => handleDelete(user.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
};

export default Data;
