import { Body, Controller, Get, Post } from '@nestjs/common';
import { ControllerService } from './controller.service';

@Controller('api')
export class ControllerController {
    constructor(private readonly controllerService: ControllerService) {}

    @Post('game-board')
    getGameBoard(): any {
        // console.log('getGameBoard');
        return this.controllerService.getGameBoard();
    }

    @Post('/game-board-data')
    getGameBoardData() {
        console.log('getGameBoardData');
        const gameData = this.controllerService.startGame();
        return { gameData };
    }
    
    @Post('move')
    moveTetrimino(@Body() direction: { direction: string }): void {
        this.controllerService.moveTetrimino(direction.direction);
    }
}
