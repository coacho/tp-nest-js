import { Body, Controller, Get, Post } from '@nestjs/common';
import { ControllerService } from './controller.service';

@Controller('api')
export class ControllerController {
    constructor(private readonly controllerService: ControllerService) {}

    @Post('game-board')
    getGameBoard(): any {
        console.log('getGameBoard');
        return this.controllerService.getGameBoard();;
    }

    @Post('/game-board-data') 
    getGameBoardData(@Body() body: { index: number } ) : any{        
        console.log('newGame - body index : before condition '+body.index);
        if(body.index === 0){ //newGame
            body.index = 1;
            console.log('newGame - body index : after condition '+body.index);
            this.controllerService.resetGameBoard();
        }
        console.log('getGameBoardData');
        return this.controllerService.startGame();
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
