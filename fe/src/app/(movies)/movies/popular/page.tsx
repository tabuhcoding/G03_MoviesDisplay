"use client";

/* Package System */
import { useEffect, useState, ChangeEvent } from "react";
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";

/* Package Application */
import { END_POINT_URL_LIST } from "@/src/util/constant";
import { ErrorData, ErrorHandling } from "@components/errorHandling";
import '@public/styles/movie/popular.css'
import MovieList from "../[id]/_components/moviesList";
import SortPanel from "@/src/components/sortPanel";
import FilterPanel from "@/src/components/filterPanel";
import { arraysAreEqual } from "@/src/util/helpers";

export interface Movie {
  id: string;
  title: string;
  overview: string;
  genre_ids: number[];
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  popularity: number;
  vote_average: number;
  vote_count: number;
}

export default function PopularMovies() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ErrorData>({} as ErrorData);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [sortOrder, setSortOrder] = useState<string>("popularity.desc");

  // filter by date
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);
  const [initialFromDate, setInitialFromDate] = useState<Date | null>(null);
  const [initialToDate, setInitialToDate] = useState<Date | null>(null);

  // filter by genres
  const [genres, setGenres] = useState<{ id: number; name: string }[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [initialSelectedGenres, setInitialSelectedGenres] = useState<number[]>([]);

  // filter by user score
  const [userScore, setUserScore] = useState<[number, number]>([0, 10]);
  const [initialUserScore, setInitialUserScore] = useState<[number, number]>([0, 10]);

  // filter by minimum user votes
  const [minVotes, setMinVotes] = useState<number>(0);
  const [initialMinVotes, setInitialMinVotes] = useState<number>(0);

  const [isFilterChanged, setIsFilterChanged] = useState(false);

  const handleFromDateChange = (newDate: Date | null) => {
    setFromDate(newDate);
  }

  const handleToDateChange = (newDate: Date | null) => {
    setToDate(newDate);
  }

  const handleUserScoreChange = (newRange: [number, number]) => {
    setUserScore(newRange);
  };
  
  const handleMinVotesChange = (newValue: number) => {
    setMinVotes(newValue);
  };

  useEffect(() => {
    const hasChanged =
      fromDate !== initialFromDate || toDate !== initialToDate || !arraysAreEqual(selectedGenres, initialSelectedGenres) || !arraysAreEqual(userScore, initialUserScore) || minVotes !== initialMinVotes;
    setIsFilterChanged(hasChanged);
  }, [fromDate, toDate, initialFromDate, initialToDate, selectedGenres, initialSelectedGenres, userScore, initialUserScore, minVotes, initialMinVotes]);

  const handleFilterSubmit = () => {
    setInitialFromDate(fromDate);
    setInitialToDate(toDate);
    setInitialSelectedGenres([...selectedGenres]);
    setInitialUserScore([...userScore]);
    setInitialMinVotes(minVotes); 

    setIsFilterChanged(false);
    filterMovies();
  }

  const toggleGenre = (id: number) => {
    setSelectedGenres((prev) =>
      prev.includes(id) ? prev.filter((genreId) => genreId !== id) : [...prev, id]
    );
  };

  const fetchGenres = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}${END_POINT_URL_LIST.MOVIES_GENRES}`);
      setGenres(response.data.data ?? []);
    } catch (err) {
      console.error("Error fetching genres:", err);
    }
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  const filterMovies = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));

    let tempMovies = [...movies];

    if (fromDate && toDate) {
      tempMovies = tempMovies.filter((movie) => {
        const movieDate = new Date(movie.release_date);
        return movieDate >= fromDate && movieDate <= toDate;
      });
    }

    if (selectedGenres.length > 0) {
      tempMovies = tempMovies.filter((movie) =>
        selectedGenres.some((genreId) => movie.genre_ids.includes(genreId))
      );
    }

    tempMovies = tempMovies.filter(
      (movie) =>
        movie.vote_average >= userScore[0] &&
        movie.vote_average <= userScore[1] &&
        movie.vote_count >= minVotes
    );

    setMovies(tempMovies);
    setIsLoading(false);
  }

  const sortMovies = async (sortOrder: string) => {
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
        `${process.env.NEXT_PUBLIC_BACKEND_URL}${END_POINT_URL_LIST.MOVIES_POPULAR}`
      );
      setMovies(response.data.data.results ?? []);
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
            <h3>Popular Movies</h3>
          </div>
          <div className="content">
            <div style={{ marginRight: '10px' }}>
              <SortPanel sortOrder={sortOrder} onSortChange={handleSortChange} />
              <FilterPanel
                fromDate={fromDate}
                toDate={toDate}
                onFromDateChange={handleFromDateChange}
                onToDateChange={handleToDateChange}
                genres={genres}
                selectedGenres={selectedGenres}
                onToggleGenre={toggleGenre}
                userScore={userScore}
                onUserScoreChange={handleUserScoreChange}
                minVotes={minVotes}
                onMinVotesChange={handleMinVotesChange}
                isFilterChanged={isFilterChanged}
                onFilterSubmit={handleFilterSubmit}
              />
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
                    <div 
                      className="movie-list d-flex flex-wrap"
                      style={{
                        justifyContent: movies.length >= 5 ? 'space-between' : 'flex-start'
                      }}
                    >
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