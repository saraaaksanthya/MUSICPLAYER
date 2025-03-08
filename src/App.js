// src/App.js
import React, { useState } from 'react';
import MusicPlayer from './MusicPlayer';
import SearchBar from './SearchBar';
import './App.css';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="App">
      <h1 className="heading">MUSIC EVERYWHERE</h1>
      <SearchBar onSearch={handleSearch} />
      <MusicPlayer searchQuery={searchQuery} />
    </div>
  );
};

export default App;
