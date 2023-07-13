// ---------- TIC TAC TOE ----------

class ViewT{
    promptRown(){
        return parseInt(prompt("Agrega una posicion valida del tablero ROW 1-2-3"));
    }

    promptColumn(){
        return parseInt(prompt("Agrega una posicion valida del tablero COLUMN 1-2-3"));
    }

    promptPlayersModes(){
        return parseInt(prompt('JUGADOR VS JUGADOR ELIGE :1 \nJUGADOR VS MAQUINA ELIGE: 2 \nMAQUINA VS MAQUINA: ELIGE : 3'));
    }

    printStartGame(){
        console.log("EL JUEGO TIC TAC TOE A COMENZADO");
    }

    printBoardState(boarState){
        console.log("      ");
        console.log("-------------");
        console.log("| " + boarState[0][0] + " | " + boarState[0][1] + " | " + boarState[0][2] + " |");
        console.log("-------------");
        console.log("| " + boarState[1][0] + " | " + boarState[1][1] + " | " + boarState[1][2] + " |");
        console.log("-------------");
        console.log("| " + boarState[2][0] + " | " + boarState[2][1] + " | " + boarState[2][2] + " |");
        console.log("-------------");
        console.log("     ");

    }

    printMessageEndGame(isWinner, playerName){
        isWinner ?  console.log("ENORABUENA EL JUGADOR: " + playerName + " HA GANADO"):
                    console.log("NO HAY MAS MOVIMIENTOS POSIBLE, EMPATE");        
    }

    printError(error){
        const errors = {    
            ErrorRowUndefined: "No ha introducido un valor para ROW.",
            ErrorColumnUndefined: "No ha introducido un valor para COLUMN.",
            ErrorRowNaN: "El valor introducido no es un número.",
            ErrorColumnNaN: "El valor introducido no es un número.",
            ErrorRowOutRange: "El valor introducido de ROW esta fuera de rango, 1..3.",
            ErrorColumnOutRange: "El vaolor introducido de COLUMN esta fuera de rango, 1...3.",
            ErrorCellOccupied: "La posicion elegida no es valida por que ya está ocupada.",
            ErrorChoisePlayesModes:"El valor ingresado no es valido, solo se acepta un número entre 1...3."}
        console.log(errors[error]);
    }

    printMovimentEnd(){
        console.log("EL MOVIMIENTO HA FINALIZADO");
    }

}

class Cell{
    constructor(row, column){
        this.row = row;
        this.column = column;
    }

    getCoordinates(){
        return [this.row, this.column];
    }

    getRow(){
        return this.row;
    }

    getColumn(){
        return this.column;
    }
}

class DataInputT{
    constructor(board, view) {
        this.view = view;
        this.board = board;
    }

    getInputCoordinateByFunction(playerType){    
        const view = this.view;
        const board = this.board;
        let inputCell;

        const getFileColumn = function () {
            let inputRow, inputColumn;
            do{
                inputRow = view.promptRown();
                inputColumn = view.promptColumn();
                inputRow -= 1;
                inputColumn -= 1;
                inputCell = new Cell(inputRow, inputColumn);
            }while(!board.isPosititionValid(inputCell));
            return inputCell;
        }

        //row column
        const getRandomPosition = function(){ 
            let validPositions = [];
            for(let i = 0; i < board.getFilesLength(); i++){             
                for (let j = 0; j < board.getColumnsLength(); j++){
                    if (board.isPosititionValid(new Cell(i, j))){
                        validPositions.push({row: i, column: j});
                    }
                }
            }
            const randomIndex = Math.floor(Math.random() * validPositions.length); 
            const { row, column } = validPositions[randomIndex];
            return new Cell(row, column);
        }

        const modes = {"JUGADOR": getFileColumn, 
                        "MAQUINA": getRandomPosition};

        return modes[playerType]();
    }
}

class PlayerT{
    constructor(token, playerType, name, board, view){
        this.token = token
        this.playerType = playerType        
        this.NAME = name;
        this.dataInput = new DataInputT(board, view); 
    }

    getName(){
        return this.NAME;
    }

