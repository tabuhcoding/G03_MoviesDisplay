import { useState, useEffect } from "react";

interface FilterComponentProps {
  setSortOption: React.Dispatch<React.SetStateAction<string>>;
  sortOption: string;
}

const FilterComponent: React.FC<FilterComponentProps> = ({ setSortOption, sortOption}) => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("7/10/2025");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [genres, setGenres] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  
  const [sortOptions] = useState<string[]>([
    "Popularity Descending",
    "Popularity Ascending",
    "Rating Descending",
    "Rating Ascending",
    "Release Date Descending",
    "Release Date Ascending",
    "Title A-Z",
    "Title Z-A"
  ]);

  const [selectedOption, setSelectedOption] = useState(sortOptions[0]);

  const handleOptionClick = (option: string): void => {
    setSortOption(option); 
    setSelectedOption(option); 
    setIsOpen(false);
  };
  

  const handleGenreChange = (genre: string) => {
    setGenres((prevGenres) => {
      if (prevGenres.includes(genre)) {
        return prevGenres.filter((g) => g !== genre);
      } else {
        return [...prevGenres, genre];
      }
    });
  };

  useEffect(() => {
    setSelectedOption(sortOption); 
  }, [sortOption]);
  
  return (
    <div className="filter-component">
      <div className="sort-section mb-4">
        <h5>Sort</h5>
        <div className="custom-select-wrapper">
          <div
            className={`custom-select ${isOpen ? "open" : ""}`}
            onClick={() => setIsOpen(!isOpen)}
          >
            {selectedOption}
          </div>

          {isOpen && (
            <div className="custom-select-options">
              {sortOptions.map((option) => (
                <div
                  key={option}
                  className="custom-select-option"
                  onClick={() => handleOptionClick(option)}
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="filters-section">
        <h5>Filters</h5>
        <hr></hr>
        <div className="mb-3">
          <h6 className="mb-2 text-muted">Release Dates</h6>
          <div className="mt-2">
            <label className="mb-2 text-muted">From: </label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="form-control"
            />
            <label className="mt-2 text-muted">To: </label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="form-control"
            />
          </div>
        </div>

        <hr></hr>

        <div className="mb-3">
          <h6 className="mb-2 text-muted">Genres</h6>
          <div className="genres-list">
            {["Action", "Adventure", "Animation", "Comedy"].map((genre) => (
              <label key={genre} className="genre-label">
                <input
                  type="checkbox"
                  value={genre}
                  checked={genres.includes(genre)}
                  onChange={() => handleGenreChange(genre)}
                />
                {genre}
              </label>
            ))}
          </div>
        </div>

        <hr></hr>

        <div className="mb-3">
          <h6 className="mb-2 text-muted">Keywords</h6>
          <input className="form-control me-2" type="search" placeholder="Filter by keywords..." 
            aria-label="Search" style={{fontSize: 14}}/>
        </div>
      </div>
    </div>
  );
};

export default FilterComponent;
