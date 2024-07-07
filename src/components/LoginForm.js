// // components/LoginForm.js
// import React, { useState } from 'react';
// import { loginUser } from '../services/UserService';

// const LoginForm = () => {
//   const [formData, setFormData] = useState({ email: '', password: '' });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await loginUser(formData);
//       alert('Login successful!');
//       // Redirect or handle next steps
//     } catch (error) {
//       console.error('Login error:', error);
//       alert('Login failed. Please try again.');
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div className="form-control">
//         <input type="email" name="email" placeholder="Email" onChange={handleChange} />
//       </div>
//       <div className="form-control">
//         <input type="password" name="password" placeholder="Password" onChange={handleChange} />
//       </div>
//       <div className="form-control">
//         <button type="submit">Login</button>
//       </div>
//     </form>
//   );
// };

// export default LoginForm;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import '../styles/LoginForm.css'; // Import CSS file for styling

const LoginForm = ({ onLogin }) => {
  const navigate = useNavigate(); // Initialize navigate function
  const [formData, setFormData] = useState({
    mobile: '',
    password: '',
  });
  const [loginError, setLoginError] = useState(null); // State to hold login error message

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5001/v1/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log('Login response:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Network response was not ok');
      }

      // Pass the user data and token to the parent component
      onLogin(data.data.user, data.data.token);

      // Optionally, reset form fields after successful login
      setFormData({
        mobile: '',
        password: '',
      });

      // Reset login error state
      setLoginError(null);

      // Redirect to home page after successful login
      console.log('Navigating to home page...');
      navigate('/'); // Replace '/home' with your actual home page route

      // Show success alert
      alert('Login successful!');
    } catch (error) {
      console.error('Error logging in:', error);
      setLoginError(error.message || 'Login failed. Please check your credentials.'); // Set login error state
    }
  };

  return (
    <div className="login-form-container">
      <h2>Login</h2>
      {loginError && <div className="error-message">{loginError}</div>}
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label>Mobile:</label>
          <input type="text" name="mobile" placeholder='Enter Mobile No' value={formData.mobile} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn-login">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
