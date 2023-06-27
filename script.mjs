import Board from "./Board.mjs";
import Tile from "./Tile.mjs";

// use constant because board size does not change during our program
const BOARD_SIZE = 4;

let board = new Board(document.getElementById("board"), BOARD_SIZE);

// Function to generate a random tile on our board
function generateRandomTile() {
    // Finding all of the empty cells in the board
    let emptyCells = [];
    for(let y = 0; y < BOARD_SIZE; y++){
        for(let x = 0; x < BOARD_SIZE; x++){
            if(board.grid[y][x].tile === null){
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
        let randomX = randomCellCoordinate.x;
        let randomY = randomCellCoordinate.y;
        // 90% chance for a 2, and 10% chance for a 4 for our new random tile
        board.grid[randomCellCoordinate.y][randomCellCoordinate.x].tile = new Tile(board.boardElement, randomX, randomY, Math.random() < 0.9 ? 2 : 4);
    }
    
}

// Function to set up an event listener for button presses
function setupInput(){
    document.addEventListener("keydown", handleInput, {once: true});
}

// Event handler function for setupInput
function handleInput(e){
    switch(e.key){
        case 'ArrowLeft':
            if(canMoveLeft()){
                moveLeft();
                generateRandomTile();
            }
            break;
        case 'ArrowRight':
            if(canMoveRight()){
                moveRight();
                generateRandomTile();
            }
            break;
        case 'ArrowUp':
            if(canMoveUp()){
                moveUp();
                generateRandomTile();
            }
            break;
        case 'ArrowDown':
            if(canMoveDown()){
                moveDown();
                generateRandomTile();
            }
            break;
    }
    if(hasWon()){
        console.log("You Won!");
        return;
    } else if(hasLost()){
        console.log("You Lost!");
        return;
    }
    setupInput();
}

// Function to move all the tiles to the left
function moveLeft(){
    for(let rowIndex = 0; rowIndex < BOARD_SIZE; rowIndex++){
        let row = board.grid[rowIndex];
        // Temporary array to store merged indexes on each row
        let mergeList = [];
        for(let i = 1; i < row.length; i++){
            // Skip empty cells, no tiles to move
            if(row[i].tile === null){
                continue;
            }
            // Temporary variable to store the index the tile will move to
            let moveToIndex = null;
            for(let j = i - 1; j >= 0; j--){
                // Current tile can move when the cell is empty, or if an unmerged tile has equal value to the current tile
                if(row[j].tile === null || (row[j].tile.value === row[i].tile.value && !mergeList.includes(j))){
                    moveToIndex = j;
                } else {
                    break;
                }
            }
            if(moveToIndex !== null){
                if(row[moveToIndex].tile === null){
                    // Moving tile to empty cell
                    row[moveToIndex].tile = row[i].tile;
                    row[i].tile = null;
                } else {
                    // Merging the tiles
                    row[moveToIndex].tile.value = row[i].tile.value * 2;
                    row[i].tile.remove();
                    row[i].tile = null;
                    mergeList.push(moveToIndex);
                }
                
            }
        }
    }
}

// Function to move all the tiles to the right
function moveRight(){
    // Moving right is equivalent to reversing the board, and moving left
    board.reverse();
    moveLeft();
    board.reverse();
}

// Function to move all the tiles up
function moveUp(){
    board.transpose();
    moveLeft();
    board.transpose();
}

// Function to move all the tiles down
function moveDown(){
    board.transpose();
    moveRight();
    board.transpose();
}

// Function to check if any tiles can move left
function canMoveLeft(){
    for(let rowIndex = 0; rowIndex < BOARD_SIZE; rowIndex++){
        let row = board.grid[rowIndex];
        // For each tile in the row, check if it can move one tile to the left
        for(let i = 1; i < row.length; i++){
            if(row[i].tile === null){
                continue;
            }
            if(row[i - 1].tile === null || row[i - 1].tile.value === row[i].tile.value){
                return true;
            }
        }
    }
    return false;
}

// Function to check if any tiles can move right
function canMoveRight(){
    board.reverse();
    let canMove = canMoveLeft();
    board.reverse();
    return canMove;
}

// Function to check if any tiles can move up
function canMoveUp(){
    board.transpose();
    let canMove = canMoveLeft();
    board.transpose();
    return canMove;
}

// Function to check if any tiles can move down
function canMoveDown(){
    board.transpose();
    let canMove = canMoveRight();
    board.transpose();
    return canMove;
}

// Function to check if we won the game
function hasWon(){
    for(let i = 0; i < BOARD_SIZE; i++){
        for(let j = 0; j < BOARD_SIZE; j++){
            if(board.grid[i][j].tile !== null && board.grid[i][j].tile.value === 2048){
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
    generateRandomTile();
    generateRandomTile();
    setupInput();
}

main();