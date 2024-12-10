import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import MoviesGrid from './_components/MoviesGrid';
import Pagination from './_components/Pagination';
// import { Input, Button, Box } from "@mui/material"
import SearchInput from '../layout/SearchInput';


const SearchPage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  // const navigate = useNavigate();
  const [query, setQuery] = useState(searchParams.get('query') || '');
  const [page, setPage] = useState(parseInt(searchParams.get('page')) || 1);
  const [searchInput, setSearchInput] = useState(query);
  // setSearchInput(query);

  useEffect(() => {
    const fetchMovies = async () => {

      setIsLoading(true);
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/movies/search`, {
          params: { query, page },
        });
        console.log('response:', response.data);
        setMovies(response.data.results || []);
        setTotalPages(response.data.total_pages || 1);
      } catch (error) {
        console.error('Error fetching search results:', error);
        setMovies([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [query, page]); // Added searchInput to dependency array

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
      {/* <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
        <Input
          type="text"
          value={searchInput}
          onChange={handleInputChange}
          placeholder="Search for movies..."
          className="flex-grow"
        />
        <Button type="submit">Search</Button>
      </form> */}
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

      {!isLoading && movies.length === 0 && query && ( // Use searchInput instead of query
        <p className="text-center">No results found for "{query}".</p>
      )}
    </div>
    </>
  );
};

export default SearchPage;

