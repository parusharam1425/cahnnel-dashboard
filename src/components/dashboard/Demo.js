import React, { useState } from 'react';
import {
    FaTachometerAlt,
    FaFolder,
    FaChartArea,
    FaBars,
  } from 'react-icons/fa';
  import { AiOutlineUser, AiFillProject } from 'react-icons/ai';
import {SiStatuspal} from 'react-icons/si';
import { RiAccountCircleFill } from 'react-icons/ri';
import { NavLink } from 'react-router-dom';


const Sidebar = ({children}) => {
    const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);
    const menuItem=[
        {
            path:"/home",
            name:"Dashboard",
            icon:<FaTachometerAlt/>
        },
        {
            path:"/customers",
            name:"Customer",
            icon:<AiOutlineUser/>
        },
        {
            path:"/project",
            name:"Projects",
            icon:<AiFillProject/>
        },
        {
            path:"/orders",
            name:"Orders",
            icon:<FaFolder/>
        },
        {
            path:"/users",
            name:"Users",
            icon:<FaChartArea/>
        },
        {
            path:"/accounts",
            name:"Accounts",
            icon:<RiAccountCircleFill/>
        },
        {
            path:"/status",
            name:"Status",
            icon:<SiStatuspal/>
        }
    ]
    return (
        <div className="container">
           <div style={{width: isOpen ? "200px" : "50px"}} className="sidebar">
               <div className="top_section">
                   <h1 style={{display: isOpen ? "block" : "none"}} className="logo">Logo</h1>
                   <div style={{marginLeft: isOpen ? "50px" : "0px"}} className="bars">
                       <FaBars onClick={toggle} style={{cursor:"pointer"}}/>
                   </div>
               </div>
               {
                   menuItem.map((item, index)=>(
                       <NavLink to={item.path} key={index} className="link" activeclassName="active">
                           <div className="icon">{item.icon}</div>
                           <div style={{display: isOpen ? "block" : "none"}} className="link_text">{item.name}</div>
                       </NavLink>
                   ))
               }
           </div>
           <main>{children}</main>
        </div>
    );
};

export default Sidebar;