    getToken() { 
        return this.token;
    }

    getMove(){
        return this.dataInput.getInputCoordinateByFunction(this.playerType);
    }
}

class GameLogicT{
    constructor(){
        this.win = false;
    }

    isWinner(){
        return this.win;
    }

    gessCombination(board, player){
        this.win = this.isTicTacToe(board, player);
    }

    isGameEnd(board){
        return this.win || board.isFull();
    }

    isTicTacToe(board, player){
        if(board.getPosition(0, 0) == player.getToken() && board.getPosition(0,1) == player.getToken() && board.getPosition(0,2) == player.getToken() ||
            board.getPosition(1, 0) == player.getToken() && board.getPosition(1,1) == player.getToken() && board.getPosition(1,2) == player.getToken() ||
            board.getPosition(2, 0) == player.getToken() && board.getPosition(2,1) == player.getToken() && board.getPosition(2,2) == player.getToken() ||
            board.getPosition(0, 0) == player.getToken() && board.getPosition(1,0) == player.getToken() && board.getPosition(2,0) == player.getToken() ||
            board.getPosition(0, 1) == player.getToken() && board.getPosition(1,1) == player.getToken() && board.getPosition(2,1) == player.getToken() ||
            board.getPosition(0, 2) == player.getToken() && board.getPosition(1,2) == player.getToken() && board.getPosition(2,2) == player.getToken() ||
            board.getPosition(0, 0) == player.getToken() && board.getPosition(1,1) == player.getToken() && board.getPosition(2,2) == player.getToken() ||
            board.getPosition(2, 0) == player.getToken() && board.getPosition(1,1) == player.getToken() && board.getPosition(0,2) == player.getToken()){
            return true;
            }
        return false;
    }
}

class TurnT{
    constructor(players, board, gameLogic, view){
        this.view = view;
        this.players = players;
        this.board = board;
        this.gameLogic = gameLogic;
        this.playerIndex = 0;
        this.currentPlayer = this.players[this.playerIndex];
    }

    getCurrentPlayer(){
        return this.currentPlayer;
    }

    next(){
        this.playerIndex = (this.playerIndex + 1) % this.players.length;
        this.currentPlayer = this.players[this.playerIndex];
    }

    makeMove(){
        let inputCell = this.currentPlayer.getMove(this.board);

        this.board.update(inputCell, this.currentPlayer.getToken());
        this.gameLogic.gessCombination(this.board, this.currentPlayer);
        this.view.printBoardState(this.board.getState());
        this.view.printMovimentEnd();   
    }

    isWinner(){
        return this.gameLogic.isWinner();
    }

    isGameEnd(){
        return this.gameLogic.isGameEnd(this.board);
    }
}

class BoardT{
    constructor(rows, columns, view){
        this.view = view;
        this.rows = rows;
        this.columns = columns;
        this.boardState = this.createEmptyBoard(this.rows, this.columns);
        this.availableCells = 9;
    }

    getState(){
        return this.boardState;
    }

    getFilesLength(){
        return this.rows;
    }

    getColumnsLength() {  
        return this.columns;
    }

    createEmptyBoard(rows, columns){
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

    isFull(){
        return this.availableCells <= 0; 
    }

    update(inputCell, token){
        this.boardState[inputCell.getRow()][inputCell.getColumn()] = token;
        this.availableCells -= 1;
    }

    isPosititionValid(inputCell){
        const row = inputCell.getRow();
        const column = inputCell.getColumn();
        if(row === undefined){
            this.view.printError("ErrorRowUndefined");
            return false;
        }

        if(column === undefined){
            this.view.printError("ErrorColumnUndefined");
            return false;
        }
        
        if(isNaN(row)){
            this.view.printError("ErrorRowNaN");
            return false;
        }

        if(isNaN(column)){
            this.view.printError("ErrorColumnNaN");
            return false;
        }

        if(row < 0 || row > 2){
            this.view.printError("ErrorRowOutRange");
            return false;
        }

        if(column < 0 || column > 2){
            this.view.printError("ErrorColumnOutRange");
            return false;
        }

        const isPositionEmpty = this.boardState[row][column] === "0";
        if (!isPositionEmpty){
            this.view.printError("ErrorCellOccupied");
            return false;
        }

        return true;
    }

    getPosition(row, column){
        return this.boardState[row][column];
    }
}

class Tictactoe{
    constructor(){    
        this.board;
        this.gameLogic;
        this.turn = NaN;
    }

