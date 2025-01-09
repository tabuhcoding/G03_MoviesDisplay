import { Injectable } from '@nestjs/common';
import { ActionRepository } from './action.repository';

@Injectable()
export class ActionService {
  constructor(private readonly actionRepository: ActionRepository) {}

  async getWatchList(email: string) {
    const watchlist = await this.actionRepository.findAllWatchlist(email);
    return this.actionRepository.getMoviesDetails(watchlist, 'moviesNoSQL');
  }

  async addToWatchList(email: string, movieId: Number) {
    return this.actionRepository.createWatchlist({ email, movieId });
  }

  async removeFromWatchList(email: string, movieId: Number) {
    return this.actionRepository.deleteWatchlist(email, movieId);
  }

  async getFavoriteList(email: string) {
    const favoriteList = await this.actionRepository.findAllFavoriteList(email);
    return this.actionRepository.getMoviesDetails(favoriteList, 'moviesNoSQL');
  }

  async addToFavoriteList(email: string, movieId: Number) {
    return this.actionRepository.createFavoriteList({ email, movieId });
  }

  async removeFromFavoriteList(email: string, movieId: Number) {
    return this.actionRepository.deleteFavoriteList(email, movieId);
  }

  async getRatings(email: string) {
    const ratings = await this.actionRepository.findAllRatings(email);
    return this.actionRepository.getMoviesDetailsWithRatings(ratings, 'moviesNoSQL');
  }

  async addRating(email: string, movieId: Number, rating: number, reviews: string) {
    return this.actionRepository.createRating({ email, movieId, rating, reviews });
  }

  async updateRating(email: string, movieId: Number, rating: number, reviews: string) {
    return this.actionRepository.updateRating({ email, movieId, rating, reviews });
  }

  async removeRating(email: string, movieId: Number) {
    return this.actionRepository.deleteRating(email, movieId);
  }
}
