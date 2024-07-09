// services/MovieService.js
export const getMovies = async () => {
    try {
      const response = await fetch('https://securityboat-jl68.onrender.com/v1/movie/getAllMovie', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch movies');
      }
  
      const result = await response.json();
      return result.data.data; // Adjusted to match the API response structure
    } catch (error) {
      throw new Error(error.message);
    }
  };

  