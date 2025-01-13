"use client";

/* Package System */
import { FC } from "react";
import { Slider } from "@mui/material";

interface FilterPanelProps {
  // filter by date
  fromDate: Date | null;
  toDate: Date | null;
  onFromDateChange: (newDate: Date | null) => void;
  onToDateChange: (newDate: Date | null) => void;

  // filter by genres
  genres: { id: number; name: string }[];
  selectedGenres: number[];
  onToggleGenre: (id: number) => void;

  // filter by user score
  userScore: [number, number];
  onUserScoreChange: (newRange: [number, number]) => void;

  // filter by minimum user votes
  minVotes: number;
  onMinVotesChange: (newValue: number) => void;

  // others
  isFilterChanged: boolean;
  onFilterSubmit: () => void;
}

const FilterPanel: FC<FilterPanelProps> = ({
  fromDate,
  toDate,
  onFromDateChange,
  onToDateChange,
  genres,
  selectedGenres,
  onToggleGenre,
  userScore,
  onUserScoreChange,
  minVotes,
  onMinVotesChange,
  isFilterChanged,
  onFilterSubmit
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
        <div className="filter_user_score mt-4">
          <h5>User Score</h5>
          <Slider
            value={userScore}
            onChange={(e, newValue) => onUserScoreChange(newValue as [number, number])}
            valueLabelDisplay="auto"
            min={0}
            max={10}
            step={0.1}
          />
          <div className="slider-values">
            <span>Min: {userScore[0]}</span>
            <span>Max: {userScore[1]}</span>
          </div>
        </div>
        <div className="filter_min_votes mt-4">
          <h5>Minimum User Votes</h5>
          <Slider
            value={minVotes}
            onChange={(e, newValue) => onMinVotesChange(newValue as number)}
            valueLabelDisplay="auto"
            min={0}
            max={500}
            step={50}
          />
          <div className="slider-values">
            <span>Current: {minVotes}</span>
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