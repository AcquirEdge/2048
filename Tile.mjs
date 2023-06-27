export default class Tile {
    #x;
    #y;
    #value;
    #tileElement;

    constructor(boardElement, x, y, value){
        this.#x = x;
        this.#y = y;
        this.#value = value;
        this.#tileElement = document.createElement("div");
        this.#tileElement.classList.add("tile");
        this.#tileElement.innerText = value;
        this.#tileElement.style.setProperty("--y", y);
        this.#tileElement.style.setProperty("--x", x);
        boardElement.append(this.#tileElement);
    }

    get x(){
        return this.#x;
    }

    set x(newX){
        this.#x = newX;
        this.#tileElement.style.setProperty("--x", newX);
    }

    get y(){
        return this.#y;
    }

    set y(newY){
        this.#y = newY;
        this.#tileElement.style.setProperty("--y", newY);
    }

    get value(){
        return this.#value;
    }

    set value(newValue){
        this.#value = newValue;
        this.#tileElement.innerText = newValue;
    }

    remove(){
        this.#tileElement.remove();
    }
}