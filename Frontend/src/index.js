import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';


import '@fortawesome/fontawesome-free/css/all.min.css'; 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

/* 
// index.js or main.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthProvider } from './AuthContext';
import '@fortawesome/fontawesome-free/css/all.min.css'; 

ReactDOM.render(
  <AuthProvider>
    <App />
  </AuthProvider>,
  document.getElementById('root')
);
 */