
// ------------------- START PROGRAMA -------------------

class App{
    constructor(){
        this.game = new Game();
    }

    start(){
        do{
            this.game.init();
        }while(this.playAgain())    
        console.log("PROGRAMM END");    
    }

    playAgain(){
        let respuesta;
        let isAnswerdValid;
        do{
            respuesta = prompt('Quieres jugar otra partida: ');
            isAnswerdValid = respuesta === 'SI' || respuesta === 'NO';
            if (!isAnswerdValid){
                console.log("LA RESPUESTA NO ES VALIDA, SOLO SE ACEPTA SI O NO EN MAYUSCULAS");
            }
        }while(!isAnswerdValid)
    
        if (respuesta === 'SI'){
            return true;
        }
        return false; 
    }
}

class Game{
    constructor(){
        this.TOKENSTATE = ['X', 'Y'];
        this.NPLAYERS = 2;
    
        this.player = 0;
        this.mov_restantes = 9;
        this.tablero;// = new Tablero(3, 3);
        this.win;    
    }

    init(){
        this.tablero = new Tablero(3, 3);
        this.tablero.print();
        
        do {
            this.tirada();
            if (!this.win) {
                this.player = (this.player + 1) % this.NPLAYERS;
                this.mov_restantes -= 1;
            }
        }while(!this.gameEnd())
        this.printMessageEndGame();
    }

    gameEnd(){
        if(this.win){
            return true;
        }else if(this.mov_restantes <= 0){
            return true;
        }
        return false;
    }

    tirada() {
        let { file, column } = this.getFileColumn();
    
        this.tablero.update(file, column, this.TOKENSTATE[this.player]);
        this.tablero.print();
    
        this.win = this.playerWin();
        console.log("TIRADA END")
    }

    playerWin(){
        if(this.tablero.getPosition(0, 0) ==  this.TOKENSTATE[this.player] && this.tablero.getPosition(0,1) == this.TOKENSTATE[this.player] && this.tablero.getPosition(0,2) == this.TOKENSTATE[this.player] ||
            this.tablero.getPosition(1, 0) == this.TOKENSTATE[this.player] && this.tablero.getPosition(1,1) == this.TOKENSTATE[this.player] && this.tablero.getPosition(1,2) == this.TOKENSTATE[this.player] ||
            this.tablero.getPosition(2, 0) == this.TOKENSTATE[this.player] && this.tablero.getPosition(2,1) == this.TOKENSTATE[this.player] && this.tablero.getPosition(2,2) == this.TOKENSTATE[this.player] ||
            this.tablero.getPosition(0, 0) == this.TOKENSTATE[this.player] && this.tablero.getPosition(1,0) == this.TOKENSTATE[this.player] && this.tablero.getPosition(2,0) == this.TOKENSTATE[this.player] ||
            this.tablero.getPosition(0, 1) == this.TOKENSTATE[this.player] && this.tablero.getPosition(1,1) == this.TOKENSTATE[this.player] && this.tablero.getPosition(2,1) == this.TOKENSTATE[this.player] ||
            this.tablero.getPosition(0, 2) == this.TOKENSTATE[this.player] && this.tablero.getPosition(1,2) == this.TOKENSTATE[this.player] && this.tablero.getPosition(2,2) == this.TOKENSTATE[this.player] ||
            this.tablero.getPosition(0, 0) == this.TOKENSTATE[this.player] && this.tablero.getPosition(1,1) == this.TOKENSTATE[this.player] && this.tablero.getPosition(2,2) == this.TOKENSTATE[this.player] ||
            this.tablero.getPosition(2, 0) == this.TOKENSTATE[this.player] && this.tablero.getPosition(1,1) == this.TOKENSTATE[this.player] && this.tablero.getPosition(0,2) == this.TOKENSTATE[this.player]){
            return true;
            }
        return false;
    }

    getFileColumn() {
        let file, column;
        do {
            file = this.getPosition("FILE");
            column = this.getPosition("COLUMN");
        } while (!this.tablero.isPosititionValid(file, column));
        console.log("SE HA ELEGIDO LA FILA: " + file);
        console.log("SE HA ELEGIDO LA COLUMNA: " + column);
        return { file, column };
    }

    getPosition(fileOColumn){
        let fileColumn = parseInt(prompt("Agrega una posicion valida del tablero " + fileOColumn + " 1-2-3"));
        const OFFSET = 1;
        console.log(fileColumn);
        return fileColumn - OFFSET;
    }

    printMessageEndGame(){
        const players = ["PLAYER 1", "PLAYER 2"];
        if (this.win){
            console.log("ENORABUENA EL JUGADOR: " + players[this.player] + " HA GANADO");
        }else{
            console.log("NO HAY MAS MOVIMIENTOS POSIBLE, EMPATE");
        }
    }
}

class Tablero{
    constructor(files, columns){
        this.files = files;
        this.columns = columns;
        this.tablero = this.inicializeTablero(this.files, this.columns);
    }

    inicializeTablero(files, columns){
        let tablero = new Array(files);
        for(let i = 0; i < files; i++){
            tablero[i] = new Array(columns);
        }
    
        for(let i = 0; i < files; i++){             
            for (let j = 0; j < columns; j++){
                tablero[i][j] = "0";
            }
        } 
        return tablero;
    }

    update(file, column, token){
        this.tablero[file][column] = token;
    }

    isPosititionValid(file, column){
        if (this.existPosition(file, column)){
            return this.isEmpy(file, column);            
        } 
        return false;
    }

    getPosition(file, column){
        return this.tablero[file][column];
    }

    existPosition(file, column){
        let validFile = false;
        let validColumn = false;
        if(0 <= file && file < (this.files + 1)){
            console.log("LA FILA ELEGIDA ES VALIDA");
            validFile = true; 
        }
        if(0 <= column && column < (this.columns + 1)){
            console.log("LA COLUMNA ELEGINA ES");
            validColumn = true;
        }

        if(validFile && validColumn){
            return true;
        } 
        console.log("LA POSICION NO ES VALIDA, NO ESTA DENTRO DEL TABLERO");
        return false;
    }

    isEmpy(file, column){
        if(this.tablero[file][column] === "0"){
            return true;
        }
        console.log("LA POSICION ELEGIDA NO ES VALIDA POR QUE YA ESTA OCUPADA");
        return false;
    }

    print(){
        console.log(this.tablero[0]);
        console.log(this.tablero[1]);
        console.log(this.tablero[2]);
    }

}

let app = new App();
app.start();