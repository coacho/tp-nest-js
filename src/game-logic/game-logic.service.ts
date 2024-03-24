import { Injectable } from '@nestjs/common';
import { Tetrimino } from './models/tetrimino';
import { GameBoard } from './models/game-board';

@Injectable()
export class GameLogicService {

    private readonly width: number = 10;
    private readonly height: number = 20;
    private readonly emptyCellValue: string = '0';

    private gameBoard: GameBoard;
    private gameScore = 0;
    private currentTetrimino: Tetrimino;// | null = null;
    private currentTetriminoPosition: { x: number, y: number } = { x: 0, y: 0 };

    constructor() {
        this.gameBoard = new GameBoard(this.width, this.height, this.emptyCellValue);
    }

// Public methods - START //

    public startGame(): void {
        this.spawnTetrimino();
    }

    public resetGameBoard(): void {
        this.gameScore = 0;
        this.currentTetriminoPosition.x = 0;
        this.currentTetriminoPosition.y = 0;
    }

    public getGameBoard(): GameBoard {
        return this.gameBoard;
    }

    public getScore(): number {
        return this.gameScore;
    }

    public invalidMove(): void {
        return null;
    }

    public dropTetrimino(): void {
        // while (!this.checkCollision()) {
            this.moveTetriminoDown();
        // }
    }

    public rotateTetriminoClockwise(): void {
        const originalShape = this.currentTetrimino.shape.map(row => [...row]);
        this.rotateMatrixClockwise(this.currentTetrimino.shape);
        if (this.checkCollision()) {
            this.currentTetrimino.shape = originalShape;
        } else {
            this.placeTetrimino(this.currentTetriminoPosition.x, this.currentTetriminoPosition.y);
        }
    }
    public moveTetriminoLeft(): void {
        this.moveMatrixLeft();
        if (this.checkCollision()) {
            this.moveMatrixRight();
        }
    }

    public moveTetriminoRight(): void {
        this.moveMatrixRight();
        if (this.checkCollision()) {
            this.moveMatrixLeft();
        }
    }

// Public methods - END //

// Private methods - START //

    private spawnTetrimino(): void {
        this.generateRandomTetrimino();
        const startX = Math.floor(this.width / 2) - Math.floor(this.currentTetrimino.shape[0].length / 2);
        const startY = 0;
        this.placeTetrimino(this.currentTetriminoPosition.x, this.currentTetriminoPosition.y);
    }

    private generateRandomTetrimino(): void {
        const randomIndex = Math.floor(Math.random() * Tetrimino.length);
        this.currentTetrimino = Tetrimino[randomIndex];
        console.log( this.currentTetrimino.shape + ' ' + this.currentTetrimino.color);
    }

    private clearBoard(): void {
        for (let row = 0; row < this.height; row++) {
            for (let col = 0; col < this.width; col++) {
                this.gameBoard.setValue(col, row, this.emptyCellValue);
            }
        }
    }

    private placeTetrimino(x: number, y: number): void {
        
        this.clearBoard(); // clear the board before placing the tetrimino

        if (this.currentTetrimino) {
            for (let row = 0; row < this.currentTetrimino.shape.length; row++) {
                for (let col = 0; col < this.currentTetrimino.shape[row].length; col++) {
                    const cellValue = this.currentTetrimino.shape[row][col].toString();
                    if (cellValue !== this.emptyCellValue) {
                        const newBoardX = x + col;
                        const newBoardY = y + row;
                        if (newBoardX >= 0 && newBoardX < this.width && newBoardY >= 0 && newBoardY < this.height) {
                            this.gameBoard.setValue(newBoardX, newBoardY, cellValue);
                        }
                    }
                }
            }
            this.currentTetriminoPosition.x = x;
            this.currentTetriminoPosition.y = y;
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
                        // console.log('boardX'+boardX);
                        // console.log('this.width'+this.width);
                        // console.log('boardY'+boardY);
                        // console.log('this.height'+this.height);
                        // console.log('collision1');
                        return true;
                    }
                    // let test = this.gameBoard.getValue(boardX, boardY);
                    // console.log('test '+test);
                    // if (this.gameBoard.getValue(boardX, boardY) !== this.emptyCellValue){
                    //     console.log('this.gameBoard.getValue(boardX, boardY) '+this.gameBoard.getValue(boardX, boardY));
                    //     console.log('this.emptyCellValue) '+ this.emptyCellValue);
                    //     console.log('collision2');
                    //     return true;
                    // }
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
        if (!this.checkCollision()) {
            this.currentTetriminoPosition.y++;
            this.placeTetrimino(this.currentTetriminoPosition.x, this.currentTetriminoPosition.y);
        }
    }

    private moveMatrixLeft(): void {
        this.currentTetriminoPosition.x--;
        if (this.checkCollision()) {
            this.currentTetriminoPosition.x++;
        }
        this.placeTetrimino(this.currentTetriminoPosition.x, this.currentTetriminoPosition.y);
    }

    private moveMatrixRight(): void {
        this.currentTetriminoPosition.x++;
        if (this.checkCollision()) {
            this.currentTetriminoPosition.x--;
        }
        this.placeTetrimino(this.currentTetriminoPosition.x, this.currentTetriminoPosition.y);
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
            // console.log('newRow '+newRow);
            rotatedMatrix.push(newRow);
            // console.log('rotatedMatrix '+rotatedMatrix);
        }
        this.currentTetrimino.shape =  rotatedMatrix;
    }

    private isLineComplete(row: number): boolean {
        for (let col = 0; col < this.width; col++) {
            if (this.gameBoard.getValue(col, row) === this.emptyCellValue) {
                return false;
            }
        }
        this.updateScore();
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

    private updateScore(): void {
        this.gameScore += 100;
    }


// Private methods - END //

}
