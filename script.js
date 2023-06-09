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
    
}

function main(){
    initializeBoard();
    printBoard();
}

main();