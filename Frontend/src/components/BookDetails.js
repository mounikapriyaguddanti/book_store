
// BookDetails.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const BookDetails = () => {
  const [publishers, setPublishers] = useState([]);
  const [error, setError] = useState('');
  const [selectedBook, setSelectedBook] = useState(null);
  const [editedBook, setEditedBook] = useState({
    bookName: '',
    publisherName: '',
    authorName: '',
    publisherDate: '',
    totalCopies: 0,
    price: 0,
    purchasedCopies: 0,
  });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const publishersPerPage = 2;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/books');
        console.log('API Response:', response.data);
        setPublishers(response.data);
      } catch (error) {
        setError('Error fetching books');
        console.error('Error fetching books:', error);
      }
    };
    fetchBooks();
  }, []);

  const getPublisherAndAuthorNames = (book, publishers) => {
    const publisher = publishers.find((p) =>
      p.authors.some((a) => a.books.some((b) => b._id === book._id))
    );

    if (!publisher) return { publisherName: '', authorName: '' };

    const author = publisher.authors.find((a) =>
      a.books.some((b) => b._id === book._id)
    );

    return {
      publisherName: publisher.publisherName,
      authorName: author.authorName,
    };
  };

  const handleEdit = (book) => {
    const { publisherName, authorName } = getPublisherAndAuthorNames(book, publishers);
    setSelectedBook(book);
    setEditedBook({
      ...book,
      publisherName,
      authorName,
    });
    setIsEditModalOpen(true);
  };

  const handleDelete = (book) => {
    setSelectedBook(book);
    setIsDeleteModalOpen(true);
  };

  const handleSaveEdit = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/books/${selectedBook._id}`, editedBook);
      const updatedPublishers = publishers.map((publisher) => {
        const updatedAuthors = publisher.authors?.map((author) => {
          const updatedBooks = author.books?.map((book) => {
            if (book._id === selectedBook._id) {
              return response.data.book;
            }
            return book;
          });
          return { ...author, books: updatedBooks };
        });
        return { ...publisher, authors: updatedAuthors };
      });
      setPublishers(updatedPublishers);
      setIsEditModalOpen(false);
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  const handleBack = () => {
    navigate('/admin-dashboard');
  };

  const handleAddBook = () => {
    navigate('/addbookform');
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`http://localhost:5000/books/${selectedBook._id}`);
      const updatedPublishers = publishers.map((publisher) => {
        const updatedAuthors = publisher.authors?.map((author) => {
          const updatedBooks = author.books?.filter((book) => book._id !== selectedBook._id);
          return { ...author, books: updatedBooks };
        });
        return { ...publisher, authors: updatedAuthors };
      });
      setPublishers(updatedPublishers);
      setIsDeleteModalOpen(false);
      setSelectedBook(null);
    } catch (error) {
      console.error('Error deleting book:', error);
      setError('Error deleting book. Please try again.');
    }
  };

  const indexOfLastPublisher = currentPage * publishersPerPage;
  const indexOfFirstPublisher = indexOfLastPublisher - publishersPerPage;
  const currentPublishers = publishers.slice(indexOfFirstPublisher, indexOfLastPublisher);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="bg-navy py-4 px-6 flex justify-between items-center">
        <h1 className="text-white font-bold">Book Details</h1>
        <div>
          <button
            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2"
            onClick={handleAddBook}
          >
            Add Book
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleBack}
          >
            Back
          </button>
        </div>
      </header>
      <main className="flex-grow p-6">
        {error && <p className="text-red-500">{error}</p>}
        {publishers.length > 0 ? (
          <div>
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th className="border py-2 px-4">Publisher</th>
                  <th className="border py-2 px-4">Author</th>
                  <th className="border py-2 px-4">Book Name</th>
                  <th className="border py-2 px-4">Published Date</th>
                  <th className="border py-2 px-4">Price</th>
                  <th className="border py-2 px-4">Total available Copies</th>
                  <th className="border py-2 px-4">Purchased Copies</th>
                  <th className="border py-2 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentPublishers.map((publisher, publisherIndex) => (
                  <React.Fragment key={publisherIndex}>
                    {publisher.authors?.map((author, authorIndex) =>
                      author.books?.map((book, bookIndex) => (
                        <tr key={`${publisherIndex}-${authorIndex}-${bookIndex}`}>
                          {bookIndex === 0 && authorIndex === 0 && (
                            <td
                              className="border py-2 px-4"
                              rowSpan={publisher.authors?.reduce(
                                (total, author) => total + author.books.length,
                                0
                              )}
                            >
                              {publisher.publisherName}
                            </td>
                          )}
                          {bookIndex === 0 && (
                            <td
                              className="border py-2 px-4"
                              rowSpan={author.books?.length || 0}
                            >
                              {author.authorName}
                            </td>
                          )}
                          <td className="border py-2 px-4">{book.bookName}</td>
                          <td className="border py-2 px-4">
                            {new Date(book.publisherDate).toLocaleDateString()}
                          </td>
                          <td className="border py-2 px-4">{book.price}</td>
                          <td className="border py-2 px-4">{book.totalCopies}</td>
                          <td className="border py-2 px-4">
                            {book.purchasedCopies || 0}
                          </td>
                          <td className="border py-2 px-4">
                            <button
                              onClick={() => handleEdit(book)}
                              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                            >
                              <FontAwesomeIcon icon={faEdit} />
                            </button>
                            <button
                              onClick={() => handleDelete(book)}
                              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                            >
                              <FontAwesomeIcon icon={faTrashAlt} />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
            <div className="mt-4 flex justify-center">
              {Array.from({ length: Math.ceil(publishers.length / publishersPerPage) }).map(
                (_, index) => (
                  <button
                    key={index}
                    onClick={() => paginate(index + 1)}
                    className={`px-4 py-2 mx-1 rounded ${
                      currentPage === index + 1
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 text-black'
                    }`}
                  >
                    {index + 1}
                  </button>
                )
              )}
            </div>
          </div>
        ) : (
          <p>No books available.</p>
        )}
      </main>

      {isEditModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
            <h2 className="text-xl font-bold mb-4">Edit Book</h2>
            <div className="mb-4">
              <label className="block mb-2">Book Name:</label>
              <input
                type="text"
                value={editedBook.bookName}
                onChange={(e) =>
                  setEditedBook({ ...editedBook, bookName: e.target.value })
                }
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Publisher Name:</label>
              <input
                type="text"
                value={editedBook.publisherName}
                onChange={(e) =>
                  setEditedBook({ ...editedBook, publisherName: e.target.value })
                }
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Author Name:</label>
              <input
                type="text"
                value={editedBook.authorName}
                onChange={(e) =>
                  setEditedBook({ ...editedBook, authorName: e.target.value })
                }
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Published Date:</label>
              <input
                type="date"
                value={new Date(editedBook.publisherDate)
                  .toISOString()
                  .split('T')[0]}
                onChange={(e) =>
                  setEditedBook({ ...editedBook, publisherDate: e.target.value })
                }
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Total Copies:</label>
              <input
                type="number"
                value={editedBook.totalCopies}
                onChange={(e) =>
                  setEditedBook({
                    ...editedBook,
                    totalCopies: parseInt(e.target.value),
                  })
                }
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Price:</label>
              <input
                type="number"
                value={editedBook.price}
                onChange={(e) =>
                  setEditedBook({
                    ...editedBook,
                    price: parseFloat(e.target.value),
                  })
                }
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
            <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
            <p>Are you sure you want to delete this book?</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookDetails;
