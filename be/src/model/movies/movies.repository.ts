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
      @InjectModel('Watchlist', 'auth') private watchlistModel: Model<any>,
      @InjectModel('FavoriteList', 'auth') private favoriteListModel: Model<any>,
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
      console.log("Query:", query);
      const nomalQuery = query.toLowerCase();

      // Tìm kết quả khớp với truy vấn
      const results = await this.moviesNoSQLModel
        .find({
          $or: [
            { title: { $regex: nomalQuery, $options: "i" } },
            { original_title: { $regex: nomalQuery, $options: "i" } },
          ],
        })
        .skip((page - 1) * 20)
        .limit(20)
        .exec();

      // Đếm tổng số bản ghi khớp với truy vấn
      const totalRecords = await this.moviesNoSQLModel.countDocuments({
        $or: [
          { title: { $regex: nomalQuery, $options: "i" } },
          { original_title: { $regex: nomalQuery, $options: "i" } },
        ],
      });

      // Tính tổng số trang
      const totalPages = Math.ceil(totalRecords / 20);

      return { results, totalPages };
    } catch (error) {
      console.error("Error:", error);
      this.handleApiError(error, "Failed to fetch movie search results");
      throw error;
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
      const limit = 500; // Số dòng mỗi trang
      const skip = (page - 1) * limit; // Bỏ qua các dòng của các trang trước đó
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

  async getSameGenreMovies(id: number) {
    try {
      const movie = await this.moviesNoSQLModel.findOne({ tmdb_id: id >> 0 }).exec();
      if (!movie) {
        throw new HttpException('Movie not found', HttpStatus.NOT_FOUND);
      }
      const genreIds = movie.genres.map((genre) => genre.id);
      const now = new Date();
      // const sameMovie = await this.moviesNoSQLModel.find({
      //   genres: { $in: genreIds },
      //   releaseDate: { $gte: now },
      // }).limit(50).exec();
      const sameMovie = await this.moviesNoSQLModel.aggregate([
        // 1. Filter by genres using $elemMatch
        {
          $match: {
            genres: { $elemMatch: { id: { $in: genreIds } } },
          },
        },
      
        // 2. Calculate dateScore (inverse distance from current date)
        {
          $addFields: {
            dateScore: {
              $divide: [
                1,
                { $add: [{ $abs: { $subtract: ['$releaseDate', now] } }, 1] },
              ],
            },
          },
        },
      
        // 3. Calculate totalScore with weights
        {
          $addFields: {
            totalScore: {
              $add: [
                { $multiply: ['$popularity', 0.7] }, // Weight 0.7 for popularity
                { $multiply: ['$dateScore', 0.3] }, // Weight 0.3 for releaseDate
              ],
            },
          },
        },
      
        // 4. Sort by totalScore descending
        { $sort: { totalScore: -1 } },
      
        // 5. Optionally, limit the number of results
        { $limit: 20 },
      ]).exec();      
      return sameMovie;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getSameKeywordMovies(id: number) {
    try {
      const movie = await this.moviesNoSQLModel.findOne({ tmdb_id: id >> 0 }).exec();
      if (!movie) {
        throw new HttpException('Movie not found', HttpStatus.NOT_FOUND);
      }
      const now = new Date();
      const keywordIds = movie.keywords.map((keyword) => keyword.id);
      const sameMovie = await this.moviesNoSQLModel.aggregate([
        // 1. Filter by genres using $elemMatch
        {
          $match: {
            keywords: { $elemMatch: { id: { $in: keywordIds } } },
          },
        },
      
        // 2. Calculate dateScore (inverse distance from current date)
        {
          $addFields: {
            dateScore: {
              $divide: [
                1,
                { $add: [{ $abs: { $subtract: ['$releaseDate', now] } }, 1] },
              ],
            },
          },
        },
      
        // 3. Calculate totalScore with weights
        {
          $addFields: {
            totalScore: {
              $add: [
                { $multiply: ['$popularity', 0.7] }, // Weight 0.7 for popularity
                { $multiply: ['$dateScore', 0.3] }, // Weight 0.3 for releaseDate
              ],
            },
          },
        },
      
        // 4. Sort by totalScore descending
        { $sort: { totalScore: -1 } },
      
        // 5. Optionally, limit the number of results
        { $limit: 20 },
      ]).exec();      
      return sameMovie;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getSameCollectionMovies(id: number) {
    try {
      const movie = await this.moviesNoSQLModel.findOne({ tmdb_id: id >> 0 }).exec();
      if (!movie) {
        throw new HttpException('Movie not found', HttpStatus.NOT_FOUND);
      }
      const collectionId = movie.belongs_to_collection?.id;
      if (!collectionId) {
        throw new HttpException('Movie does not belong to any collection', HttpStatus.NOT_FOUND);
      }
      const sameMovie = await this.moviesNoSQLModel.find({
        'belongs_to_collection.id': collectionId,
      }).limit(20).exec();
      console.log(sameMovie.length);
      return sameMovie;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getSameMoviesByHistory(email: String) {
    try {
      // Lấy danh sách watchlist và favoriteList của user
      console.log(email);
      const watchlist = await this.watchlistModel.find({ 
        email: {$regex: new RegExp(`^${email.trim()}$`, 'i')} 
      }).exec();
      const favoriteList = await this.favoriteListModel.find({ 
        email: {$regex: new RegExp(`^${email.trim()}$`, 'i')} 
      }).exec();
      const movieIds = [...watchlist, ...favoriteList].map((item) => item.movieId);

      if (movieIds.length === 0) {
        return []; // Nếu user không có phim nào, trả về rỗng
      }
  
      // Lấy thông tin chi tiết của các phim trong danh sách movieIds
      const movies = await this.moviesNoSQLModel
        .find({ tmdb_id: { $in: movieIds } })
        .exec();
  
      // Tổng hợp genres và keywords phổ biến nhất
      const genreCount: Record<number, number> = {};
      const keywordCount: Record<number, number> = {};
  
      movies.forEach((movie) => {
        movie.genres.forEach((genre) => {
          genreCount[genre.id] = (genreCount[genre.id] || 0) + 1;
        });
        movie.keywords.forEach((keyword) => {
          keywordCount[keyword.id] = (keywordCount[keyword.id] || 0) + 1;
        });
      });
  
      // Lấy 2 genres và 2 keywords phổ biến nhất
      const topGenres = Object.entries(genreCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 2)
        .map(([id]) => parseInt(id));
      const topKeywords = Object.entries(keywordCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 2)
        .map(([id]) => parseInt(id));
  
      // Lấy thời gian hiện tại để tính dateScore
      const now = new Date();
  
      // Lọc các bộ phim phù hợp
      const sameMovies = await this.moviesNoSQLModel.aggregate([
        // 1. Filter by genres and keywords using $elemMatch
        {
          $match: {
            $or: [
              { genres: { $elemMatch: { id: { $in: topGenres } } } },
              { keywords: { $elemMatch: { id: { $in: topKeywords } } } },
            ],
            tmdb_id: { $nin: movieIds }, // Loại bỏ các phim đã có trong watchlist và favoriteList
          },
        },
  
        // 2. Calculate dateScore (inverse distance from current date)
        {
          $addFields: {
            dateScore: {
              $divide: [
                1,
                { $add: [{ $abs: { $subtract: ['$releaseDate', now] } }, 1] },
              ],
            },
          },
        },
  
        // 3. Calculate totalScore with weights
        {
          $addFields: {
            totalScore: {
              $add: [
                { $multiply: ['$popularity', 0.7] }, // Weight 0.7 for popularity
                { $multiply: ['$dateScore', 0.3] }, // Weight 0.3 for releaseDate
              ],
            },
          },
        },
  
        // 4. Sort by totalScore descending
        { $sort: { totalScore: -1 } },
  
        // 5. Limit the number of results
        { $limit: 20 },
      ]);
  
      return sameMovies;
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
