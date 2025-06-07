import './App.css';
import React, { useState, useCallback, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

// User-related imports
import Auth from "./user/pages/Auth"; // Main login page for general users
import Dashboard from "./user/pages/Dashboard"; // Doctor's Dashboard (assuming 'user' means doctor here)
import Register from './user/pages/register';
import Profile_Doc from './user/pages/Profile_Doc';
import ProfileEdit_Doc from './user/pages/ProfileEdit_Doc';
import DoctorAppointmentHistory from './user/pages/AppointmentHistory';

// Patient-related imports
import PatientAppointment from './appointment/pages/Appointment'; // Patient's appointments
import PatientDashboard from './patient/pages/PatientDashboard';
import MakeAppointment from './appointment/pages/MakeAppointment';
import Patient from './patient/pages/Patient'; // Doctor's view of a patient (?)
import Profile_Pat from './patient/pages/Profile_Pat';
import ProfileEdit_pat from './patient/pages/ProfileEdit_pat';
import MedicalHistory from './appointment/pages/MedicalHistory';

// Doctor-related imports (DocAppointment is under appointment/Docpages, implies doctor specific)
import DocAppointment from './appointment/Docpages/DocAppointment';
import Doctor from './doctor/pages/Doctor'; // Patient's view of a doctor (?)

// Receptionist-related imports
import ReceptionistDashboard from './Receptionist/pages/ReceptionistDashboard';
import Profile_Recep from './Receptionist/pages/Profile_Recep';
import ProfileEdit_recep from './Receptionist/pages/ProfileEdit_recep';
import ReceptionistAppointmentTable from './Receptionist/pages/ReceptionistAppointmentTable';

// Admin-related imports
import AdminDashboard from './admin/pages/AdminDashboard';
import Profile_Admin from './admin/pages/Profile_Admin';
import PatientList from './admin/pages/PatientList';
import DoctorList from './admin/pages/DoctorList';
import ReceptionistList from './admin/pages/ReceptionistList';
import HospitalList from './admin/pages/HospitalList';
import Authlogin from './admin/pages/Auth'; // Admin specific login page

// Other imports
import { AuthContext } from "./shared/context/auth-context";
import Hospital from './hospital/pages/Hospital';
import ReviewPage from './shared/ReviewPage';


// Define a constant for the expiration time (1 hour in milliseconds)
const EXPIRATION_TIME = 60 * 60 * 1000; // 1 hour

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState('');
  const [roleId, setRoleId] = useState('');
  const [authChecked, setAuthChecked] = useState(false); // New state to manage initial auth check

  const login = useCallback((uid, username, roleid) => {
    setIsLoggedIn(true);
    setUserId(uid);
    setUsername(username);
    setRoleId(roleid);

    // Calculate expiration time
    const expiration = new Date().getTime() + EXPIRATION_TIME;

    // Store data in sessionStorage instead of localStorage for session-based persistence
    // Include the expiration timestamp
    sessionStorage.setItem(
      'userData',
      JSON.stringify({
        userId: uid,
        username: username,
        roleId: roleid,
        expiration: expiration, // Store expiration time
      })
    );
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserId(null);
    setUsername('');
    setRoleId('');
    sessionStorage.removeItem('userData'); // Remove from sessionStorage
  }, []);

  // useEffect to check sessionStorage on initial load
  useEffect(() => {
    const storedData = JSON.parse(sessionStorage.getItem('userData'));
    if (storedData && storedData.userId && storedData.roleId && storedData.expiration) {
      const currentTime = new Date().getTime();
      // Check if the stored data is still valid (not expired)
      if (currentTime < storedData.expiration) {
        // If data found and not expired, log in the user
        login(storedData.userId, storedData.username, storedData.roleId);
      } else {
        // If expired, clear the stored data
        sessionStorage.removeItem('userData');
      }
    }
    // Mark auth check as complete regardless of whether data was found or not
    setAuthChecked(true);
  }, [login]); // login is a dependency as it's used inside useEffect

  // If authentication check hasn't completed, display a loading indicator
  if (!authChecked) {
    return (
      <div className="center">
        {/* You can style this as a proper loading spinner */}
        <p>Loading application...</p>
      </div>
    );
  }

  let routes;
  let defaultLoggedInPath = '/'; // Initialize with a safe default

  if (isLoggedIn) {
    // Determine the default dashboard path based on the user's role
    switch (roleId) {
      case 'doctor': // Use the exact string 'doctor' as stored in local storage
        defaultLoggedInPath = '/doc';
        break;
      case 'patient':
        defaultLoggedInPath = '/patient';
        break;
      case 'receptionist':
        defaultLoggedInPath = '/receptionist';
        break;
      case 'admin':
        defaultLoggedInPath = '/admin';
        break;
      default:
        // Fallback for unknown roles, perhaps a generic dashboard or an error page
        defaultLoggedInPath = '/';
    }

    routes = (
      <Routes>
        {/* Doctor Routes */}
        <Route path="/doc" element={<Dashboard />} />
        <Route path="/doc/appointment" element={<DocAppointment />} />
        <Route path="/doc/patient" element={<Patient />} />
        <Route path="/doc/profile" element={<Profile_Doc />} />
        <Route path="/doc/History" element={<DoctorAppointmentHistory />} />
        <Route path="/doc/profile/edit-profile" element={<ProfileEdit_Doc />} />

        {/* Patient Routes */}
        <Route path="/patient" element={<PatientDashboard />} />
        <Route path="/patient/appointment" element={<PatientAppointment />} />
        <Route path="/patient/makeappo" element={<MakeAppointment />} />
        <Route path="/patient/doctor" element={<Doctor />} />
        <Route path="/patient/profile" element={<Profile_Pat />} />
        <Route path="/patient/hospital" element={<Hospital />} />
        <Route path="/patient/medicalhistory/" element={<MedicalHistory />} />
        <Route path="/patient/profile/edit-profile" element={<ProfileEdit_pat />} />

        {/* Receptionist Routes */}
        <Route path="/receptionist" element={<ReceptionistDashboard />} />
        <Route path="/receptionist/profile" element={<Profile_Recep />} />
        <Route path="/receptionist/appointments" element={<ReceptionistAppointmentTable />} />
        <Route path="/receptionist/profile/edit-profile" element={<ProfileEdit_recep />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/profile" element={<Profile_Admin />} />
        <Route path="/admin/doctors" element={<DoctorList />} />
        <Route path="/admin/hospitals" element={<HospitalList />} />
        <Route path="/admin/receptionists" element={<ReceptionistList />} />
        <Route path="/admin/patients" element={<PatientList />} />

        {/* General Logged-in Routes */}
        <Route path="/reviews" element={<ReviewPage />} />

        {/* Catch-all for logged-in users: Redirects to their specific dashboard */}
        <Route path="*" element={<Navigate to={defaultLoggedInPath} replace />} />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        {/* Publicly accessible authentication routes */}
        <Route path="/" element={<Auth />} /> {/* Main login for general users */}
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<Authlogin />} /> {/* Specific admin login */}

        {/* Catch-all for non-logged-in users: Redirects to the main login page */}
        {/* This must be the LAST route definition in this block */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        userid: userId,
        roleid: roleId,
        username: username,
        login: login,
        logout: logout
      }}
    >
      <Router>
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;