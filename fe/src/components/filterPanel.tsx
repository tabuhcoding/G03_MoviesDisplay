"use client";

/* Package System */
import { FC } from "react";

interface FilterPanelProps {
  // filter by date
  fromDate: Date | null;
  toDate: Date | null;
  onFromDateChange: (newDate: Date | null) => void;
  onToDateChange: (newDate: Date | null) => void;
  isFilterChanged: boolean;
  onFilterSubmit: () => void;

  // filter by genres
  genres: { id: number; name: string }[];
  selectedGenres: number[];
  onToggleGenre: (id: number) => void;
}

const FilterPanel: FC<FilterPanelProps> = ({
  fromDate,
  toDate,
  onFromDateChange,
  onToDateChange,
  isFilterChanged,
  onFilterSubmit,
  genres,
  selectedGenres,
  onToggleGenre
}) => {
  return (
    <>
      <div className="filter_panel card mt-4">
        <div className="name">
          <h5>Filter</h5>
        </div>
        <div className="filter_release_date">
          <h5>Release Date</h5>
          <div className="d-flex flex-column">
            <div className="d-flex flex-row">
              <label>From</label>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  <i className="fa fa-calendar"></i>
                </span>
                <input
                  type="date"
                  className="form-control"
                  value={fromDate ? fromDate.toISOString().split("T")[0] : ""}
                  onChange={(e) => onFromDateChange(new Date(e.target.value))}
                />
              </div>
            </div>

            <div className="d-flex flex-row">
              <label>To</label>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  <i className="fa fa-calendar"></i>
                </span>
                <input
                  type="date"
                  className="form-control"
                  value={toDate ? toDate.toISOString().split("T")[0] : ""}
                  onChange={(e) => onToDateChange(new Date(e.target.value))}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="filter_genres">
          <h5>Genres</h5>
          <div className="genres-container">
            {genres.map((genre) => (
              <button
                key={genre.id}
                onClick={() => onToggleGenre(genre.id)}
                className={`genre-button ${selectedGenres.includes(genre.id) ? "selected" : ""}`}
              >
                {genre.name}
              </button>
            ))}
          </div>
        </div>
      </div>
      <button
        disabled={!isFilterChanged}
        onClick={isFilterChanged ? onFilterSubmit : undefined}
        className={`apply-btn ${isFilterChanged ? "" : "disabled"}`}
      >
        <p className="load_more">
          <a className="load_more" data-partial>
            Search
          </a>
        </p>
      </button>
    </>
  );
};

export default FilterPanel;