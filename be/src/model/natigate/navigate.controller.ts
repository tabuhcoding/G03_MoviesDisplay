import { Body, Controller, Get, Post, UseGuards, Res, Req, Query, Param } from '@nestjs/common';
import { NavigateService } from './navigate.service';

@Controller('')
export class NavigateController {
  constructor(private readonly navigateService: NavigateService) {}

  @Get('retrieve')
  async retrieve(@Query('query') query: string
  , @Query('searchBy') searchBy: string,
  @Query('amount') amount: number,
) {
    return await this.navigateService.retrieveMovies(searchBy, query, amount);
  }

  @Get('navigate')
  async navigate(@Query('query') query: string) {
    return await this.navigateService.navigate(query);
  }
}