import RagService from '@/infrastructure/AI/ragService';
import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { NavigateRepository } from './navigate.repository';
@Injectable()
export class NavigateService {
  private ragService: RagService;

  constructor(
    private readonly navigateRepository: NavigateRepository
  ) {
    const apiKey = process.env.GEMINI_API_KEY || 'your-llm-api-key';
    const token = process.env.MY_RAG_TOKEN || 'your-token';
    this.ragService = new RagService(apiKey, token);
    
  }

  async retrieveMovies(searchBy: string, query: string, amount = 10, threshold = 0.5) {
    try{
      const result = await this.ragService.retrieveMovies(searchBy, query, amount, threshold);
      if (!result.data) {
        throw new InternalServerErrorException('Failed to retrieve movies.');
      }
      if (searchBy === "people") {
        const convertIds = await this.navigateRepository.convertIdToTmdbIdPeople(result.data.result);
        return convertIds;
      }else
        {const convertIds = await this.navigateRepository.convertIdToTmdbId(result.data.result);
          return convertIds;

      }
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve movies.');
    }
  }

  async navigate(query: string) {
    try{
      const result = await this.ragService.navigate(query);
      const { route, params, metadata, is_success } = result.data;
      if (!is_success) {
        throw new BadRequestException('Failed to navigate.');
      }
      if (route === "GENRE_PAGE"){
        const genreIds = params.genre_ids;
        const genreNames = await this.navigateRepository.getGenresName(genreIds);
        const conjun = metadata.$or ? "or" : "and";
        const query = genreNames.join(` ${conjun} `) + " movies";
        const genresResult = await this.ragService.retrieveMovies("movies", query, 50, 0.5);
        const resultsIds = await this.navigateRepository.convertIdToTmdbId(genresResult.data.result);
        return { route: "MOVIE_PAGE", ids: resultsIds };
      }
      if (route === "SEARCH_PAGE"){
        const query = params.keyword;
        const searchBy = query.toLocaleLowerCase().includes("movies") ? "movies" : "people";
        const searchResult = await this.ragService.retrieveMovies(searchBy, query, 50, 0.5);
        const resultsIds = await this.navigateRepository.convertIdToTmdbId(searchResult.data.result);
        return { route: "MOVIE_PAGE", ids: resultsIds };
      }
      const resultsIds = await this.navigateRepository.convertIdToTmdbId(params.movie_ids);

      if (params)
        return { route, ids:resultsIds  };
      return {
        route,
        ids: [],
      }
    } catch (error) {
      throw new InternalServerErrorException('Failed to navigate.');
    }
  }
}