import { Module } from '@nestjs/common';
import { ActionController } from './action.controller';
import { ActionService } from './action.service';
import { ActionRepository } from './action.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { WatchlistSchema } from './schema/watchlist.schema';
import { FavoriteListSchema } from './schema/favorite-list.schema';
import { RatingSchema } from './schema/rating.schema';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        { name: 'Watchlist', schema: WatchlistSchema },
        { name: 'FavoriteList', schema: FavoriteListSchema },
        { name: 'Rating', schema: RatingSchema },
      ],
      'auth',
    ),
    MongooseModule.forFeature([{ name: 'Movies', schema: {} }], 'moviesNoSQL'),
  ],
  controllers: [ActionController],
  providers: [ActionService, ActionRepository],
})
export class ActionModule {}
