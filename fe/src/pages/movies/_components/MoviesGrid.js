import React, { useState } from 'react';
import '../../../style/CustomMoviesGrid.css'; // Adjust the import path if needed

const MoviesGrid = ({ movies, lastMovieElementRef }) => {
  const [expandedMovieId, setExpandedMovieId] = useState(null);

  const toggleExpand = (movieId) => {
    setExpandedMovieId((prev) => (prev === movieId ? null : movieId));
  };

  return (
    <div className="movies-grid">
      {movies.map((movie, index) => {
        const isLastMovie = movies.length === index + 1;
        const isExpanded = expandedMovieId === movie.id;

        return (
          <div
            key={movie.id}
            className="movies-item"
            ref={isLastMovie ? lastMovieElementRef : null}
          >
            <div className="movies-card">
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : 'https://via.placeholder.com/300x450?text=No+Image'
                }
                className="movies-img"
                alt={movie.title || 'Movie'}
              />
              <div className="movies-info">
                <h4 className={isExpanded ? "expanded-title" : "truncated-title"}>
                    {isExpanded || movie.title.length <= 30
                      ? movie.title
                      : `${movie.title.substring(0, 30)}...`}
                </h4>
                <p>Rating: {movie.vote_average.toFixed(1)}</p>
                <p>{movie.release_date ? new Date(movie.release_date).getFullYear() : 'Unknown'}</p>
                {isExpanded && <p className="movie-overview">{movie.overview || 'No overview available.'}</p>}
                <button
                  className="toggle-button"
                  onClick={() => toggleExpand(movie.id)}
                >
                  {isExpanded ? '▲' : '▼'}
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MoviesGrid;
