import { SchemaFactory, Schema } from "@nestjs/mongoose"
import { Document } from "mongoose"

@Schema({ collection: 'movies', strict: false })
export class Movies extends Document {
  tmdb_id: number;
  adult: boolean;
  backdrop_path: any;
  belongs_to_collection: {
    id: Number;
    name: string;
    poster_path: string;
    backdrop_path: string;
  };
  budget: number;
  categories: [string];
  genres: [
    {
      id: number;
      name: string;
    }
  ];
  homepage: string;
  id: number;
  imdb_id: string;
  origin_country: [string];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: [
    {
      iso_3166_1: string;
      name: string;
    }
  ];
  production_countries: [
    {
      iso_3166_1: string;
      name: string;
    }
  ];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: [
    {
      iso_639_1: string;
      name: string;
      english_name: string;
    }
  ];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: any;
  vote_count: number;
  credits: 
  {
    id: number;
    cast: [
      {
        adult: boolean;
        gender: number;
        id: number;
        known_for_department: string;
        name: string;
        original_name: string;
        popularity: number;
        profile_path: string;
        cast_id: number;
        character: string;
        credit_id: string;
        order: number;
      }
    ];
    crew: [
      {
        adult: boolean;
        gender: number;
        id: number;
        known_for_department: string;
        name: string;
        original_name: string;
        popularity: number;
        profile_path: any;
        credit_id: string;
        department: string;
        job: string;
      }
    ]
  };
  trailers: [
    {
      id: string;
      iso_639_1: string;
      iso_3166_1: string;
      key: string;
      name: string;
      site: string;
      size: number;
      type: string;
      official: boolean;
      published_at: string;
    }
  ];
  similar_movies: [string];
  keywords: [
    {
      id: number;
      name: string;
    }
  ];
  reviews: [
    {
      author: string;
      author_details: {
        name: string;
        username: string;
        avatar_path: any;
        rating: number;
      };
      content: string;
      created_at: string;
      id: string;
      updated_at: string;
      url: string;
    }
  ]
}