"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import '@styles/CustomMoviesGrid.css'

interface Person {
  id: number;
  poster_path: string | null;
  original_title: string;
  vote_average: number | null;
  release_date: string | null;
  overview: string | null;
  popularity: number | null;
}

interface PeopleGridProps {
  people: Person[];
  lastPersonElementRef?: React.RefObject<HTMLDivElement | null>;
}

const PeopleGrid: React.FC<PeopleGridProps> = ({ people, lastPersonElementRef }) => {
  const [expandedPersonId, setExpandedPersonId] = useState<number | null>(null);
  const router = useRouter();

  const toggleExpand = (personId: number) => {
    setExpandedPersonId((prev) => (prev === personId ? null : personId));
  };

  return (
    <div className="movies-grid">
      {people.map((person, index) => {
        const isLastPerson = people.length === index + 1;
        const isExpanded = expandedPersonId === person.id;

        return (
          <div
            key={person.id}
            className="movies-item"
            ref={isLastPerson ? lastPersonElementRef : null}
            onClick={() => router.push(`/people/${person.id}`)} // Redirect to person's details
          >
            <div className="movies-card">
              <img
                src={
                  person.poster_path
                    ? `https://image.tmdb.org/t/p/w500${person.poster_path}`
                    : 'https://via.placeholder.com/300x450?text=No+Image'
                }
                className="movies-img"
                alt={person.original_title || 'Person'}
              />
              <div className="movies-info">
                <h5 className={isExpanded ? "expanded-title" : "truncated-title"}>
                  {isExpanded || person.original_title.length <= 30
                    ? person.original_title
                    : `${person.original_title.substring(0, 30)}...`}
                </h5>
                <p>Rating: {(person.vote_average ?? 0).toFixed(1)}</p>
                <p>{person.release_date ? new Date(person.release_date).toLocaleDateString() : 'Unknown'}</p>
                <p>Popularity: {(person.popularity ?? 0).toFixed(1)}</p>
                {isExpanded && <p className="person-overview">{person.overview || 'No overview available.'}</p>}
                <button
                  className="toggle-button"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering the redirect when clicking on toggle button
                    toggleExpand(person.id);
                  }}
                >
                  {isExpanded ? '▲' : '▼'}
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PeopleGrid;
