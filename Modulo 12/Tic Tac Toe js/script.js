
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
            respuesta = prompt('Quieres jugar otra partida (SI/NO): ');
            isAnswerdValid = respuesta === 'SI' || respuesta === 'NO';
            if (!isAnswerdValid){
                console.log("LA RESPUESTA NO ES VALIDA, SOLO SE ACEPTA SI O NO EN MAYUSCULAS");
            }
        }while(!isAnswerdValid)
    
        return respuesta === 'SI';
    }
}

class Game{
    constructor(){
        this.TOKENSTATE = ['X', 'Y'];
        this.NPLAYERS = 2;
    
        this.player = 0;
        this.mov_restantes;
        this.board;// = new Tablero(3, 3);
        this.win;    
    }

    init(){
        this.mov_restantes = 9;
        this.board = new Board(3, 3);
        this.playerMode = this.getTypesPlayers();
        this.board.print();
        
        do {
            this.tirada(this.playerMode[this.player]);
            if (!this.win) {
                this.player = (this.player + 1) % this.NPLAYERS;
                this.mov_restantes -= 1;
            }
        }while(!this.gameEnd())
        this.printMessageEndGame();
    }

    gameEnd(){
        return this.win || this.mov_restantes <= 0;
    }

    tirada(playerType) {
        let [file, column] = this.getColumWithFunctionby(this.board, playerType);

        this.board.update(file, column, this.TOKENSTATE[this.player]);
        this.board.print();
    
        this.win = this.playerWin();
        console.log("TIRADA END")
    }

    getColumWithFunctionby(tablero, playerType){
        const functionPlayerType ={
            "JUGADOR": function getFileColumn(tablero) {
                            let file, column;
                            do {
                                file = getPosition("FILE");
                                column = getPosition("COLUMN");
                            } while (!isPosititionValid(tablero, file, column));
                            return [file, column];
                                                
                            function isPosititionValid(tablero, file, column){
                                //console.log(tablero[file][column]);
                                if(tablero.getPosition(file, column) === "0"){
                                    return true;
                                }
                                return false;
                            }                
                                            
                            function getPosition(fileOColumn){
                                let fileColumn;
                                let incorrectPosition;
                                do{ 
                                    incorrectPosition = true;         
                                    fileColumn = parseInt(prompt("Agrega una posicion valida del tablero " + fileOColumn + " 1-2-3"));
                                    if(0 < fileColumn && fileColumn < 4){
                                        incorrectPosition = false; 
                                    }
                                }while(incorrectPosition)   
                                                
                                const OFFSET = 1;
                                return fileColumn - OFFSET;
                            }
                        }              
        , "MAQUINA": function getRandomPosition(tablero){ 
                        let validFile = [];
                        let validColumn = [];
                        for(let i = 0; i < tablero.getFilesLength(); i++){             
                            for (let j = 0; j < tablero.getColumnsLength(); j++){
                                if (tablero.getPosition(i, j) === '0'){
                                    validFile.push(i); 
                                    validColumn.push(j);  
                                }
                            }
                        }
                        console.log(validFile);
                        const position = Math.floor(Math.random() * validFile.length);   
                        console.log(validFile[position] + " " + validColumn[position]);
                        return [validFile[position], validColumn[position]];
                     }
        }

        let getTirada = functionPlayerType[playerType]; 
        let resultado = getTirada(tablero);
        return resultado;
    }

