// src/movies/movies.repository.ts
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios from 'axios';
import { Model } from 'mongoose';
import { In } from 'typeorm';

@Injectable()
export class MoviesRepository {
  private readonly baseUrl: string = process.env.BASE_URL_TMDB;
  private readonly apiKey: string = process.env.API_KEY_TMDB;
  constructor(
      @InjectModel('movies', 'moviesNoSQL') private moviesNoSQLModel: Model<any>,
      @InjectModel('scrap_movies_trending_day', 'otherNoSQL') private moviesTrendingDayModel: Model<any>,
      @InjectModel('scrap_movies_trending_day', 'otherNoSQL') private moviesTrendingWeekModel: Model<any>,
      @InjectModel('scrap_movie_genres', 'otherNoSQL') private movieGenresModel: Model<any>,
    ) {}

  async fetchTrendingMovies(timeWindow: 'day' | 'week') {
    try {
      // const { data } = await axios.get(`${this.baseUrl}/trending/movie/${timeWindow}`, {
      //   params: { api_key: this.apiKey },
      // });
      // return data.results;
      return timeWindow === 'day' ? 
      this.moviesTrendingDayModel.find().exec() : 
      this.moviesTrendingWeekModel.find().exec();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async fetchMovieDetails(movieId: number) {
    try {
      // const { data } = await axios.get(`${this.baseUrl}/movie/${movieId}`, {
      //   params: { api_key: this.apiKey },
      // });
      // return data;
      return this.moviesNoSQLModel.findOne({ tmdb_id: movieId }).exec();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
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

  async fetchGenres() {
    try{
      return this.movieGenresModel.find().exec();
    }
    catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
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
