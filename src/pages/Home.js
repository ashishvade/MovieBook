

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';
import { getMovies } from '../services/MovieService';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllMovies = async () => {
      try {
        const moviesData = await getMovies();
        setMovies(moviesData);
      } catch (error) {
        console.error('Error fetching all movies:', error);
      }
    };

    fetchAllMovies();
  }, []);

  const nextMovies = () => {
    setCurrentMovieIndex(currentMovieIndex + 4);
  };

  const prevMovies = () => {
    setCurrentMovieIndex(currentMovieIndex - 4);
  };

  const handleBookClick = (movieId) => {
    navigate('/booking', { state: { movieId} });
  };

  return (
    <div className="homepage">
      <Carousel
        showArrows={true}
        showThumbs={false}
        infiniteLoop={true}
        className="carousel-container"
      >
        <div>
          <img
            src="https://media.dev.to/cdn-cgi/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2F00tgrgdyi15qh6d8ucpc.png"
            alt="Carousel Image 1"
            className="carousel-image"
          />
        </div>
        <div>
          <img
            src="https://miro.medium.com/v2/resize:fit:828/format:webp/1*ZrmrivIeeSdPW2qdECMoew.png"
            alt="Carousel Image 2"
            className="carousel-image"
          />
        </div>
        <div>
          <img
            src="https://user-images.githubusercontent.com/64949271/172625558-46b4bdb9-239e-4743-89ee-30f5b5a7044f.jpg"
            alt="Carousel Image 3"
            className="carousel-image"
          />
        </div>
      </Carousel>

      <section className="section featured-movies">
        <div className="container">
          <h2>Featured Movies</h2>
          <div className="row">
            {movies.length > 0 &&
              movies.slice(currentMovieIndex, currentMovieIndex + 4).map((movie) => (
                <div key={movie._id} className="col-xl-3 col-lg-4 col-md-6 col-sm-12 mb-4">
                  <div className="featured-movie">
                    <img
                      src={movie.movieBannerImg}
                      alt={`${movie.movieTitle} banner`}
                      className="featured-movie-image"
                    />
                    <div className="featured-movie-details">
                      <h3>{movie.movieTitle}</h3>
                      <p>Genre: {movie.genre}</p>
                      <p>Duration: {movie.movieHr}</p>
                      <p>Price: ${movie.moviePrice}</p>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleBookClick(movie.movieId)}
                      >
                        Book
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <div className="text-center mt-3">
            {currentMovieIndex > 0 && (
              <button className="btn btn-primary mx-2" onClick={prevMovies}>
                Previous
              </button>
            )}
            {movies.length > currentMovieIndex + 4 && (
              <button className="btn btn-primary mx-2" onClick={nextMovies}>
                Next
              </button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
