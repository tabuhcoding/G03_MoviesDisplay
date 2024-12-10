import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

const Movies = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [movieDetails, setMovieDetails] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  const navigate = useNavigate();

//   // Fetch trending movies
//   useEffect(() => {
//     const fetchTrendingMovies = async () => {
//       try {
//         const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/movies/trending`, {
//           params: { timeWindow: 'day' },
//         });
//         setTrendingMovies(response.data);
//         setSelectedMovieId(response.data[0].id);
//       } catch (error) {
//         console.error('Error fetching trending movies:', error);
//       }
//     };
//     fetchTrendingMovies();
//   }, []);

//   // Fetch movie details
//   useEffect(() => {
//     if (selectedMovieId) {
//       const fetchMovieDetails = async () => {
//         try {
//           const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/movies/${selectedMovieId}`);
//           setMovieDetails(response.data);
//         } catch (error) {
//           console.error('Error fetching movie details:', error);
//         }
//       };
//       fetchMovieDetails();
//     }
//   }, [selectedMovieId]);

  // Search movies
  const handleSearch = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/movies/search`, {
        params: { query: searchQuery },
      });
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error searching movies:', error);
    }
  };

  const handleMovieClick = (movieId) => {
    navigate(`/movies/${movieId}`);
  }
//   // Search movies
//   const handleSearch = async () => {
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/movies/search`, {
//         params: { query: searchQuery },
//       });
//       setSearchResults(response.data);
//     } catch (error) {
//       console.error('Error searching movies:', error);
//     }
//   };

//   return (
//     <div style={{ padding: '20px' }}>
//       <h1>Movies</h1>

//       {/* Trending Movies */}
//       <section>
//         <h2>Trending Movies</h2>
//         <ul>
//           {trendingMovies.map((movie) => (
//             <li key={movie.id} onClick={() => setSelectedMovieId(movie.id)}>
//               {movie.title}
//             </li>
//           ))}
//         </ul>
//       </section>

//       {/* Movie Details */}
//       {movieDetails && (
//         <section>
//           <h2>Movie Details</h2>
//           <p><strong>Title:</strong> {movieDetails.title}</p>
//           <p><strong>Overview:</strong> {movieDetails.overview}</p>
//         </section>
//       )}

      {/* Search Movies */}
      <section>
        <h2>Search Movies</h2>
        <input
          type="text"
          placeholder="Enter movie name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        <ul>
          {searchResults.map((movie) => (
            <li 
              key={movie.id}
              onClick={() => handleMovieClick(movie.id)}
              style={{ cursor: 'pointer' }}
            >
              {movie.title}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

// export default Movies;
