import Cell from "./Cell.mjs"

export default class Board {
    // Define the game board as an empty array
    #grid = [];
    #boardSize;

    // Initialize #grid to multidimensional array to represent board
    constructor(size){
        this.#boardSize = size;
        for(let i = 0; i < this.#boardSize; i++){
            let row = [];
            for(let j = 0; j < this.#boardSize; j++){
                row.push(new Cell(j, i));
            }
            this.#grid.push(row);
        }
    }

    get grid(){
        return this.#grid;
    }

    // Print out the board
    printBoard(){
        this.#grid.forEach((row) => {
            let values = row.map((cell) => {
                return cell.tile === null ? 0 : cell.tile.value;
            });
            console.log(values.join(" "));
        })
    }

    // Helper function to reverse the board's rows
    reverse(){
        this.#grid.forEach((row) => {
            row.reverse();
        })
    }

    // Helper function to transpose the board
    transpose(){
        for(let i = 0; i < this.#boardSize; i++){
            for(let j = 0; j < i; j++){
                let temp = this.#grid[i][j];
                this.#grid[i][j] = this.#grid[j][i];
                this.#grid[j][i] = temp;
            }
        }
    }
}