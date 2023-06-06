class Tablero{
    constructor(files, columns, tokenState){
        this.files = files;
        this.column = columns;
        this.tablero = this.inicializeTablero(this.files, this.column);
        this.movRestantes = this.files * this.column;
        this.tokenState = tokenState;
    }

    get_mov_restantes(){
        return this.movRestantes;
    }

    inicializeTablero(FILES, COLUMNS){    
        let tablero = new Array(COLUMNS);
        for(let i = 0; i < COLUMNS; i++){
            tablero[i] = new Array(FILES);
        }
    
        for(let i = 0; i < tablero.length; i++){             
            for (let j = 0; j < FILES; j++){
                tablero[i][j] = "0";
            }
        } 
         return tablero;
    }

    gePosition(file, column){
        return this.tablero[column][file];
    }

    isPositionValid(COLUMN){
        for(let i = 0; i < this.files; i++){ 
            if(this.tablero[COLUMN][i] == "0"){
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
        while(this.isOccupied(this.tablero[column][index])){
            index += 1;
        }    
        this.tablero[column][index] = tokenState;
        this.movRestantes -= 1;
    }

    print(){
        for(let i = 0; i < this.column; i++){
            console.log(this.tablero[i]);
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
        this.tablero;
    }

    init(){
        this.tablero = new Tablero(this.FILES, this.COLUMNS, this.TOKEN_STATE);
        this. playerMode = this.getTypesPlayers();

        do {
            let column;
            do {                
                column = this.getColumWithFunctionby(this.playerMode[this.player]);                
            } while (!this.tablero.isPositionValid(column));
            this.tablero.update(column, this.TOKEN_STATE[this.player]);
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
        let answerd;
        let isAnswerdValid;
        do{
            answerd = parseInt(prompt('JUGADOR VS JUGADOR ELIGE :1 \nJUGADOR VS MAQUINA ELIGE: 2 \nMAQUINA VS MAQUINA: ELIGE : 3'));
            isAnswerdValid = answerd === 1 || answerd === 2 || answerd === 3;
        }while(!isAnswerdValid)

        const playModes = [[playerTypes[0], playerTypes[0]], [playerTypes[0], playerTypes[1]], [playerTypes[1], playerTypes[1]]];
        return playModes[answerd - 1];
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
    checkPosition(iC, iF, tK) {
        const CONNECTA_SIZE = 4;
        if(CONNECTA_SIZE + iC < 7){                     
            if (this.tablero.gePosition(iC, iF) == tK && this.tablero.gePosition(iC + 1, iF) == tK && this.tablero.gePosition(iC + 2, iF) == tK && this.tablero.gePosition(iC + 3, iF) == tK){
                return true;
            }
        }                 
        if(CONNECTA_SIZE + iF < 6){
            if(this.tablero.gePosition(iC, iF) == tK && this.tablero.gePosition(iC, iF + 1) == tK && this.tablero.gePosition(iC, iF + 2) == tK && this.tablero.gePosition(iC, iF + 3) == tK){
                console.log("CUARTRO EN RAYA");
                return true;
            }
        }
        if(CONNECTA_SIZE + iC < 7 && CONNECTA_SIZE + iF < 6){
            if(this.tablero.gePosition(iC, iF) == tK && this.tablero.gePosition(iC + 1, iF + 1) == tK && this.tablero.gePosition(iC + 2, iF + 2) == tK && this.tablero.gePosition(iC + 3, iF + 3) == tK ||
            this.tablero.gePosition(iC, iF + 3) == tK && this.tablero.gePosition(iC + 1, iF + 2) == tK && this.tablero.gePosition(iC + 2, iF + 1) == tK && this.tablero.gePosition(iC + 3, iF) == tK) {
                return true;
            }
        }
        return false;
    }

    gameEnd() {
        if(this.win){
            return true
        }else if(this.tablero.get_mov_restantes() <= 0){
            return true;
        } 
        return false;
    }

    printTablero(){
        this.tablero.print();
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

let app = new App()
app.start()