    initializeValues(){
        this.view = new ViewT();
        this.board = new BoardT(3, 3, this.view);
        this.gameLogic = new GameLogicT();
        this.turn = new TurnT(this.createPlayersByMode(), this.board, this.gameLogic, this.view);
    }

    init(){
        this.initializeValues(); 
        this.view.printStartGame();    
        this.view.printBoardState(this.board.getState());

        do{
            this.turn.makeMove();
            if(!this.turn.isWinner()){
                this.turn.next();
            }
        }while(!this.turn.isGameEnd())
        this.view.printMessageEndGame(this.turn.isWinner(), this.turn.getCurrentPlayer().getName());
    }

    createPlayersByMode(){
        const TOKEN_STATE = ['X', 'Y'];
        const PLAYERS = ["JUGADOR", "MAQUINA"];
        const view = this.view;
        let playersModes = getPlayesModes(view);

        const GAME_MODES = [[new PlayerT(TOKEN_STATE[0], PLAYERS[0], "PLAYER 1", this.board, this.view),
                            new PlayerT(TOKEN_STATE[1], PLAYERS[0], "PLAYER 2", this.board, this.view)],
                            
                            [new PlayerT(TOKEN_STATE[0], PLAYERS[0], "PLAYER 1", this.board, this.view),
                            new PlayerT(TOKEN_STATE[1], PLAYERS[1], "PLAYER 2", this.board, this.view)],
                            
                            [new PlayerT(TOKEN_STATE[0], PLAYERS[1], "PLAYER 1", this.board, this.view),
                            new PlayerT(TOKEN_STATE[1], PLAYERS[1], "PLAYER 2", this.board, this.view)]];

        return GAME_MODES[playersModes - 1];        


        function getPlayesModes(view) {
            let playersModes;
            let isValid;
            do {
                playersModes = view.promptPlayersModes();
                isValid = playersModes === 1 || playersModes === 2 || playersModes === 3;
                if (!isValid) {
                    view.printError("ErrorChoisePlayesModes");
                }
            } while (!isValid);
            return playersModes;
        }
    }    
}

// ---------- CONNECTA 4 ----------

class ViewC{
    promptColumn(){
        return parseInt(prompt("Agrega una posicion valida del tablero, columna 1 ... 7"));  
    }

    promptPlayersModes(){
        return parseInt(prompt('JUGADOR VS JUGADOR ELIGE :1 \nJUGADOR VS MAQUINA ELIGE: 2 \nMAQUINA VS MAQUINA: ELIGE : 3'));
    }

    printError(error){
        const errors ={
            ErrorColumnNaN: "El valor ingresado no es un número.",
            ErrorColumnUndefined: "No se ha ingresado ningún valor.",
            ErrorColumnOutRange: "el valor ingresado esta fuera de rango, 1...7.",
            ErrorColumnFull: "La columna elegida no es valida pues esta llena.",
            ErrorInvalidOption: "El valor introducido o la opcioón elegidano es valida, solo se acepta 1 o 2 o3."
        }
        console.log(errors[error]);
    }

    printBoardState(boardState){
        console.log("    ");
        for(let i = 0; i < boardState.length; i++){
            console.log(boardState[i]);
        }
        console.log("     ");
    }

    printMessageEndGame(playerName, isWinner){
        isWinner ?  console.log("ENORABUENA EL JUGADOR: " + playerName + " HA GANADO"):
                    console.log("NO HAY MAS MOVIMIENTOS POSIBLE, EMPATE");        
    }

    printStartGame(){
        console.log(" INICIA EL JUEGO CONNECTA 4 ");
    }
}

class DataInputC{
    constructor(board, view){
        this.board = board;
        this.view = view;
    }

