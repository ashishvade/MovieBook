
// pages/Movies.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMovies } from '../services/MovieService';
import './Movies.css';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const movies = await getMovies();
        setMovies(movies);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovies();
  }, []);

  const handleBookMovie = (movieId) => {
    navigate('/booking', { state: { movieId } });
  };

  return (
    <div className="movies-container">
      <h2>Movies</h2>
      <div className="movie-list">
        {movies.map((movie) => (
          <div className="movie" key={movie._id}>
            <img src={movie.movieBannerImg} alt={`${movie.movieTitle} banner`}  className="featured-movie-image" />
            <h3>{movie.movieTitle}</h3>
            <p>Genre: {movie.genre}</p>
            <p>Duration: {movie.movieHr}</p>
            <p>Price: ${movie.moviePrice}</p>
            <div className="showtimes">
              <h4>Showtimes:</h4>
              <ul>
                {movie.showtimes.map((showtime) => (
                  <li key={showtime._id}>
                    Start: {new Date(showtime.startTime).toLocaleString()}, End: {new Date(showtime.endTime).toLocaleString()}
                  </li>
                ))}
              </ul>
            </div>
            <button onClick={() => handleBookMovie(movie._id)}>Book Movie</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Movies;
