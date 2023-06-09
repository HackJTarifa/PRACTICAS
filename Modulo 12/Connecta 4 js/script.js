class Board{
    constructor(files, columns, tokenState){
        this.files = files;
        this.column = columns;
        this.board = this.inicializeBoard(this.files, this.column);
        this.movRestantes = this.files * this.column;
        this.tokenState = tokenState;
    }

    get_mov_restantes(){
        return this.movRestantes;
    }

    inicializeBoard(FILES, COLUMNS){    
        const intialValue = "0";
        let board = [];
        for(let i = 0; i < COLUMNS; i++){
            board[i] =[];
            for (let j = 0; j < FILES; j++){
                board[i][j] = intialValue;
            }
        }    
        return board;
    }

    gePosition(file, column){
        return this.board[column][file];
    }

    isPositionValid(COLUMN){
        for(let i = 0; i < this.files; i++){ 
            if(this.board[COLUMN][i] == "0"){
                return true;
            }
        }
        console.log("LA COLUMNA ELEGIDA NO ES VALIDA, ESTA LLENA.")
        return false;
    }

    isOccupied(position){
        for(const token of this.tokenState){
            if(position === token){
                return true;
            }
        }
        return false;
    }

    update(column, tokenState){
        let index = 0;
        while(this.isOccupied(this.board[column][index])){
            index += 1;
        }    
        this.board[column][index] = tokenState;
        this.movRestantes -= 1;
    }

    print(){
        for(let i = 0; i < this.column; i++){
            console.log(this.board[i]);
        }
        console.log(" ");
    }
}

class Game{
    constructor(){
        this.N_PLAYERS = 2;
        this.TOKEN_STATE = ['RED', 'YELLOW']; 
        this.COLUMNS = 7;
        this.FILES = 6;
        this.player = 0;

        this.win = false;
        this.board;
    }

    init(){
        this.board = new Board(this.FILES, this.COLUMNS, this.TOKEN_STATE);
        this. playerMode = this.getTypesPlayers();

        do {
            let column;
            do {                
                column = this.getColumWithFunctionby(this.playerMode[this.player]);                
            } while (!this.board.isPositionValid(column));
            this.board.update(column, this.TOKEN_STATE[this.player]);
            this.printTablero();

            this.win = this.playerWin();
            if (!this.win) {
                this.player = (this.player + 1) % this.N_PLAYERS;
            }

        } while (!this.gameEnd()); // nor, si las dos son falsas repite bucle
        this.printMessageEndGame();
    }

    getTypesPlayers(){
        const playerTypes = ["JUGADOR", "MAQUINA"];
        let answer;
        let isAnswerdValid;
        do{
            answer = parseInt(prompt('JUGADOR VS JUGADOR ELIGE :1 \nJUGADOR VS MAQUINA ELIGE: 2 \nMAQUINA VS MAQUINA: ELIGE : 3'));
            isAnswerdValid = answer === 1 || answer === 2 || answer === 3;
        }while(!isAnswerdValid)

        const playModes = [[playerTypes[0], playerTypes[0]], [playerTypes[0], playerTypes[1]], [playerTypes[1], playerTypes[1]]];
        return playModes[answer - 1];
    }

    getColumWithFunctionby(playerType){
        let getTiradaColumn;

        const functionPlayerType = { 
            "JUGADOR": function getColumn(){
                            let column;
                            let incorrectColumn;
                            do{ 
                                incorrectColumn = true;                 
                                column = parseInt(prompt("Agrega una posicion valida del tablero, columna 1 ... 7"));
                                
                                if(0 < column && column < 8){
                                    incorrectColumn = false; 
                                }
                                column -= 1;
                            }while(incorrectColumn) 
                            return column;
                         } 
        , "MAQUINA": function getRandomColumn(){
                            // 0, 1, 2, 3, 4, 5, 6
                            const MAX_COLUMN = 7;
                            return Math.floor(Math.random() * MAX_COLUMN);
                        }
        }

        getTiradaColumn = functionPlayerType[playerType];            
        return getTiradaColumn();        
    }

    playerWin(){
        let tokenState = this.TOKEN_STATE[this.player];
        console.log(tokenState);        

        let cuantroEnRaya = false;
        for(let idFil = 0; idFil < this.FILES ; idFil++){
            for(let idCol = 0; idCol < this.COLUMNS; idCol++){
                cuantroEnRaya = this.checkPosition( idCol, idFil, tokenState);
                if (cuantroEnRaya){
                    return true;
                }
            }
        }
        return false;
    }
    
    // iC = indexColumns
    // iF = indexFiles
    // tS = tokenState
    checkPosition(col, row, token) {
        const CONNECTA_SIZE = 4;
        if(CONNECTA_SIZE + col < 7){                     
            if (this.board.gePosition(col, row) == token && 
            this.board.gePosition(col + 1, row) == token && 
            this.board.gePosition(col + 2, row) == token && 
            this.board.gePosition(col + 3, row) == token){
                return true;
            }
        }                 
        if(CONNECTA_SIZE + row < 6){
            if(this.board.gePosition(col, row) == token && 
            this.board.gePosition(col, row + 1) == token && 
            this.board.gePosition(col, row + 2) == token && 
            this.board.gePosition(col, row + 3) == token){
                console.log("CUARTRO EN RAYA");
                return true;
            }
        }
        if(CONNECTA_SIZE + col < 7 && CONNECTA_SIZE + row < 6){
            if(this.board.gePosition(col, row) == token && 
            this.board.gePosition(col + 1, row + 1) == token && 
            this.board.gePosition(col + 2, row + 2) == token && 
            this.board.gePosition(col + 3, row + 3) == token ||
            this.board.gePosition(col, row + 3) == token && 
            this.board.gePosition(col + 1, row + 2) == token && 
            this.board.gePosition(col + 2, row + 1) == token && 
            this.board.gePosition(col + 3, row) == token) {
                return true;
            }
        }
        return false;
    }

    gameEnd() {
        return this.win || this.movRestantes <= 0;
    }

    printTablero(){
        this.board.print();
    }

    getColumn(){
        let column;
        do{ 
            column = parseInt(prompt("Agrega una posicion valida del tablero, columna 1 ... 7"));
            column -= 1;
       }while(!(column >= 0 && column < 7))        
       return column;
    }

    getRandomColumn(){
        const MAX_COLUMN = 7;
        return Math.floor(Math.random() * MAX_COLUMN);
    }

    printMessageEndGame(){
        const PLAYERS = ["PLAYER 1", "PLAYER 2"];
        if (this.win){
            console.log("ENORABUENA EL JUGADOR: " + PLAYERS[this.player] + " HA GANADO");
        }else{
            console.log("NO HAY MAS MOVIMIENTOS POSIBLES, EMPATE");
        }
    }
}

class App{
    constructor(){
        this.game = new Game();
    }

    start(){
        do{
            this.game.init();
        }while(this.playAgain())    
        console.log("PROGRAMA END");    
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

let app = new App()
app.start()