    getInputCombination(playerType){
        const view = this.view;
        const board = this.board;
        const getColumn = function(){
            let column;
            do{ 
                column = view.promptColumn();        
                column -= 1;
            }while(!board.isPositionValid(column)) 
            return column;
        }

        const getRandomColumn = function(){
            let column;
            const MAX_COLUMN = 7;
            do{
                column = Math.floor(Math.random() * MAX_COLUMN); // 0...6
            }while(!board.isPositionValid(column))
            return column;
        }
        
        const modes = {"JUGADOR": getColumn, 
                        "MAQUINA": getRandomColumn};

        return modes[playerType]();   
    }
}

class LastMoviment{
    constructor(row, column, token){
        this.row = row;
        this.column = column;
        this.token = token;
    }

    getRow(){
        return this.row;
    }

    getColumn(){
        return this.column;
    }

    getToken(){
        return this.token;
    }
}

class BoardC{
    constructor(rowns, columns, view){
        this.view = view;
        this.ROWNS = rowns; // 6
        this.COLUMNS = columns; // 7
        this.boardState = this.createEmptyBoard(this.ROWNS, this.COLUMNS);
        this.aviableCells = this.ROWNS * this.COLUMNS;
        this.lastMoviment = NaN;
    }

    getState(){
        return this.boardState;
    }

    getLastMoviment(){
        return this.lastMoviment;
    }

    getRowsLength(){
        return this.ROWNS;
    }

    getColumnLength(){
        return this.COLUMNS;
    }

    createEmptyBoard(rowns, columns){    
        const intialValue = "0";
        let board = [];
        for(let i = 0; i < columns; i++){
            board[i] =[];
            for (let j = 0; j < rowns; j++){
                board[i][j] = intialValue;
            }
        }    
        return board;
    }

    getPosition(column, row){
        return this.boardState[column][row];
    }

    isFull(){
        return this.aviableCells <= 0;
    }

    isPositionValid(column){
        if(isNaN(column)){
            this.view.printError("ErrorColumnNaN");
            return false;
        }

        if(column === undefined){
            this.view.printError("ErrorColumnUndefined");
            return false;
        }

        const isValidColumn = column >= 0 && column <= this.COLUMNS - 1;
        if(!isValidColumn){
            this.view.printError("ErrorColumnOutRange");
            return false;
        }

        for(let i = 0; i < this.ROWNS; i++){ 
            if(this.boardState[column][i] === "0"){
                return true;                
            }
        }
        this.view.printError("ErrorColumnFull");
        return false;
    }

    update(column, tokenState){
        let row = 0;     
        while(this.boardState[column][row] !== "0"){
            row += 1;
        }   

        this.boardState[column][row] = tokenState;
        this.lastMoviment = new LastMoviment(row, column, tokenState); 
        this.aviableCells -= 1;
    }
}

class PlayerC{
    constructor(playerType, token, name, board, view){
        this.TOKEN = token
        this.playerType = playerType        
        this.NAME = name;
        this.dataInput = new DataInputC(board, view);
    }
    
    getName() { 
        return this.NAME;
    }

    getToken(){
        return this.TOKEN;
    }

    getInputCombination(){      
        return this.dataInput.getInputCombination(this.playerType);
    }
}

class TurnC{
    constructor(players, gameLogic, board, view){
        this.players = players;
        this.gameLogic = gameLogic;
        this.board = board;
        this.playerIndex = 0;
        this.currentPlayer = this.players[this.playerIndex];
        this.view = view;
    }

    getCurrentPlayer() { 
        return this.currentPlayer;
    }

    next(){
        this.playerIndex = (this.playerIndex + 1) % this.players.length;
        this.currentPlayer = this.players[this.playerIndex];
    }

    makeMove(){
        let column = this.currentPlayer.getInputCombination(this.board);
        this.board.update(column, this.currentPlayer.getToken());

        this.gameLogic.gessCombination(this.board);
        this.view.printBoardState(this.board.getState());
    }

    isWinner(){
        return this.gameLogic.isWinner();
    }

