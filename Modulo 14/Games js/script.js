
class PlayerTictactoe{
    constructor(token, player){
        this.TOKEN = token
        this.player = player        
    }

    getToken() { 
        return this.TOKEN;
    }

    getPlayerFunction(board){
        const functionPlayerType ={
            "JUGADOR": function getFileColumn(board) {
                            let file, column;
                            do {
                                file = getPosition("ROW");
                                column = getPosition("COLUMN");
                            } while (!isPosititionValid(board, file, column));
                            return [file, column];
                                                
                            function isPosititionValid(tablero, file, column){
                                return tablero.getPosition(file, column) === "0";                      
                            }                
                                            
                            function getPosition(fileOrColumn){
                                let fileColumn;
                                do{ 
                                    incorrectPosition = true;         
                                    fileColumn = parseInt(prompt("Agrega una posicion valida del tablero " + fileOrColumn + " 1-2-3"));
                                } while (!isValidPosition(fileColumn));  
                                                
                                const OFFSET = 1;
                                return fileColumn - OFFSET;
                            }

                            function isValidPosition(position){
                                return board.existPosition(position);      
                            }
                        }              
        , "MAQUINA": function getRandomPosition(board){ 
                        let validPosition = [];
                        for(let i = 0; i < board.getFilesLength(); i++){             
                            for (let j = 0; j < board.getColumnsLength(); j++){
                                if (board.getPosition(i, j) === '0'){
                                    validPosition.push({row: i, column: j});
                                }
                            }
                        }
                        const randomIndex = Math.floor(Math.random() * validPosition.length);   
                        const { row, column } = validPosition[randomIndex];
                        return [row, column];
                    }
        }

        let getTirada = functionPlayerType[this.player]; 
        let resultado = getTirada(board);
        return resultado;
    }

    getMove(board){
        return this.getPlayerFunction(board);
    }

    getFileColumn(){
        let row, column;
        do {
            row = this.getPosition("FILE");
            column = this.getPosition("COLUMN");
        } while (!this.board.isPosititionValid(row, column));
        console.log("SE HA ELEGIDO LA FILA: " + row);
        console.log("SE HA ELEGIDO LA COLUMNA: " + column);
        return { file: row, column };
    }

    getPosition(fileOColumn){
        let rowOrColumn = parseInt(prompt("Agrega una posicion valida del tablero " + fileOColumn + " 1-2-3"));
        const OFFSET = 1;
        console.log(rowOrColumn);
        return rowOrColumn - OFFSET;
    }
}

class Turn{
    constructor(players, board){
        this.players = players;
        this.board = board;
        this.playerIndex = 0;
        this.currentPlayer = this.players[this.playerIndex];
        this.N_PLAYERS = 2;
    }

    getCurrentPlayer(){
        return this.currentPlayer;
    }

    next(){
        this.playerIndex = (this.playerIndex + 1) % this.N_PLAYERS;
        this.currentPlayer = this.players[this.playerIndex];
    }

    makeMove(){
        let [row, column] =this.currentPlayer.getMove(this.board);

        this.board.update(row, column, this.currentPlayer.getToken());
        this.board.print();
    
        console.log("TIRADA END")
    }
}

class Tictactoe{
    constructor(){    
        this.mov_restantes;
        this.board;
        this.win;   
        this.turn = NaN;
    }

    initialValues(){
        this.mov_restantes = 9;
        this.board = new BoardTictactoe(3, 3);
        this.turn = new Turn(this.getTypesPlayers(), this.board);
    }

    init(){
        console.log(" INICIA EL JUEGO TIC TAC TOE ");       
        this.initialValues(); 
        this.board.print();
        
        do {
            this.turn.makeMove();
            this.win = this.playerWin(this.turn.getCurrentPlayer());
            if (!this.win) {
                this.turn.next();
                this.mov_restantes -= 1;
            }
        }while(!this.gameEnd())
        this.printMessageEndGame(this.turn.getCurrentPlayer());
    }

    gameEnd(){
        return this.win || this.mov_restantes <= 0;
    }

