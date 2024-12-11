import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchInput from './layout/SearchInput';
import "../style/Homepage.css";
import axios from 'axios';
import { ErrorHandling } from '../components/ErrorHandling';


export default function Home() {
  const navigate = useNavigate();
  const [active, setActive] = useState("day");
  const [searchInput, setSearchInput] = useState("");
  const [error, setError] = useState([]);
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/movies/search?query=${searchInput}&page=1`);
  };

  const fetchTrendingMovies = useCallback(async () => {
    setLoading(true);
    setError([]);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/movies/trending?timeWindow=${active}`
      );
      setMovies(response.data);
    } catch (err) {
      console.error("Error fetching trending movies:", err);
      const errorData = [
        err.response?.data?.message?.message || "Failed to fetch trending movies",
        "Backend Error: " + err.response?.data?.message?.details || "Unknown error occurred",
        err.response?.data?.message?.statusCode?.toString() || "500",
      ];
      setError(errorData);
    } finally {
      setLoading(false);
    }
  }, [active]);

  // Gọi API khi active thay đổi
  useEffect(() => {
    fetchTrendingMovies();
  }, [fetchTrendingMovies]);

  return (
    <>
      <SearchInput value={searchInput} onChange={(value) => setSearchInput(value)} onSubmit={handleSearch} />

      <div className="container my-4">
        <div className="d-flex justify-content-between align-items-center">
          <h4>Trending</h4>
          <div className="toggle-switch">
            <button
              className={`toggle-btn ${active === "day" ? "active" : ""}`}
              onClick={() => setActive("day")}
            >
              Today
            </button>
            <button
              className={`toggle-btn ${active === "week" ? "active" : ""}`}
              onClick={() => setActive("week")}
            >
              This Week
            </button>
          </div>
        </div>

        <div className="movie-list-container my-3">
          {loading ? (
            <p>Loading...</p>
          ) : error.length > 0 ? (
            <ErrorHandling error={error} callback={fetchTrendingMovies} />
          ) : (
            <div className="movie-list d-flex flex-wrap">
              {movies.map((movie) => (
                <div
                  onClick={() => navigate(`/movies/${movie.id}`)}
                  className="movie-card mx-2"
                  key={movie.id}
                >
                  <img
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                        : "https://via.placeholder.com/150"
                    }
                    alt={movie.title}
                    style={{
                      width: "150px",
                      height: "225px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                  <div className="movie-info mt-2 text-center">
                    <h6>{movie.title}</h6>
                    <p>{movie.release_date || "Unknown"}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
