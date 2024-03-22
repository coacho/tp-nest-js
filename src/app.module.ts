import { Module } from '@nestjs/common';
import { GameLogicModule } from './game-logic/game.module';
import { ControllerModule } from './controller/controller.module';

@Module({
  imports: [GameLogicModule, ControllerModule],
})
export class AppModule {}
