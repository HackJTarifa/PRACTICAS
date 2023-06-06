
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
        this.mov_restantes;
        this.tablero;// = new Tablero(3, 3);
        this.win;    
    }

    init(){
        this.mov_restantes = 9;
        this.tablero = new Tablero(3, 3);
        this.playerMode = this.getTypesPlayers();
        this.tablero.print();
        
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
        if(this.win){
            return true;
        }else if(this.mov_restantes <= 0){
            return true;
        }
        return false;
    }

    tirada(playerType) {
        let [file, column] = this.getColumWithFunctionby(this.tablero, playerType);

        this.tablero.update(file, column, this.TOKENSTATE[this.player]);
        this.tablero.print();
    
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

    getTypesPlayers(){
        const playerTypes = ["JUGADOR", "MAQUINA"];
        let answerd;
        let isAnswerdValid;
        do{
            answerd = parseInt(prompt('JUGADOR VS JUGADOR ELIGE :1 \nJUGADOR VS MAQUINA ELIGE: 2 \nMAQUINA VS MAQUINA: ELIGE : 3'));
            isAnswerdValid = answerd === 1 || answerd === 2 || answerd === 3;
        }while(!isAnswerdValid)


        const playTypes = [[playerTypes[0], playerTypes[0]], [playerTypes[0], playerTypes[1]], [playerTypes[1], playerTypes[1]]];
        return playTypes[answerd - 1]
        }
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

    getFilesLength(){
        return this.files;
    }

    getColumnsLength() {  
        return this.columns;
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
            if(this.isEmpy(file, column)){
                return true;;
            }
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
        console.log("LA POSICION NO ES VALIDA");
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