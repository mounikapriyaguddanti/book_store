
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import Carousel from './Carousel';

const PurchaseModal = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white rounded p-8 max-w-lg flex flex-col items-center">
        <p className="text-lg font-semibold mb-4">{message}</p>
        <button onClick={onClose} className="bg-blue-500 text-white font-bold py-2 px-4 rounded">
          Close
        </button>
      </div>
    </div>
  );
};

const UserDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [publishers, setPublishers] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showWishlist, setShowWishlist] = useState(false);
  const [purchaseMessage, setPurchaseMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 5;

  useEffect(() => {
    if (location.state && location.state.user) {
      setUser(location.state.user);
    }

    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/books');
        console.log('Books data:', response.data);
        setPublishers(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, [location.state]);

  // ... (other functions and event handlers)

  const handleLogout = async () => {
    try {
      if (user) {
        await axios.post('http://localhost:8000/logout', {
          username: user.username,
          logoutTime: new Date().toISOString(),
        });
      }
      navigate('/');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const handleViewMore = (book) => {
    setSelectedBook(book);
  };

  const closeModal = () => {
    setSelectedBook(null);
    setShowPurchaseModal(false);
    setPurchaseMessage('');
  };

  const toggleWishlist = (book) => {
    if (wishlist.some((item) => item._id === book._id)) {
      setWishlist(wishlist.filter((item) => item._id !== book._id));
    } else {
      setWishlist([...wishlist, book]);
    }
  };

  const handleShowWishlist = () => {
    setShowWishlist(!showWishlist);
  };

  const handleBuyBook = async (book) => {
    try {
      const response = await axios.post(`http://localhost:5000/purchase/${book._id}`);
      if (response.status === 200) {
        setPurchaseMessage('Purchase successful!');
        setShowPurchaseModal(true);
        setPublishers((prevPublishers) =>
          prevPublishers.map((publisher) => ({
            ...publisher,
            authors: publisher.authors.map((author) => ({
              ...author,
              books: author.books.map((b) =>
                b._id === book._id ? { ...b, totalCopies: b.totalCopies - 1 } : b
              ),
            })),
          }))
        );
        setWishlist((prevWishlist) =>
          prevWishlist.map((b) =>
            b._id === book._id ? { ...b, totalCopies: b.totalCopies - 1 } : b
          )
        );
        setTimeout(() => closeModal(), 3000); // Close modal after 3 seconds
      }
    } catch (error) {
      console.error('Error purchasing book:', error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    if (event.target.value === '') {
      setFilteredBooks([]);
    } else {
      const filtered = publishers.flatMap((publisher) =>
        publisher.authors.flatMap((author) =>
          author.books.filter((book) =>
            book.bookName.toLowerCase().includes(event.target.value.toLowerCase()) ||
            author.authorName.toLowerCase().includes(event.target.value.toLowerCase()) ||
            publisher.publisherName.toLowerCase().includes(event.target.value.toLowerCase())
          ).map((book) => ({
            ...book,
            author: author.authorName,
            publisherName: publisher.publisherName,
          }))
        )
      );
      setFilteredBooks(filtered);
    }
  };

  const handleDeleteFromWishlist = (book) => {
    setWishlist(wishlist.filter((item) => item._id !== book._id));
  };

  // Pagination logic
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = searchTerm
    ? filteredBooks.slice(indexOfFirstBook, indexOfLastBook)
    : publishers.flatMap((publisher) =>
        publisher.authors.flatMap((author) =>
          author.books.map((book) => ({
            ...book,
            author: author.authorName,
            publisherName: publisher.publisherName,
          }))
        )
      ).slice(indexOfFirstBook, indexOfLastBook);

  const totalBooks = searchTerm ? filteredBooks.length : publishers.reduce((acc, publisher) => {
    return acc + publisher.authors.reduce((sum, author) => sum + author.books.length, 0);
  }, 0);

  const totalPages = Math.ceil(totalBooks / booksPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="bg-navy py-4 px-6 flex justify-between items-center">
        <h1 className="text-white font-bold">User Dashboard</h1>
        <div>
          <button
            className="bg-orangered text-white font-bold py-2 px-4 rounded mr-4"
            onClick={handleShowWishlist}
          >
            Wishlist ({wishlist.length})
          </button>

          {/* <button
            className="bg-orangered text-white font-bold py-2 px-4 rounded mr-4"
            onClick={handleShowWishlist}
          >
            My orders
          </button> */}

          <button
            className="bg-orangered text-white font-bold py-2 px-4 rounded"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center">
        {!showWishlist && (
          <div className="w-full px-4 py-6">
<input
           type="text"
           placeholder="Search by book, author, or publisher"
           autoFocus
           value={searchTerm}
           onChange={handleSearch}
           className="p-2 w-1/2 rounded mb-4"
         />
{currentBooks.length > 0 && (
<div className="mb-8">
<Carousel books={currentBooks} />
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 gap-4">
  {currentBooks.map((book) => (
    <div key={book._id} className="bg-white rounded shadow-md p-4 relative">
      <img
        src={book.imgUrl}
        alt={book.bookName}
        className="w-full object-cover mb-2"
      />
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-bold">{book.bookName}</h3>
        <button
          className={`py-2 px-4 rounded ${
            wishlist.some((item) => item._id === book._id)
              ? 'bg-red-500 text-white'
              : 'bg-blue-500 text-white'
          }`}
          onClick={() => toggleWishlist(book)}
        >
          <FontAwesomeIcon
            icon={
              wishlist.some((item) => item._id === book._id)
                ? solidHeart
                : regularHeart
            }
          />
        </button>
      </div>
      <p className="mb-2">Author: {book.author}</p>
      <p className="mb-2">Publisher: {book.publisherName}</p>
      <p className="mb-2">Total Copies: {book.totalCopies}</p>
      <p className="mb-2">Price: ${book.price}</p>
      <button
        className="bg-orangered text-white font-bold py-2 px-4 rounded mr-2"
        onClick={() => handleViewMore(book)}
      >
        View More
      </button>
      <button
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
        onClick={() => handleBuyBook(book)}
        disabled={book.totalCopies === 0}
      >
        Buy
      </button>
    </div>
  ))}
</div>
</div>
)}
</div>
)}
{showWishlist && (
      <div className="w-full px-4 py-6">
        <h2 className="text-2xl font-bold mb-4">Wishlist</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {wishlist.map((book) => (
            <div key={book._id} className="bg-white rounded shadow-md p-4 relative">
              <img
                src={book.imgUrl}
                alt={book.bookName}
                className="w-full object-cover mb-2"
              />
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-bold">{book.bookName}</h3>
                <button
                  className="bg-red-500 text-white py-2 px-4 rounded"
                  onClick={() => handleDeleteFromWishlist(book)}
                >
                  <FontAwesomeIcon icon={faTrashAlt} />
                </button>
              </div>
              <p className="mb-2">Author: {book.author}</p>
              <p className="mb-2">Publisher: {book.publisherName}</p>
              <p className="mb-2">Total Copies: {book.totalCopies}</p>
              <p className="mb-2">Price: ${book.price}</p>
              
              <button
                className="bg-orangered text-white font-bold py-2 px-4 rounded mr-2"
                onClick={() => handleViewMore(book)}
              >
                View More
              </button>
              <button
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
                onClick={() => handleBuyBook(book)}
                disabled={book.totalCopies === 0}
              >
                Buy
              </button>
            </div>
          ))}
        </div>
      </div>
    )}
  </main>

  {selectedBook && (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white rounded p-8 w-full max-w-lg flex">
        <div className="flex-shrink-0 mr-4">
          <img
            src={selectedBook?.imgUrl}
            alt={selectedBook?.bookName}
            className="object-contain h-60"
          />
        </div>
        <div>
          <h2 className="text-xl font-bold">{selectedBook?.bookName}</h2>
          <p>
            <strong>Author:</strong> {selectedBook?.author}
          </p>
          <p>
            <strong>Description:</strong> {selectedBook?.description}
          </p>
          <p>
            <strong>Publisher Date:</strong>{' '}
            {new Date(selectedBook?.publisherDate).toLocaleDateString()}
          </p>
          <p>
            <strong>Total Copies:</strong> {selectedBook?.totalCopies}
          </p>
          <button
              className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
              onClick={() => handleBuyBook(selectedBook)}
            >
              Buy
            </button>
            <button
              className="bg-red-500 text-white py-2 px-4 rounded mt-4"
              onClick={closeModal}
            >
              Close
            </button>
        </div>
      </div>
    </div>
  )}

  {showPurchaseModal && (
    <PurchaseModal message={purchaseMessage} onClose={closeModal} />
  )}

  <footer className="py-4">
    <div className="flex justify-center space-x-2">
      <button
        className="bg-orangered text-white font-bold py-2 px-4 rounded"
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      {[...Array(totalPages).keys()].map((pageNumber) => (
        <button
          key={pageNumber + 1}
          className={`py-2 px-4 rounded ${
            currentPage === pageNumber + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'
          }`}
          onClick={() => paginate(pageNumber + 1)}
        >
          {pageNumber + 1}
        </button>
      ))}
      <button
        className="bg-orangered text-white font-bold py-2 px-4 rounded"
        onClick={() => paginate(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  </footer>
</div>
 );
};
export default UserDashboard;













/* import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import Carousel from './Carousel';

const PurchaseModal = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white rounded p-8 max-w-lg flex flex-col items-center">
        <p className="text-lg font-semibold mb-4">{message}</p>
        <button onClick={onClose} className="bg-blue-500 text-white font-bold py-2 px-4 rounded">
          Close
        </button>
      </div>
    </div>
  );
};

const UserDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [publishers, setPublishers] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showWishlist, setShowWishlist] = useState(false);
  const [purchaseMessage, setPurchaseMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 5;

  useEffect(() => {
    if (location.state && location.state.user) {
      setUser(location.state.user);
    }

    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/books');
        console.log('Books data:', response.data);
        setPublishers(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, [location.state]);

  const handleLogout = async () => {
    try {
      if (user) {
        await axios.post('http://localhost:8000/logout', {
          username: user.username,
          logoutTime: new Date().toISOString(),
        });
      }
      navigate('/');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const handleViewMore = (book) => {
    setSelectedBook(book);
  };

  const closeModal = () => {
    setSelectedBook(null);
    setShowPurchaseModal(false);
    setPurchaseMessage('');
  };

  const toggleWishlist = (book) => {
    if (wishlist.some((item) => item._id === book._id)) {
      setWishlist(wishlist.filter((item) => item._id !== book._id));
    } else {
      setWishlist([...wishlist, book]);
    }
  };

  const handleShowWishlist = () => {
    setShowWishlist(!showWishlist);
  };

  const handleBuyBook = async (book) => {
    try {
      const response = await axios.post(`http://localhost:5000/purchase/${book._id}`);
      if (response.status === 200) {
        setPurchaseMessage('Purchase successful!');
        setShowPurchaseModal(true);
        setPublishers((prevPublishers) =>
          prevPublishers.map((publisher) => ({
            ...publisher,
            authors: publisher.authors.map((author) => ({
              ...author,
              books: author.books.map((b) =>
                b._id === book._id ? { ...b, totalCopies: b.totalCopies - 1 } : b
              ),
            })),
          }))
        );
        setWishlist((prevWishlist) =>
          prevWishlist.map((b) =>
            b._id === book._id ? { ...b, totalCopies: b.totalCopies - 1 } : b
          )
        );
        setTimeout(() => closeModal(), 3000); // Close modal after 3 seconds
      }
    } catch (error) {
      console.error('Error purchasing book:', error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    if (event.target.value === '') {
      setFilteredBooks([]);
    } else {
      const filtered = publishers.flatMap((publisher) =>
        publisher.authors.flatMap((author) =>
          author.books.filter((book) =>
            book.bookName.toLowerCase().includes(event.target.value.toLowerCase()) ||
            author.authorName.toLowerCase().includes(event.target.value.toLowerCase()) ||
            publisher.publisherName.toLowerCase().includes(event.target.value.toLowerCase())
          ).map((book) => ({
            ...book,
            author: author.authorName,
            publisherName: publisher.publisherName,
          }))
        )
      );
      setFilteredBooks(filtered);
    }
  };

  const handleDeleteFromWishlist = (book) => {
    setWishlist(wishlist.filter((item) => item._id !== book._id));
  };

  // Pagination logic
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = searchTerm
    ? filteredBooks.slice(indexOfFirstBook, indexOfLastBook)
    : publishers.flatMap((publisher) =>
        publisher.authors.flatMap((author) =>
          author.books.map((book) => ({
            ...book,
            author: author.authorName,
            publisherName: publisher.publisherName,
          }))
        )
      ).slice(indexOfFirstBook, indexOfLastBook);

  const totalBooks = searchTerm ? filteredBooks.length : publishers.reduce((acc, publisher) => {
    return acc + publisher.authors.reduce((sum, author) => sum + author.books.length, 0);
  }, 0);

  const totalPages = Math.ceil(totalBooks / booksPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="bg-navy py-4 px-6 flex justify-between items-center">
        <h1 className="text-white font-bold">User Dashboard</h1>
        <div>
          <button
            className="bg-orangered text-white font-bold py-2 px-4 rounded mr-4"
            onClick={handleShowWishlist}
          >
            Wishlist ({wishlist.length})
          </button>

          <button
            className="bg-orangered text-white font-bold py-2 px-4 rounded mr-4"
            onClick={handleShowWishlist}
          >
            My orders
          </button>

          <button
            className="bg-orangered text-white font-bold py-2 px-4 rounded"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center">
        {!showWishlist && (
          <div className="w-full px-4 py-6">
            {currentBooks.length > 0 && (
              <div className="mb-8">
                <div className="w-full" style={{ paddingLeft: 0, paddingRight: 0 }}>
                  <Carousel books={currentBooks} />
                </div>
                <input
                  type="text"
                  placeholder="Search by book, author, or publisher"
                  autoFocus
                  value={searchTerm}
                  onChange={handleSearch}
                  className="p-2 w-full rounded mb-4 mt-4"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 gap-4">
                  {currentBooks.map((book) => (
                    <div key={book._id} className="bg-white rounded shadow-md p-4 relative">
                      <img
                        src={book.imgUrl}
                        alt={book.bookName}
                        className="w-full object-cover mb-2"
                      />
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-lg font-bold">{book.bookName}</h3>
                        <button
                          className={`py-2 px-4 rounded ${
                            wishlist.some((item) => item._id === book._id)
                              ? 'bg-red-500 text-white'
                              : 'bg-blue-500 text-white'
                          }`}
                          onClick={() => toggleWishlist(book)}
                        >
                          <FontAwesomeIcon
                            icon={
                              wishlist.some((item) => item._id === book._id)
                                ? solidHeart
                                : regularHeart
                            }
                          />
                        </button>
                      </div>
                      <p className="mb-2">Author: {book.author}</p>
                      <p className="mb-2">Publisher: {book.publisherName}</p>
                      <p className="mb-2">Total Copies: {book.totalCopies}</p>
                      <button
                        className="bg-green-500 text-white py-2 px-4 rounded"
                        onClick={() => handleBuyBook(book)}
                      >
                        Buy
                      </button>
                    </div>
                  ))}
                </div>
                {totalBooks > booksPerPage && (
                  <div className="flex justify-center mt-4">
                    <button
                      className="px-3 py-1 mx-1 rounded bg-gray-300"
                      onClick={() => paginate(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => (
                      <button
                        key={i + 1}
                        className={`px-3 py-1 mx-1 rounded ${currentPage === i + 1 ? 'bg-gray-500 text-white' : 'bg-gray-300'}`}
                        onClick={() => paginate(i + 1)}
                      >
                        {i + 1}
                      </button>
                    ))}
                    <button
                      className="px-3 py-1 mx-1 rounded bg-gray-300"
                      onClick={() => paginate(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {showWishlist && (
          <div className="w-full px-4 py-6">
            <h2 className="text-2xl font-bold mb-4">Your Wishlist</h2>
            {wishlist.length === 0 ? (
              <p>Your wishlist is empty.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {wishlist.map((book) => (
                  <div key={book._id} className="bg-white rounded shadow-md p-4 relative">
                    <img
                      src={book.imgUrl}
                      alt={book.bookName}
                      className="w-full object-cover mb-2"
                    />
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-lg font-bold">{book.bookName}</h3>
                      <button
                        className="py-2 px-4 rounded bg-red-500 text-white"
                        onClick={() => handleDeleteFromWishlist(book)}
                      >
                        <FontAwesomeIcon icon={faTrashAlt} />
                      </button>
                    </div>
                    <p className="mb-2">Author: {book.author}</p>
                    <p className="mb-2">Publisher: {book.publisherName}</p>
                    <p className="mb-2">Total Copies: {book.totalCopies}</p>
                    <button
                      className="bg-green-500 text-white py-2 px-4 rounded"
                      onClick={() => handleBuyBook(book)}
                    >
                      Buy
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
Total Copies: 
      {selectedBook && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded p-8 max-w-lg flex flex-col items-center">
            <img src={selectedBook.imgUrl} alt={selectedBook.bookName} className="w-full mb-4" />
            <h2 className="text-2xl font-bold mb-4">{selectedBook.bookName}</h2>
            <p className="mb-2">Author: {selectedBook.author}</p>
            <p className="mb-2">Publisher: {selectedBook.publisherName}</p>
            <p className="mb-2">Total Copies: {selectedBook.totalCopies}</p>
            <button
              className="bg-green-500 text-white py-2 px-4 rounded mt-4"
              onClick={() => handleBuyBook(selectedBook)}
            >
              Buy
            </button>
            <button
              className="bg-red-500 text-white py-2 px-4 rounded mt-4"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {showPurchaseModal && (
        <PurchaseModal message={purchaseMessage} onClose={closeModal} />
      )}
    </div>
  );
};

export default UserDashboard; */
