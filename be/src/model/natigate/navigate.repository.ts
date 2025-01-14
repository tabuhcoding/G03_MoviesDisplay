import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios from 'axios';
import { Model } from 'mongoose';
import { In } from 'typeorm';

@Injectable()
export class NavigateRepository {
  constructor(
    @InjectModel('scrap_movie_genres', 'otherNoSQL') private movieGenresModel: Model<any>,
    @InjectModel('movies', 'moviesNoSQL') private moviesNoSQLModel: Model<any>,
    @InjectModel('scrap_people', 'otherNoSQL') private peopleModel: Model<any>,
  ) {}
  async getGenresName(ids:string[]){
    const genres = await this.movieGenresModel.find({_id: { $in: ids }});
    return genres.map(genre => genre.name);
  }
  async convertIdToTmdbId(ids: string[]){
    const movies = await this.moviesNoSQLModel.find({_id: { $in: ids }});
    return movies.map(movie => movie.tmdb_id);
  }
  async convertIdToTmdbIdPeople(ids: string[]){
    const people = await this.peopleModel.find({_id: { $in: ids }});
    return people.map(person => person.tmdb_id);
  }
}