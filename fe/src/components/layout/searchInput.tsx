import { ChangeEvent } from "react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ value, onChange, onSubmit }) => {
  return (
    <div
      className="p-5 text-center bg-image"
      style={{
        backgroundImage: 'url(@public/bg-nav.jpg)',
        position: 'relative',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: 400,
        marginTop: 56
      }}
    >
      <div
        className="mask"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%'
        }}
      >
        <div className="d-flex justify-content-center align-items-center h-100">
          <div className="text-white">
            <h1 className="mb-3">Welcome</h1>
            <h4 className="mb-3">Millions of movies, TV shows and people to discover. Explore now.</h4>
            <form className="d-flex" role="search" onSubmit={onSubmit}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={value}
                onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
              />
              <button
                className="btn btn-outline-light btn-lg"
                style={{
                  background: 'linear-gradient(to right, rgba(30, 213, 169, 0.7), rgba(1, 180, 228, 0.7))',
                  color: '#fff',
                  border: 'none',
                  transition: 'background 0.5s ease'
                }}
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
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchInput;