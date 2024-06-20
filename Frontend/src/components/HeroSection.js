


import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';  // Import star icon from react-icons

import LoginForm from './LoginForm';
import Navbar from './Navbar';
/* 
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-navy py-4 px-8 fixed w-full z-10 top-0">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <img
            src="https://tse2.mm.bing.net/th?id=OIP.nWvGs37JR7jt3EYzaR4Q5wHaHa&pid=Api&P=0&h=180"
            alt="Logo"
            className="h-12 mr-4"
          />
          <span className="text-white font-bold text-2xl">Bharat Explorer</span>
        </div>
        <div className="hidden md:flex">
          <ul className="flex space-x-8 text-white text-lg">
            <li><Link to="/" className="hover:text-orangered">Home</Link></li>
            <li><Link to="/locations" className="hover:text-orangered">Locations</Link></li>
            <li><Link to="/" className="hover:text-orangered">Accommodations</Link></li>
            <li><Link to="/" className="hover:text-orangered">Packages</Link></li>
            <li><Link to="/" className="hover:text-orangered">Travel Connections</Link></li>
            <li><Link to="/" className="hover:text-orangered">Contact</Link></li>
          </ul>
        </div>
<div className="hidden md:block">
          <Link to="/login" className="bg-orangered hover:bg-orange-600 text-white font-bold py-2 px-4 rounded">
            Login
          </Link>
        </div>

        <div className="md:hidden">
          <button
            className="text-white hover:text-orangered focus:outline-none"
            onClick={toggleMenu}
          >
            <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              {isMenuOpen ? (
                <path fillRule="evenodd" clipRule="evenodd" d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z" />
              ) : (
                <path fillRule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2z" />
              )}
            </svg>
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="text-white hover:bg-gray-700 hover:text-orangered block px-3 py-2 rounded-md text-base font-medium">Home</Link>
            <Link to="/locations" className="text-white hover:bg-gray-700 hover:text-orangered block px-3 py-2 rounded-md text-base font-medium">Locations</Link>
            <Link to="/" className="text-white hover:bg-gray-700 hover:text-orangered block px-3 py-2 rounded-md text-base font-medium">Accommodations</Link>
            <Link to="/" className="text-white hover:bg-gray-700 hover:text-orangered block px-3 py-2 rounded-md text-base font-medium">Packages</Link>
            <Link to="/" className="text-white hover:bg-gray-700 hover:text-orangered block px-3 py-2 rounded-md text-base font-medium">Travel Connections</Link>
            <Link to="/" className="text-white hover:bg-gray-700 hover:text-orangered block px-3 py-2 rounded-md text-base font-medium">Contact</Link>
            <Link to="/login" className="bg-orangered hover:bg-orange-600 text-white font-bold py-2 px-4 rounded block">Login</Link>
          </div>
        </div>
      )}
    </nav>
  );
}; */


const HeroSection = () => {
  const images = [
    'https://cdn.wallpapersafari.com/52/61/uSvZJV.jpg',
    'https://png.pngtree.com/back_origin_pic/03/88/19/883f1b0ddd7c6f341e3357fd964b2bfa.jpg',
    'https://wallpapercave.com/wp/wp2036923.jpg',
  ];

  const quotes = [
    'The more that you read, the more things you will know.',
    'A book is a dream that you hold in your hand.',
    'Books are a uniquely portable magic.',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div>
      <Navbar />
    <div className="relative">
      <div className="bg-cover bg-center flex relative h-screen sm:h-auto">
        <img src={images[currentIndex]} alt="Hero" className="w-full h-auto sm:h-screen animate-fade-in" />
        <div className="absolute inset-0 flex justify-between items-center px-8 md:px-4 sm:px-2">
          <button className="text-white rounded-full p-2 hover:bg-gray-700 transition-colors duration-300 md:p-1" onClick={handlePrevious}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-4 md:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="text-center text-black md:text-4xl sm:text-2xl">
            <h1 className="text-5xl text-blue-500 font-bold mb-4 md:mb-2 sm:mb-1">Welcome to Book Hive</h1>
            <p className="font-bold text-orangered mb-8 md:mb-4 sm:mb-2">"The more that you read, the more things you will know. The more that you learn, the more places you'll go."</p>
          </div>
          <button className="text-white rounded-full p-2 hover:bg-gray-700 transition-colors duration-300 md:p-1" onClick={handleNext}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-4 md:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-2 sm:p-1 flex justify-between items-center bg-black bg-opacity-50">
          <button className="text-white rounded-full p-2 hover:bg-gray-700 transition-colors duration-300 md:p-1" onClick={handlePrevious}></button>
          <p className="text-white text-lg font-semibold md:text-base sm:text-sm">{quotes[currentIndex]}</p>
          <button className="text-white rounded-full p-2 hover:bg-gray-700 transition-colors duration-300 md:p-1" onClick={handleNext}></button>
        </div>
        <div className="absolute top-4 right-4 bg-orangered text-white py-2 px-4 rounded hover:bg-orange-600 transition-colors duration-300">
  <Link to="/login">Login</Link>
</div>
      </div>
    </div>
    </div>
  );
};



export default HeroSection;
