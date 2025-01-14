// src/people/people.controller.ts
import { Body, Controller, Get, Query, Param } from '@nestjs/common';
import { PeopleService } from './people.service';

@Controller('people')
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) {}

  @Get('list')
  async getPeople(@Query('ids') ids: number[] ) {
    return await this.peopleService.getPeople(ids);
  }
  
  @Get('trending')
  async getTrendingPeople(@Query('timeWindow') timeWindow: 'day' | 'week') {
    return await this.peopleService.getTrendingPeople(timeWindow || 'day');
  }

  @Get('popular')
  async getPopularPeople(@Query('page') page: number) {
    return await this.peopleService.getPopularPeople(page);
  }

  @Get('search')
  async searchPeople(@Query('query') query: string, @Query('page') page: number) {
    if (!query) {
      throw new Error('Query parameter is missing');
    }
    try {
      return await this.peopleService.searchPeople(query, page);
    } catch (error) {
      console.error('Controller caught error:', error.message);
      throw error;
    }
  }

  @Get(':id')
  async getPersonDetails(@Param('id') personId: number) {
    return await this.peopleService.getPersonDetails(personId);
  }
}
