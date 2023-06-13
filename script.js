const readline = require("readline");
let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

// use constant because board size does not change during our program
const BOARD_SIZE = 4;

let board = [];

// Initialize board to a multidimenional array with nested arrays representing rows
function initializeBoard(){
    for(let i = 0; i < BOARD_SIZE; i++){
        let row = [];
        for(let j = 0; j < BOARD_SIZE; j++){
            row.push(0);
        }
        board.push(row)
    }
}

// Custom printBoard function to increase readability of our board
function printBoard() {
    board.forEach((row) => {
        console.log(row.join(" "))
    })
}

// Function to generate a random tile on our board
function generateRandomTile() {
    // Finding all of the empty cells in the board
    let emptyCells = [];
    for(let y = 0; y < BOARD_SIZE; y++){
        for(let x = 0; x < BOARD_SIZE; x++){
            if(board[y][x] === 0){
                let coordinate = {
                    x: x,
                    y: y
                };
                emptyCells.push(coordinate);
            }
        }
    }
    // Only choose a random cell if there are empty cells
    if(emptyCells.length > 0){
        let randomCellIndex = Math.floor(Math.random() * emptyCells.length)
        let randomCellCoordinate = emptyCells[randomCellIndex];
        // 90% chance for a 2, and 10% chance for a 4 for our new random tile
        board[randomCellCoordinate.y][randomCellCoordinate.x] = Math.random() < 0.9 ? 2 : 4;
    }
    
}



function main(){
    initializeBoard();
    generateRandomTile();
    generateRandomTile();
    printBoard();
}

main();