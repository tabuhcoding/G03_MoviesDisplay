"use client";

/* Package System */
import { FC, ChangeEvent } from "react";

interface SortPanelProps {
  sortOrder: string;
  onSortChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const SortPanel: FC<SortPanelProps> = ({ sortOrder, onSortChange }) => {
  return (
    <div className="sort_panel card">
      <div className="name">
        <h5>Sort</h5>
      </div>
      <div className="sort_by">
        <h5>Sort Results By</h5>
        <select className="form-select" value={sortOrder} onChange={onSortChange}>
          <option value="popularity.desc">Popularity Descending</option>
          <option value="popularity.asc">Popularity Ascending</option>
          <option value="vote_average.asc">Rating Ascending</option>
          <option value="vote_average.desc">Rating Descending</option>
          <option value="release_date.asc">Release Date Ascending</option>
          <option value="release_date.desc">Release Date Descending</option>
          <option value="title.asc">Title (A-Z)</option>
          <option value="title.desc">Title (Z-A)</option>
        </select>
      </div>
    </div>
  );
};

export default SortPanel;