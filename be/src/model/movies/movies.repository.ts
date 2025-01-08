// src/movies/movies.repository.ts
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class MoviesRepository {
  private readonly baseUrl: string = process.env.BASE_URL_TMDB;
  private readonly apiKey: string = process.env.API_KEY_TMDB;

  async fetchTrendingMovies(timeWindow: 'day' | 'week') {
    try {
      const { data } = await axios.get(`${this.baseUrl}/trending/movie/${timeWindow}`, {
        params: { api_key: this.apiKey },
      });
      return data.results;
    } catch (error) {
      this.handleApiError(error, 'Failed to fetch trending movies');
    }
  }

  async fetchMovieDetails(movieId: number) {
    try {
      const { data } = await axios.get(`${this.baseUrl}/movie/${movieId}`, {
        params: { api_key: this.apiKey },
      });
      return data;
    } catch (error) {
      this.handleApiError(error, 'Failed to fetch movie details');
    }
  }

  async searchMovies(query: string, page: number): Promise<any> {
    try {
      const { data } = await axios.get(`${this.baseUrl}/search/movie`, {
        params: {
          api_key: this.apiKey,
          query,
          page,
          include_adult: false,
          language: 'en-US',
        },
      });
      return data;
    } catch (error) {
      this.handleApiError(error, 'Failed to fetch movie search results');
    }
  }

  private handleApiError(error: any, message: string) {
    const statusCode = error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR;
    const errorMessage =
      error.response?.data?.status_message || error.message || 'An unknown error occurred';

    throw new HttpException(
      {
        message,
        details: errorMessage,
        statusCode,
      },
      statusCode,
    );
  }
}
