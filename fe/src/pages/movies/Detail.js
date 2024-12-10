/* Package Application */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

/* Package System */
import UserScoreSection from "../../views/components/UserScoreSection";
import '../../public/styles/movie/Detail.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const MovieDetail = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/movies/${movieId}`);
        console.log('response', response);
        if (response.status === 200) {
          setMovieDetails(response.data);
        }
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };
    fetchMovieDetails();
  }, [movieId]);

  const formatDate = (releaseDate) => {
    const date = new Date(releaseDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
    const year = date.getFullYear();
  
    return `${day}/${month}/${year}`;
  };

  const formatRuntime = (runtime) => {
    const hours = Math.floor(runtime / 60); 
    const minutes = runtime % 60;
    return `${hours}h ${minutes}m`;
  };

  return (
    <>
      {movieDetails ? (
        <div className="custom-bg"
          style={{
            backgroundImage: `url(https://media.themoviedb.org/t/p/original${movieDetails?.belongs_to_collection?.backdrop_path ?? movieDetails?.belongs_to_collection?.poster_path ?? movieDetails.backdrop_path ?? movieDetails.poster_path})`,
          }}
        >
          <div className="movie-detail-container">
            <section className="movie-header">
              <div className="poster-wrapper">
                <img
                  className="movie-poster"
                  src={`https://media.themoviedb.org/t/p/w300_and_h450_bestv2${movieDetails.poster_path}`}
                  alt={movieDetails.title}
                />
              </div>
              <div className="movie-info">
                <section className="info-header">
                  <div className="movie-title">
                    <h2 className="movie-title-header">{movieDetails.title} <span className="tag release_date">({new Date(movieDetails.release_date).getFullYear()})</span></h2>
                    <div className="facts d-flex">
                      <span className="release">{formatDate(movieDetails.release_date)}</span>
                      <span className="genres">{movieDetails.genres.map((genre) => genre.name).join(", ")}</span>
                      <span className="runtime">{formatRuntime(movieDetails.runtime)}</span>
                    </div>
                    <UserScoreSection vote_average={movieDetails.vote_average ?? 0} />
                  </div>
                  <div className="header-info">
                    <h3 className="tagline" dir="auto">{movieDetails.tagline}</h3>
                    <h3 className="overview" dir="auto">
                      Overview<br></br>
                      <p>{movieDetails.overview}</p>
                    </h3>
                  </div>
                </section>
              </div>
            </section>
          </div>
        </div>
      ) : (
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
      )}
    </>
  );
}

export default MovieDetail;