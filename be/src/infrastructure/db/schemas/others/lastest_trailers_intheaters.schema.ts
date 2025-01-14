import { SchemaFactory, Schema } from "@nestjs/mongoose"
import { Document } from "mongoose"

@Schema({ collection: 'latest_trailers_intheaters', strict: false })
export class LatestTrailersInTheaters extends Document {
  moviesID: number;
  original_title: string;
  poster_path: string;
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
}