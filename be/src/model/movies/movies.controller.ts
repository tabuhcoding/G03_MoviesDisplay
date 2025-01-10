import { Body, Controller, Get, Post, UseGuards, Res, Req, Query, Param } from '@nestjs/common';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get('trending')
  async getTrendingMovies(@Query('timeWindow') timeWindow: 'day' | 'week') {
    return await this.moviesService.getTrendingMovies(timeWindow || 'day');
  }

  @Get('now-playing')
  async getNowPlayingMovies(@Query('page') page: number) {
    return await this.moviesService.getNowPlayingMovies(page);
  }

  @Get('popular')
  async getPopularMovies(@Query('page') page: number) {
    return await this.moviesService.getPopularMovies(page);
  }

  @Get('top-rated')
  async getTopRatedMovies(@Query('page') page: number) {
    return await this.moviesService.getTopRatedMovies(page);
  }

  @Get('upcoming')
  async getUpcomingMovies(@Query('page') page: number) {
    console.log('page:', page);
    return await this.moviesService.getUpcomingMovies(page);
  }

  @Get('search')
  async searchMovies(@Query('query') query: string, @Query('page') page: number) {
    if (!query) {
      throw new Error('Query parameter is missing');
    }
    try {
      return await this.moviesService.searchMovies(query, page);
    } catch (error) {
      console.error('Controller caught error:', error.message);
      throw error; // Re-throw lỗi nếu cần
    }
  }

  @Get('genres')
  async getGenres() {
    return await this.moviesService.getGenres();
  }

  @Get('lastest-trailers')
  async getLastestTrailers(@Query('query') query: 'popular' | 'intheater') {
    return await this.moviesService.getLastestTrailers(query);
  }

  @Get(':id')
  async getMovieDetails(@Param('id') movieId: number) {
    return await this.moviesService.getMovieDetails(movieId);
  }

}
