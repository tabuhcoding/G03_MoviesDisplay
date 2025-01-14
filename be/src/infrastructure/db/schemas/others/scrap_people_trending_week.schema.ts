import { SchemaFactory, Schema } from "@nestjs/mongoose"
import { Document } from "mongoose"

@Schema({ collection: 'scrap_people_trending_week', strict: false })
export class ScrapPeopleTrendingWeek extends Document {
  tmdb_id: number;
  adult: boolean;
  category:[string];
  gender: number;
  id: number;
  known_for_department: any;
  media_type: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: any;
}