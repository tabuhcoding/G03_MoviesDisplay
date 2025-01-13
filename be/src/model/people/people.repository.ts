// src/people/people.repository.ts
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios from 'axios';
import { Model } from 'mongoose';

@Injectable()
export class PeopleRepository {
  private readonly baseUrl: string = process.env.BASE_URL_TMDB;
  private readonly apiKey: string = process.env.API_KEY_TMDB;
  constructor(
    @InjectModel('scrap_people', 'otherNoSQL') private peopleNoSQLModel: Model<any>,
    @InjectModel('scrap_people_trending_day', 'otherNoSQL') private peopleTrendingDayModel: Model<any>,
    @InjectModel('scrap_people_trending_week', 'otherNoSQL') private peopleTrendingWeekModel: Model<any>,
    @InjectModel('scrap_people_popular', 'otherNoSQL') private peoplePopularModel: Model<any>,
  ) {}

  async fetchTrendingPeople(timeWindow: 'day' | 'week') {
    try {
      return timeWindow === 'day'
        ? this.peopleTrendingDayModel.find().limit(50).exec()
        : this.peopleTrendingWeekModel.find().limit(50).exec();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async fetchPersonDetails(personId: number) {
    try {
      return await this.peopleNoSQLModel.findOne({ tmdb_id: personId >> 0 }).exec();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async searchPeople(query: string, page: number) {
    try {
      console.log("Query:", query);
      const nomalQuery = query.toLowerCase();
  
      // Tìm kết quả khớp với truy vấn
      const results = await this.peopleNoSQLModel
        .find({
          $or: [
            { name: { $regex: nomalQuery, $options: "i" } },
            { also_known_as: { $regex: nomalQuery, $options: "i" } }, // Tìm trong mảng
          ],
        })
        .skip((page - 1) * 20) // Bỏ qua số bản ghi theo trang
        .limit(20) // Giới hạn số bản ghi
        .exec();
  
      // Đếm tổng số bản ghi khớp với truy vấn
      const totalRecords = await this.peopleNoSQLModel.countDocuments({
        $or: [
          { name: { $regex: nomalQuery, $options: "i" } },
          { also_known_as: { $regex: nomalQuery, $options: "i" } }, // Tìm trong mảng
        ],
      });
  
      // Tính tổng số trang
      const totalPages = Math.ceil(totalRecords / 20);
  
      return { results, totalPages };
    } catch (error) {
      this.handleApiError(error, "Failed to fetch people search results");
      throw error;
    }
  }
  

  async fetchPopularPeople(page: number = 1) {
    try {
      const limit = 500;
      const skip = (page - 1) * limit;

      const total_count = await this.peoplePopularModel.countDocuments();
      const total_page = Math.ceil(total_count / limit);

      const data = await this.peoplePopularModel.find({}).skip(skip >> 0).limit(limit >> 0).exec();

      return {
        total_page,
        total_count,
        results: data,
      };
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
