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

// Function to get the user's next move, and execute it
function getMove(){
    rl.question("Enter your next move(up, down, left, right): ", (answer) => {
        switch(answer){
            case 'left':
                console.log("moving left");
                moveLeft();
                break;
            case 'right':
                console.log("moving right");
                break;
            case 'up':
                console.log("moving up");
                break;
            case 'down':
                console.log("moving down");
                break;
        }
        generateRandomTile();
        printBoard();
        getMove();
    })
}

// Function to move all the tiles to the left
function moveLeft(){
    for(let rowIndex = 0; rowIndex < BOARD_SIZE; rowIndex++){
        let row = board[rowIndex];
        // Temporary array to store merged indexes on each row
        let mergeList = [];
        for(let i = 1; i < row.length; i++){
            // Skip empty cells, no tiles to move
            if(row[i] === 0){
                continue;
            }
            // Temporary variable to store the index the tile will move to
            let moveToIndex = null;
            for(let j = i - 1; j >= 0; j--){
                // Current tile can move when the cell is empty, or if an unmerged tile has equal value to the current tile
                if(row[j] === 0 || (row[j] === row[i] && !mergeList.includes(j))){
                    moveToIndex = j;
                } else {
                    break;
                }
            }
            if(moveToIndex !== null){
                if(row[moveToIndex] === 0){
                    // Moving tile to empty cell
                    row[moveToIndex] = row[i];
                    row[i] = 0;
                } else {
                    // Merging the tiles
                    row[moveToIndex] = row[i] * 2;
                    row[i] = 0;
                    mergeList.push(moveToIndex);
                }
                
            }
        }
    }
}

function main(){
    initializeBoard();
    generateRandomTile();
    generateRandomTile();
    printBoard();
    getMove();
}

main();