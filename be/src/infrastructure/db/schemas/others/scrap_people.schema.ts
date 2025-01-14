import { SchemaFactory, Schema } from "@nestjs/mongoose"
import { Document } from "mongoose"

@Schema({ collection: 'scrap_people', strict: false })
export class ScrapPeople extends Document {
  tmdb_id: number;
  adult: boolean;
  also_known_as: string[];
  biography: string;
  birthday: any;
  deathday: any | null;
  gender: number;
  homepage: any;
  id: number;
  imdb_id: string;
  known_for_department: string;
  name: string;
  place_of_birth: any;
  popularity: number;
  profile_path: string;
  movie_credits: 
  {
    id: number;
    cast: [
      {
        adult: boolean;
        backdrop_path: any;
        genre_ids: number[];
        id: number;
        original_language: string;
        original_title: string;
        overview: string;
        popularity: number;
        poster_path: string;
        release_date: string;
        title: string;
        video: boolean;
        vote_average: any;
        vote_count: number;
        character: string;
        credit_id: string;
        order: number;
      }
    ];
    crew: [
      {
        adult: boolean;
        backdrop_path: any;
        genre_ids: number[];
        id: number;
        original_language: string;
        original_title: string;
        overview: string;
        popularity: number;
        poster_path: string;
        release_date: string;
        title: string;
        video: boolean;
        vote_average: any;
        vote_count: number;
        credit_id: string;
        department: string;
        job: string;
      }
    ]
  }
  tv_credits:
  {
    cast: [
      {
        adult: boolean;
        backdrop_path: any;
        genre_ids: number[];
        id: number;
        origin_country: string[];
        original_language: string;
        original_title: string;
        overview: string;
        popularity: number;
        poster_path: string;
        first_air_date: string;
        name: string;
        vote_average: any;
        vote_count: number;
        character: string;
        credit_id: string;
        episode_count: number;
      }
    ];
    crew: [
      {
        adult: boolean;
        backdrop_path: any;
        genre_ids: number[];
        id: number;
        origin_country: string[];
        original_language: string;
        original_title: string;
        overview: string;
        popularity: number;
        poster_path: string;
        first_air_date: string;
        name: string;
        vote_average: any;
        vote_count: number;
        credit_id: string;
        department: string;
        episode_count: number;
        job: string;
      }
    ]
  }
}