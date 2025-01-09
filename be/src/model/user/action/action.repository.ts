import { Injectable, BadRequestException, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ActionRepository {
  constructor(
    @InjectModel('Watchlist', 'auth') private watchlistModel: Model<any>,
    @InjectModel('FavoriteList', 'auth') private favoriteListModel: Model<any>,
    @InjectModel('Rating', 'auth') private ratingModel: Model<any>,
    @InjectModel('Movies', 'moviesNoSQL') private moviesModel: Model<any>,
  ) {}

  async findAllWatchlist(email: string) {
    return this.watchlistModel.find({ email }).exec();
  }

  async createWatchlist(data: any) {
    const existingWatchlist = await this.watchlistModel.findOne({ email: data.email, movieId: data.movieId }).exec();
    if (existingWatchlist) {
      throw new ConflictException('Watchlist entry already exists');
    }
    return this.watchlistModel.create({ ...data, createdAt: new Date() });
  }

  async deleteWatchlist(email: string, movieId: Number): Promise<{ deletedCount?: number }> {
    const result = await this.watchlistModel.deleteOne({ email, movieId }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException('Watchlist entry not found');
    }
    return result;
  }

  async findAllFavoriteList(email: string) {
    return this.favoriteListModel.find({ email }).exec();
  }

  async createFavoriteList(data: any) {
    const existingFavoriteList = await this.favoriteListModel.findOne({ email: data.email, movieId: data.movieId }).exec();
    if (existingFavoriteList) {
      throw new ConflictException('Favorite list entry already exists');
    }
    return this.favoriteListModel.create({ ...data, createdAt: new Date() });
  }

  async deleteFavoriteList(email: string, movieId: Number): Promise<{ deletedCount?: number }> {
    const result = await this.favoriteListModel.deleteOne({ email, movieId }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException('Favorite list entry not found');
    }
    return result;
  }

  async findAllRatings(email: string) {
    return this.ratingModel.find({ email }).exec();
  }

  async createRating(data: any) {
    const existingRating = await this.ratingModel.findOne({ email: data.email, movieId: data.movieId }).exec();
    if (existingRating) {
      throw new ConflictException('Rating already exists');
    }
    return this.ratingModel.create({ ...data, createdAt: new Date() });
  }

  async updateRating(data: any) {
    const result = await this.ratingModel.updateOne(
      { email: data.email, movieId: data.movieId },
      { rating: data.rating, reviews: data.reviews },
    ).exec();

    if (result.matchedCount === 0) {
      throw new NotFoundException('Rating entry not found');
    }

    return result;
  }

  async deleteRating(email: string, movieId: Number): Promise<{ deletedCount?: number }> {
    const result = await this.ratingModel.deleteOne({ email, movieId }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException('Rating entry not found');
    }
    return result;
  }

  async getMoviesDetails(items: any[], dbConnection: string) {
    const movieIds = items.map((item) => item.movieId);
    return this.moviesModel.find({ tmdb_id: { $in: movieIds } }).exec();
  }

  async getMoviesDetailsWithRatings(ratings: any[], dbConnection: string) {
    const movieIds = ratings.map((rating) => rating.movieId);
    const movies = await this.moviesModel.find({ tmdb_id: { $in: movieIds } }).exec();

    return movies.map((movie) => ({
      ...movie.toObject(),
      rating: ratings.find((r) => r.movieId === movie._id.toString())?.rating,
      reviews: ratings.find((r) => r.movieId === movie._id.toString())?.reviews,
    }));
  }
}
