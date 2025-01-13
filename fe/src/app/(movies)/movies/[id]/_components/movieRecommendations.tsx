import React from 'react';
import { CircularProgress } from '@mui/material';

interface Movie {
  id: string;
  title: string;
  poster_path: string;
  vote_average: number;
}

interface MovieRecommendationsProps {
  loadingRecommendations: boolean;
  recommendations: Movie[];
  active?: string;
  movieSameGenres?: Movie[];
  movieSameKeyword?: Movie[];
  movieSameCollection?: Movie[];
  onMovieClick: (movieId: string) => void;
  showTitle?: string;
}

const MovieRecommendations: React.FC<MovieRecommendationsProps> = ({
  loadingRecommendations,
  recommendations,
  active,
  movieSameGenres,
  movieSameKeyword,
  movieSameCollection,
  onMovieClick,
  showTitle = "Recommendations"
}) => {
  const renderMovieList = (movies: Movie[], noRecommendationsMessage: string) => {
    return movies.length > 0 ? (
      <div className="re-list-container my-3">
        <div className="movie-list d-flex flex-wrap">
          {movies.map((movie) => (
            <div key={movie.id} className="re-movie-card mx-2" onClick={() => onMovieClick(movie.id)}>
              <img
                src={movie.poster_path ? `https://media.themoviedb.org/t/p/w500_and_h282_face${movie.poster_path}` : "https://via.placeholder.com/150"}
                alt={movie.title || "Unknown name"}
              />
              <div className="re-info mt-2 d-flex justify-content-between">
                <h6 className="cast-name">{movie.title}</h6>
                <p className="mt-2">{(movie.vote_average * 10).toFixed(0)}%</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    ) : (
      <p>{noRecommendationsMessage}</p>
    );
  };

  if (loadingRecommendations) {
    return <CircularProgress />;
  }

  let moviesToDisplay = recommendations;
  let noRecommendationsMessage = "No recommendations available";

  if (recommendations.length === 0) {
    noRecommendationsMessage = "No recommendations available because the User do not add movies on Favorite List";
  } else if (active === "genre" && (!movieSameGenres || movieSameGenres.length === 0)) {
    noRecommendationsMessage = "No recommendations available";
  } else if (active === "keyword" && (!movieSameKeyword || movieSameKeyword.length === 0)) {
    noRecommendationsMessage = "No recommendations available";
  } else if (active === "collection" && (!movieSameCollection || movieSameCollection.length === 0)) {
    noRecommendationsMessage = "No recommendations available";
  }

  if (active === "genre" && movieSameGenres) {
    moviesToDisplay = movieSameGenres;
  } else if (active === "keyword" && movieSameKeyword) {
    moviesToDisplay = movieSameKeyword;
  } else if (active === "collection" && movieSameCollection) {
    moviesToDisplay = movieSameCollection;
  }

  return (
    <div className="container">
      <h4>{showTitle}</h4>
      {renderMovieList(moviesToDisplay, noRecommendationsMessage)}
    </div>
  );
};

export default MovieRecommendations;
