import mongoose from "mongoose";

export const MoviesSchema = new mongoose.Schema({
  tmdb_id: Number,
  title: String,
  vote_average: Number, // Đảm bảo được khai báo với đúng kiểu dữ liệu
  vote_count: Number,
  reviews: Array,
});
