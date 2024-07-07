import React, { useState } from 'react';
import '../styles/Registration.css'; 

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    gender: '',
    dateOfBirth: '',
    password: '',
    role: 'user', 
    email: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://securityboat-jl68.onrender.com/v1/user/addUser', {
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

      
      setFormData({
        name: '',
        mobile: '',
        gender: '',
        dateOfBirth: '',
        password: '',
        role: 'user',
        email: '',
      });

     
    } catch (error) {
      console.error('Error registering user:', error);
     
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

        <button type="submit" className="btn-register">Register</button>
      </form>
    </div>
  );
};

export default RegistrationForm;