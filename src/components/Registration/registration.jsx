import React, { useState } from 'react';
import './registration.css';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [notification, setNotification] = useState({
    message: '',
    type: '', 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formValid = true;
    const newErrors = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    };

  
    setNotification({ message: '', type: '' });

    if (!formData.name) {
      formValid = false;
      newErrors.name = 'Name is required';
    }

    if (!formData.email) {
      formValid = false;
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formValid = false;
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      formValid = false;
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      formValid = false;
      newErrors.password = 'Password must be at least 6 characters long';
    }

    if (!formData.confirmPassword) {
      formValid = false;
      newErrors.confirmPassword = 'Confirm Password is required';
    } else if (formData.password !== formData.confirmPassword) {
      formValid = false;
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);

    if (formValid) {
      try {
        const response = await fetch('http://localhost/EVlution/register_function.php', { 
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        const result = await response.json();
        setNotification({
          message: result.message,
          type: result.success ? 'success' : 'error',
        });
      } catch (error) {
        setNotification({
          message: 'An error occurred. Please try again later.',
          type: 'error',
        });
      }
    } else {
      setNotification({
        message: 'Please fix the errors and try again.',
        type: 'error',
      });
    }
  };

  return (
    <div className="register">
      {notification.message && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div>
          <h2 className="title">Registration Form</h2>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>

        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>

        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
          />
          {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
        </div>

        <div>
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
