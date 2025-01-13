"use client"
import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import "bootstrap/dist/css/bootstrap.min.css";
import SearchInput from '@components/layout/searchInput';
import "@styles/Homepage.css";
import axios from 'axios';
import { ErrorData, ErrorHandling } from '@components/errorHandling';
import { END_POINT_URL_LIST } from '../util/constant';
export interface Movie {
  id: string;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  trailer_key?: string; 
}

export interface MovieLastest {
  moviesID: string;
  original_title: string;
  key: string;
  name: string;
}

export default function Home() {
  const router = useRouter();
  const [active, setActive] = useState<string>("day");
  const [searchInput, setSearchInput] = useState<string>("");
  const [error, setError] = useState<ErrorData>({} as ErrorData);
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [trailerMovies, setTrailerMovies] = useState<MovieLastest[]>([]);
  const [activeTrailers, setActiveTrailers] = useState<'popular' | 'intheater'>('popular');

  const handleSearch = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    router.push(`/movies/search?query=${searchInput}&page=1`);
  };

  const fetchTrendingMovies = useCallback(async () => {
    setLoading(true);
    setError({} as ErrorData);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}${END_POINT_URL_LIST.MOVIES_TRENDING}?timeWindow=${active}`
      );
      setMovies(response.data.data);
    } catch (err: any) {
      console.error("Error fetching trending movies:", err);
      const errorData = {
        message: err.response?.data?.message?.message as string || "Failed to fetch trending movies",
        detail: "Backend Error: " + err.response?.data?.message?.details || "Unknown error occurred",
        statusCode: err.response?.data?.message?.statusCode?.toString() as string || "500" as string
      };
      console.log(errorData);
      setError(errorData);
    } finally {
      setLoading(false);
    }
  }, [active]);

  // Fetch Latest Trailers
  const fetchLatestTrailers = useCallback(async (query: 'popular' | 'intheater') => {
    setLoading(true);
    setError({} as ErrorData);
    try {
      const response = await axios.get(
        'http://localhost:3001/movies/lastest-trailers', {
          params: {
            query
          }
        }
      );
      const trailers = response.data.data; 
      setTrailerMovies(trailers);
    } catch (err: any) {
      console.error("Error fetching trailers:", err);
      const errorData = {
        message: err.response?.data?.message?.message as string || "Failed to fetch trailers",
        detail: "Backend Error: " + err.response?.data?.message?.details || "Unknown error occurred",
        statusCode: err.response?.data?.message?.statusCode?.toString() as string || "500" as string
      };
      setError(errorData);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTrendingMovies();
    fetchLatestTrailers(activeTrailers);
  }, [fetchTrendingMovies, fetchLatestTrailers, activeTrailers]);

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
          ) : error?.message ? (
            <ErrorHandling error={error} callback={fetchTrendingMovies} />
          ) : (
            <div className="movie-list d-flex flex-wrap">
              {movies.map((movie) => (
                <div
                  onClick={() => router.push(`/movies/${movie.id}`)}
                  className="movie-card mx-2 cus-card"
                  key={movie.id}
                >
                  <img
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                        : "https://via.placeholder.com/150"
                    }
                    alt={movie.title || "Unknown title"}
                    style={{
                      width: "100%",
                      height: "170px",
                      objectFit: "cover"
                    }}
                  />
                  <div className="movie-info mt-4 text-center">
                    <h6>{movie.title}</h6>
                    <p>{movie.release_date || "Unknown"}</p>
                  </div>             
                  <div
                    className="rating container-rating"
                    style={{
                      background: `conic-gradient(#4caf50 ${(movie.vote_average * 10) * 3.6}deg, #e0e0e0 0deg)`, // Viền xanh lá theo phần trăm
                    }}
                  >
                    <span className='circle-rating'>
                      {(movie.vote_average * 10).toFixed(0)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <hr></hr>

      {/* Latest Trailers Section */}
      <div className="container my-4">
        <div className="d-flex justify-content-between align-items-center">
          <h4>Latest Trailers</h4>
          <div className="toggle-switch">
            <button
              className={`toggle-btn ${activeTrailers === "popular" ? "active" : ""}`}
              onClick={() => setActiveTrailers('popular')}
            >
              Popular
            </button>
            <button
              className={`toggle-btn ${activeTrailers === "intheater" ? "active" : ""}`}
              onClick={() => setActiveTrailers('intheater')}
            >
              In Theaters
            </button>
          </div>
        </div>

        <div className="movie-list-container my-3">
          {loading ? (
            <p>Loading...</p>
          ) : error?.message ? (
            <ErrorHandling error={error} callback={() => fetchLatestTrailers} />
          ) : (
            <div className="movie-list d-flex flex-wrap">
              {trailerMovies.map((movie) => (
                <div key={movie.moviesID} className="movie-card mx-2 cus-card">
                  {movie.key ? (
                    <div className="trailer-video">
                      <iframe
                        width="100%"
                        height="200"
                        src={`https://www.youtube.com/embed/${movie.key}`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                      <div className="movie-info text-center">
                        <h6>{movie.original_title}</h6>
                        <p>{movie.name || "Unknown"}</p>
                      </div>     
                    </div>
                  ) : (
                    <p>No trailers available</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
