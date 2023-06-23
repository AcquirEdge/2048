export default class Cell {
    #x;
    #y;
    // Set initial value to null because otherwise it will be undefined
    #tile = null;

    constructor(x, y){
        this.#x = x;
        this.#y = y;
    }

    // Only need getters, since cells do not move
    get x(){
        return this.#x;
    }

    get y(){
        return this.#y;
    }

    get tile(){
        return this.#tile;
    }

    // Make sure cell and tile coordiantes are always in sync
    set tile(newTile){
        this.#tile = newTile;
        if(newTile !== null){
            this.#tile.x = this.#x;
            this.#tile.y = this.#y;
        }
    }
}