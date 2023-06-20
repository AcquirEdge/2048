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
                if(canMoveLeft()){
                    moveLeft();
                    generateRandomTile();
                }
                break;
            case 'right':
                if(canMoveRight()){
                    moveRight();
                    generateRandomTile();
                }
                break;
            case 'up':
                if(canMoveUp()){
                    moveUp();
                    generateRandomTile();
                }
                break;
            case 'down':
                if(canMoveDown()){
                    moveDown();
                    generateRandomTile();
                }
                break;
        }
        if(hasWon()){
            printBoard();
            console.log("You Won!");
            rl.close();
            return;
        } else if(hasLost()){
            printBoard();
            console.log("You Lost!");
            rl.close();
            return;
        }
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

// Function to move all the tiles to the right
function moveRight(){
    // Moving right is equivalent to reversing the board, and moving left
    reverseBoard();
    moveLeft();
    reverseBoard();
}

// Function to move all the tiles up
function moveUp(){
    transposeBoard();
    moveLeft();
    transposeBoard();
}

// Function to move all the tiles down
function moveDown(){
    transposeBoard();
    moveRight();
    transposeBoard();
}

// Helper function to reverse our board
function reverseBoard(){
    board.forEach((row) => {
        row.reverse();
    })
}

// Helper function to transpose our board
function transposeBoard(){
    for(let i = 0; i < BOARD_SIZE; i++){
        for(let j = 0; j < i; j++){
            // swap corresponding values
            let temp = board[i][j];
            board[i][j] = board[j][i];
            board[j][i] = temp;
        }
    }
}

// Function to check if any tiles can move left
function canMoveLeft(){
    for(let rowIndex = 0; rowIndex < BOARD_SIZE; rowIndex++){
        let row = board[rowIndex];
        // For each tile in the row, check if it can move one tile to the left
        for(let i = 1; i < row.length; i++){
            if(row[i] === 0){
                continue;
            }
            if(row[i - 1] === 0 || row[i - 1] === row[i]){
                return true;
            }
        }
    }
    return false;
}

// Function to check if any tiles can move right
function canMoveRight(){
    reverseBoard();
    let canMove = canMoveLeft();
    reverseBoard();
    return canMove;
}

// Function to check if any tiles can move up
function canMoveUp(){
    transposeBoard();
    let canMove = canMoveLeft();
    transposeBoard();
    return canMove;
}

// Function to check if any tiles can move down
function canMoveDown(){
    transposeBoard();
    let canMove = canMoveRight();
    transposeBoard();
    return canMove;
}

// Function to check if we won the game
function hasWon(){
    for(let i = 0; i < BOARD_SIZE; i++){
        for(let j = 0; j < BOARD_SIZE; j++){
            if(board[i][j] === 2048){
                return true;
            }
        }
    }
    return false;
}

// Function to check if we lost the game
function hasLost(){
    if(!canMoveLeft() && !canMoveRight() && !canMoveUp() && !canMoveDown()){
        return true;
    }
    return false;
}

function main(){
    initializeBoard();
    generateRandomTile();
    generateRandomTile();
    printBoard();
    getMove();
}

main();