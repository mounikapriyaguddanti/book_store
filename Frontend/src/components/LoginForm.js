/* 
//loginform
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import image from '../p1.jpg';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/login', { username, password });
      const { message, user, isAdmin } = response.data;

      if (message === 'Login successful') {
        alert('Login successful!');
        if (isAdmin) {
          navigate('/admin-dashboard', { state: { user } }); // Pass user data to admin dashboard
        } else {
          navigate('/user-dashboard', { state: { user } }); 
        }
      } else {
        setError(message);
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('Invalid credentials');
    }
  };
  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    setError(''); // Clear error message when user types
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center h-screen bg-gray-100 p-4">
      <div className="bg-white p-4 md:p-8 rounded-lg shadow-md max-w-4xl w-full flex flex-col md:flex-row items-center md:items-start">
        <div className="w-full md:w-1/2 mb-4 md:mb-0 md:pr-4 flex justify-center items-center">
          <img
            src={image}
            alt="Traveling Cartoon"
            className="object-contain w-full h-48 md:h-full"
            style={{ objectPosition: 'top' }} // Crop the bottom part
          />
        </div>
        <div className="w-full md:w-1/2 p-4 flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="flex flex-col">
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-700 font-bold mb-2">
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={handleInputChange(setUsername)}
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
                value={password}
                onChange={handleInputChange(setPassword)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="flex flex-col items-center">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4 w-full"
              >
                Login
              </button>
              <Link to="/register" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                Don't have an account? Register
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};



export default LoginForm; */
/* 


import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar'; // Import the Navbar component
import image from '../p1.jpg';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/login', { username, password });
      const { message, user, isAdmin } = response.data;

      if (message === 'Login successful') {
        alert('Login successful!');
        if (isAdmin) {
          navigate('/admin-dashboard', { state: { user } }); // Pass user data to admin dashboard
        } else {
          navigate('/user-dashboard', { state: { user } }); 
        }
      } else {
        setError(message);
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('Invalid credentials');
    }
  };
  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    setError(''); // Clear error message when user types
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center h-screen bg-gray-100 p-4">
      <Navbar /> 
      <div className="bg-white p-4 md:p-8 rounded-lg shadow-md max-w-4xl w-full flex flex-col md:flex-row items-center md:items-start">
        <div className="w-full md:w-1/2 mb-4 md:mb-0 md:pr-4 flex justify-center items-center">
          <img
            src={image}
            alt="Traveling Cartoon"
            className="object-contain w-full h-48 md:h-full"
            style={{ objectPosition: 'top' }} // Crop the bottom part
          />
        </div>
        <div className="w-full md:w-1/2 p-4 flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="flex flex-col">
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-700 font-bold mb-2">
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={handleInputChange(setUsername)}
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
                value={password}
                onChange={handleInputChange(setPassword)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="flex flex-col items-center">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4 w-full"
              >
                Login
              </button>
              <Link to="/register" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                Don't have an account? Register
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm; */


// LoginForm.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import image from '../p1.jpg';
import Navbar from './Navbar'; // Import the Navbar component

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();


  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const response = await axios.post('http://localhost:8000/login', { username, password });
        const { message, user, isAdmin } = response.data;
  
        if (message === 'Login successful') {
          alert('Login successful!');
          if (isAdmin) {
            navigate('/admin-dashboard', { state: { user } }); // Pass user data to admin dashboard
          } else {
            navigate('/user-dashboard', { state: { user } }); 
          }
        } else {
          setError(message);
        }
      } catch (error) {
        console.error('Error during login:', error);
        setError('Invalid credentials');
      }
    };
    const handleInputChange = (setter) => (e) => {
      setter(e.target.value);
      setError(''); // Clear error message when user types
    };
  
  

  return (
    <div>
      <Navbar /> {/* Render the Navbar component */}
      <div className="flex flex-col md:flex-row items-center justify-center h-screen bg-gray-100 p-4">
      <div className="bg-white p-4 md:p-8 rounded-lg shadow-md max-w-4xl w-full flex flex-col md:flex-row items-center md:items-start">
        <div className="w-full md:w-1/2 mb-4 md:mb-0 md:pr-4 flex justify-center items-center">
          <img
            src={image}
            alt="Traveling Cartoon"
            className="object-contain w-full h-48 md:h-full"
            style={{ objectPosition: 'top' }} // Crop the bottom part
          />
        </div>
        <div className="w-full md:w-1/2 p-4 flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="flex flex-col">
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-700 font-bold mb-2">
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={handleInputChange(setUsername)}
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
                value={password}
                onChange={handleInputChange(setPassword)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="flex flex-col items-center">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4 w-full"
              >
                Login
              </button>
              <Link to="/register" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                Don't have an account? Register
              </Link>
            </div>
          </form>
        </div>
      </div>
      </div>
    </div>
  );
};

export default LoginForm ;