import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { Button, Card, CardContent, CardHeader } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchInput from './layout/SearchInput';
import "../style/Homepage.css";
import axios from 'axios';

export default function Home() {
  const navigate = useNavigate();
  const [active, setActive] = useState("day");
  const [searchInput, setSearchInput] = useState("");
  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/movies/search?query=${searchInput}&page=1`);
    // console.log("Search for:", searchInput);
  };

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  // Gọi API khi active thay đổi (Today hoặc This Week)
  useEffect(() => {
    const fetchTrendingMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/movies/trending?timeWindow=${active}`);
        setMovies(response.data); // Lưu danh sách phim vào state
      } catch (err) {
        setError("Failed to fetch trending movies");
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingMovies();
  }, [active]); // Gọi lại API khi active thay đổi


  return (
    <>
      <SearchInput value={searchInput} onChange={(value) => setSearchInput(value)} onSubmit={handleSearch}></SearchInput>

      <div className="container my-4">
        <div className="d-flex justify-content-between align-items-center">
          <h5>Trending</h5>
          {/* Toggle Switch */}
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

        {/* Hiển thị danh sách phim */}
        <div className="movie-list-container my-3">
          {loading ? (
            <p>Loading...</p> // Hiển thị loading khi đang tải dữ liệu
          ) : error ? (
            <p>{error}</p> // Hiển thị lỗi nếu có
          ) : (
            <div className="movie-list d-flex">
              {movies.map((movie) => (
                <div onClick={() => navigate(`/movies/${movie.id}`)} className="movie-card mx-2" key={movie.id}>
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
