"use client";
import { ErrorData, ErrorHandling } from '@/src/components/errorHandling';
import SearchInput from '@/src/components/layout/searchInput';
import { END_POINT_URL_LIST } from '@/src/util/constant';
import ResultDisplay from '@components/combinedDisplay';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import {useRouter} from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

export interface Person {
  id: number;
  name: string;
  profile_path: string | null;
  popularity: number;
  known_for_department: string;
}

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

export default function SearchLLM(){
  const [people, setPeople] = useState<Person[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<ErrorData>({} as ErrorData);
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState<string>("");
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const searchBy = searchParams.get("searchBy") || "people";
  const amount = parseInt(searchParams.get("amount") || "10");
  const router = useRouter();
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError({} as ErrorData);
    setMessage("");
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}${END_POINT_URL_LIST.RETRIEVE}?query=${query}&searchBy=${searchBy}&amount=${amount}`
      );
      if(response.data.data.length > 0){
        console.log(response.data.data);
        if(searchBy === "people"){
          const peopleResponse = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}${END_POINT_URL_LIST.PEOPLE_LIST}`,{
            params: {
              ids: response.data.data
            }
          });
          setPeople(peopleResponse.data.data);
        
        }
        else{
          const moviesResponse = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}${END_POINT_URL_LIST.MOVIES_LIST}`,{
            params: {
              ids: response.data.data
            }
          });
          setMovies(moviesResponse.data.data)
        }
        setMessage("");
      } else{
        setMessage("No results found");
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
    } finally {
      setLoading(false);
    }
  }, [query, searchBy, amount]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSearch = (type: string,e: React.FormEvent<HTMLFormElement> ) => {
    e.preventDefault();
    router.push(`/searchLLM?query=${searchInput}&searchBy=${type}&amount=${amount}`);
  };

  return(
    <>
      <SearchInput
        isUseSearch = {false} isUseSearchLLM = {true}
        valueLLM = {searchInput}
        onChangeLLM={(value) => setSearchInput(value)}
        onSubmitLLM = {handleSearch}
      />
      <div className="container my-4">
        <div className="d-flex justify-content-between align-items-center">
          <h4>{searchBy === "people" ? "Cast" : "Movies"} Results</h4>
        </div>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : error?.message ? (
        <ErrorHandling error={error} callback={fetchData} />
      ) : (
        <ResultDisplay results={searchBy === "people" ? people : movies} isPeople={searchBy === "people"}/>
      )}
      {message && <p>{message}</p>}
    </>
  )
}