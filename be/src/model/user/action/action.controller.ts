import { Controller, Get, Post, Delete, Body, Param, Query, Put } from '@nestjs/common';
import { ActionService } from './action.service';

@Controller('/user/action')
export class ActionController {
  constructor(private readonly actionService: ActionService) {}

  @Get('watch-list')
  async getWatchList(@Query('email') email: string) {
    return this.actionService.getWatchList(email);
  }

  @Post('watch-list')
  async addToWatchList(@Body() body: { email: string; movieId: Number }) {
    return this.actionService.addToWatchList(body.email, body.movieId);
  }

  @Delete('watch-list')
  async removeFromWatchList(@Query('email') email: string, @Query('movieId') movieId: Number) {
    console.log(email, movieId);
    return this.actionService.removeFromWatchList(email, movieId);
  }

  @Get('favorite-list')
  async getFavoriteList(@Query('email') email: string) {
    return this.actionService.getFavoriteList(email);
  }

  @Post('favorite-list')
  async addToFavoriteList(@Body() body: { email: string; movieId: Number }) {
    return this.actionService.addToFavoriteList(body.email, body.movieId);
  }

  @Delete('favorite-list')
  async removeFromFavoriteList(@Query('email') email: string, @Query('movieId') movieId: Number) {
    return this.actionService.removeFromFavoriteList(email, movieId);
  }

  @Get('rating')
  async getRatings(@Query('email') email: string) {
    return this.actionService.getRatings(email);
  }

  @Post('rating')
  async addRating(
    @Body() body: { email: string; movieId: Number; rating: number; reviews: string },
  ) {
    return this.actionService.addRating(
      body.email,
      body.movieId,
      body.rating,
      body.reviews,
    );
  }

  @Put('rating')
  async updateRating(
    @Body() body: { email: string; movieId: Number; rating: number; reviews: string },
  ) {
    return this.actionService.updateRating(
      body.email,
      body.movieId,
      body.rating,
      body.reviews,
    );
  }

  @Delete('rating')
  async removeRating(@Query('email') email: string, @Query('movieId') movieId: Number) {
    return this.actionService.removeRating(email, movieId);
  }
}
