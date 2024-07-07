import React, { useState } from 'react';
import '../styles/Registration.css'; // Import CSS file for styling

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    gender: '',
    dateOfBirth: '',
    password: '',
    role: 'user', // Default role
    email: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5001/v1/user/addUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('User registered successfully:', data);

      // Optionally, reset form fields after successful registration
      setFormData({
        name: '',
        mobile: '',
        gender: '',
        dateOfBirth: '',
        password: '',
        role: 'user',
        email: '',
      });

      // Handle any further actions like redirecting to a login page
    } catch (error) {
      console.error('Error registering user:', error);
      // Handle error, e.g., show error message to user
    }
  };

  return (
    <div className="registration-form-container">
      <h2>Register User</h2>
      <form onSubmit={handleSubmit} className="registration-form">
        <div className="form-group">
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Mobile:</label>
          <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Gender:</label>
          <input type="text" name="gender" value={formData.gender} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Date of Birth:</label>
          <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        {/* Role selection can be added if needed */}
        {/* <div className="form-group">
          <label>Role:</label>
          <select name="role" value={formData.role} onChange={handleChange} required>
            <option value="user">User</option>
            
          </select>
        </div> */}
        <button type="submit" className="btn-register">Register</button>
      </form>
    </div>
  );
};

export default RegistrationForm;