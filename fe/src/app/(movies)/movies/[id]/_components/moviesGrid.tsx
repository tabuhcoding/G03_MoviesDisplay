"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import '@styles/CustomMoviesGrid.css'

interface Movie {
    id: number;
    poster_path: string | null;
    title: string;
    vote_average: number | null;
    release_date: string | null;
    overview: string | null;
    popularity: number | null;
}

interface MoviesGridProps {
    movies: Movie[];
    lastMovieElementRef?: React.RefObject<HTMLDivElement | null>; 
}

const MoviesGrid: React.FC<MoviesGridProps> = ({ movies, lastMovieElementRef }) => {
  const [expandedMovieId, setExpandedMovieId] = useState<number | null>(null);
  const router = useRouter();

  const toggleExpand = (movieId: number) => {
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
            onClick={() => router.push(`/movies/${movie.id}`)}
          >
            <div className="movies-card">
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : 'https://res.cloudinary.com/de66mx8mw/image/upload/v1736666809/default-avatar-icon-of-social-media-user-vector.jpg.jpg'
                }
                className="movies-img"
                alt={movie.title || 'Movie'}
              />
              <div className="movies-info">
                <h5 className={isExpanded ? "expanded-title" : "truncated-title"}>
                  {isExpanded || movie.title.length <= 30
                    ? movie.title
                    : `${movie.title.substring(0, 30)}...`}
                </h5>
                <p>Rating: {(movie.vote_average ?? 0).toFixed(1)}</p>
                <p>{movie.release_date ? new Date(movie.release_date).toLocaleDateString() : 'Unknown'}</p> {/* Hiển thị ngày đầy đủ */}
                <p>Popularity: {(movie.popularity ?? 0).toFixed(1)}</p>
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
