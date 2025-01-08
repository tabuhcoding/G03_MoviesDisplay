import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { ActionService } from './action.service';

@Controller()
export class ActionController {
  constructor(private readonly actionService: ActionService) {}

  @Get('watch-list')
  getWatchList() {
    return this.actionService.getWatchList();
  }

  @Post('watch-list')
  addToWatchList(@Body() body: { userId: string; movieId: string }) {
    return this.actionService.addToWatchList(body.userId, body.movieId);
  }

  @Delete('watch-list/:id')
  removeFromWatchList(@Param('id') id: string) {
    return this.actionService.removeFromWatchList(id);
  }

  @Get('favorite-list')
  getFavoriteList() {
    return this.actionService.getFavoriteList();
  }

  @Post('favorite-list')
  addToFavoriteList(@Body() body: { userId: string; movieId: string }) {
    return this.actionService.addToFavoriteList(body.userId, body.movieId);
  }

  @Delete('favorite-list/:id')
  removeFromFavoriteList(@Param('id') id: string) {
    return this.actionService.removeFromFavoriteList(id);
  }

  @Get('rating')
  getRatings() {
    return this.actionService.getRatings();
  }

  @Post('rating')
  addRating(@Body() body: { userId: string; movieId: string; rating: number }) {
    return this.actionService.addRating(body.userId, body.movieId, body.rating);
  }

  @Delete('rating/:id')
  removeRating(@Param('id') id: string) {
    return this.actionService.removeRating(id);
  }
}
