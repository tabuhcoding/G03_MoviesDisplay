
// src/people/people.service.ts
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PeopleRepository } from './people.repository';

@Injectable()
export class PeopleService {
  constructor(private readonly peopleRepository: PeopleRepository) {}

  async getPeople(ids: number[]) {
    return this.peopleRepository.fetchPeopleByIds(ids);
  }
  async getTrendingPeople(timeWindow: 'day' | 'week') {
    return this.peopleRepository.fetchTrendingPeople(timeWindow);
  }

  async getPersonDetails(personId: number) {
    return this.peopleRepository.fetchPersonDetails(personId);
  }

  async searchPeople(query: string, page: number): Promise<any> {
    if (!query) {
      throw new HttpException('Query parameter is missing', HttpStatus.BAD_REQUEST);
    }
    return this.peopleRepository.searchPeople(query, page);
  }

  async getPopularPeople(page: number) {
    return this.peopleRepository.fetchPopularPeople(page);
  }
}
