import { Schema } from 'mongoose';

export const RatingSchema = new Schema({
  email: { type: String, required: true },
  movieId: { type: Number, required: true },
  rating: { type: Number, required: true },
  reviews: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});
