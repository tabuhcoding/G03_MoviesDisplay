import { Module } from '@nestjs/common';
import { ActionController } from './action.controller';
import { ActionService } from './action.service';
import { ActionRepository } from './action.repository';

@Module({
  controllers: [ActionController],
  providers: [ActionService, ActionRepository],
})
export class ActionModule {}
