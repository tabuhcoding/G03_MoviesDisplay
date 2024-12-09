import { Injectable, HttpException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class MoviesService {
  private readonly baseUrl: string;
  private readonly apiKey: string;
  constructor(private configService: ConfigService) {
    this.baseUrl = process.env.BASE_URL_TMDB;
    this.apiKey = process.env.API_KEY_TMDB;
  }

  async getTrendingMovies(timeWindow: 'day' | 'week') {
    try {
      const { data } = await axios.get(`${this.baseUrl}/trending/movie/${timeWindow}`, {
        params: { api_key: this.apiKey },
      });
      return data.results;
    } catch (error) {
      throw new HttpException('Failed to fetch trending movies', error.response.status);
    }
  }

  async getMovieDetails(movieId: number) {
    try {
      const { data } = await axios.get(`${this.baseUrl}/movie/${movieId}`, {
        params: { api_key: this.apiKey },
      });
      return data;
    } catch (error) {
      throw new HttpException('Failed to fetch movie details', error.response.status);
    }
  }

  async searchMovies(query: string): Promise<any> {
    if (!query) {
      throw new Error('Query parameter is missing');
    }
    try {
      const response = await axios.get(`${this.baseUrl}/search/movie`, {
        params: {
          api_key: this.apiKey,
          query,
          include_adult: false,
          language: 'en-US',
          page: 1,
        },
      });
      return response.data.results;
    } catch (error) {
      throw new HttpException(
        { message: 'Failed to fetch movie search results', statusCode: error.response?.status || 500 },
        error.response?.status || 500,
      );
    }
  }
}
