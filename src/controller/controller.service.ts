import { Injectable } from '@nestjs/common';
import { GameLogicService } from '../game-logic/game-logic.service';

@Injectable()
export class ControllerService {
    constructor(private readonly gameLogicService: GameLogicService) {}

    public startGame(): void {
        this.gameLogicService.startGame();
    }
 
    public moveTetrimino(direction: string): void {
        switch (direction) {
            case 'ArrowLeft':
                this.gameLogicService.moveTetriminoLeft();
                break;
            case 'ArrowRight':
                this.gameLogicService.moveTetriminoRight();
                break;
            case 'ArrowUp':
                this.gameLogicService.rotateTetriminoClockwise();
                break;
            case 'ArrowDown':
                this.gameLogicService.dropTetrimino();
                break;
            default:
                // this.gameLogicService.invalidMove();
                throw new Error(`Invalid direction: ${direction}`);
        }
        // this.getGameBoard();
        // this.gameLogicService.dropTetrimino();
    }

    // public rotateClockwise(): void {
    //     this.gameLogicService.rotateTetriminoClockwise();
    // }

    // public drop(): void {
    //     this.gameLogicService.dropTetrimino();
    // }

    public getGameBoard(): string[][] {
        return this.gameLogicService.getGameBoard().getBoard();
    }
}
