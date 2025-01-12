"use client"

/* Package System */
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { useColor } from "color-thief-react";

/* Package Application */
import UserScoreSection from "@/src/components/userScoreSection";
import "@public/styles/movie/detail.css";

interface MovieDetailProps {
  movieDetails: {
    id: string;
    title: string;
    overview: string;
    poster_path: string;
    backdrop_path: string;
    release_date: string;
    genres: { id: string; name: string }[];
    runtime: number;
    vote_average: number;
    tagline: string;
    belongs_to_collection?: {
      backdrop_path?: string;
      poster_path?: string;
    };
    credits: {
      cast: {
        id: number;
        name: string;
        character: string;
        profile_path: string | null;
      }[];
      crew: {
        id: number;
        name: string;
        job: string;
        department: string;
        profile_path: string | null;
      }[];
    };
  };
}

const formatDate = (releaseDate: string) => {
  const date = new Date(releaseDate);
  return `${date.getDate().toString().padStart(2, "0")}/${(
    date.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}/${date.getFullYear()}`;
}

const formatRunTime = (runtime: number) => {
  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;
  return `${hours}h ${minutes}m`;
}

export default function MovieDetail({ movieDetails }: MovieDetailProps) {
  const router = useRouter();
  const [bgColor, setBgColor] = useState<string>("rgba(0, 0, 0, 0.6)");

  const imageUrl = `https://media.themoviedb.org/t/p/original${movieDetails?.backdrop_path ??
    movieDetails?.poster_path ??
    movieDetails?.belongs_to_collection?.backdrop_path ??
    movieDetails?.belongs_to_collection?.poster_path
  }`;

  const { data: color } = useColor(imageUrl, "rgbArray", {
    crossOrigin: "anonymous",
    quality: 10
  });

  useEffect(() => {
    if (color) {
      setBgColor(`rgba(${color[0]}, ${color[1]}, ${color[2]}, 0.6)`);
    }
  }, [color]);

  // Filter Director and Other Crews
  const director = movieDetails?.credits?.crew?.filter(member => member.job === "Director");
  const otherCrew = movieDetails?.credits?.crew?.filter(member => member.job !== "Director");

  const [showAllCrew, setShowAllCrew] = useState(false);
  const visibleCrew = showAllCrew ? otherCrew : otherCrew.slice(0, 10);

  return (
    <>
      <div
        className="custom-bg"
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundColor: bgColor,
          backgroundBlendMode: "overlay"
        }}
      >
        <div className="movie-detail-container mt-5">
          <section className="movie-header">
            <div className="poster-wrapper">
              <Image
                className="movie-poster"
                src={`https://media.themoviedb.org/t/p/w300_and_h450_bestv2${movieDetails.poster_path}`}
                alt={movieDetails.title}
                width={300}
                height={450}
                priority
              />
            </div>
            <div className="movie-info">
              <section className="info-header">
                <div className="movie-title">
                  <h2 onClick={() => router.push(`/movie/${movieDetails.id}`)} className="movie-title-header">
                    {movieDetails.title}
                    <span className="tag release_date">({new Date(movieDetails.release_date).getFullYear()})</span>
                  </h2>
                  <div className="facts d-flex">
                    <span className="release">{formatDate(movieDetails.release_date)}</span>
                    <span className="genres">{movieDetails.genres.map((genre) => genre.name).join(", ")}</span>
                    <span className="runtime">{formatRunTime(movieDetails.runtime)}</span>
                  </div>
                  <UserScoreSection vote_average={movieDetails.vote_average ?? 0} />
                </div>
                <div className="header-info">
                  <h3 className="tagline" dir="auto">{movieDetails.tagline}</h3>
                  <h3 className="h3-overview" dir="auto">Overview</h3>
                  <div className="overview">
                    <p>{movieDetails.overview}</p>
                  </div>

                  {/* Display Director */}
                  <h3 className="h3-overview" dir="auto">Director </h3>
                  <div className="overview">
                    {director && director.length > 0 ? (
                      director.map(directorMember => (
                        <p key={directorMember.id}>
                          {directorMember.name}
                        </p>
                      ))
                    ) : (
                      <p>No director found</p>
                    )}
                  </div>

                  {/* Display Other Crews */}
                  <h3 className="h3-overview" dir="auto">Other Crew</h3>
                  <div className="overview">
                    {otherCrew && otherCrew.length > 0 ? (
                      <div>
                        {visibleCrew.map((crewMember, index) => (
                          <span key={`${crewMember.id}-${index}`}>
                            {crewMember.name} ({crewMember.job})
                            {index < visibleCrew.length - 1 && ", "}
                          </span>
                        ))}
                        
                        {/* Conditionally render the 'See More' or 'See Less' button with line breaks */}
                        <div className="see-more-container">
                          {!showAllCrew && otherCrew.length > 5 && (
                            <button 
                              onClick={() => setShowAllCrew(true)} 
                              className="btn-see-more"
                            >
                              See More
                            </button>
                          )}
                          {showAllCrew && otherCrew.length > 5 && (
                            <button 
                              onClick={() => setShowAllCrew(false)} 
                              className="btn-see-more"
                            >
                              See Less
                            </button>
                          )}
                        </div>
                      </div>
                    ) : (
                      <p>No crew found</p>
                    )}
                  </div>
                </div>
              </section>
            </div>
          </section>
        </div>
      </div>

      <div className="container my-4">
        <div className="d-flex justify-content-between align-items-center">
          <h4>Top Billed Cast</h4>
        </div>

        <div className="movie-list-container my-3">
          <div className="movie-list d-flex flex-wrap">
            {movieDetails?.credits?.cast?.map((castMember) => (
              <div key={castMember.id} className="movie-card mx-2">
                <img
                  src={castMember.profile_path
                    ? `https://image.tmdb.org/t/p/w138_and_h175_face${castMember.profile_path}`
                    : "/default-profile.jpg"}
                  alt={castMember.name || "Unknown name"}
                />
                <div className="cast-info mt-2 text-center">
                  <h6>{castMember.name}</h6>
                  <p>{castMember.character}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}