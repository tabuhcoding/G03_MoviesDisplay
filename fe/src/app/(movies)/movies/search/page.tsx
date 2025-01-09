"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import SearchInput from "@components/layout/searchInput";
import MoviesGrid from "../../../(movies)/movies/[id]/_components/moviesGrid";
import Pagination from "../../../(movies)/movies/[id]/_components/pagination";
import { END_POINT_URL_LIST } from "@/src/util/constant";

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
}

export default function SearchPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || ""; // Lấy giá trị từ URL
  const page = parseInt(searchParams.get("page") || "1");

  useEffect(() => {
    const fetchMovies = async () => {
      if (!query) return; // Không gọi API nếu query rỗng
      setIsLoading(true);

      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}${END_POINT_URL_LIST.MOVIES_SEARCH}`,
          {
            params: { query, page }
          }
        );
        setMovies(response.data.data.results || []);
        setTotalPages(response.data.data.total_pages || 1);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [query, page]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const inputQuery = (e.target as HTMLFormElement).searchInput.value.trim();
    if (inputQuery) {
      router.push(`/movies/search?query=${inputQuery}&page=1`);
    }
  };

  return (
    <>
      <SearchInput
        value={query}
        onChange={(value) => router.push(`/movies/search?query=${value}&page=1`)}
        onSubmit={handleSearch}
      />
      <div className="container my-4">
        {isLoading ? (
          <p>Loading...</p>
        ) : movies.length > 0 ? (
          <>
            <MoviesGrid movies={movies} />
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={(newPage) =>
                router.push(`/movies/search?query=${query}&page=${newPage}`)
              }
            />
          </>
        ) : (
          <p>No results found for &quot;{query}&quot;.</p>

        )}
      </div>
    </>
  );
}
