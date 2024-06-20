
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import image from '../p2.png';
import Navbar from './Navbar';

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [registrationMessage, setRegistrationMessage] = useState({ text: '', type: '' });
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleFieldChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(''); // Clear the error message when the user starts typing
  };

  const validateForm = () => {
    const { fullName, email, phoneNumber, username, password, confirmPassword } = formData;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const usernameRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!fullName) {
      setError('Full Name is required.');
      return false;
    }

    if (fullName.length < 5 || fullName.length > 20) {
      setError('Full name should be between 5 and 20 characters.');
      return false;
    }

    if (!email) {
      setError('Email is required.');
      return false;
    }

    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return false;
    }

    if (!phoneNumber) {
      setError('Phone Number is required.');
      return false;
    }

    if (!/^\d{10}$/.test(phoneNumber) || !/^[6789]\d{9}$/.test(phoneNumber)) {
      setError('Please enter a valid 10-digit phone number.');
      return false;
    }

    if (!username) {
      setError('Username is required.');
      return false;
    }

    if (!usernameRegex.test(username)) {
      setError('Username must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character.');
      return false;
    }

    if (username === password) {
      setError('Username and password cannot be the same.');
      return false;
    }

    if (!password) {
      setError('Password is required.');
      return false;
    }

    if (!passwordRegex.test(password)) {
      setError('Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character.');
      return false;
    }

    if (!confirmPassword) {
      setError('Confirm Password is required.');
      return false;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return false;
    }

    return true;
  };

  const resetForm = () => {
    setFormData({
      fullName: '',
      email: '',
      phoneNumber: '',
      username: '',
      password: '',
      confirmPassword: '',
    });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    axios.post('http://localhost:8000/register', formData)
      .then((response) => {
        setRegistrationMessage({ text: 'Registration successful!', type: 'success' });
        resetForm();
        setShowSuccessMessage(true);
      })
      .catch((error) => {
        setRegistrationMessage({ text: 'Registration failed. Please try again.', type: 'error' });
        console.error('Registration error:', error);
      });
  };

  const handleSuccessMessageClose = () => {
    setShowSuccessMessage(false);
    navigate('/login');
  };

  return (
    <div>
      <Navbar />
    <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-4 md:p-8 rounded-lg shadow-md max-w-4xl w-full flex flex-col lg:flex-row items-center lg:space-x-4">
        <div className="w-full lg:w-1/2 flex justify-center items-center mb-4 lg:mb-0">
          <img
            src={image}
            alt="Traveling Cartoon"
            className="object-contain w-full lg:w-auto lg:h-96"
          />
        </div>
        <div className="w-full lg:w-1/2 p-4 flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-4 text-center lg:text-left"><br/>Register</h2>
          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="flex flex-col">
            <div className="mb-4">
              <label htmlFor="fullName" className="block text-gray-700 font-bold mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleFieldChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleFieldChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="phoneNumber" className="block text-gray-700 font-bold mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleFieldChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-700 font-bold mb-2">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleFieldChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleFieldChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block text-gray-700 font-bold mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleFieldChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Register
              </button>
            </div>
          </form>
          <div className="mt-4 text-center">
            <p className="text-gray-700">
              Already registered?{' '}
              <Link to="/login" className="text-blue-500 hover:text-blue-700">
                Login
              </Link>
            </p>
          </div>
          {registrationMessage.text && (
            <div
              className={`p-4 mt-4 ${
                registrationMessage.type === 'success'
                  ? 'bg-green-100 border-l-4 border-green-500 text-green-700'
                  : 'bg-red-100 border-l-4 border-red-500 text-red-700'
              }`}
              role="alert"
            >
              {registrationMessage.text}
            </div>
          )}
        </div>
      </div>

      {showSuccessMessage && (
        <div className="fixed top-0 left-0 w-full bg-gray-900 bg-opacity-50 flex items-center justify-center h-screen">
          <div className="bg-white p-8 rounded-lg shadow-md max-w-md">
            <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Registration Successful!</h2>
            <p className="text-gray-700 mb-4">Your registration is successful. Click "OK" to proceed to login.</p>
            <div className="flex justify-center">
              <button
                onClick={handleSuccessMessageClose}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default RegistrationForm;
