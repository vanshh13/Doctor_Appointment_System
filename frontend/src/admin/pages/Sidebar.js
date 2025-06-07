import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css'; // We'll modify this CSS file

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Hamburger icon for mobile
          - Only visible on screens smaller than 768px.
          - Placed at the top, typically part of a mobile header or a dedicated menu button area.
      */}
      <button
        className="hamburger-menu" // Custom class for hamburger icon styling
        onClick={toggleMenu}
        aria-label="Toggle navigation menu"
      >
        <div className={`bar ${isOpen ? 'open' : ''}`}></div>
        <div className={`bar ${isOpen ? 'open' : ''}`}></div>
        <div className={`bar ${isOpen ? 'open' : ''}`}></div>
      </button>

      {/* The main sidebar container
          - On desktop, it's fixed on the left.
          - On mobile, its visibility is controlled by the `isOpen` state.
      */}
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <NavLink to="/admin/" onClick={() => setIsOpen(false)}>Dashboard</NavLink>
        <NavLink to="/admin/doctors" onClick={() => setIsOpen(false)}>Doctors</NavLink>
        <NavLink to="/admin/hospitals" onClick={() => setIsOpen(false)}>Hospitals</NavLink>
        <NavLink to="/admin/receptionists" onClick={() => setIsOpen(false)}>Receptionists</NavLink>
        <NavLink to="/admin/patients" onClick={() => setIsOpen(false)}>Patients</NavLink>
        {/* <a href="#">Settings</a> */}
      </div>
    </>
  );
};

export default Sidebar;