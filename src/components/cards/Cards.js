import React from 'react';
import { FaClipboardList,FaRupeeSign } from 'react-icons/fa';
import { IoIosPeople } from 'react-icons/io';
import { AiFillProject } from 'react-icons/ai';
import { SiMoneygram } from 'react-icons/si';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import './Cards.css';

function Cards() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-3 col-md-6 col-sm-6 mb-4">
          <div className="card card-primary">
            <div className="card-body">
              <div className="card-content">
                <h3 className="card-value">54</h3>
                <p>Customers</p>
              </div>
              <div className="card-icon">
                <IoIosPeople className="icon" />
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6 col-sm-6 mb-4">
          <div className="card card-success">
            <div className="card-body">
              <div className="card-content">
                <h3 className="card-value">79</h3>
                <p>Projects</p>
              </div>
              <div className="card-icon">
                <AiFillProject className="icon" />
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6 col-sm-6 mb-4">
          <div className="card card-info">
            <div className="card-body">
              <div className="card-content">
                <h3 className="card-value">124</h3>
                <p>Orders</p>
              </div>
              <div className="card-icon">
                <FaClipboardList className="icon" />
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6 col-sm-6 mb-4">
          <div className="card card-danger">
            <div className="card-body">
              <div className="card-content">
                <h3 className="card-value"><FaRupeeSign size={25}/>16</h3>
                <p>Income</p>
              </div>
              <div className="card-icon">
                <SiMoneygram className="income" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cards;
