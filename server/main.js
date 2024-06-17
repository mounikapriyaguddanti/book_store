
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const port = 5000;

app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes

// MongoDB schema for books
const bookSchema = new mongoose.Schema({
  bookName: { type: String, required: true },
  imgUrl: { type: String, required: true },
  description: { type: String, required: true },
  publisherDate: { type: Date, required: true },
  totalCopies: { type: Number, required: true },
  purchasedCopies: { type: Number, default: 0 },
  price: { type: Number, required: true } 
});

// MongoDB schema for authors
const authorSchema = new mongoose.Schema({
  authorName: { type: String, required: true },
  books: [bookSchema]
});

// MongoDB schema for publishers
const publisherSchema = new mongoose.Schema({
  publisherName: { type: String, required: true },
  authors: [authorSchema]
});

const Publisher = mongoose.model('Publisher', publisherSchema);

// Endpoint to get all books
app.get('/books', async (req, res) => {
  try {
    const publishers = await Publisher.find();
    res.status(200).json(publishers);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ message: 'Error fetching books', error });
  }
});

// Endpoint to add a new book
app.post('/books', async (req, res) => {
  try {
    console.log('Received request data:', req.body);
    const { publisherName, authorName, bookDetails } = req.body;

    if (!publisherName ||!authorName ||!bookDetails) {
      return res.status(400).json({ error: 'Publisher name, author name, and book details are required' });
    }

    let publisher = await Publisher.findOne({ publisherName });

    if (!publisher) {
      publisher = new Publisher({ publisherName, authors: [{ authorName, books: [bookDetails] }] });
    } else {
      let author = publisher.authors.find(author => author.authorName === authorName);
      if (!author) {
        publisher.authors.push({ authorName: authorName, books: [bookDetails] }); // <--- Modified this line
      } else {
        author.books.push(bookDetails);
      }
    }

    await publisher.save();
    res.json({ message: 'Book added successfully!' });
  } catch (error) {
    console.error('Error adding book:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to handle book purchase
app.post('/purchase/:id', async (req, res) => {
  try {
    const bookId = req.params.id;
    const publisher = await Publisher.findOne({ 'authors.books._id': bookId });

    if (!publisher) {
      return res.status(404).json({ message: 'Book not found' });
    }

    const author = publisher.authors.find(author => author.books.id(bookId));
    const book = author.books.id(bookId);

    if (book.totalCopies <= 0) {
      return res.status(400).json({ message: 'No copies available' });
    }

    book.totalCopies -= 1;
    book.purchasedCopies += 1;

    await publisher.save();

    res.status(200).json({ message: 'Book purchased successfully', book });
  } catch (error) {
    res.status(500).json({ message: 'Error purchasing book', error });
  }
});

// Endpoint to edit book details
app.put('/books/:id', async (req, res) => {
  try {
    const bookId = req.params.id;
    const bookDetails = req.body;

    const publisher = await Publisher.findOneAndUpdate(
      { 'authors.books._id': bookId },
      { $set: { 'authors.$[author].books.$[book]': bookDetails } },
      {
        arrayFilters: [
          { 'author.books._id': bookId },
          { 'book._id': bookId }
        ],
        new: true
      }
    );

    if (!publisher) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.status(200).json({ message: 'Book details updated successfully', book: publisher.authors.find(author => author.books.id(bookId)).books.id(bookId) });
  } catch (error) {
    res.status(500).json({ message: 'Error updating book details', error });
  }
});

// Endpoint to delete a book
app.delete('/books/:id', async (req, res) => {
  try {
    const bookId = req.params.id;
    const publisher = await Publisher.findOneAndUpdate(
      { 'authors.books._id': bookId },
      { $pull: { 'authors.$.books': { _id: bookId } } },
      { new: true }
    );

    if (!publisher) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    console.error('Error deleting book:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Connect to MongoDB
const db = "mongodb+srv://mounikapriyaguddanti:jSm1hOv8mJylaDIH@cluster0.eviujnw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(db)
  .then(() => {
    console.log("Connection to MongoDB successful");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB:", err);
  });

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
