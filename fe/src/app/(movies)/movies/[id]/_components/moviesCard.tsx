/* Package System */
import { FC } from "react";
import { useRouter } from "next/navigation";

/* Package Application */
import { formatDateToMonthYYYY } from "@/src/util/helpers";

interface Movie {
  id: string;
  title: string;
  poster_path: string | null;
  createdAt: string;
}

interface MovieCardListProps {
  movies: Movie[];
  emptyMessage?: string;
}

const MovieCard: FC<MovieCardListProps> = ({ movies, emptyMessage = "No movies found." }) => {
  const router = useRouter();

  if (movies.length === 0) {
    return <p>{emptyMessage}</p>;
  }

  return (
    <div className="movie-list d-flex flex-wrap">
      {movies.map((movie) => (
        <div
          onClick={() => router.push(`/movies/${movie.id}`)}
          className="movie-card mx-2"
          key={movie.id}
          style={{ cursor: "pointer" }}
        >
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "https://via.placeholder.com/150"
            }
            alt={movie.title}
            style={{
              width: "150px",
              height: "225px",
              objectFit: "cover",
              borderRadius: "8px"
            }}
          />
          <div className="movie-info mt-2 text-center">
            <h6>{movie.title}</h6>
            <p>
              <strong>Added: </strong>
              {formatDateToMonthYYYY(movie.createdAt)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieCard;