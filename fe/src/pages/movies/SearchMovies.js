import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import MoviesGrid from './_components/MoviesGrid';
import Pagination from './_components/Pagination';
// import { Input, Button, Box } from "@mui/material"
import SearchInput from '../layout/SearchInput';
import { ErrorHandling } from '../../components/ErrorHandling';

const SearchPage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  // const navigate = useNavigate();
  const [query, setQuery] = useState(searchParams.get('query') || '');
  const [page, setPage] = useState(parseInt(searchParams.get('page')) || 1);
  const [searchInput, setSearchInput] = useState(query);
  // setSearchInput(query);
  const fetchMovies = useCallback(async () => {
    setError([]);
    setIsLoading(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/movies/search`, {
        params: { query, page },
      });
      setMovies(response.data.results || response.data || []);
      setTotalPages(response.data.total_pages || 1);
    } catch (err) {
      console.error("Error fetching trending movies:", err);
      const errorData = [
        err.response?.data?.message?.message || "Failed to fetch trending movies",
        "Backend Error: " + err.response?.data?.message?.details || "Unknown error occurred",
        err.response?.data?.message?.statusCode?.toString() || "500",
      ];
      setError(errorData);
      setMovies([]);
    } finally {
      setIsLoading(false);
    }
  }, [query, page]);
  useEffect(() => {

    fetchMovies();
  }, [fetchMovies]); // Added searchInput to dependency array

  const handlePageChange = (newPage) => {
    setSearchParams({ query: query, page: newPage.toString() });
    setPage(newPage);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchParams({ query: searchInput, page: page.toString() });
    setQuery(searchInput);
  };

  return (
    <>
    <SearchInput value={searchInput} onChange={(value) => setSearchInput(value)} onSubmit={handleSubmit}></SearchInput>
    <div className="container mx-auto px-4 py-8">
      { error.length > 0 && !isLoading && <ErrorHandling error={error} callback={fetchMovies} /> }
      {isLoading && <p className="text-center">Loading...</p>}

      {!isLoading && movies.length > 0 && (
        <>
          <MoviesGrid movies={movies} />
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}

      {!isLoading && movies.length === 0 && query && error.length === 0 && ( // Use searchInput instead of query
        <p className="text-center">No results found for "{query}".</p>
      )}
    </div>
    </>
  );
};

export default SearchPage;

