import React, { useState, useEffect } from 'react';
import MusicPlayer from './MusicPlayer';
import SearchBar from './SearchBar';
import Signup from './Signup';
import Login from './Login';
import LandingPage from './LandingPage';
import './App.css';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState('landing'); // New state for current page

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleLogin = (token) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setCurrentPage('landing'); // Redirect to landing page on logout
  };

  const showLoginPage = () => {
    setCurrentPage('login');
  };

  const showSignupPage = () => {
    setCurrentPage('signup');
  };

  return (
    <div className="App">
      <h1 className="heading">MUSIC EVERYWHERE</h1>
      {isAuthenticated ? (
        <>
          <button onClick={handleLogout} className="logout-button">Logout</button>
          <SearchBar onSearch={handleSearch} />
          <MusicPlayer searchQuery={searchQuery} />
        </>
      ) : (
        <>
          {currentPage === 'landing' && <LandingPage onLoginClick={showLoginPage} onSignupClick={showSignupPage} />}
          {currentPage === 'login' && <Login onLogin={handleLogin} />}
          {currentPage === 'signup' && <Signup onLogin={handleLogin} />}
        </>
      )}
    </div>
  );
};

export default App;
