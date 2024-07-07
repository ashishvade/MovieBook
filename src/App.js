// // App.js
// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Home from './pages/Home';
// import Movies from './pages/Movies';
// import Booking from './pages/Booking';
// import Admin from './pages/Admin';
// import Header from './components/Header';
// import Footer from './components/Footer';
// import RegistrationForm from './pages/RegistrationForm';
// import LoginForm from './pages/LoginForm';

// const App = () => {

//   const handleLogin = (user, token) => {
//     // Handle login logic, such as storing user data and token in localStorage or context
//     console.log('Logged in user:', user);
//     console.log('Token:', token);
//     // Example: localStorage.setItem('token', token);
//   };
//   return (
//     <Router>
//       <div className="app-wrapper">
//         <Header />
//         <div className="container">
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/movies" element={<Movies />} />
//             <Route path="/booking" element={<Booking />} />
//             <Route path="/admin" element={<Admin />} />
//             <Route path="/Registration" element={<RegistrationForm />} />
//             <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
//           </Routes>
//         </div>
//         <Footer />
//       </div>
//     </Router>
//   );
// };

// export default App;

// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Movies from './pages/Movies';
import Booking from './pages/Booking';
import Admin from './pages/Admin';
import Header from './components/Header';
import Footer from './components/Footer';
import RegistrationForm from './pages/RegistrationForm';
import LoginForm from './pages/LoginForm';
import './styles/styles.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (user, token) => {
    console.log('Logged in user:', user);
    console.log('Token:', token);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    console.log('Logging out...');
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div className="app-wrapper">
        <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/booking/:movieId" element={<Booking />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/registration" element={<RegistrationForm />} />
            <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
