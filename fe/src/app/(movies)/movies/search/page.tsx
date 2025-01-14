"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import SearchInput from "@components/layout/searchInput";
import MoviesGrid from "../../../(movies)/movies/[id]/_components/moviesGrid";
import PeopleGrid from "../../../(movies)/movies/[id]/_components/peopleGrid"; // Thêm hoặc tạo một component PeopleGrid
import Pagination from "../../../(movies)/movies/[id]/_components/pagination";
import { END_POINT_URL_LIST } from "@/src/util/constant";
import '@public/styles/movie/search.css'
import "@styles/Homepage.css";
import { CircularProgress } from "@mui/material";

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  popularity: number;
}

interface Person {
  id: number;
  profile_path: string;
  name: string;
  original_title: string;
  vote_average: number;
  release_date: string;
  overview: string;
  popularity: number;
}

export default function SearchPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const page = parseInt(searchParams.get("page") || "1");
  const [active, setActive] = useState<"movies" | "people">("movies");

  useEffect(() => {
    const fetchMovies = async () => {
      if (!query) return;
      setIsLoading(true);

      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}${END_POINT_URL_LIST.MOVIES_SEARCH}`,
          {
            params: { query, page }
          }
        );

        const results = response.data.data.results || [];
        console.log("🚀 ~ fetchMovies ~ results:", results);

        setMovies(results);
        setTotalPages(response.data.data.total_pages || 1);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchPeople = async () => {
      if (!query) return;
      setIsLoading(true);

      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}${END_POINT_URL_LIST.PEOPLE_SEARCH}`,
          {
            params: { query, page }
          }
        );

        const results = response.data.data.results || [];

        console.log("🚀 ~ fetchPeople ~ results:", results);
        setPeople(results);
        setTotalPages(response.data.data.total_pages || 1);
      } catch (error) {
        console.error("Error fetching people:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (active === "movies") fetchMovies();
    if (active === "people") fetchPeople();

  }, [query, page, active]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const inputQuery = (e.currentTarget as HTMLFormElement).searchInput.value.trim();
    if (inputQuery) {
      router.push(`/movies/search?query=${inputQuery}&page=1`);
    }
  };

  return (
    <>
      <SearchInput
        isUseSearchLLM={false}
        isUseSearch={true}
        value={query}
        onChange={(value) => router.push(`/movies/search?query=${value}&page=1`)}
        onSubmit={handleSearch}
      />
      <div className="container">
        <div className="d-flex justify-content-end align-items-center m-3">
          <div className="toggle-switch mt-3">
            <button
              className={`toggle-btn ${active === "movies" ? "active" : ""}`}
              onClick={() => setActive("movies")}
            >
              Movies
            </button>
            <button
              className={`toggle-btn ${active === "people" ? "active" : ""}`}
              onClick={() => setActive("people")}
            >
              People
            </button>
          </div>
        </div>

        {isLoading ? (
          <CircularProgress size={24} />
        ) : (
          <>
            {active === "movies" && movies && movies?.length > 0 ? (
              <div className="row mb-4">
                <MoviesGrid movies={movies} />
                <Pagination
                  currentPage={page}
                  totalPages={totalPages}
                  onPageChange={(newPage) =>
                    router.push(`/movies/search?query=${query}&page=${newPage}`)
                  }
                />
              </div>
            ) : active === "people" && people && people?.length > 0 ? (
              <div className="row mb-4">
                <PeopleGrid people={people} />
                <Pagination
                  currentPage={page}
                  totalPages={totalPages}
                  onPageChange={(newPage) =>
                    router.push(`/movies/search?query=${query}&page=${newPage}`)
                  }
                />
              </div>
            ) : (
              <p>No results found for &quot;{query}&quot;.</p>
            )}
          </>
        )}
      </div>
    </>
  );
}