    playerWin(player){
        if(this.board.getPosition(0, 0) == player.getToken() && this.board.getPosition(0,1) == player.getToken() && this.board.getPosition(0,2) == player.getToken() ||
            this.board.getPosition(1, 0) == player.getToken() && this.board.getPosition(1,1) == player.getToken() && this.board.getPosition(1,2) == player.getToken() ||
            this.board.getPosition(2, 0) == player.getToken() && this.board.getPosition(2,1) == player.getToken() && this.board.getPosition(2,2) == player.getToken() ||
            this.board.getPosition(0, 0) == player.getToken() && this.board.getPosition(1,0) == player.getToken() && this.board.getPosition(2,0) == player.getToken() ||
            this.board.getPosition(0, 1) == player.getToken() && this.board.getPosition(1,1) == player.getToken() && this.board.getPosition(2,1) == player.getToken() ||
            this.board.getPosition(0, 2) == player.getToken() && this.board.getPosition(1,2) == player.getToken() && this.board.getPosition(2,2) == player.getToken() ||
            this.board.getPosition(0, 0) == player.getToken() && this.board.getPosition(1,1) == player.getToken() && this.board.getPosition(2,2) == player.getToken() ||
            this.board.getPosition(2, 0) == player.getToken() && this.board.getPosition(1,1) == player.getToken() && this.board.getPosition(0,2) == player.getToken()){
            return true;
            }
        return false;
    }

    getTypesPlayers(){
        const TOKEN_STATE = ['X', 'Y'];
        const PLAYERS = ["JUGADOR", "MAQUINA"];
        let answerd;
        let isAnswerdValid;
        do{
            answerd = parseInt(prompt('JUGADOR VS JUGADOR ELIGE :1 \nJUGADOR VS MAQUINA ELIGE: 2 \nMAQUINA VS MAQUINA: ELIGE : 3'));
            isAnswerdValid = answerd === 1 || answerd === 2 || answerd === 3;
        }while(!isAnswerdValid)

        const GAME_MODES = [[new PlayerTictactoe(TOKEN_STATE[0], PLAYERS[0]), new PlayerTictactoe(TOKEN_STATE[1], PLAYERS[0])],
                            [new PlayerTictactoe(TOKEN_STATE[0], PLAYERS[0]), new PlayerTictactoe(TOKEN_STATE[1], PLAYERS[1])],
                            [new PlayerTictactoe(TOKEN_STATE[0], PLAYERS[1]), new PlayerTictactoe(TOKEN_STATE[1], PLAYERS[1])]];

        return GAME_MODES[answerd - 1];        
    }

    printMessageEndGame(currentPlayer){
        this.win ?  console.log("ENORABUENA EL JUGADOR: " + currentPlayer + " HA GANADO"):
                    console.log("NO HAY MAS MOVIMIENTOS POSIBLE, EMPATE");        
    }
}

class BoardTictactoe{
    constructor(rows, columns){
        this.rows = rows;
        this.columns = columns;
        this.board = this.inicializeTablero(this.rows, this.columns);
    }

    getFilesLength(){
        return this.rows;
    }

    getColumnsLength() {  
        return this.columns;
    }

    inicializeTablero(rows, columns){
        const initialValue = "0";
        let board = [];
        for(let i = 0; i < rows; i++){
            board[i] = [];
            for (let j = 0; j < columns; j++){
                board[i][j] = initialValue;
            }
        }       
        return board;
    }

