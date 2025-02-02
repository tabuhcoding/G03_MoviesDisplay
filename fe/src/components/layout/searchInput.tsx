"use client";

import { ChangeEvent, useState } from "react";
import "@styles/Searchbar.css";

interface SearchInputProps {
  isUseSearch: boolean;
  isUseSearchLLM: boolean;
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  valueLLM?: string;
  onChangeLLM?: (valueLLM: string) => void;
  onSubmitLLM?: (type:string, e: React.FormEvent<HTMLFormElement>) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ isUseSearch, isUseSearchLLM ,value, onChange, onSubmit, valueLLM, onChangeLLM, onSubmitLLM }) => {
  const [searchType2, setSearchType2] = useState('movies'); 

  return (
    <div className="p-5 text-center bg-image bg-image-search">
      <div className="mask mask-style">
        <div className="d-flex justify-content-center align-items-center h-100">
          <div className="text-white">
            <h1 className="mb-3">Welcome</h1>
            <h4 className="mb-3">Millions of movies, TV shows and people to discover. Explore now.</h4>
            {isUseSearch && <form className="d-flex" role="search" onSubmit={onSubmit}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={value}
                onChange={(e: ChangeEvent<HTMLInputElement>) => onChange && onChange(e.target.value)}
              />
              <button
                className="btn btn-outline-light btn-lg btn-search"
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(to right, rgb(30, 213, 169), rgb(1, 180, 228))';
                  e.currentTarget.style.color = '#01647e';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(to right, rgba(30, 213, 169, 0.7), rgba(1, 180, 228, 0.7))';
                  e.currentTarget.style.color = '#fff';
                }}
              >
                Search
              </button>
            </form>}

            {/* Thanh tìm kiếm thứ hai với lựa chọn "Movies" và "People" */}
            {isUseSearchLLM && <form className="d-flex mt-4" role="search" onSubmit={(e: React.FormEvent<HTMLFormElement>) => onSubmitLLM && onSubmitLLM(searchType2, e)}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search with LLM"
                aria-label="Search"
                value={valueLLM}
                onChange={(e: ChangeEvent<HTMLInputElement>) => onChangeLLM && onChangeLLM(e.target.value)}
              />
              
              {/* Dropdown để chọn loại tìm kiếm */}
              <select
                className="form-select me-2"
                value={searchType2}
                onChange={(e) => setSearchType2(e.target.value)}
              >
                <option value="movies">Movies</option>
                <option value="people">People</option>
              </select>
              <button
                className="btn btn-outline-light btn-lg btn-search"
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(to right, rgb(30, 213, 169), rgb(1, 180, 228))';
                  e.currentTarget.style.color = '#01647e';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(to right, rgba(30, 213, 169, 0.7), rgba(1, 180, 228, 0.7))';
                  e.currentTarget.style.color = '#fff';
                }}
              >
                Search
              </button>
            </form>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchInput;