    isGameEnd(){
        return this.gameLogic.isGameEnd(this.board);
    }
}

class GameLogicC{
    constructor(){
        this.win = false;
    }

    isWinner(){
        return this.win;
    }
    
    isGameEnd(board){
        return this.win || board.isFull();
    }

    gessCombination(board){
        this.win = this.isPlayerWinner(board);
    }

    isInRage(row, column){
        // row 0...6
        // column 0...7
        const MIN_ROW = 0;
        const MAX_ROW = 5;
        const MIN_COLUMM = 0;
        const MAX_COLUMN = 6;
        if(row < MIN_ROW || row > MAX_ROW){
            return false;
        }
        
        if(column < MIN_COLUMM || column > MAX_COLUMN){
            return false;
        }
        return true;
    }

    checkDirection(board, direction){
        for(let i = 0; i < 4; i++){
            const row = board.getLastMoviment().getRow() + direction.row * i;
            const column = board.getLastMoviment().getColumn() + direction.column * i;
            
            if(!this.isInRage(row, column)){
                return false;
            }

            if(board.getLastMoviment().getToken() !== board.getPosition(column, row)){
                return false;
            }
        }
        return true;
    }

    isPlayerWinner(board){
        const directions = [
            { row: -1, column: 0 },   // Left
            { row: 1, column: 0 },    // Right
            { row: 0, column: 1 },    // Down
            { row: 1, column: 1 },    // Right Down
            { row: 1, column: -1 },   // Right Up
            { row: -1, column: 1 },   // Left Down
            { row: -1, column: -1 }   // Left Up
        ];
        
        for(const direction of directions){
            if(this.checkDirection(board, direction)){
                return true;
            }
        }
        return false;
    }
}

class Connecta4{
    constructor(){
        this.COLUMNS = 7;
        this.ROWNS = 6;
        this.board;
        this.turn = NaN;
        this.gameLogic;
    }

    initializeValues(){
        this.view = new ViewC();
        this.board = new BoardC(this.ROWNS, this.COLUMNS);
        this.gameLogic = new GameLogicC();
        this.turn = new TurnC(this.createPlayersByMode(), this.gameLogic, this.board, this.view);
    }

    init(){
        this.initializeValues();
        this.view.printStartGame();
        this.view.printStartGame();
        
        this.view.printBoardState(this.board.getState());
        do {
            this.turn.makeMove(this.board);
            if(!this.turn.isWinner()){
                this.turn.next();
            }            
        } while (!this.turn.isGameEnd());    
        this.view.printMessageEndGame(this.turn.getCurrentPlayer().getName(), this.turn.isWinner());
    }

    createPlayersByMode(){
        const view = this.view;
        
        const PLAYER_TYPES = ["JUGADOR", "MAQUINA"];
        const TOKEN_STATES = ['RED', 'YELLOW']; 
        let playersMode = getPlayersMode(view);

        const GAME_MODES =  [[new PlayerC(PLAYER_TYPES[0], TOKEN_STATES[0], "PLAYER 1", this.board, this.view),
                            new PlayerC(PLAYER_TYPES[0], TOKEN_STATES[1], "PLAYER 2", this.board, this.view)],
                            
                            [new PlayerC(PLAYER_TYPES[0], TOKEN_STATES[0], "PLAYER 1", this.board, this.view),
                            new PlayerC(PLAYER_TYPES[1], TOKEN_STATES[1], "PLAYER 2", this.board, this.view)],
                            
                            [new PlayerC(PLAYER_TYPES[1], TOKEN_STATES[0], "PLAYER 1", this.board, this.view),
                            new PlayerC(PLAYER_TYPES[1], TOKEN_STATES[1], "PLAYER 2", this.board, this.view)]];
        return GAME_MODES[playersMode - 1];

        function getPlayersMode(view) {
            let playersMode;
            let isAnswerdValid;
            do {
                playersMode = view.promptPlayersModes();
                isAnswerdValid = playersMode === 1 || playersMode === 2 || playersMode === 3;
                if (!isAnswerdValid) {
                    view.printError("ErrorInvalidOption");
                }
            } while (!isAnswerdValid);
            return playersMode;
        }
    }
}

// ---------- MASTERMAIND ---------
class ViewM{
    promptColorsCombination(){
        return prompt("Agrega una combinacion de 5 colores validos: ");;
    }

