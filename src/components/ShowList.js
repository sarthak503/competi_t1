import React, { useState, useEffect } from 'react';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ShowList = () => {
  const [shows, setShows] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/search/movie?api_key=f4956e82904acfc81c7787397f09c0d2&query=${searchTerm}`)
      .then(response => {
        setShows(response.data.results);
      })
      .catch(error => {
        console.log(error);
      });
  }, [searchTerm]);

  const handleShowClick = (showId) => {
    navigate(`/show/${showId}`);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    setSearchTerm(event.target.search.value);
  };

  return (
    <div>
      <h1>Find your Favourite Movie</h1>
      <form onSubmit={handleSearch}>
        <div className='search'>
          <input className='input' type="text" name="search" placeholder="Search..." />
          <button className='submit' type="submit">Search</button>
        </div>
      </form>
      <ul>
        {shows.map(show => (
          <li className="list" key={show.id}>
            {show.title}
            <button onClick={() => handleShowClick(show.id)}> Know more </button>
          </li>
        ))}
      </ul>
      <Footer/>
    </div>
  );
};

export default ShowList;
