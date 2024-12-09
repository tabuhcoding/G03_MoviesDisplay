import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import MoviesGrid from './_components/MoviesGrid';
import Pagination from './_components/Pagination';
import { Input, Button, Box } from "@mui/material"
const SearchPage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [query, setQuery] = useState(searchParams.get('query') || '');
  const [page, setPage] = useState(parseInt(searchParams.get('page')) || 1);
  const [searchInput, setSearchInput] = useState('');

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

  const handleInputChange = (e) => { 
    setSearchInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchParams({ query: searchInput, page: page.toString() });
    setQuery(searchInput);
  };

  return (
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
      <Box
        component="form"
        onSubmit={handleSubmit}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
        gap={2}
      >
        {/* Back to Home Button */}
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/movies')}
          style={{ whiteSpace: "nowrap" }}
        >
          Back to Home
        </Button>

      {/* Search Bar */}
      <Box display="flex" gap={1} alignItems="center" flexGrow={1} justifyContent="flex-end">
          <Input
            type="text"
            value={searchInput}
            onChange={handleInputChange}
            placeholder="Search for movies..."
            style={{ flexGrow: 1, maxWidth: "400px" }}
          />
          <Button type="submit" variant="contained">
            Search
          </Button>
        </Box>
      </Box>
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
  );
};

export default SearchPage;

