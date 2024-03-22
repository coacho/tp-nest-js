import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { GameLogicService } from '../game-logic/game-logic.service';

@Injectable()
export class GameMiddleware implements NestMiddleware {
    constructor(private readonly gameLogicService: GameLogicService) {}

    use(req: Request, res: Response, next: Function) {
        const gameBoard = this.gameLogicService.getGameBoard();
        res.locals.gameBoard = gameBoard; 
        next();
    }
}
