// pages/Admin.js
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
 import AdminPanel from '../components/AdminPanel';

const Admin = () => {
  return (
    <div>
      <Header />
      <div className="container">
        <h2>Admin Panel</h2>
        <AdminPanel />
      </div>
      <Footer />
    </div>
  );
};

export default Admin;
