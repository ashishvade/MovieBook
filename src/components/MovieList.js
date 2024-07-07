// components/MovieList.js
import React from 'react';

const MovieList = ({ movies }) => {
  return (
    <div>
      {movies.map((movie) => (
        <div key={movie.id} className="movie">
          <h2>{movie.title}</h2>
          <p>Genre: {movie.genre}</p>
          <p>Showtimes: {movie.showtimes.join(', ')}</p>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
