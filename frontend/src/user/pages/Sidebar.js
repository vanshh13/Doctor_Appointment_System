import React, { useState } from 'react'; // Import useState
import { NavLink } from "react-router-dom";
import './Dashboard.css'; // Your CSS file for the sidebar styling

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
            {/* This button will be visible only on smaller screens as per the CSS */}
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
                <NavLink to="/doc" onClick={() => setIsOpen(false)}>Dashboard</NavLink>
                {/* <NavLink to="/doc/appointment" onClick={() => setIsOpen(false)}>Appointments</NavLink> */}
                <NavLink to="/doc/patient" onClick={() => setIsOpen(false)}>Patients</NavLink>
                {/* <NavLink to="/doc/doctor" onClick={() => setIsOpen(false)}>Doctors</NavLink> */}
                <NavLink to="/doc/profile" onClick={() => setIsOpen(false)}>Profile</NavLink>
                <NavLink to="/doc/History" onClick={() => setIsOpen(false)}>Appointment History</NavLink>
                {/* <NavLink to="/">Settings</NavLink> */}
            </div>
        </React.Fragment>
    );
};

export default Sidebar;