    playerWin(){
        if(this.board.getPosition(0, 0) ==  this.TOKENSTATE[this.player] && this.board.getPosition(0,1) == this.TOKENSTATE[this.player] && this.board.getPosition(0,2) == this.TOKENSTATE[this.player] ||
            this.board.getPosition(1, 0) == this.TOKENSTATE[this.player] && this.board.getPosition(1,1) == this.TOKENSTATE[this.player] && this.board.getPosition(1,2) == this.TOKENSTATE[this.player] ||
            this.board.getPosition(2, 0) == this.TOKENSTATE[this.player] && this.board.getPosition(2,1) == this.TOKENSTATE[this.player] && this.board.getPosition(2,2) == this.TOKENSTATE[this.player] ||
            this.board.getPosition(0, 0) == this.TOKENSTATE[this.player] && this.board.getPosition(1,0) == this.TOKENSTATE[this.player] && this.board.getPosition(2,0) == this.TOKENSTATE[this.player] ||
            this.board.getPosition(0, 1) == this.TOKENSTATE[this.player] && this.board.getPosition(1,1) == this.TOKENSTATE[this.player] && this.board.getPosition(2,1) == this.TOKENSTATE[this.player] ||
            this.board.getPosition(0, 2) == this.TOKENSTATE[this.player] && this.board.getPosition(1,2) == this.TOKENSTATE[this.player] && this.board.getPosition(2,2) == this.TOKENSTATE[this.player] ||
            this.board.getPosition(0, 0) == this.TOKENSTATE[this.player] && this.board.getPosition(1,1) == this.TOKENSTATE[this.player] && this.board.getPosition(2,2) == this.TOKENSTATE[this.player] ||
            this.board.getPosition(2, 0) == this.TOKENSTATE[this.player] && this.board.getPosition(1,1) == this.TOKENSTATE[this.player] && this.board.getPosition(0,2) == this.TOKENSTATE[this.player]){
            return true;
            }
        return false;
    }

    getTypesPlayers(){
        const playerTypes = ["JUGADOR", "MAQUINA"];
        let answerd;
        let isAnswerdValid;
        do{
            answerd = parseInt(prompt('JUGADOR VS JUGADOR ELIGE :1 \nJUGADOR VS MAQUINA ELIGE: 2 \nMAQUINA VS MAQUINA: ELIGE : 3'));
            isAnswerdValid = answerd === 1 || answerd === 2 || answerd === 3;
        }while(!isAnswerdValid)


        const playTypes = [[playerTypes[0], playerTypes[0]],
                           [playerTypes[0], playerTypes[1]],
                           [playerTypes[1], playerTypes[1]]];
        return playTypes[answerd - 1];        
    }

    getFileColumn(){
        let file, column;
        do {
            file = this.getPosition("FILE");
            column = this.getPosition("COLUMN");
        } while (!this.board.isPosititionValid(file, column));
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
        this.win ?  console.log("ENORABUENA EL JUGADOR: " + players[this.player] + " HA GANADO"):
                    console.log("NO HAY MAS MOVIMIENTOS POSIBLE, EMPATE");        
    }
}

class Board{
    constructor(files, columns){
        this.files = files;
        this.columns = columns;
        this.board = this.inicializeTablero(this.files, this.columns);
    }

    getFilesLength(){
        return this.files;
    }

    getColumnsLength() {  
        return this.columns;
    }

    inicializeTablero(files, columns){
        const initialValue = "0";
        let board = [];
        for(let i = 0; i < files; i++){
            board[i] = [];
            for (let j = 0; j < columns; j++){
                board[i][j] = initialValue;
            }
        }       
        return board;
    }

    update(file, column, token){
        this.board[file][column] = token;
    }

    isPosititionValid(file, column){
        if (this.existPosition(file, column)){
            if(this.isEmpy(file, column)){
                return true;;
            }
        } 
        return false;
    }

    getPosition(file, column){
        return this.board[file][column];
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
        console.log("LA POSICION NO ES VALIDA");
        return false;
    }

    isEmpy(file, column){
        if(this.board[file][column] === "0"){
            return true;
        }
        console.log("LA POSICION ELEGIDA NO ES VALIDA POR QUE YA ESTA OCUPADA");
        return false;
    }

    print(){
        console.log(this.board[0]);
        console.log(this.board[1]);
        console.log(this.board[2]);
    }

}

let app = new App();
app.start();