import { Module } from '@nestjs/common';
import { ActionController } from './action.controller';
import { ActionService } from './action.service';
import { ActionRepository } from './action.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { WatchlistSchema } from './schema/watchlist.schema';
import { FavoriteListSchema } from './schema/favorite-list.schema';
import { RatingSchema } from './schema/rating.schema';
import { MoviesSchema } from './schema/movies.schema';
import { UserSchema } from '../schema/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        { name: 'Watchlist', schema: WatchlistSchema },
        { name: 'FavoriteList', schema: FavoriteListSchema },
        { name: 'Rating', schema: RatingSchema },
        { name: 'Users', schema: UserSchema },
      ],
      'auth',
    ),
    MongooseModule.forFeature([{ name: 'Movies', schema: MoviesSchema }], 'moviesNoSQL'),
  ],
  controllers: [ActionController],
  providers: [ActionService, ActionRepository],
})
export class ActionModule {}
