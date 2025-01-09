import { Schema } from 'mongoose';

export const WatchlistSchema = new Schema({
  email: { type: String, required: true },
  movieId: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});
