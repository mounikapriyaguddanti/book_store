
//working
 /*                          import React, { useState, useEffect } from 'react';
                          import axios from 'axios';
                          import { useNavigate } from 'react-router-dom';
                          
                          const AdminDashboard = () => {
                            const [users, setUsers] = useState([]);
                            const [showEditModal, setShowEditModal] = useState(false);
                            const [showDeleteModal, setShowDeleteModal] = useState(false);
                            const [selectedUser, setSelectedUser] = useState(null);
                            const [updatedUser, setUpdatedUser] = useState(null);
                          
                            const navigate = useNavigate();
                          
                            const fetchUsers = async () => {
                              try {
                                const response = await axios.get('http://localhost:8000/users');
                                setUsers(response.data);
                              } catch (error) {
                                console.error('Error fetching users:', error);
                              }
                            };
                          
                            useEffect(() => {
                              fetchUsers();
                            }, []);
                          
                            const formatDate = (dateString) => {
                              const date = new Date(dateString);
                              const month = String(date.getMonth() + 1).padStart(2, '0');
                              const day = String(date.getDate()).padStart(2, '0');
                              const year = date.getFullYear();
                              return `${day}/${month}/${year}`;
                            };
                          
                            const formatTime = (dateString) => {
                              const date = new Date(dateString);
                              return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                            };
                          
                            const handleInputChange = (e) => {
                              const { name, value } = e.target;
                              setUpdatedUser((prevUser) => ({
                                ...prevUser,
                                [name]: value,
                              }));
                            };
                          
                            const handleLoginHistoryChange = (index, field, value) => {
                              const newLoginHistory = [...updatedUser.loginHistory];
                              newLoginHistory[index] = {
                                ...newLoginHistory[index],
                                [field]: value,
                              };
                              setUpdatedUser((prevUser) => ({
                                ...prevUser,
                                loginHistory: newLoginHistory,
                              }));
                            };
                          
                            const handleEdit = (user) => {
                              setSelectedUser(user);
                              setUpdatedUser(user);
                              setShowEditModal(true);
                            };
                          
                            const handleDelete = (user) => {
                              setSelectedUser(user);
                              setShowDeleteModal(true);
                            };
                          
                            const handleUpdateUser = async () => {
                              if (!updatedUser || !updatedUser._id) {
                                console.error('No user selected for update');
                                return;
                              }
                              try {
                                await axios.put(`http://localhost:8000/users/${updatedUser._id}`, updatedUser);
                                setShowEditModal(false);
                                setUpdatedUser(null);
                                fetchUsers();
                              } catch (error) {
                                console.error('Error updating user:', error);
                              }
                            };
                          
                            const handleDeleteUser = async () => {
                              if (!selectedUser || !selectedUser._id) {
                                console.error('No user selected for deletion');
                                return;
                              }
                              try {
                                await axios.delete(`http://localhost:8000/users/${selectedUser._id}`);
                                setShowDeleteModal(false);
                                fetchUsers();
                              } catch (error) {
                                console.error('Error deleting user:', error);
                              }
                            };
                          
                            const handleLogout = () => {
                              window.location.href = '/';
                            };
                          
                            const handleAddBook = () => {
                              navigate('/addbookform');
                            };
                          
                            const handleViewBookDetails = () => {
                              navigate('/bookdetails');
                            };
                            const isSameDate = (date1, date2) => {
                              const d1 = new Date(date1);
                              const d2 = new Date(date2);
                              return (
                                d1.getDate() === d2.getDate() &&
                                d1.getMonth() === d2.getMonth() &&
                                d1.getFullYear() === d2.getFullYear()
                              );
                            };
                          
                            return (
                              <div className="flex flex-col min-h-screen bg-gray-100">
                                <header className="bg-navy py-4 px-6 flex justify-between items-center">
                                  <h1 className="text-white font-bold">Admin Dashboard - User Details</h1>
                                  <div>
                                    <button
                                      className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2"
                                      onClick={handleAddBook}
                                    >
                                      Add Book
                                    </button>
                                    <button
                                      className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2"
                                      onClick={handleViewBookDetails}
                                    >
                                      View book details
                                    </button>
                                    <button
                                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                      onClick={handleLogout}
                                    >
                                      Log Out
                                    </button>
                                  </div>
                                </header>
                                <main className="flex-grow p-6">
                                  <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                                    <thead className="bg-blue-500 text-white">
                                      <tr>
                                        <th className="border py-2 px-4">Full Name</th>
                                        <th className="border py-2 px-4">Email</th>
                                        <th className="border py-2 px-4">Phone Number</th>
                                        <th className="border py-2 px-4">Username</th>
                                        <th className="border py-2 px-4">Login Date</th>
                                        <th className="border py-2 px-4">Login Time</th>
 
                                        <th className="border py-2 px-4">Logout Time</th>
                                        <th className="border py-2 px-4">Actions</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {users.map((user, userIndex) => (
                                        <>
                                          {user.loginHistory.map((login, loginIndex) => {
                                            const loginDate = formatDate(login.loginTime);
                                            const logoutDate = login.logoutTime ? formatDate(login.logoutTime) : 'Still logged in';
                                            const loginTime = formatTime(login.loginTime);
                                            const logoutTime = login.logoutTime ? formatTime(login.logoutTime) : 'Still logged in';
                          
                                            // Determine if we should show the full date or just the time
                                            const showLoginDate = loginIndex === 0 || !isSameDate(user.loginHistory[loginIndex - 1].loginTime, login.loginTime);
                                            const showLogoutDate = loginIndex === 0 || !isSameDate(user.loginHistory[loginIndex - 1].logoutTime, login.logoutTime);
                          
                                            return (
                                              <tr key={`${userIndex}-${loginIndex}`}>
                                                {loginIndex === 0 && (
                                                  <>
                                                    <td className="border py-2 px-4" rowSpan={user.loginHistory.length}>
                                                      {user.fullName}
                                                    </td>
                                                    <td className="border py-2 px-4" rowSpan={user.loginHistory.length}>
                                                      {user.email}
                                                    </td>
                                                    <td className="border py-2 px-4" rowSpan={user.loginHistory.length}>
                                                      {user.phoneNumber}
                                                    </td>
                                                    <td className="border py-2 px-4" rowSpan={user.loginHistory.length}>
                                                      {user.username}
                                                    </td>
                                                  </>
                                                )}
                                                <td className="border py-2 px-4">{showLoginDate ? loginDate : ''}</td>
                                                <td className="border py-2 px-4">{loginTime}</td>
      
                                                <td className="border py-2 px-4">{logoutTime}</td>
                                                {loginIndex === 0 && (
                                                  <td className="border py-2 px-4 flex justify-center" rowSpan={user.loginHistory.length}>
                                                    <button
                                                      className="bg-green hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                                                      onClick={() => handleEdit(user)}
                                                    >
                                                      Edit
                                                    </button>
                                                    <button
                                                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                                      onClick={() => handleDelete(user)}
                                                    >
                                                      Delete
                                                    </button>
                                                  </td>
                                                )}
                                              </tr>
                                            );
                                          })}
                                        </>
                                      ))}
                                    </tbody>
                                  </table>
                                </main>
                          
                                {showEditModal && (
                                  <div className="fixed z-10 inset-0 overflow-y-auto">
                                    <div className="flex items-center justify-center min-h-screen">
                                      <div className="bg-white rounded-lg p-6 max-w-4xl w-full">
                                        <h2 className="text-lg font-bold mb-4">Edit User</h2>
                                        <form>
                                          <div>
                                            <h3 className="text-lg font-bold mb-2">Login History</h3>
                                            {updatedUser?.loginHistory.map((login, index) => (
                                              <div key={index} className="mb-4">
                                                <div className="flex flex-wrap -mx-2">
                                                  <div className="w-full sm:w-1/2 md:w-1/4 px-2 mb-4 md:mb-0">
                                                    <label htmlFor={`loginDate-${index}`} className="block font-bold mb-2">
                                                      Login Date
                                                    </label>
                                                    <input
                                                      type="date"
                                                      id={`loginDate-${index}`}
                                                      name={`loginDate-${index}`}
                                                      value={login.loginTime ? new Date(login.loginTime).toISOString().split('T')[0] : ''}
                                                      onChange={(e) => handleLoginHistoryChange(index, 'loginTime', new Date(e.target.value).toISOString())}
                                                      className="border border-gray-300 rounded py-2 px-3 w-full"
                                                    />
                                                  </div>
                                                  <div className="w-full sm:w-1/2 md:w-1/4 px-2 mb-4 md:mb-0">
                                                    <label htmlFor={`loginTime-${index}`} className="block font-bold mb-2">
                                                      Login Time
                                                    </label>
                                                    <input
                                                      type="time"
                                                      id={`loginTime-${index}`}
                                                      name={`loginTime-${index}`}
                                                      value={login.loginTime ? new Date(login.loginTime).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }) : ''}
                                                      onChange={(e) => handleLoginHistoryChange(index, 'loginTime', `${new Date(login.loginTime).toISOString().split('T')[0]}T${e.target.value}:00Z`)}
                                                      className="border border-gray-300 rounded py-2 px-3 w-full"
                                                    />
                                                  </div>

                                                  <div className="w-full sm:w-1/2 md:w-1/4 px-2 mb-4 md:mb-0">
                                                    <label htmlFor={`logoutTime-${index}`} className="block font-bold mb-2">
                                                      Logout Time
                                                    </label>
                                                    <input
                                                      type="time"
                                                      id={`logoutTime-${index}`}
                                                      name={`logoutTime-${index}`}
                                                      value={login.logoutTime ? new Date(login.logoutTime).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }) : ''}
                                                      onChange={(e) => handleLoginHistoryChange(index, 'logoutTime', `${new Date(login.logoutTime).toISOString().split('T')[0]}T${e.target.value}:00Z`)}
                                                      className="border border-gray-300 rounded py-2 px-3 w-full"
                                                    />
                                                  </div>
                                                </div>
                                              </div>
                                            ))}
                                          </div>
                                          <div className="flex justify-end">
                                            <button
                                              type="button"
                                              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
                                              onClick={() => setShowEditModal(false)}
                                            >
                                              Cancel
                                            </button>
                                            <button
                                              type="button"
                                              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                              onClick={handleUpdateUser}
                                            >
                                              Save
                                            </button>
                                          </div>
                                        </form>
                                      </div>
                                    </div>
                                  </div>
                                )}
                          
                                {showDeleteModal && (
                                  <div className="fixed z-10 inset-0 overflow-y-auto">
                                    <div className="flex items-center justify-center min-h-screen">
                                      <div className="bg-white rounded-lg p-6 max-w-md w-full">
                                        <h2 className="text-lg font-bold mb-4">Delete User</h2>
                                        <p>Are you sure you want to delete this user?</p>
                                        <div className="flex justify-end mt-4">
                                          <button
                                            type="button"
                                            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
                                            onClick={() => setShowDeleteModal(false)}
                                          >
                                            Cancel
                                          </button>
                                          <button
                                            type="button"
                                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                            onClick={handleDeleteUser}
                                          >
                                            Delete
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            );
                          };
                          
                          export default AdminDashboard;  */

                          import React, { useState, useEffect } from 'react';
                          import axios from 'axios';
                          import { useNavigate } from 'react-router-dom';
                          
                          const AdminDashboard = () => {
                            const [users, setUsers] = useState([]);
                            const [showEditModal, setShowEditModal] = useState(false);
                            const [showDeleteModal, setShowDeleteModal] = useState(false);
                            const [selectedUser, setSelectedUser] = useState(null);
                            const [updatedUser, setUpdatedUser] = useState(null);
                            const [currentPage, setCurrentPage] = useState(1);
                            const usersPerPage = 2; // Display 2 users per page
                          
                            const navigate = useNavigate();
                          
                            const fetchUsers = async () => {
                              try {
                                const response = await axios.get('http://localhost:8000/users');
                                setUsers(response.data);
                              } catch (error) {
                                console.error('Error fetching users:', error);
                              }
                            };
                          
                            useEffect(() => {
                              fetchUsers();
                            }, []);
                          
                            const formatDate = (dateString) => {
                              const date = new Date(dateString);
                              const month = String(date.getMonth() + 1).padStart(2, '0');
                              const day = String(date.getDate()).padStart(2, '0');
                              const year = date.getFullYear();
                              return `${day}/${month}/${year}`;
                            };
                          
                            const formatTime = (dateString) => {
                              const date = new Date(dateString);
                              return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                            };
                          
                            const handleInputChange = (e) => {
                              const { name, value } = e.target;
                              setUpdatedUser((prevUser) => ({
                                ...prevUser,
                                [name]: value,
                              }));
                            };
                          
                            const handleLoginHistoryChange = (index, field, value) => {
                              const newLoginHistory = [...updatedUser.loginHistory];
                              newLoginHistory[index] = {
                                ...newLoginHistory[index],
                                [field]: value,
                              };
                              setUpdatedUser((prevUser) => ({
                                ...prevUser,
                                loginHistory: newLoginHistory,
                              }));
                            };
                          
                            const handleEdit = (user) => {
                              setSelectedUser(user);
                              setUpdatedUser(user);
                              setShowEditModal(true);
                            };
                          
                            const handleDelete = (user) => {
                              setSelectedUser(user);
                              setShowDeleteModal(true);
                            };
                          
                            const handleUpdateUser = async () => {
                              if (!updatedUser || !updatedUser._id) {
                                console.error('No user selected for update');
                                return;
                              }
                              try {
                                await axios.put(`http://localhost:8000/users/${updatedUser._id}`, updatedUser);
                                setShowEditModal(false);
                                setUpdatedUser(null);
                                fetchUsers();
                              } catch (error) {
                                console.error('Error updating user:', error);
                              }
                            };
                          
                            const handleDeleteUser = async () => {
                              if (!selectedUser || !selectedUser._id) {
                                console.error('No user selected for deletion');
                                return;
                              }
                              try {
                                await axios.delete(`http://localhost:8000/users/${selectedUser._id}`);
                                setShowDeleteModal(false);
                                fetchUsers();
                              } catch (error) {
                                console.error('Error deleting user:', error);
                              }
                            };
                          
                            const handleLogout = () => {
                              window.location.href = '/';
                            };
                          
                            const handleAddBook = () => {
                              navigate('/addbookform');
                            };
                          
                            const handleViewBookDetails = () => {
                              navigate('/bookdetails');
                            };
                          
                            const isSameDate = (date1, date2) => {
                              const d1 = new Date(date1);
                              const d2 = new Date(date2);
                              return (
                                d1.getDate() === d2.getDate() &&
                                d1.getMonth() === d2.getMonth() &&
                                d1.getFullYear() === d2.getFullYear()
                              );
                            };
                          
                            const indexOfLastUser = currentPage * usersPerPage;
                            const indexOfFirstUser = indexOfLastUser - usersPerPage;
                            const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
                          
                            const pageNumbers = [];
                            for (let i = 1; i <= Math.ceil(users.length / usersPerPage); i++) {
                              pageNumbers.push(i);
                            }
                          
                            const paginate = (pageNumber) => setCurrentPage(pageNumber);
                          
                            return (
                              <div className="flex flex-col min-h-screen bg-gray-100">
                                <header className="bg-navy py-4 px-6 flex justify-between items-center">
                                  <h1 className="text-white font-bold">Admin Dashboard - User Details</h1>
                                  <div>
                                    <button
                                      className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2"
                                      onClick={handleAddBook}
                                    >
                                      Add Book
                                    </button>
                                    <button
                                      className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2"
                                      onClick={handleViewBookDetails}
                                    >
                                      View book details
                                    </button>
                                    <button
                                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                      onClick={handleLogout}
                                    >
                                      Log Out
                                    </button>
                                  </div>
                                </header>
                                <main className="flex-grow p-6">
                                  <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                                    <thead className="bg-blue-500 text-white">
                                      <tr>
                                        <th className="border py-2 px-4">Full Name</th>
                                        <th className="border py-2 px-4">Email</th>
                                        <th className="border py-2 px-4">Phone Number</th>
                                        <th className="border py-2 px-4">Username</th>
                                        <th className="border py-2 px-4">Login Date</th>
                                        <th className="border py-2 px-4">Login Time</th>
                                        <th className="border py-2 px-4">Logout Time</th>
                                        <th className="border py-2 px-4">Actions</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {currentUsers.map((user, userIndex) => (
                                        <>
                                          {user.loginHistory.map((login, loginIndex) => {
                                            const loginDate = formatDate(login.loginTime);
                                            const logoutDate = login.logoutTime ? formatDate(login.logoutTime) : 'Still logged in';
                                            const loginTime = formatTime(login.loginTime);
                                            const logoutTime = login.logoutTime ? formatTime(login.logoutTime) : 'Still logged in';
                          
                                            // Determine if we should show the full date or just the time
                                            const showLoginDate = loginIndex === 0 || !isSameDate(user.loginHistory[loginIndex - 1].loginTime, login.loginTime);
                                            const showLogoutDate = loginIndex === 0 || !isSameDate(user.loginHistory[loginIndex - 1].logoutTime, login.logoutTime);
                          
                                            return (
                                              <tr key={`${userIndex}-${loginIndex}`}>
                                                {loginIndex === 0 && (
                                                  <>
                                                    <td className="border py-2 px-4" rowSpan={user.loginHistory.length}>
                                                      {user.fullName}
                                                    </td>
                                                    <td className="border py-2 px-4" rowSpan={user.loginHistory.length}>
                                                      {user.email}
                                                    </td>
                                                    <td className="border py-2 px-4" rowSpan={user.loginHistory.length}>
                                                      {user.phoneNumber}
                                                    </td>
                                                    <td className="border py-2 px-4" rowSpan={user.loginHistory.length}>
                                                      {user.username}
                                                    </td>
                                                  </>
                                                )}
                                                <td className="border py-2 px-4">{showLoginDate ? loginDate : ''}</td>
                                                <td className="border py-2 px-4">{loginTime}</td>
                                                <td className="border py-2 px-4">{logoutTime}</td>
                                                {loginIndex === 0 && (
                                                  <td className="border py-2 px-4 flex justify-center" rowSpan={user.loginHistory.length}>
                                                    <button
                                                      className="bg-green hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                                                      onClick={() => handleEdit(user)}
                                                    >
                                                      Edit
                                                    </button>
                                                    <button
                                                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                                      onClick={() => handleDelete(user)}
                                                    >
                                                      Delete
                                                    </button>
                                                  </td>
                                                )}
                                              </tr>
                                            );
                                          })}
                                        </>
                                      ))}
                                    </tbody>
                                  </table>
                                  <div className="flex justify-center mt-4">
                                    <nav>
                                      <ul className="flex">
                                        {pageNumbers.map((number) => (
                                          <li key={number} className="mx-1">
                                            <button
                                              onClick={() => paginate(number)}
                                              className={`px-4 py-2 rounded ${number === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                                            >
                                              {number}
                                            </button>
                                          </li>
                                        ))}
                                      </ul>
                                    </nav>
                                  </div>
                                </main>
                          
                                {showEditModal && (
                                  <div className="fixed z-10 inset-0 overflow-y-auto">
                                    <div className="flex items-center justify-center min-h-screen">
                                      <div className="bg-white rounded-lg p-6 max-w-4xl w-full">
                                        <h2 className="text-lg font-bold mb-4">Edit User</h2>
                                        <form>
                                          <div>
                                            <h3 className="text-lg font-bold mb-2">Login History</h3>
                                            {updatedUser?.loginHistory.map((login, index) => (
                                              <div key={index} className="mb-4">
                                                <div className="flex flex-wrap -mx-2">
                                                  <div className="w-full sm:w-1/2 md:w-1/4 px-2 mb-4 md:mb-0">
                                                    <label htmlFor={`loginDate-${index}`} className="block font-bold mb-2">
                                                      Login Date
                                                    </label>
                                                    <input
                                                      type="date"
                                                      id={`loginDate-${index}`}
                                                      name={`loginDate-${index}`}
                                                      value={login.loginTime ? new Date(login.loginTime).toISOString().split('T')[0] : ''}
                                                      onChange={(e) => handleLoginHistoryChange(index, 'loginTime', new Date(e.target.value).toISOString())}
                                                      className="border border-gray-300 rounded py-2 px-3 w-full"
                                                    />
                                                  </div>
                                                  <div className="w-full sm:w-1/2 md:w-1/4 px-2 mb-4 md:mb-0">
                                                    <label htmlFor={`loginTime-${index}`} className="block font-bold mb-2">
                                                      Login Time
                                                    </label>
                                                    <input
                                                      type="time"
                                                      id={`loginTime-${index}`}
                                                      name={`loginTime-${index}`}
                                                      value={login.loginTime ? new Date(login.loginTime).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }) : ''}
                                                      onChange={(e) => handleLoginHistoryChange(index, 'loginTime', `${new Date(login.loginTime).toISOString().split('T')[0]}T${e.target.value}:00Z`)}
                                                      className="border border-gray-300 rounded py-2 px-3 w-full"
                                                    />
                                                  </div>

                                                  <div className="w-full sm:w-1/2 md:w-1/4 px-2 mb-4 md:mb-0">
                                                    <label htmlFor={`logoutTime-${index}`} className="block font-bold mb-2">
                                                      Logout Time
                                                    </label>
                                                    <input
                                                      type="time"
                                                      id={`logoutTime-${index}`}
                                                      name={`logoutTime-${index}`}
                                                      value={login.logoutTime ? new Date(login.logoutTime).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }) : ''}
                                                      onChange={(e) => handleLoginHistoryChange(index, 'logoutTime', `${new Date(login.logoutTime).toISOString().split('T')[0]}T${e.target.value}:00Z`)}
                                                      className="border border-gray-300 rounded py-2 px-3 w-full"
                                                    />
                                                  </div>
                                                </div>
                                              </div>
                                            ))}
                                          </div>
                                          <div className="flex justify-end">
                                            <button
                                              type="button"
                                              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
                                              onClick={() => setShowEditModal(false)}
                                            >
                                              Cancel
                                            </button>
                                            <button
                                              type="button"
                                              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                              onClick={handleUpdateUser}
                                            >
                                              Save
                                            </button>
                                          </div>
                                        </form>
                                      </div>
                                    </div>
                                  </div>
                                )}
           
                          
                                {showDeleteModal && (
                                  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                                    <div className="bg-white p-8 rounded shadow-lg">
                                      <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
                                      <p>Are you sure you want to delete this user?</p>
                                      <div className="flex justify-end mt-4">
                                        <button
                                          onClick={() => setShowDeleteModal(false)}
                                          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
                                        >
                                          Cancel
                                        </button>
                                        <button
                                          onClick={handleDeleteUser}
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
                          
                          export default AdminDashboard;
                          







