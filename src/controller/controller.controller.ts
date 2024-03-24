import { Body, Controller, Get, Post } from '@nestjs/common';
import { ControllerService } from './controller.service';

@Controller('api')
export class ControllerController {
    constructor(private readonly controllerService: ControllerService) {}

    @Post('/game-board-data') 
    getGameBoardData(@Body() body: { index: number } ) : any{        
        
        if(body.index === 0){ //check if newGame = true then reset the game board
            body.index = 1;
            this.controllerService.resetGameBoard();
        }
        
        this.controllerService.startGame();
        return this.controllerService.getGameBoard();
    }
     
    @Post('update-score')
    getScore(): any {
        console.log('getScore');
        return this.controllerService.getScore();
    }
    
    @Post('move')
    moveTetrimino(@Body() direction: { direction: string }): void {
        this.controllerService.moveTetrimino(direction.direction);
    }
}