    promptChoisePlayerType(){
        return parseInt(prompt('JUGADOR ELIGE :1 \nMAQUINA ELIGE: 2'));
    }

    printError(error){
        const errors = {    ErrorLenght: "Error: La combinacion ingresada no es ingual al la combinacion secreta",
                            ErrorColor: "Error: Algún color ingresado no esta entre los colores permitidos." }
        console.log(errors[error]);
    }

    printMessageColorNoValid(color){
        console.log("El color: " + color + " no esta dentro del rango de colores permitodos.");
    }    

    printMessageEndGame(isWinner){
        isWinner?
            console.log("ENORABUENA EL JUGAODR HA GANADO"):
            console.log("NO HAY MAS MOVIMIENTOS POSIBLE, HAS PERDIDO");        
    }

    printCombination(colors){
        console.log("| " +  colors.getColor(0) + " | " + 
                            colors.getColor(1) + " | " + 
                            colors.getColor(2) + " | " + 
                            colors.getColor(3) + " | " + 
                            colors.getColor(4) + " |");
    }

    printSeparador(){
        console.log("-----------------------------------");
    }

    printMessageLessMoviments(lessMoviments){
        console.log(" MOVIMIENTOS RESTANTES: " + lessMoviments);
    }
}

class Combination{
    constructor(colors = []){
        this.colors = colors;
    }
    
    push(color){
        this.colors.push(color);
    }
    
    isEqual(combination){
        for (let i = 0; i < this.colors.length; i++){
            if(combination.getColor(i) !== this.colors[i]){
                return false;
            }
        }
        return true;
    }

    contains(color){
        for(let i = 0; i < this.colors.length; i++){ 
            if(this.colors[i] == color){
                return true;
            }
        }
        return false;
    }
    
    isSameColor(color, index){
        return this.colors[index] == color;
    }

    getLength(){
        return this.colors.length;
    }

    getColor(index){
        if(this.colors[index] !== undefined){
            return this.colors[index];
        }
    }
}

class DataInputM{
    constructor(secretCodeManager, view){
        this.secretCodeManager = secretCodeManager;
        this.view = view;
    }

    getInputCombination(playerType){
        const self = this;
        const secretCodeManager = this.secretCodeManager;

        const getCombinationPlayer = function(self){
            let inputCombination;
            
            do{                     
                let colors = self.view.promptColorsCombination();
                inputCombination = new Combination(colors.split(' '));
            }while(!secretCodeManager.isValidCombination(inputCombination))
            return inputCombination;
        }
        
        const getRandomTirada = function(self){
            let colorsRandomTirada = new Combination();
            const N_COLORS = 5;
            const N_DIFERENT_COLORS = secretCodeManager.getValidColorsLength();
            const validColors = secretCodeManager.getValidColors();
            for(let i = 0; i < N_COLORS; i++){
                const validColorsRandomIndex = Math.floor(Math.random() * N_DIFERENT_COLORS);
                colorsRandomTirada.push(validColors.getColor(validColorsRandomIndex));
            }
            return colorsRandomTirada;
        }                                  
    
        const modes ={"JUGADOR": getCombinationPlayer,
                    "MAQUINA": getRandomTirada};

        return modes[playerType](self);
    }
}

class PlayerM{
    constructor(playerType, secretCodeManager, view){
        this.PLAYER_TYPE = playerType;        
        this.NAME = "JUGADOR 1";
        this.dataInput = new DataInputM(secretCodeManager, view); 
    }

    getName(){
        return this.NAME;
    }

    getPlayerInputCombination(){
        return this.dataInput.getInputCombination(this.PLAYER_TYPE);
    }
}

class GameLogicM{
    constructor(view){
        this.view = view;
        this.maxTurns = 15;
        this.proposedCombinations = [];
        this.combinationColorStatus = [];    
        this.win = false; 
    }

