export default class Tile {
    #x;
    #y;
    #value;

    constructor(x, y, value){
        this.#x = x;
        this.#y = y;
        this.#value = value;
    }

    get x(){
        return this.#x;
    }

    set x(newX){
        this.#x = newX;
    }

    get y(){
        return this.#y;
    }

    set y(newY){
        this.#y = newY;
    }

    get value(){
        return this.#value;
    }

    set value(newValue){
        this.#value = newValue;
    }
}