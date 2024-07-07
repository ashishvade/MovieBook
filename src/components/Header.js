// // components/Header.js
// import React from 'react';
// import { Link } from 'react-router-dom'; 
// const Header = () => {
//   return (
//     <header className="header">
//       <div className="left-container">
//         {/* Empty div to maintain layout */}
//       </div>
//       <div className="center-container">
//         <h1>Movie Booking System</h1>
//       </div>
//       <div className="right-container">
//         <Link to="/login" className="login-btn">Login</Link>
//       </div>
//     </header>
//   );
// };

// export default Header;



// components/Header.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate hook

const Header = ({ isLoggedIn, onLogout }) => {
  const navigate = useNavigate(); // Initialize navigate function

  const handleLogout = () => {
    // Perform logout logic, such as clearing localStorage or context
    onLogout();
    navigate('/'); // Redirect to home page after logout
  };

  return (
    <header className="header">
      <div className="left-container">
        {/* Empty div to maintain layout */}
      </div>
      <div className="center-container">
        <h1>Movie Booking System</h1>
      </div>
      <div className="right-container">
        {isLoggedIn ? (
          <>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </>
        ) : (
          <Link to="/login" className="login-btn">Login</Link>
        )}
      </div>
    </header>
  );
};

export default Header;

