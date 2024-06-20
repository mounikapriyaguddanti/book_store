


import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';  // Import star icon from react-icons




const Carousel = () => {
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
            <h1 className="text-5xl font-bold mb-4 md:mb-2 sm:mb-1">Welcome to Book Hive </h1>
            <p className="font-bold text-orangered mb-8 md:mb-4 sm:mb-2">"The more that you read, the more things you will know. The more that you learn, the more places you'll go.</p>
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
{/*         <div className="absolute top-4 right-4 bg-orangered text-white py-2 px-4 rounded hover:bg-orange-600 transition-colors duration-300">
  <Link to="/login">Login</Link>
</div> */}
      </div>
    </div>

  );
};



export default Carousel;
