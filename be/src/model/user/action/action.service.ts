import { Injectable } from '@nestjs/common';
import { ActionRepository } from './action.repository';

@Injectable()
export class ActionService {
  constructor(private readonly actionRepository: ActionRepository) {}

  getWatchList() {
    return this.actionRepository.findAll('watchList');
  }

  addToWatchList(userId: string, movieId: string) {
    return this.actionRepository.create('watchList', { userId, movieId });
  }

  removeFromWatchList(id: string) {
    return this.actionRepository.delete('watchList', id);
  }

  getFavoriteList() {
    return this.actionRepository.findAll('favoriteList');
  }

  addToFavoriteList(userId: string, movieId: string) {
    return this.actionRepository.create('favoriteList', { userId, movieId });
  }

  removeFromFavoriteList(id: string) {
    return this.actionRepository.delete('favoriteList', id);
  }

  getRatings() {
    return this.actionRepository.findAll('rating');
  }

  addRating(userId: string, movieId: string, rating: number) {
    return this.actionRepository.create('rating', { userId, movieId, rating });
  }

  removeRating(id: string) {
    return this.actionRepository.delete('rating', id);
  }
}
