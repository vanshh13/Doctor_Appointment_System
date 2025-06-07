import React, { useState } from 'react'; // Import useState
import { NavLink } from 'react-router-dom';
// Ensure this CSS file contains all the sidebar and hamburger styling
import './Sidebar.css'; // Or 'Dashboard.css' if that's where your styles are

const Sidebar = () => {
    // State to manage whether the sidebar is open or closed
    const [isOpen, setIsOpen] = useState(false);

    // Function to toggle the sidebar's open/close state
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <React.Fragment>
            {/* Hamburger icon for mobile */}
            {/* This button will be visible only on smaller screens as per your CSS */}
            <button
                className="hamburger-menu" // Apply hamburger styling
                onClick={toggleMenu}
                aria-label="Toggle navigation menu" // Good for accessibility
            >
                {/* Three 'bar' divs create the hamburger lines.
                    The 'open' class will animate them into an 'X' when the sidebar is open. */}
                <div className={`bar ${isOpen ? 'open' : ''}`}></div>
                <div className={`bar ${isOpen ? 'open' : ''}`}></div>
                <div className={`bar ${isOpen ? 'open' : ''}`}></div>
            </button>

            {/* The main sidebar container */}
            {/* The 'open' class will slide the sidebar into view on mobile */}
            <div className={`sidebar ${isOpen ? 'open' : ''}`}>
                {/* NavLink components for navigation */}
                {/* Clicking a NavLink will also close the sidebar */}
                <NavLink to="/receptionist/" onClick={() => setIsOpen(false)}>Dashboard</NavLink>
                <NavLink to="/receptionist/appointments" onClick={() => setIsOpen(false)}>Appointments</NavLink>
                {/* <NavLink to="/receptionist/manage" onClick={() => setIsOpen(false)}>Manage</NavLink> */}
                <NavLink to="/receptionist/profile" onClick={() => setIsOpen(false)}>Profile</NavLink>
                {/* <a href="#" onClick={() => setIsOpen(false)}>Settings</a> */}
            </div>
        </React.Fragment>
    );
};

export default Sidebar;