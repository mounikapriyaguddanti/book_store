

import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

const AddBookForm = () => {
  const [publisherName, setPublisherName] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [bookDetails, setBookDetails] = useState({
    bookName: '',
    imgUrl: '',
    description: '',
    publisherDate: '',
    totalCopies: 0,
    price: 0
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();
  const handleBack = () => {
    navigate('/admin-dashboard');
  };
  const handleViewBookDetails = () => {
    navigate('/bookdetails');
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/books', {
        publisherName,
        authorName,
        bookDetails
      });
      console.log('Book added:', response.data);
      setShowSuccessModal(true);
      resetForm();
    } catch (error) {
      console.error('Error adding book:', error.response ? error.response.data : error.message);
    }
  };

  const resetForm = () => {
    setPublisherName('');
    setAuthorName('');
    setBookDetails({
      bookName: '',
      imgUrl: '',
      description: '',
      publisherDate: '',
      totalCopies: 0,
      price: 0
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="bg-navy py-4 px-6 flex justify-between items-center">
      <h1 className="text-white font-bold">Book Form</h1>
      <div>
      <button
      className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2"
      onClick={handleViewBookDetails}
       >
       View book details
       </button>
      <button
      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
       onClick={handleBack}
        >
      Back
      </button>
      </div>
      </header>                                                      
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Add Book </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Publisher Name</label>
            <input
              type="text"
              value={publisherName}
              onChange={(e) => setPublisherName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Author Name</label>
            <input
              type="text"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Book Name</label>
            <input
              type="text"
              value={bookDetails.bookName}
              onChange={(e) => setBookDetails({ ...bookDetails, bookName: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Image URL</label>
            <input
              type="text"
              value={bookDetails.imgUrl}
              onChange={(e) => setBookDetails({ ...bookDetails, imgUrl: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Description</label>
            <textarea
              value={bookDetails.description}
              onChange={(e) => setBookDetails({ ...bookDetails, description: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded"
              required
            ></textarea>
          </div>
          <div>
            <label className="block text-gray-700">Publisher Date</label>
            <input
              type="date"
              value={bookDetails.publisherDate}
              onChange={(e) => setBookDetails({ ...bookDetails, publisherDate: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Total Copies</label>
            <input
              type="number"
              value={bookDetails.totalCopies}
              onChange={(e) => setBookDetails({ ...bookDetails, totalCopies: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Price</label>
            <input
              type="number"
              value={bookDetails.price}
              onChange={(e) => setBookDetails({ ...bookDetails, price: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
      {showSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md text-center">
            <h2 className="text-2xl font-bold mb-4">Book Added Successfully!</h2>
            <button
              onClick={() => setShowSuccessModal(false)}
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
   </div>
  );
};

export default AddBookForm;

