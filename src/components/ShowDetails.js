import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Footer from './Footer';

const ShowDetails = () => {
  const [show, setShow] = useState(null);
  const { showId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${showId}?api_key=f4956e82904acfc81c7787397f09c0d2`)
      .then(response => {
        setShow(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [showId]);
  

  const handleBookTicket = () => {
    alert("Service Unavailable!")
    navigate(`/`);
  };

  if (!show) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <div className='main-card'>
      <div className='card'>
      <h1>{show.original_title}</h1>
        <div className='displayImg'>
          <img src={`https://image.tmdb.org/t/p/w500${show.poster_path}`} alt={show.title} width={200} />
        </div>

        <div className='displayP'>
          <p dangerouslySetInnerHTML={{ __html: show.overview }}></p>
          <p>Release Date:  {show.release_date}</p>
          <p>Popularity: {show.popularity}</p>
          <p>Vote: {show.vote_count}</p>
        </div>
    
        <div>
          <button className='book' onClick={handleBookTicket}>Book Ticket</button>
        </div>
      </div>
    </div>
      <Footer/>
  </>
  );
  
};

export default ShowDetails;
