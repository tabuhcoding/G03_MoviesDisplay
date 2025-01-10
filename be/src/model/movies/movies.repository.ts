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
      @InjectModel('scrap_movies_trending_week', 'otherNoSQL') private moviesTrendingWeekModel: Model<any>,
      @InjectModel('scrap_movie_genres', 'otherNoSQL') private movieGenresModel: Model<any>,
      @InjectModel('scrap_movies_upcoming', 'otherNoSQL') private moviesUpcomingModel: Model<any>,
      @InjectModel('scrap_movies_now_playing', 'otherNoSQL') private moviesNowPlayingModel: Model<any>,
      @InjectModel('scrap_movies_popular', 'otherNoSQL') private moviesPopularModel: Model<any>,
      @InjectModel('scrap_movies_top_rated', 'otherNoSQL') private moviesTopRatedModel: Model<any>,
      @InjectModel('lastest_trailers_intheaters', 'otherNoSQL') private lastestTrailersIntheatersModel: Model<any>,
      @InjectModel('lastest_trailers_populars', 'otherNoSQL') private lastestTrailersPopularsModel: Model<any>,
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
      const movie = await this.moviesNoSQLModel.findOne({ tmdb_id: (movieId >> 0) }).exec();
      return movie;
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
      // return await this.moviesNoSQLModel
      //   .find({ name: { $regex: query, $options: 'i' } })
      //   .skip(((page - 1) * 10) >> 0)
      //   .limit(10)
      //   .exec();
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

  async fetchNowPlayingMovies(page: number = 1) {
    try {
      const limit = 500; // Số dòng mỗi trang
      const skip = (page - 1) * limit; // Bỏ qua các dòng của các trang trước đó

      // Lấy tổng số tài liệu
      const total_count = await this.moviesNowPlayingModel.countDocuments();

      // Tính tổng số trang
      const total_page = Math.ceil(total_count / limit);

      // Lấy dữ liệu theo trang
      const data = await this.moviesNowPlayingModel
        .find({})
        .skip(skip  >> 0 )
        .limit(limit  >> 0 )
        .exec();

      return {
        total_page,
        total_count,
        results: data,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async fetchPopularMovies(page: number = 1) {
    try {
      const limit = 500; // Số dòng mỗi trang
      const skip = (page - 1) * limit; // Bỏ qua các dòng của các trang trước đó

      // Lấy tổng số tài liệu
      const total_count = await this.moviesPopularModel.countDocuments();

      // Tính tổng số trang
      const total_page = Math.ceil(total_count / limit);

      // Lấy dữ liệu theo trang
      const data = await this.moviesPopularModel
        .find({})
        .skip(skip  >> 0 )
        .limit(limit  >> 0 )
        .exec();

      return {
        total_page,
        total_count,
        results: data,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async fetchTopRatedMovies(page: number = 1) {
    try {
      const limit = 500; // Số dòng mỗi trang
      const skip = (page - 1) * limit; // Bỏ qua các dòng của các trang trước đó

      // Lấy tổng số tài liệu
      const total_count = await this.moviesTopRatedModel.countDocuments();

      // Tính tổng số trang
      const total_page = Math.ceil(total_count / limit);

      // Lấy dữ liệu theo trang
      const data = await this.moviesTopRatedModel
        .find({})
        .skip(skip  >> 0 )
        .limit(limit  >> 0 )
        .exec();

      return {
        total_page,
        total_count,
        results: data,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async fetchUpcomingMovies(page: number = 1) {
    try {
      console.log('fetchUpcomingMovies');
      const limit = 500; // Số dòng mỗi trang
      const skip = (page - 1) * limit; // Bỏ qua các dòng của các trang trước đó
      console.log(page, limit, skip);
      // Lấy tổng số tài liệu
      const total_count = await this.moviesUpcomingModel.countDocuments();

      // Tính tổng số trang
      const total_page = Math.ceil(total_count / limit);

      // Lấy dữ liệu theo trang
      const data = await this.moviesUpcomingModel
        .find({})
        .skip(skip >> 0)
        .limit(limit >> 0)
        .exec();
      return {
        total_page,
        total_count,
        results: data,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async fetchLastestTrailers(query: 'popular' | 'intheater') {
    try {
      return query === 'popular' ? 
      this.lastestTrailersPopularsModel.find().exec() : 
      this.lastestTrailersIntheatersModel.find().exec();
    } catch (error) {
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
