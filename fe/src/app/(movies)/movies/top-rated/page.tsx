"use client";

/* Package System */
import { useEffect, useState, ChangeEvent } from "react";
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";

/* Package Application */
import { END_POINT_URL_LIST } from "@/src/util/constant";
import { ErrorData, ErrorHandling } from "@components/errorHandling";
import '@public/styles/movie/top-rated.css';
import MovieList from "../[id]/_components/moviesList";

export interface Movie {
  id: string;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  popularity: number;
  vote_average: number;
}

export default function TopRatedMovies() {

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ErrorData>({} as ErrorData);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [sortOrder, setSortOrder] = useState<string>("vote_average.desc");

  const sortMovies = async (sortOrder: string) => {
    console.log('sorting movies');
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    switch (sortOrder) {
    case "popularity.desc":
      setMovies(movies.sort((a, b) => b.popularity - a.popularity));
      break;
    case "popularity.asc":
      setMovies(movies.sort((a, b) => a.popularity - b.popularity));
      break;
    case "vote_average.asc":
      setMovies(movies.sort((a, b) => a.vote_average - b.vote_average));
      break;
    case "vote_average.desc":
      setMovies(movies.sort((a, b) => b.vote_average - a.vote_average));
      break;
    case "release_date.asc":
      setMovies(movies.sort((a, b) => new Date(a.release_date).getTime() - new Date(b.release_date).getTime()));
      break;
    case "release_date.desc":
      setMovies(movies.sort((a, b) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime()));
      break;
    case "title.asc":
      setMovies(movies.sort((a, b) => a.title.localeCompare(b.title)));
      break;
    case "title.desc":
      setMovies(movies.sort((a, b) => b.title.localeCompare(a.title)));
      break;
    default:
      break;
    }
    setIsLoading(false);
  }

  const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedOrder = e.target.value;
    setSortOrder(selectedOrder);
  };

  useEffect(() => {
    if (movies.length > 0) {
      sortMovies(sortOrder);
    }
  }, [sortOrder]);

  const fetchPopularMovies = async () => {
    setIsLoading(true);
    setError({} as ErrorData);

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}${END_POINT_URL_LIST.MOVIES_NOW_PLAYING}`
      );
      const moviesData = response.data.data.results ?? [];
      if (moviesData.length > 0) {
        const sortedMovies = moviesData.sort((a: Movie, b: Movie) => b.vote_average - a.vote_average);
        setMovies(sortedMovies);
      }
      // setMovies(response.data.data.results ?? []);
      // sortMovies("vote_average.desc");
    } catch (err: any) {
      console.error("Error fetching popular movies:", err);
      const errorData = {
        message: err.response?.data?.message?.message as string || "Failed to fetch popular movies",
        detail: "Backend Error: " + err.response?.data?.message?.details || "Unknown error occurred",
        statusCode: err.response?.data?.message?.statusCode?.toString() as string || "500" as string
      };
      console.log(errorData);
      setError(errorData);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchPopularMovies();
  }, []);

  return (
    <>
      <div style={{ marginTop: '60px' }} className="column-wrapper">
        <div className="content-wrapper">
          <div className="title">
            <h3>Top Rated Movies</h3>
          </div>
          <div className="content">
            <div style={{ marginRight: '10px' }}>
              <div className="filter_panel card">
                <div className="name">
                  <h5>Sort</h5>
                </div>
                <div className="filter">
                  <h5>Sort Results By</h5>
                  <select
                    className="form-select"
                    onChange={handleSortChange}
                  >
                    <option value="vote_average.desc">Rating Descending</option>
                    <option value="vote_average.asc">Rating Ascending</option>
                    <option value="popularity.desc">Popularity Descending</option>
                    <option value="popularity.asc">Popularity Ascending</option>
                    <option value="release_date.asc">Release Date Ascending</option>
                    <option value="release_date.desc">Release Date Descending</option>
                    <option value="title.asc">Title (A-Z)</option>
                    <option value="title.desc">Title (Z-A)</option>
                  </select>
                </div>
              </div>
              <div className="apply-btn">
                <p className="load_more">
                  <a className="no_click load_more" data-next-page="2" data-current-page="1" data-partial>Search</a>
                </p>
              </div>
            </div>
            <div style={{ width: '100%' }}>
              {isLoading ? (
                <div className="loading-container text-center">
                  <div className="loading-spinner"></div>
                </div>
              ) : error.message ? (
                <ErrorHandling error={error} callback={fetchPopularMovies} />
              ) : (
                <div className="white_column">
                  <section id="media_results" className="panel results movie-list-container">
                    <div className="movie-list d-flex flex-wrap">
                      {movies.length > 0 && (
                        <MovieList movies={movies} />
                      )}
                    </div>
                  </section>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}