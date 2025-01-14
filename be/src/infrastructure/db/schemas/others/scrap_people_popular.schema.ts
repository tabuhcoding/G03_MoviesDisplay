import { SchemaFactory, Schema } from "@nestjs/mongoose"
import { Document } from "mongoose"

@Schema({ collection: 'scrap_people_popular', strict: false })
export class ScrapPeoplePopular extends Document {
  tmdb_id: number;
  adult: boolean;
  gender: number;
  id: number;
  known_for: [
    {
      backdrop_path: string;
      id: number;
      title: string;
      original_title: string;
      overview: string;
      poster_path: string;
      media_type: string;
      adult: boolean;
      original_language: string;
      genre_ids: number[];
      popularity: any;
      release_date: string;
      video: boolean;
      vote_average: any;
      vote_count: number;
      name: string;
      original_name: string;
      first_air_date: string;
    }
  ];
  known_for_department: string;
  profile_path: string;
}