    getRemainingTurns(){
        return this.maxTurns;
    }

    guessCode(secretCodeManager, inputCombination){
        const colorMatchStatus = secretCodeManager.getSuporBlackWriteCombination(inputCombination);
        this.win = secretCodeManager.isWinningCombination(inputCombination);
        this.updateHistorial(colorMatchStatus, inputCombination);
    }

    lessMoviment(){
        this.maxTurns -= 1;
    }

    isWinner(){
        return this.win;
    }

    isGameEnd(){
        return this.win || this.maxTurns <= 0;
    }

    updateHistorial(colorMatchStatus, inputCombination){
        this.proposedCombinations.push(inputCombination);
        this.combinationColorStatus.push(colorMatchStatus);

        this.view.printCombination(inputCombination);
        this.view.printCombination(colorMatchStatus);
        this.view.printSeparador();
    }
}

class TurnM{
    constructor(player, secretCodeManager, gameLogic, view){
        this.player = player;
        this.secretCodeManager = secretCodeManager;
        this.gameLogic = gameLogic; 
        this.view = view;
    }

    getCurrentPlayer(){
        return this.player;
    }

    makeMove(){
        this.view.printMessageLessMoviments(this.gameLogic.getRemainingTurns());  
        const inputCombination = this.player.getPlayerInputCombination();
        this.gameLogic.guessCode(this.secretCodeManager, inputCombination);

    }

    next(){
        this.gameLogic.lessMoviment();
    }

    isWinner(){
        return this.gameLogic.isWinner()
    }

    isGameEnd(){
        return this.gameLogic.isGameEnd();
    }
}

class SecretCodeManager{
    constructor(view){
        this.view = view;
        this.validColors;
        this.winCombination;
    }

    init(){
        this.validColors = new Combination(["BLANCO", "NEGRO", "AMARILLO", "VERDE", "ROJO", "AZUL", "NARANJA"]);
        this.winCombination = this.getRandomGeneratedCombination();
        this.printCombination();
    }

    printCombination(){
        this.view.printCombination(this.winCombination);
    }

    getValidColorsLength(){
        return this.validColors.getLength();
    }

    getValidColors(){
        return this.validColors;
    }

    getRandomGeneratedCombination(){
        let winCombination = new Combination();
        do{
            const index = Math.floor(Math.random() * this.validColors.getLength());
            if(!winCombination.contains(this.validColors.getColor(index))){
                winCombination.push(this.validColors.getColor(index));
            }
        }while(winCombination.getLength() < 5)
        return winCombination;
    }

    isWinningCombination(combination){
        return this.winCombination.isEqual(combination);
    }

    isLengthEqual(combination){
        return combination.getLength() === this.winCombination.getLength();
    }

    isValidCombination(combination){
        if(!this.isLengthEqual(combination)){
            this.view.printError("ErrorLenght");
            return false;
        }

        for(let i = 0; i < combination.getLength(); i++){
            if(!this.validColors.contains(combination.getColor(i))){
                this.view.printError("ErrorColor");
                this.view.printMessageColorNoValid(combination.getColor(i));
                return false;
            }
        }
        return true;    
    }

    getSuporBlackWriteCombination(combination){
            let supportCombination = new Combination();
            for(let i = 0; i < combination.getLength(); i++){
                const color = combination.getColor(i);
                if(color === this.winCombination.getColor(i)){
                    supportCombination.push("BLANCO");
                }else if(this.winCombination.contains(color)){
                    supportCombination.push("NEGRO");
                }else{
                    supportCombination.push("VACIO");
                }                
            }
            return supportCombination;        
    }
}

class Mastermaind{
    constructor(){
        this.view = new ViewM();
        this.secretCodeManager; 
        this.player;
        this.gameLogic; 
        this.turn; 
    }

