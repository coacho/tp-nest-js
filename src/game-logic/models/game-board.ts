export class GameBoard {

    private readonly width: number;
    private readonly height: number;
    private readonly emptyCellValue: string;
    private readonly board: string[][];

    constructor(width: number, height: number, emptyCellValue: string) {
        this.width = width;
        this.height = height;
        this.emptyCellValue = emptyCellValue;
        this.board = this.createEmptyBoard();
    }

// Public methods - START //
    
    public getBoard(): string[][] {
        return this.board;
    }

    public setValue(row: number, col: number, value: string): void {
        this.board[row][col] = value;
    }
    

    public getValue(row: number, col: number): string {
        return this.board[row][col].valueOf();
    }

// Public methods - END //


// Private methods - START //

    private createEmptyBoard(): string[][] {
        return Array.from({ length: this.height }, () =>
            Array(this.width).fill(this.emptyCellValue)
        );
    }

// Private methods - END //

    
}
     