// src/movies/movies.service.ts
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { MoviesRepository } from './movies.repository';

@Injectable()
export class MoviesService {
  constructor(private readonly moviesRepository: MoviesRepository) {}

  async getTrendingMovies(timeWindow: 'day' | 'week') {
    return this.moviesRepository.fetchTrendingMovies(timeWindow);
  }

  async getMovieDetails(movieId: number) {
    return this.moviesRepository.fetchMovieDetails(movieId);
  }

  async searchMovies(query: string, page: number): Promise<any> {
    if (!query) {
      throw new HttpException('Query parameter is missing', HttpStatus.BAD_REQUEST);
    }
    return this.moviesRepository.searchMovies(query, page);
  }

  async getGenres() {
    return this.moviesRepository.fetchGenres();
  }

  async getNowPlayingMovies(page: number) {
    return this.moviesRepository.fetchNowPlayingMovies(page);
  }

  async getPopularMovies(page: number) {
    return this.moviesRepository.fetchPopularMovies(page);
  }

  async getTopRatedMovies(page: number) {
    return this.moviesRepository.fetchTopRatedMovies(page);
  }

  async getUpcomingMovies(page: number) {
    return this.moviesRepository.fetchUpcomingMovies(page);
  }
}