    init(){
        this.secretCodeManager = new SecretCodeManager(this.view); 
        this.secretCodeManager.init();

        this.player = this.createPlayerByMode(this.view);
        this.gameLogic = new GameLogicM(this.view);
        this.turn = new TurnM(this.player, this.secretCodeManager, this.gameLogic, this.view);

        do{
            this.turn.makeMove();
            if(!this.turn.isWinner()){
                this.turn.next();
            }            
        }while(!this.turn.isGameEnd())

        this.view.printMessageEndGame(this.gameLogic.isWinner());       
    }

    createPlayerByMode(){
        const self = this;
        const PLAYER_MODES = [new PlayerM("JUGADOR", this.secretCodeManager, this.view),
                            new PlayerM("MAQUINA", this.secretCodeManager, this.view)]
        return PLAYER_MODES[getPlayerModeInput(self) - 1];

        function getPlayerModeInput(self) {
            let answer;
            let isAnswerdValid;
            do {
                answer = self.view.promptChoisePlayerType();
                isAnswerdValid = answer === 1 || answer === 2;
                if(!isAnswerdValid){
                    self.view.printError("ErrorInvaidOption");
                }
            } while (!isAnswerdValid);
            return answer;
        }
    }
}

class viewApp{
    promptSelectGame(){
        return parseInt(prompt('JUGAR MASTERMAIND ELIGE :1 \nJUGAR CONNECTA 4 ELIGE: 2 \nJUGAR TIC TAC TOE ELIGE : 3'));
    }

    promptPlayAgain(type){
        const messages ={   keepPlayingSameGame: "Quieres jugar otra partida (SI/NO): ",
                            keepPlaying: "Quiere seguir jugando a algún juego (SI/NO): "}

        return prompt(messages[type]);
    }

    printGameSeleted(gameSelected){
        console.log("EL JUEGO SELECCIONADO HA SIDO: " + gameSelected)
    }

    printError(error){
        const errors = {
            ErrorInvaidOption: "El valor ingresadod no es valido, solo se acepta valores 1 o 2 o 3. ",
            ErrorPlayAgainOption: "Error: LA RESPUESTA NO ES VALIDA SOLO SE ACEPTA (SI/NO)",
            ErrorChooseGame: "El valor introducino no es valido solo se acepta valores 1 o 2 o 3."
        }

        console.log(errors[error]);
    }

    printMessageEndGame(){
        console.log("EL JUEGO HA FINALIZADO, ELIJA OTRO JUEGO O ELIJA SALIR DE LA APLICACIÓN.")
    }

    printMessageEndApp(){
        console.log("LA APLICACION HA FINALIZADO. hASTA OTRA!");
    }

}

class App{
    constructor(){
        this.game;
        this.view = new viewApp(); 
    }

    start(){
        do{
            this.game = this.createGameBySelection();
            do{
                this.game.init();
            }while(this.playAgain("keepPlayingSameGame"))    
            this.view.printMessageEndGame();   
        }while(this.playAgain("keepPlaying"))
        this.view.printMessageEndApp();
    }

    createGameBySelection(){
        const view = this.view;
        let selectedGame = selectGame();
        
        switch(selectedGame){
            case 1:
                return new Mastermaind();
            case 2:
                return new Connecta4();
            case 3:
                return new Tictactoe();
            default:
                return null; 
        }

        function selectGame() {
            const NAME_GAMES = ["Mastermind", "Connect 4", "Tic Tac Toe"];

            let selectedGame;
            let isValid = false;
            do {
                selectedGame = view.promptSelectGame();
                isValid = selectedGame === 1 || selectedGame === 2 || selectedGame === 3;
                if (!isValid) {
                    view.printError("ErrorChooseGame");
                }
            } while (!isValid);
            view.printGameSeleted(NAME_GAMES[selectedGame - 1]);
            return selectedGame;
        }
    }

    playAgain(message){
        let restardGame;
        let isAnswerValid;
        do{
            restardGame = this.view.promptPlayAgain(message);
            restardGame = restardGame.toUpperCase();
            isAnswerValid = restardGame === 'SI' || restardGame === 'NO';
            if (!isAnswerValid){
                this.view.printError("ErrorPlayAgainOption");
            }
        }while(!isAnswerValid)
    
        return restardGame === 'SI'; 
    }
}

let app = new App()
app.start()

