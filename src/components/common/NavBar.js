import React from 'react';
import { Link } from 'react-router-dom';
import DropdownMenu from './DropDown';
import './navbar.css';


const Navbar = () => {
  return (
    <header className="navbar navbar-expand-lg navbar-dark bg-dark mb-5">
      <nav className="container-fluid">
        <Link className="navbar-brand" to="/">Car Market</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mr-auto"> 
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/view-cars">
                View All Car 
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/add-car">
                Add New Car
              </Link>
            </li>
          </ul>
          <DropdownMenu /> 
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
