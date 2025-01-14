"use client";

/* Package System */
import { FC } from "react";
import { useRouter } from "next/navigation";

/* Pakcage Application */
import MoviesGrid from "../app/(movies)/movies/[id]/_components/moviesGrid";
import '@public/styles/admin/combinedDisplay.css';

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
  popularity: number;
}

interface Person {
  id: number;
  name: string;
  profile_path: string | null;
  popularity: number;
  known_for_department: string;
  // movie_cast: { movie_id: number; title: string; character: string }[];
}

interface ResultDisplayProps {
  results: Movie[] | Person[];
  isPeople: boolean;
}

const ResultDisplay: FC<ResultDisplayProps> = ({ results, isPeople }) => {
  const router = useRouter();

  return (
    isPeople ? (
      <div className="result-grid">
        {results?.length > 0 && (
          results?.map((person) => (
            <div
              key={(person as Person).id}
              className="result-item"
              onClick={() => router.push(`/people/${(person as Person).id}`)}
            >
              <div className="result-card" key={person.id}>
                <img
                  src={
                    (person as Person).profile_path
                      ? `https://image.tmdb.org/t/p/w138_and_h175_face${(person as Person).profile_path}`
                      : "https://res.cloudinary.com/de66mx8mw/image/upload/v1736666809/default-avatar-icon-of-social-media-user-vector.jpg.jpg"
                  }
                  alt={(person as Person).name}
                  className="result-img"
                />
                <div className="result-info">
                  <h4>{(person as Person).name}</h4>
                  <p>Popularity: {(person as Person).popularity.toFixed(1)}</p>
                  <p>Known For: {(person as Person).known_for_department}</p>
                  {/* <div className="result-movies">
                {(person as Person).movie_cast.map((movie) => (
                  <p key={movie.movie_id}>
                    <strong>{movie.title}</strong> as <em>{movie.character}</em>
                  </p>
                ))}
              </div> */}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    ) : (
      <MoviesGrid movies={results as Movie[]} />
    )
  );
};

export default ResultDisplay;