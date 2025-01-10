"use client";

/* Package System */
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import { ChevronRight } from "lucide-react";

/* Package Application */
import MovieDetail from "../[id]/_components/detail";
import { END_POINT_URL_LIST } from "@/src/util/constant";
import { ErrorData, ErrorHandling } from "@components/errorHandling";
import Loading from "@components/loading";
import '@public/styles/movie/popular.css'
import { ChevronRightIcon } from "lucide-react";

export interface Movie {
  id: string;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  popularity: number;
}

export default function PopularMovie() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ErrorData>({} as ErrorData);
  const [movies, setMovies] = useState<Movie[]>([]);

  const fetchPopularMovies = async () => {
    setIsLoading(true);
    setError({} as ErrorData);

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}${END_POINT_URL_LIST.MOVIES_POPULAR}`
      );
      console.log("🚀 ~ fetchPopularMovies ~ response.data.data.results:", response.data.data.results);
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
            <div>
              <div className="filter_panel card">
                <div className="name">
                  <h5>Sort</h5>
                  <ChevronRightIcon size={24} />
                </div>
              </div>
              <div className="apply-btn">
                <p className="load_more">
                  <a className="no_click load_more" data-next-page="2" data-current-page="1" data-partial>Search</a>
                </p>
              </div>
            </div>
            <div>
              <div className="white_column">
                <section id="media_results" className="panel results">
                  {isLoading ? (
                    <Loading />
                  ) : error.message ? (
                    <ErrorHandling error={error} callback={fetchPopularMovies} />
                  ) : (
                    <div className="movie-list d-flex flex-wrap">
                      {movies.length > 0 && (
                        movies.map((movie) => (
                          <div
                            onClick={() => router.push(`/movies/${movie.id}`)}
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
                                borderRadius: "8px"
                              }}
                            />
                            <div className="movie-info mt-2 text-center">
                              <h6>{movie.title}</h6>
                              <p>{movie.release_date || "Unknown"}</p>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}