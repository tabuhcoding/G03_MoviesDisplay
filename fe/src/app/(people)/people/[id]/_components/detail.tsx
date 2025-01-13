"use client";

/* Package System */
import React from "react";
import Image from "next/image";
import { HelpOutline } from "@mui/icons-material";

/* Package Application */
import '@public/styles/people/detail.css';
import { formatDateToMonthDayYear, calcAgeYYYYMMDD } from "@/src/util/helpers";

interface PeopleDetailProps {
  peopleDetails: {
    id: number;
    name: string;
    profile_path: string;
    gender: number;
    biography: string;
    known_for_department: string;
    birthday: string | null;
    place_of_birth: string | null;
    also_known_as: string[];
    movie_credits: {
      cast: {
        title: string;
        release_date: string;
        character: string;
        id: number;
        poster_path: string;
        popularity: number;
        vote_average: number;
      }[];
      crew: {
        title: string;
        release_date: string;
        department: string;
        job: string;
      }[];
    };
    tv_credits: {
      cast: {
        name: string;
        first_air_date: string;
        character: string;
        episode_count: number;
        id: number;
        poster_path: string;
        popularity: number;
        vote_average: number;
      }[];
      crew: {
        name: string;
        first_air_date: string;
        department: string;
        job: string;
        episode_count: number;
      }[];
    }
  };
}

export default function PeopleDetail({ peopleDetails }: { peopleDetails: PeopleDetailProps['peopleDetails'] }) {
  const {
    id,
    name,
    profile_path,
    gender,
    biography,
    known_for_department,
    birthday,
    place_of_birth,
    also_known_as,
    movie_credits,
    tv_credits
  } = peopleDetails;

  return (
    <div className="people-detail-container column_wrapper reverse">
      <div className="content-wrapper people-content">
        <div className="grey-column info-column">
          <section id="original_header" className="images inner">
            <div className="image_content profile">
              <div
                className="blurred"
                style={{
                  backgroundImage: `url(https://media.themoviedb.org/t/p/w300_and_h450_multi_faces_filter(blur)/${profile_path})`
                }}
              >
                <Image
                  src={`https://media.themoviedb.org/t/p/w300_and_h450_bestv2${profile_path}`}
                  alt={name}
                  width={300}
                  height={450}
                  priority
                />
              </div>
            </div>
          </section>
          <div className="information-column">
            <section className="full_wrapper facts left_column">
              <h3><bdi>Personal Info</bdi></h3>
              <section className="facts">
                <p>
                  <strong><bdi>Known for</bdi></strong>
                  {known_for_department}
                </p>
                <p>
                  <strong><bdi>Known credits</bdi></strong>
                  {(movie_credits?.cast?.length ?? 0) + (movie_credits?.crew?.length ?? 0) + (tv_credits?.cast?.length ?? 0) + (tv_credits?.crew?.length ?? 0)}
                </p>
                <p>
                  <strong><bdi>Gender</bdi></strong>
                  {gender === 1 ? 'Female' : 'Male'}
                </p>
                <p>
                  <strong><bdi>Birthday</bdi></strong>
                  {birthday ? (formatDateToMonthDayYear(birthday) + ' (' + calcAgeYYYYMMDD(birthday) + ' years old)') : 'Unknown'}
                </p>
                <p>
                  <strong><bdi>Place of Birth</bdi></strong>
                  {place_of_birth || 'Unknown'}
                </p>
                <p>
                  <strong><bdi>Also Known As</bdi></strong>
                </p>
                <ul>
                  {also_known_as?.map((name, index) => (
                    <li key={index}>{name}</li>
                  ))}
                </ul>
              </section>
            </section>
          </div>
        </div>
        <div>
          <div className="white-column">
            <section>
              <div className="title" dir="auto">
                <h2 className="title">
                  <a href={`/people/${id}`}>{name}</a>
                </h2>
              </div>
            </section>
            <section className="full_wrapper">
              <h3 dir="auto">Biography</h3>
              <div dir="auto" className="biography true">
                <div className="content fade-text">
                  <div className="text line-clamp-6">
                    <p>{biography}</p>
                  </div>
                </div>
              </div>
            </section>
            <section className="full_wrapper">
              <div id="known-for">
                <h3 dir="auto">Known For</h3>
                <div id="known_for_scroller" className="scroller_wrap should_fade is_fading">
                  <ul className="grid_media_list scroller">
                    {movie_credits?.cast?.length > 0 ? (
                      movie_credits.cast.map((movie, index) => (
                        <li key={index} className="media">
                          <div className="image">
                            <a href={`/movies/${movie.id}`}>
                              <img
                                src={movie.poster_path ? `https://media.themoviedb.org/t/p/w300_and_h450_bestv2${movie.poster_path}` : 'https://res.cloudinary.com/de66mx8mw/image/upload/v1736666809/default-avatar-icon-of-social-media-user-vector.jpg.jpg'}
                                alt={movie.title}
                                className="poster"
                              />
                            </a>
                          </div>
                          <p className="movie-title">{movie.title}</p>
                        </li>
                      ))
                    ) : <p>No movies found.</p>}
                  </ul>
                </div>
              </div>
            </section>
            <section className="full_wrapper">
              <div id="acting-credits">
                <h3 dir="auto">Acting</h3>
                <div className="acting-list">
                  {movie_credits?.cast?.length > 0 && (
                    movie_credits.cast.map((movie, index) => (
                      <div key={`movie-${index}`} className="acting-item">
                        <p className="acting-year">{movie.release_date?.slice(0, 4) || <HelpOutline fontSize="small" titleAccess="No data available" />}</p>
                        <div className="acting-detail">
                          <p className="acting-title">
                            <a href={`/movies/${movie.id}`}>
                              {movie.title}
                            </a>
                          </p>
                          <p className="acting-role">
                            as {movie.character || <HelpOutline fontSize="small" titleAccess="No data available" />}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                  {tv_credits?.cast?.length > 0 && (
                    tv_credits.cast.map((tv, index) => (
                      <div key={`tv-${index}`} className="acting-item">
                        <p className="acting-year">{tv.first_air_date?.slice(0, 4) || <HelpOutline fontSize="small" titleAccess="No data available" />}</p>
                        <div className="acting-detail">
                          <p className="acting-title">
                            <a href={`/tv/${tv.id}`}>
                              {tv.name}
                            </a>
                          </p>
                          <p className="acting-role">
                            as {tv.character || <HelpOutline fontSize="small" titleAccess="No data available" />} ({tv.episode_count} episodes)
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}