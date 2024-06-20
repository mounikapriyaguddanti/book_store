
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HeroSection from './components/HeroSection';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import AddBookForm from './components/AddBookForm';
import BookDetails from './components/BookDetails';
import Carousel from './components/Carousel';


function App() {
  return (
    <Router>
      <div className="App">
        {/*<Navbar />*/}
        <Routes>
          <Route path="/" element={<HeroSection/>} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path='/carousel' element={<Carousel />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/addbookform" element={<AddBookForm />}  />
          <Route path="/bookdetails" element={<BookDetails />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
