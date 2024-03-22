import { Module } from '@nestjs/common';
import { ControllerService } from './controller.service';
import { ControllerController } from './controller.controller';
import { GameLogicModule } from '../game-logic/game.module';

@Module({
  imports: [GameLogicModule],
  providers: [ControllerService], 
  controllers: [ControllerController],
})

export class ControllerModule {}
