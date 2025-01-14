"use client"

/* Package System */
import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';

/* Package Application */
import SearchInput from '@components/layout/searchInput';
import "@styles/Homepage.css";
import { ErrorData, ErrorHandling } from '@components/errorHandling';
import { END_POINT_URL_LIST } from '../util/constant';

// ================== Test Result Display ==================
// import ResultDisplay from '../components/combinedDisplay';
export interface Movie {
  id: number;
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

// ================== Test Result Display ==================
export interface Person {
  id: number;
  name: string;
  profile_path: string | null;
  popularity: number;
  known_for_department: string;
}

export default function Home() {
  const router = useRouter();
  const [active, setActive] = useState<string>("day");
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchInputLLM, setSearchInputLLM] = useState<string>("");
  const [error, setError] = useState<ErrorData>({} as ErrorData);
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [trailerMovies, setTrailerMovies] = useState<MovieLastest[]>([]);
  const [activeTrailers, setActiveTrailers] = useState<'popular' | 'intheater'>('popular');
  const [isPlaying, setIsPlaying] = useState<string | null>(null);

  // ================== Test Result Display ==================
  // const [people, setPeople] = useState<Person[]>([]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    router.push(`/movies/search?query=${searchInput}&page=1`);
  };

  const handleSearchLLM = (type: string, e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    router.push(`/searchLLM?query=${searchInputLLM}&searchBy=${type}&amount=30`);
  }

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

  // ================== Test Result Display ==================
  // 

  return (
    <>
      <SearchInput 
        isUseSearchLLM={true} isUseSearch={true}
        value={searchInput} onChange={(value) => setSearchInput(value)} onSubmit={handleSearch} 
        valueLLM={searchInputLLM} onChangeLLM={(value) => setSearchInputLLM(value)} onSubmitLLM={handleSearchLLM}
      />

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
                      background: `conic-gradient(#4caf50 ${(movie.vote_average * 10) * 3.6}deg, #e0e0e0 0deg)` // Viền xanh lá theo phần trăm
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

        {/* ================== Test Result Display ================== */}
        {/* <ResultDisplay results={movies} isPeople={false}/> */}
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
            <ErrorHandling error={error} callback={() => fetchLatestTrailers(activeTrailers)} />
          ) : (
            <div className="movie-list d-flex flex-wrap">
              {trailerMovies.map((movie) => (
                <div
                  key={movie.moviesID}
                  onClick={() => setIsPlaying(movie.key)}
                  className="movie-card-trailer mx-2 cus-card"
                >
                  <img
                    src={`https://img.youtube.com/vi/${movie.key}/0.jpg`} 
                    alt={movie.original_title}
                    className="img-fluid"
                  />
                  <div>
                    <button className="btn btn-play">Play</button>
                  </div>
                  <div className="movie-info mt-2 text-center" onClick={() => router.push(`/movies/${movie.moviesID}`)}>
                    <h6>{movie.original_title}</h6>
                    <p>{movie.name || "Unknown"}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Show the iframe in a modal if a trailer is being played */}
      {isPlaying && (
        <div className="trailer-overlay">
          <div className="trailer-modal">
            <iframe
              width="80%"
              height="450"
              src={`https://www.youtube.com/embed/${isPlaying}`}
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <button
              onClick={() => setIsPlaying(null)}  // Close the trailer modal
              className="close-button"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
