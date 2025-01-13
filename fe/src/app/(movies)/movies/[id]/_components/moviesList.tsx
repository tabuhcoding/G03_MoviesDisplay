/* Package System */
import { FC } from "react";
import { useRouter } from "next/navigation";

/* Package Application */
import { formatDateToMonthDayYear } from "@/src/util/helpers";

interface Movie {
  id: string;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  popularity: number;
  vote_average: number;
}

interface MovieListProps {
  movies: Movie[];

}

const MovieList: FC<MovieListProps> = ({ movies }) => {
  const router = useRouter();

  return (
    movies.map((movie) => (
      <div
        onClick={() => router.push(`/movies/${movie.id}`)}
        className="movie-card mx-2 cus-list-card"
        key={movie.id}
      >
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "https://res.cloudinary.com/de66mx8mw/image/upload/v1736666809/default-avatar-icon-of-social-media-user-vector.jpg.jpg"
          }
          alt={movie.title}
          style={{
            width: "150px",
            height: "225px",
            objectFit: "cover",
            borderRadius: "8px"
          }}
        />
        <div className="movie-info mt-4 text-center">
          <h6>{movie.title}</h6>
          <p>{formatDateToMonthDayYear(movie.release_date) || "Unknown"}</p>
        </div>
        <div
          className="rating container-rating-movie-list"
          style={{
            background: `conic-gradient(#4caf50 ${(movie.vote_average * 10) * 3.6}deg, #e0e0e0 0deg)`
          }}
        >
          <span className='circle-rating-movie-list'>
            {(movie.vote_average * 10).toFixed(0)}%
          </span>
        </div>
      </div>
    ))
  )
}

export default MovieList;