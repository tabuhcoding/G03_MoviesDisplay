import { Injectable, BadRequestException, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { In } from 'typeorm';

@Injectable()
export class ActionRepository {
  constructor(
    @InjectModel('Watchlist', 'auth') private watchlistModel: Model<any>,
    @InjectModel('FavoriteList', 'auth') private favoriteListModel: Model<any>,
    @InjectModel('Rating', 'auth') private ratingModel: Model<any>,
    @InjectModel('Movies', 'moviesNoSQL') private moviesModel: Model<any>,
    @InjectModel('Users', 'auth') private usersModel: Model<any>,
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

  async createReview(email: string, rating: any){
    const user = await this.usersModel.findOne({ email }).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const movie = await this.moviesModel.findOne({ tmdb_id: rating.movieId}).exec();
    if (!movie) {
      throw new NotFoundException('Movie not found');
    }

    const lastRating = movie.vote_average;
    const newRating = (lastRating*movie.vote_count + rating.rating) / (movie.vote_count + 1);
    const newVoteCount = movie.vote_count + 1;

    const result = await this.moviesModel.updateOne(
      { tmdb_id: rating.movieId },
      { 
        vote_average: newRating,
        vote_count: newVoteCount,
        $push: { 
        reviews: { 
          author: user.username, 
          author_details:{
            avatar_path: user.avatar,
            name: user.username,
            username: user.email,
            rating: rating.rating,
          },
          content: rating.reviews,
          created_at: new Date(),
          update_at: new Date(),
          id: rating._id,
          url: "",
        } } },
    ).exec();
    if (result.matchedCount === 0) {
      throw new NotFoundException('Data not found');
    }
    return result;
  }

  async updateReview(data: any) {
    const movie = await this.moviesModel.findOne({ tmdb_id: data.movieId >> 0 }).exec();
    if (!movie) {
      throw new NotFoundException('Movie not found');
    }

    const lastRating = movie.vote_average;
    const lastUserRating = movie.reviews.find((review) => review.author_details.username === data.email).author_details.rating;
    const newRating = (lastRating*movie.vote_count - lastUserRating + data.rating) / movie.vote_count;

    const result = await this.moviesModel.updateOne(
      { 
        tmdb_id: data.movieId >> 0, 
        'reviews.author_details.username': data.email 
      },
      { 
        vote_average: newRating,
        $set: { 
          'reviews.$.content': data.reviews, // cập nhật nội dung review
          'reviews.$.author_details.rating': data.rating, // cập nhật rating
          'reviews.$.update_at': new Date(), // cập nhật thời gian
        } 
      },
    ).exec();
  
    if (result.matchedCount === 0) {
      throw new NotFoundException('Review not found');
    }
  
    return result;
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

  async deleteReview(email: string, movieId: Number) {
    const findReview = await this.moviesModel.findOne(
      { tmdb_id: movieId, 'reviews.author_details.username': email },
      { 'reviews.$': 1 }
    );
    console.log(findReview);
    const result = await this.moviesModel.updateOne(
      { tmdb_id: movieId },
      { $pull: { reviews: { 'author_details.username': { $regex: new RegExp(`^${email.trim()}$`, 'i') } }, } },
    ).exec();
    if (result.matchedCount === 0) {
      throw new NotFoundException('Review not found');
    }
    return result;
  }

  async getMoviesDetails(items: any[], dbConnection: string) {
    // const movieIds = items.map((item) => item.movieId);
    // return this.moviesModel.find({ tmdb_id: { $in: movieIds } }).exec();
    const result = items.map(async (item) => {
      const movie = await this.moviesModel.findOne({ tmdb_id: item.movieId }).exec();
      return {
        ...movie.toObject(),
        createdAt: item.createdAt,
      };
    })
    return Promise.all(result);
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
