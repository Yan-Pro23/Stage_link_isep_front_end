import React, { useState } from 'react';
import { Container, Card, Form, Button } from 'react-bootstrap';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';

const AuthContainer = () => {
  const [currentPage, setCurrentPage] = useState('login');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    role: 'Étudiant',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (type) => {
    if (type === 'login') {
      console.log('Connexion:', { 
        email: formData.email, 
        password: formData.password 
      });
    } else {
      console.log('Inscription:', formData);
    }
  };

  const switchPage = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      {currentPage === 'login' ? (
        <LoginPage
          formData={formData}
          handleInputChange={handleInputChange}
          handleSubmit={() => handleSubmit('login')}
          switchToSignup={() => switchPage('signup')}
        />
      ) : (
        <SignupPage
          formData={formData}
          handleInputChange={handleInputChange}
          handleSubmit={() => handleSubmit('signup')}
          switchToLogin={() => switchPage('login')}
        />
      )}
    </div>
  );
};

export default AuthContainer;