    update(row, column, token){
        console.log(row + " " +  column + " " + token);
        this.board[row][column] = token;
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

    existPosition(position){
        const MIN_POSITION = 0;
        const MAX_POSITION = this.board.length();

        if (isNaN(position)) {
            console.log("La posición ingresada no es válida. Por favor, ingresa un número.");
            return false;
        }

        if (position < MIN_POSITION || position > MAX_POSITION - 1) {
            console.log("La posición está fuera del rango válido (1-3). Por favor, ingresa un valor válido.");
            return false;
        }                                    
        return true;  
    }

    isEmpy(row, column){
        if(this.board[row][column] === "0"){
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

class BoardConnecta4{
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

class Connecta4{
    constructor(){
        this.N_PLAYERS = 2;
        this.TOKEN_STATES = ['RED', 'YELLOW']; 
        this.COLUMNS = 7;
        this.FILES = 6;
        this.player = 0;
        this.win = false;
        this.board;
    }

    init(){
        this.board = new BoardConnecta4(this.FILES, this.COLUMNS, this.TOKEN_STATES);
        this. playerMode = this.getTypesPlayers();

        console.log(" INICIA EL JUEGO CONNECTA 4 ");
        do {
            let column;
            do {                
                column = this.getColumWithFunctionby(this.playerMode[this.player]);                
            } while (!this.board.isPositionValid(column));
            this.board.update(column, this.TOKEN_STATES[this.player]);
            this.printTablero();

            this.win = this.playerWin();
            if (!this.win) {
                this.player = (this.player + 1) % this.N_PLAYERS;
            }

        } while (!this.gameEnd()); 
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
                            // 0...6
                            const MAX_COLUMN = 7;
                            return Math.floor(Math.random() * MAX_COLUMN);
                        }
        }

        getTiradaColumn = functionPlayerType[playerType];            
        return getTiradaColumn();        
    }

    playerWin(){
        let tokenState = this.TOKEN_STATES[this.player];
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
            column = parseInt(prompt("Agrega una posicion valida del tablero, columna 1...7"));
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

class WinningCombinationManager{
    constructor(){
        this.VALID_COLORS = ["BLANCO", "NEGRO", "AMARILLO", "VERDE", "ROJO", "AZUL", "NARANJA"]; 
        this.winCombination = [];
    }

    getValidColors(){
        return this.VALID_COLORS;
    }

    generateCombination(){
        let winCombination = [];
        do{
            let repetido = false;
            const index = Math.floor(Math.random() * this.VALID_COLORS.length);
            for(let i = 0; i < winCombination.length; i++){
                if(winCombination[i] === this.VALID_COLORS[index]){
                    repetido = true;
                }
            }
            if(!repetido){
                winCombination.push(this.VALID_COLORS[index]);
            }
        }while(winCombination.length < 5)
        this.winCombination = winCombination;
        this.printCombination();
    }

    isWinningCombination(combination){
        if(!this.areArraysSameLength(combination)){
            return false;
        }

        for(let i = 0; i < this.winCombination.length; i++){
            if(combination[i] !== this.winCombination[i]){
                return false;
            }
        }
        return true;
    }

    areArraysSameLength(combination){
        return combination.length === this.winCombination;
    }


    isValidCombination(combination){
        if(!areArraysSameLength(combination)){
            return false;
        }

        for(let i = 0; i < combination.length; i++){
            let validColor = false;
            for (let j = 0; j < this.VALID_COLORS.length && !validColor ; j++){
                if(combination[i] === this.VALID_COLORS[j]){
                    validColor = true;
                }
            }
            if(!validColor){
                return false;
            }
        }
        return true;
    }

    checkCombinacionColorStatus(combination){
            let supportCombination = [];
            for(let i = 0; i < combination.length; i++){
                if(combination[i] === this.winCombination[i]){
                    supportCombination[i] = "BLANCO";
                }else if(this.isColorImArray(combination[i])){
                    supportCombination[i] = "NEGRO";
                }else{
                    supportCombination[i] = "VACIO";
                }                
            }
            return supportCombination;        
    }

    isColorImArray(color){
        for(let i = 0; i < this.winCombination.length; i++){
            if(this.winCombination[i] === color){
                return true;
            }
        }
        return false;
    }

    printCombination(){
        console.log(this.winCombination[0] + " " + 
                    this.winCombination[1] + " " + 
                    this.winCombination[2] + " " + 
                    this.winCombination[3] + " " + 
                    this.winCombination[4]);
    }
}

class Mastermaind{
    constructor(){
        this.mov_restantes;
        this.combinacionesPropuestas = [];
        this.combinationColorStatus = [];
        this.win = false;
        this.inputCombination;
        this.winCombinationManager = new WinningCombinationManager();
    }

    init(){
        this.mov_restantes = 15;
        this.winCombinationManager.generateCombination();
        this.playerMode = this.getTypesPlayers();

        do {
            const inputCombination = this.getCombinacionWithFunctionby(this.playerMode, this.winCombinationManager.getValidColors());
            this.combinationColorStatus = this.winCombinationManager.checkCombinacionColorStatus(inputCombination);
            this.win = this.winCombinationManager.isWinningCombination(inputCombination);
            this.updateHistorial(inputCombination, this.combinationColorStatus);
    
            if (!this.win) {
                this.mov_restantes -= 1;
            }
        } while (!this.gameEnd()); // nor, si las dos son falsas repite bucle
        this.printMessageEndGame();
    }

    getTypesPlayers(){
        const PLAYER_TYPES = ["JUGADOR", "MAQUINA"];
        let answerd;
        let isAnswerdValid;
        do{
            answerd = parseInt(prompt('JUGADOR ELIGE :1 \nMAQUINA ELIGE: 2'));
            isAnswerdValid = answerd === 1 || answerd === 2;
        }while(!isAnswerdValid)

        return PLAYER_TYPES[answerd - 1];
    }

    getCombinacionWithFunctionby(playerType, validColors){
        const functionPlayerType = {"JUGADOR": function getCombinationPlayer(validColors){
                                        let InputCombination;
                                
                                        do{                     
                                            combinacion_valida = false;
                                            let entrada = prompt("Agrega una combinacion de 5 colores validos: ");
                                            InputCombination = entrada.split(' ');

                                            let nColoresValidos = 0;
                                            for(let i = 0; i < InputCombination.length; i++){
                                                let colorValido = false;
                                                for (let j = 0; j < validColors.length && !colorValido ; j++){
                                                    if(InputCombination[i] === validColors[j]){
                                                        colorValido = true;
                                                    }
                                                }
                                                if(colorValido){
                                                    nColoresValidos += 1;
                                                }
                                            }

                                            console.log(InputCombination);
                                            console.log(winCombination);
                                            const N_COLORS = 5;
                                            if(nColoresValidos == N_COLORS){
                                                combinacion_valida = true;
                                            } 
                                        }while(!combinacion_valida)
                                        return InputCombination;
                                    } 
                            ,"MAQUINA": function getRandomTirada(validColors){
                                            let colorsRandomTirada = [];
                                            const N_COLORS = 5;
                                            for(let i = 0; i < N_COLORS; i++){
                                                const validColorsRandomIndex = Math.floor(Math.random() * validColors.length);
                                                colorsRandomTirada.push(validColors[validColorsRandomIndex]);
                                            }
                                            return colorsRandomTirada;
                                        }
                                    };        

        let getCombination = functionPlayerType[playerType]; 
        return getCombination(validColors);
    }

    updateHistorial(InputCombination, aciertos){
        this.combinacionesPropuestas.push(InputCombination);
        this.combinationColorStatus.push(aciertos)
        console.log(InputCombination + " -- " + aciertos );
    }

    gameEnd(){
        return this.win || this.mov_restantes <= 0;
    }

    printMessageEndGame(){
        this.win?
            console.log("ENORABUENA EL JUGAODR HA GANADO"):
            console.log("NO HAY MAS MOVIMIENTOS POSIBLE, HAS PERDIDO");        
    }
}

class App{
    constructor(){
        this.game;
    }

    start(){
        const keepPlayingSameGame = "Quieres jugar otra partida (SI/NO): ";
        const keepPlaying = "Quiere seguir jugando a algún juego (SI/NO): ";
        do{
            this.game = this.selectedGame();
            do{
                this.game.init();
            }while(this.playAgain(keepPlayingSameGame))    
            console.log("PROGRAMA END 1");    
        }while(this.playAgain(keepPlaying))
        console.log("PROGRAMA END 2");    
    }

    chooseOptionGame(){
        let answer;
        do{
            answer = parseInt(prompt('JUGAR MASTERMAIND ELIGE :1 \nJUGAR CONNECTA 4 ELIGE: 2 \nJUGAR TIC TAC TOE ELIGE : 3'));
        }while(!(answer === 1 || answer === 2 || answer === 3));
        return answer;
    }

    selectedGame(){
        const GAMES = [new Mastermaind(), new Connecta4(), new Tictactoe()];
        const a = this.chooseOptionGame();
        console.log("Check game " + a);
        return GAMES[a-1];
    }

    playAgain(mensaje){
        let answer;
        let isAnswerdValid;
        do{
            answer = prompt(mensaje);
            isAnswerdValid = answer === 'SI' || answer === 'NO';
            if (!isAnswerdValid){
                console.log("LA RESPUESTA NO ES VALIDA, SOLO SE ACEPTA SI O NO EN MAYUSCULAS");
            }
        }while(!isAnswerdValid)
    
        return answer === 'SI'; 
    }
}

let app = new App()
app.start()


