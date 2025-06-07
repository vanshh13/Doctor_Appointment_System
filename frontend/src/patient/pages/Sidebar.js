import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css'; // This CSS file will control the appearance and behavior

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Hamburger icon for mobile */}
      {/* This button will be visible only on screens smaller than 768px as per the CSS.
          It's positioned fixed to ensure it's always accessible. */}
      <button
        className="hamburger-menu" // Uses the CSS class for hamburger styling
        onClick={toggleMenu}
        aria-label="Toggle navigation menu" // Good for accessibility
      >
        {/* Three `div` elements create the hamburger bars,
            and their classes change to animate into an 'X' when open. */}
        <div className={`bar ${isOpen ? 'open' : ''}`}></div>
        <div className={`bar ${isOpen ? 'open' : ''}`}></div>
        <div className={`bar ${isOpen ? 'open' : ''}`}></div>
      </button>

      {/* The main sidebar container */}
      {/* On desktop, it's fixed on the left and always visible.
          On mobile, its visibility (and animation) is controlled by the `isOpen` state
          which adds/removes the 'open' class. */}
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        {/* NavLink components for patient navigation */}
        <NavLink to="/patient/" onClick={() => setIsOpen(false)}>Dashboard</NavLink>
        <NavLink to="/patient/appointment" onClick={() => setIsOpen(false)}>Appointments</NavLink>
        <NavLink to="/patient/makeappo" onClick={() => setIsOpen(false)}>Make Appointment</NavLink>
        <NavLink to="/patient/doctor" onClick={() => setIsOpen(false)}>Doctor</NavLink>
        <NavLink to="/patient/hospital/" onClick={() => setIsOpen(false)}>Hospital</NavLink>
        <NavLink to="/patient/medicalhistory/" onClick={() => setIsOpen(false)}>Medical History</NavLink>
        <NavLink to="/patient/profile" onClick={() => setIsOpen(false)}>Profile</NavLink>
      </div>
    </>
  );
};

export default Sidebar;