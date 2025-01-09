import { Body, Controller, Get, Post, UseGuards, Res, Req, Query, Param } from '@nestjs/common';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get('trending')
  async getTrendingMovies(@Query('timeWindow') timeWindow: 'day' | 'week') {
    return await this.moviesService.getTrendingMovies(timeWindow || 'day');
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


  @Get(':id')
  async getMovieDetails(@Param('id') movieId: number) {
    return await this.moviesService.getMovieDetails(movieId);
  }
}
