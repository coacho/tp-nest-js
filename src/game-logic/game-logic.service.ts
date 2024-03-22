import { Injectable } from '@nestjs/common';
import { Tetrimino } from './models/tetrimino';
import { GameBoard } from './models/game-board';

@Injectable()
export class GameLogicService {

    private readonly width: number = 10;
    private readonly height: number = 20;
    private readonly emptyCellValue: string = '';

    private gameBoard: GameBoard;
    private currentTetrimino: Tetrimino;// | null = null;
    private currentTetriminoPosition: { x: number, y: number } = { x: 0, y: 0 }; 

    constructor() {        
        this.gameBoard = new GameBoard(this.width, this.height, this.emptyCellValue);
    }
    
// Public methods - START //
    
    public startGame(): void {
        this.spawnTetrimino();
    }
    
    public getGameBoard(): GameBoard {
        return this.gameBoard;
    }

    public invalidMove(): void {
        return null;
    }

    public dropTetrimino(): void {
        while (!this.checkCollision()) {
            this.moveTetriminoDown();
        }
    }

    public rotateTetriminoClockwise(): void {
        this.rotateMatrixClockwise(this.currentTetrimino.shape);
    }

    public moveTetriminoLeft(): void {
        console.log('moveTetriminoLeft');
        console.log(this.currentTetriminoPosition.x);
        if (!this.checkCollision()) {
            this.currentTetriminoPosition.x--;
        }
    }

    public moveTetriminoRight(): void {
      if (!this.checkCollision()) {  
            console.log('moveTetriminoRight');
           console.log(this.currentTetriminoPosition.x);
            this.currentTetriminoPosition.x++;
        }
    }


// Private methods - END //
    
// Private methods - START //

    private spawnTetrimino(): void {
        this.currentTetrimino = this.generateRandomTetrimino();
        const startX = Math.floor(this.width / 2) - Math.floor(this.currentTetrimino.shape[0].length / 2);
        const startY = 0;
        this.updateTetrimino();
    }
    private generateRandomTetrimino(): Tetrimino {
        const randomIndex = Math.floor(Math.random() * Tetrimino.length);
        this.currentTetrimino = Tetrimino[randomIndex];
        console.log(this.currentTetrimino);
        return  this.currentTetrimino;
    }

    private placeTetrimino(x: number, y: number): void {
        if (this.currentTetrimino) {
            for (let row = 0; row < this.currentTetrimino.shape.length; row++) {
                for (let col = 0; col < this.currentTetrimino.shape[row].length; col++) {
                    const cellValue = this.currentTetrimino.shape[row][col].toString();
                    if (cellValue  !== this.emptyCellValue) {
                        const boardX = x + col;
                        const boardY = y + row;
                        this.gameBoard.setValue(boardX, boardY, cellValue);
                    }
                }
            }
        }
    }
    
    private checkCollision(): boolean {
        if (!this.currentTetrimino) {
            return false;
        }
        for (let row = 0; row < this.currentTetrimino.shape.length; row++) {
            for (let col = 0; col < this.currentTetrimino.shape[row].length; col++) {
                if (this.currentTetrimino.shape[row][col].toString() !== this.emptyCellValue.toString()) {
                    const boardX = this.currentTetriminoPosition.x + col;
                    const boardY = this.currentTetriminoPosition.y + row;
                    if (boardX < 0 || boardX >= this.width || boardY >= this.height) {
                        console.log('collision1');
                        return true; 
                    }
                    if (this.gameBoard.getValue(boardX, boardY) !== this.emptyCellValue.toString()) {
                        console.log('collision2');
                        return true; 
                    }
                }
            }
        }
        console.log('no collision');
        return false;
    }
    
    private checkCompleteLines(): number {
        let completeLines = 0;

        for (let row = 0; row < this.height; row++) {
            if (this.isLineComplete(row)) {
                this.clearLine(row);
                completeLines++;
            }
        }

        return completeLines;
    }



    private moveTetriminoDown(): void {
        console.log('moveTetriminoDown');
        console.log(this.currentTetriminoPosition.x);
        if (!this.checkCollision()) {
            this.currentTetriminoPosition.y++;
        }
    }
    


    private rotateMatrixClockwise(matrix: number[][]): void {
        const rotatedMatrix: number[][] = [];
        const rowCount = matrix.length;
        const colCount = matrix[0].length;

        for (let col = 0; col < colCount; col++) {
            const newRow: number[] = [];
            for (let row = rowCount - 1; row >= 0; row--) {
                newRow.push(matrix[row][col]);
            } 
            rotatedMatrix.push(newRow);
        }
        this.currentTetrimino.shape =  rotatedMatrix;
        this.updateTetrimino(); 
    } 

    private updateTetrimino(): void {
        for (let row = 0; row < this.currentTetrimino.shape.length; row++) {
            for (let col = 0; col < this.currentTetrimino.shape[row].length; col++) {
                if (this.currentTetrimino.shape[row][col].toString() !== this.emptyCellValue) {
                    const boardX = this.currentTetriminoPosition.x + col;
                    const boardY = this.currentTetriminoPosition.y + row;
                    this.gameBoard.setValue(boardX, boardY, this.emptyCellValue);
                }
            }
        }
    
        // Place the Tetrimino in its new position
        this.placeTetrimino(this.currentTetriminoPosition.x, this.currentTetriminoPosition.y);
    }

    private isLineComplete(row: number): boolean {
        for (let col = 0; col < this.width; col++) {
            if (this.gameBoard.getValue(col, row) === this.emptyCellValue) {
                return false; 
            }
        }
        return true; 
    }

    private clearLine(row: number): void {
        for (let y = row; y > 0; y--) {
            for (let x = 0; x < this.width; x++) {
                const valueAbove = this.gameBoard.getValue(x, y - 1);
                this.gameBoard.setValue(x, y, valueAbove);
            }
        }
        for (let x = 0; x < this.width; x++) {
            this.gameBoard.setValue(x, 0, this.emptyCellValue);
        }
    }


// Private methods - END //

}
