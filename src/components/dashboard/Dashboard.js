import React, { useState } from 'react';
import { Link, useLocation, Route, Routes } from 'react-router-dom';
import {
  FaTachometerAlt,
  FaFolder,
  FaTable,
  FaSearch,
  FaUser,
  FaSignOutAlt,
  FaBars,
  FaAngleUp,
} from 'react-icons/fa';
import { RiAccountCircleFill } from 'react-icons/ri';
import { AiOutlineUser, AiFillProject } from 'react-icons/ai';
import { FcBusinessman } from 'react-icons/fc';

import Matrical from '../../components/routes/assects/matrical.jpeg';

import './Dashboard.css';
import Cards from '../cards/Cards';
import Project from '../routes/Project';
import Customers from '../routes/Customers';

function Sidebar() {
  const location = useLocation();
  const { username } = location.state || { username: 'Guest' };
  const [projectLength, setProjectLength] = useState('0')
  const [customerLength, setCustomerLength] = useState('0')
  const [income, setIncome] = useState('0')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    //console.log('Search Query:', searchQuery);
  };

  return (
    <div id="wrapper">
      <div className={`sidebar ${sidebarOpen ? 'toggled' : ''}`}>
        <ul id="accordionSidebar" className={`ok ${sidebarOpen ? 'sidebar-small' : ''}`}>
          <li className="sidebar-item">
            <div className='logo'>
              <img src={Matrical} className='logo-c' alt="logo"/>
            </div>
          </li>
          <li className="sidebar-item">
            <Link className="sidebar-link" to="/dashboard">
              <FaTachometerAlt className="sidebar-icon" />
              <span>Dashboard</span>
            </Link>
          </li>
          <li className="sidebar-item">
            <Link className="sidebar-link" to="/customers">
              <AiOutlineUser className="sidebar-icon" />
              <span>Chl Partner</span>
            </Link>
          </li>
          <li className="sidebar-item">
            <Link className="sidebar-link" to="/projects">
              <AiFillProject className="sidebar-icon" />
              <span>Projects</span>
            </Link>
          </li>
          <li className="sidebar-item">
            <Link className="sidebar-link" to="/orders">
              <FaFolder className="sidebar-icon" />
              <span>Orders</span>
            </Link>
          </li>
          {/* <li className="sidebar-item">
            <Link className="sidebar-link" to="/users">
              <BiUser className="sidebar-icon" />
              <span>Users</span>
            </Link>
          </li> */}
          <li className="sidebar-item">
            <Link className="sidebar-link" to="/accounts">
              <RiAccountCircleFill className="sidebar-icon" />
              <span>Accounts</span>
            </Link>
          </li>
          <li className="sidebar-item">
            <Link className="sidebar-link" to="#">
              <FaTable className="sidebar-icon" />
              <span>Status</span>
            </Link>
          </li>
        </ul>
      </div>
      <div id="content-wrapper" className="main-content">
        <div id="content">
          <nav className="navbar">
            <FaBars className="sidebar-toggle" onClick={toggleSidebar} />
            <h3 className="heading">Dashboard</h3>
            <form className="navbar-search" onSubmit={handleSearchSubmit}>
              <div className="search-input">
                <input type="text" placeholder="Search for..." value={searchQuery} onChange={handleSearchChange} />
                <button type="submit">
                  <FaSearch />
                </button>
              </div>
            </form>
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-links" onClick={toggleDropdown}>
                  <p className="username">{username}</p>
                  <FcBusinessman className="navbar-brand-icon" />
                </Link>
                {isDropdownOpen && (
                  <div className='drop-menu'>
                    <Link className="dropdown-item" to="/dashboard">
                      <FaUser className="dropdown-icon" />
                      Profile
                    </Link>
                    <Link className="dropdown-item" to="/">
                      <FaSignOutAlt className="dropdown-icon" />
                      Logout
                    </Link>
                  </div>
                )}
              </li>
            </ul>
          </nav>
          <Cards projectLength={projectLength} customerLength={customerLength} income={income} />
          <div className="row">
            <div className='col-md-12 col-lg-7'>
              <Routes>
                <Route exact path="/projects" component={Project } />
              </Routes>
            </div>
            <div className='col-md-12 col-lg-7'>
              <Routes>
                <Route  path="/customers" component={Customers} />
              </Routes>
            </div>
            <div className='col-md-12 col-lg-7'>
              <Project setProjectLength={setProjectLength} setIncome={setIncome} />
            </div>

            <div className='col-md-12 col-lg-5'>
              <Customers setCustomerLength={setCustomerLength}/>
            </div>
          </div>
        </div>
      </div>
      <Link className="scroll-to-top rounded" to="#page-top">
        <FaAngleUp />
      </Link>
    </div>
  );
}

export default Sidebar;
