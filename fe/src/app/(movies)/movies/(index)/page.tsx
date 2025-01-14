"use client";

import { ErrorData, ErrorHandling } from "@/src/components/errorHandling";
import { END_POINT_URL_LIST } from "@/src/util/constant";
import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import SearchInput from "@/src/components/layout/searchInput";
import "@styles/Homepage.css";

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

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const ids = searchParams.get("ids") || "";
  const text = searchParams.get("text") || "";
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<ErrorData>({} as ErrorData);
  const [loading, setLoading] = useState(false);
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError({} as ErrorData);
    try {
      console.log(ids);
      const idsArray = ids.split(",").map(Number);
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}${END_POINT_URL_LIST.MOVIES_LIST}`,{
        params: { ids: idsArray }
      });
      console.log(response.data.data);
      if (response.data.data.length > 0) {
        const uniqueMovies = [
          ...new Map(response.data.data.map((item: Movie) => [item.id, item])).values()
        ] as Movie[];
        setMovies(uniqueMovies);
      }
    } catch (err: any) {
      console.error("Error fetching trending people:", err);
      const errorData = {
        message: err.response?.data?.message?.message as string || "Failed to fetch trending people",
        detail: "Backend Error: " + err.response?.data?.message?.details || "Unknown error occurred",
        statusCode: err.response?.data?.message?.statusCode?.toString() as string || "500" as string
      };
      console.log(errorData);
      setError(errorData);
    }
    finally {
      setLoading(false);
    }
  }, [ids]);

  useEffect(() => {
    fetchData();
  }, [ids, fetchData]);
  return (
    <>
      <SearchInput isUseSearch={false} isUseSearchLLM={false} />
      <div className="container my-4">
        <div className="d-flex justify-content-between align-items-center">
          <h4>{text}</h4>
        </div>
        <div/>
        <div className="movie-list-container my-3">
          {loading ? (
            <p>Loading...</p>
          ) : error?.message ? (
            <ErrorHandling error={error} callback={fetchData} />
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
      </div>
    </>
  )
}