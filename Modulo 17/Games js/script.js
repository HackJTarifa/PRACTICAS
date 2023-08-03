// ---------- TIC TAC TOE ----------
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
    constructor(functionByMode){
        this.functionByMode = functionByMode;
    }

    getDataInput(board){
        return this.functionByMode(board);
    }
}

class PlayerT{
    constructor(token, playerType, name, functionByMode){
        this.token = token;
        this.playerType = playerType;        
        this.NAME = name;
        this.dataInput = new DataInputT(functionByMode); 
    }
    
    getName(){
        return this.NAME;
    }

    getToken() { 
        return this.token;
    }

    getMove(board){
        return this.dataInput.getDataInput(board);
    }
}

class PlayerFactoryT{
    getGameMode(playerMode){
        this.TOKEN_STATE = ['X', 'Y'];
        this.PLAYER_TYPES = ["JUGADOR", "MAQUINA"];
        this.PLAYER_NAMES = ["PLAYER 1","PLAYER 2"];

        switch(playerMode) {
            case 0:
                return [new PlayerT(this.TOKEN_STATE[0], this.PLAYER_TYPES[0], "PLAYER 1", this.callEnterDataByFunction( this.PLAYER_TYPES[0])),
                new PlayerT(this.TOKEN_STATE[1], this.PLAYER_TYPES[0], "PLAYER 2", this.callEnterDataByFunction( this.PLAYER_TYPES[0]))];
            case 1: 
                return [new PlayerT(this.TOKEN_STATE[0], this.PLAYER_TYPES[0], "PLAYER 1", this.callEnterDataByFunction( this.PLAYER_TYPES[0])),
                new PlayerT(this.TOKEN_STATE[1], this.PLAYER_TYPES[1], "PLAYER 2", this.callEnterDataByFunction( this.PLAYER_TYPES[1]))];
            case 2:
                return [new PlayerT(this.TOKEN_STATE[0], this.PLAYER_TYPES[1], "PLAYER 1", this.callEnterDataByFunction( this.PLAYER_TYPES[1])),
                new PlayerT(this.TOKEN_STATE[1], this.PLAYER_TYPES[1], "PLAYER 2", this.callEnterDataByFunction( this.PLAYER_TYPES[1]))];
            default: 
                return undefined;
        }
    }

    createPlayersByMode(){
        let playersModes = getPlayesModes();
        return this.getGameMode(playersModes - 1);        

        function getPlayesModes() {
            let playersModes;
            let isValid;
            do {
                playersModes = parseInt(prompt('JUGADOR VS JUGADOR ELIGE :1 \nJUGADOR VS MAQUINA ELIGE: 2 \nMAQUINA VS MAQUINA: ELIGE : 3'));
                isValid = playersModes === 1 || playersModes === 2 || playersModes === 3;
                if (!isValid) {
                    console.log("ErrorChoisePlayesModes: El valor introducino no se corresponde con ningún modo de juego.");
                }
            } while (!isValid);
            return playersModes;
        }
    }   

    callEnterDataByFunction(playerType){
        let inputCell;

        const getFileColumn = function(board) {
            let inputRow, inputColumn;
            if(board === undefined){
                console.log("ERROR: Board es undefined");
            }
            do{
                inputRow = parseInt(prompt("Agrega una posicion valida del tablero ROW 1-2-3"));
                inputColumn = parseInt(prompt("Agrega una posicion valida del tablero COLUMN 1-2-3"));
                inputRow -= 1;
                inputColumn -= 1;
                inputCell = new Cell(inputRow, inputColumn);
            }while(!board.isPositionValid(inputCell));
            return inputCell;
        }

        const getRandomPosition = function(board){ 
            let validPositions = [];
            for(let i = 0; i < board.getFilesLength(); i++){             
                for (let j = 0; j < board.getColumnsLength(); j++){
                    if (board.isPositionValid(new Cell(i, j))){
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

        return modes[playerType];
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
        this.win = this.playerWin(board, player);
    }

    isGameEnd(board){
        return this.win || board.isFull();
    }

    playerWin(board, player){
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
    constructor(){
        this.board = this.createBoard();
        this.players = this.createPlayers();
        this.gameLogic = new GameLogicT();;
        this.playerIndex = 0;
        this.currentPlayer = this.players[this.playerIndex];
    }

    createPlayers(){
        const playerFactory = new PlayerFactoryT();
        return playerFactory.createPlayersByMode();        
    }

    createBoard(){
        const ROWS = 3;
        const COLUMNS = 3;
        return new BoardT(ROWS, COLUMNS);
    }

    getBoard(){
        return this.board;
    }

    getCurrentPlayer(){
        return this.currentPlayer;
    }

    next(){
        this.playerIndex = (this.playerIndex + 1) % this.players.length;
        this.currentPlayer = this.players[this.playerIndex];
    }

    makeMove(){
        console.log("Turn -> makeMove -> board: " + this.board);
        let inputCell = this.currentPlayer.getMove(this.board);
        console.log(inputCell);

        this.board.update(inputCell, this.currentPlayer.getToken());
        this.gameLogic.gessCombination(this.board, this.currentPlayer);
        this.board.print();
    
        console.log("TIRADA END")
    }

    isWinner(){
        return this.gameLogic.isWinner();
    }

    isGameEnd(){
        return this.gameLogic.isGameEnd(this.board);
    }
}

class BoardT{
    constructor(rows, columns){
        this.rows = rows;
        this.columns = columns;
        this.boardState = this.inicializeTablero(this.rows, this.columns);
        this.availableCells = 9;
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

    isFull(){
        return this.availableCells <= 0; 
    }

    update(inputCell, token){
        this.boardState[inputCell.getRow()][inputCell.getColumn()] = token;
        this.availableCells -= 1;
    }

    isPositionValid(inputCell){
        const row = inputCell.getRow();
        const column = inputCell.getColumn();
        if(row === undefined){
            console.log("ErrorRowUndefined: el valor row es indefinido.");
            return false;
        }

        if(column === undefined){
            console.log("ErrorColumnUndefined: el valor column es indefinico.");
            return false;
        }
        
        if(isNaN(row)){
            console.log("ErrorRowNaN: El valor introducido en row no es un número.");
            return false;
        }

        if(isNaN(column)){
            console.log("ErrorColumnNaN: El valor introducido en column no es un número.");
            return false;
        }

        if(row < 0 || row > 2){
            console.log("ErrorRowOutRange: El valor introducido de row esta fuera de rango.");
            return false;
        }

        if(column < 0 || column > 2){
            console.log("ErrorColumnOutRange: El valor introducido de column esta fuera de rango.");
            return false;
        }

        const isPositionEmpty = this.boardState[row][column] === "0";
        if (!isPositionEmpty){
            console.log("ErrorCellOccupied: La celda elegida ya esta ocupada.");
            return false;
        }

        return true;
    }

    getPosition(row, column){
        return this.boardState[row][column];
    }

    print(){
        console.log(this.boardState[0]);
        console.log(this.boardState[1]);
        console.log(this.boardState[2]);
    }
}

class Tictactoe{
    constructor(){    
        this.turn = new TurnT();
    }

    init(){
        console.log(" INICIA EL JUEGO TIC TAC TOE ");       
        this.turn.getBoard().print();

        do{
            this.turn.makeMove();
            if(!this.turn.isWinner()){
                this.turn.next();
            }
        }while(!this.turn.isGameEnd())
        this.printMessageEndGame(this.turn.isWinner(), this.turn.getCurrentPlayer().getName());
    }

    printMessageEndGame(isWinner, playerName){
        isWinner ?  console.log("ENORABUENA EL JUGADOR: " + playerName + " HA GANADO"):
                    console.log("NO HAY MAS MOVIMIENTOS POSIBLE, EMPATE");        
    } 
}

// ---------- CONNECTA 4 ----------
class Moviment{
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

class DataInputC{
    constructor(functionByMode){
        this.functionByMode = functionByMode;
    }

    getDataInput(board){
        return this.functionByMode(board);
    }
}

class BoardC{
    constructor(rowns, columns){
        this.ROWNS = rowns; // 6
        this.COLUMNS = columns; // 7
        this.boardState = this.inicializeBoard(this.ROWNS, this.COLUMNS);
        this.aviableCells = this.ROWNS * this.COLUMNS;
        this.lastMoviment = NaN;
    }

    getLastMoviment(){
        return this.lastMoviment;
    }

    rowsLength(){
        return this.ROWNS;
    }

    columnsLength(){
        return this.COLUMNS;
    }

    inicializeBoard(rowns, columns){    
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
            console.log("ErrorColumnNaN: El valor introducido en columna no es un numero.");
            return false;
        }

        if(column === undefined){
            console.log("ErrorColumnUndefined: No se ha ingresado ningún valor.");
            return false;
        }

        const isValidColumn = column >= 0 && column <= this.COLUMNS - 1;
        if(!isValidColumn){
            console.log("ErrorColumnOutRange: El valor introducido esta fuera de rango.");
            return false;
        }

        for(let i = 0; i < this.ROWNS; i++){ 
            if(this.boardState[column][i] === "0"){
                return true;                
            }
        }
        console.log("ErrorColumnFull: La celda elegida ya esta llena.");
        return false;
    }

    update(column, tokenState){
        let row = 0;     
        while(this.boardState[column][row] !== "0"){
            row += 1;
        }    
        this.boardState[column][row] = tokenState;
        this.lastMoviment = new Moviment(row, column, tokenState); 
        this.aviableCells -= 1;
    }

    print(){
        for(let i = 0; i < this.COLUMNS; i++){
            console.log(this.boardState[i]);
        }
        console.log(" ");
    }
}

class PlayerC{
    constructor(playerType, token, name, functionByMode){
        this.TOKEN = token;
        this.playerType = playerType;        
        this.NAME = name;
        this.dataInput = new DataInputC(functionByMode);
    }
    
    getName() { 
        return this.NAME;
    }

    getToken(){
        return this.TOKEN;
    }

    getMove(board){      
        return this.dataInput.getDataInput(board);
    }
}

class PlayerFactoryC{
    getGameMode(playerMode){
        const PLAYER_TYPES = ["JUGADOR", "MAQUINA"];
        const TOKEN_STATES = ['RED', 'YELLOW']; 

        switch(playerMode) {
            case 0:
                return [new PlayerC(PLAYER_TYPES[0], TOKEN_STATES[0], "PLAYER 1", this.callEnterDataByFunction(PLAYER_TYPES[0])),
                        new PlayerC(PLAYER_TYPES[0], TOKEN_STATES[1], "PLAYER 2", this.callEnterDataByFunction(PLAYER_TYPES[0]))];
            case 1:
                return [new PlayerC(PLAYER_TYPES[0], TOKEN_STATES[0], "PLAYER 1", this.callEnterDataByFunction(PLAYER_TYPES[0])),
                        new PlayerC(PLAYER_TYPES[1], TOKEN_STATES[1], "PLAYER 2", this.callEnterDataByFunction(PLAYER_TYPES[1]))];
            case 2:
                return [new PlayerC(PLAYER_TYPES[1], TOKEN_STATES[0], "PLAYER 1", this.callEnterDataByFunction(PLAYER_TYPES[1])),
                        new PlayerC(PLAYER_TYPES[1], TOKEN_STATES[1], "PLAYER 2", this.callEnterDataByFunction(PLAYER_TYPES[1]))];
            default:
                return undefined;
        }
    }

    createPlayersByMode(){
        const playersModes = getPlayersModes();
        return this.getGameMode(playersModes - 1);
        
        function getPlayersModes(){        
            let playersMode;
            let isValid;
            do {
                playersMode = parseInt(prompt('JUGADOR VS JUGADOR ELIGE :1 \nJUGADOR VS MAQUINA ELIGE: 2 \nMAQUINA VS MAQUINA: ELIGE : 3'));
                console.log(playersMode);
                isValid = playersMode === 1 || playersMode === 2 || playersMode === 3;
                if (!isValid) {
                    console.log("ErrorInvalidOption: La opción elegida no es una opcion valida.");
                }
            } while (!isValid);
            return playersMode;
        }        
    }

    //TODO: Revisar funcion y comportamiento
    callEnterDataByFunction(playerType){
        function getColumn(board){
            let column;
            do{ 
                column = parseInt(prompt("Agrega una posicion valida del tablero, columna 1 ... 7"));         
                column -= 1;
            }while(!board.isPositionValid(column)) 
            return column;
        }

        function getRandomColumn(board){
            let column;
            const MAX_COLUMN = 7;
            do{
                column = Math.floor(Math.random() * MAX_COLUMN); // 0...6
            }while(!board.isPositionValid(column))
            return column;
        }
        
        const modes = {"JUGADOR": getColumn, 
                        "MAQUINA": getRandomColumn};

        return modes[playerType];  
    }
} 

class TurnC{
    constructor(){
        this.players = this.createPlayers();
        this.playerIndex = 0;
        this.currentPlayer = this.players[this.playerIndex];
        this.gameLogic = new GameLogicC();
        this.board = this.createBoard();
    }

    createPlayers(){
        const playerFactory = new PlayerFactoryC();
        return playerFactory.createPlayersByMode();
    }

    createBoard(){
        this.COLUMNS = 7;
        this.ROWNS = 6;
        return new BoardC(this.ROWNS, this.COLUMNS);
    }

    getCurrentPlayer() { 
        return this.currentPlayer;
    }

    next(){
        this.playerIndex = (this.playerIndex + 1) % this.players.length;
        this.currentPlayer = this.players[this.playerIndex];
    }

    makeMove(){
        let column = this.currentPlayer.getMove(this.board);

        this.board.update(column, this.currentPlayer.getToken());
        this.gameLogic.gessCombination(this.board);
        this.board.print();    
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
    
    isConnectFour(board, start, direction) {
        for(let i = 0; i < 4; i++){
            const row = start * direction.row + board.getLastMoviment().getRow() + direction.row * i;
            const column = start * direction.column + board.getLastMoviment().getColumn() + direction.column * i;
            
            if(!this.isInRage(row, column)){
                return false;
            }
            if(board.getLastMoviment().getToken() !== board.getPosition(column, row)){
                return false;
            }
        }
        return true;
    }

    checkDirection(board, direction){
        for(let start = -3; start <= 0; start++){
            if(this.isConnectFour(board, start, direction)){
                return true;
            }
        }
        return false;
    }

    isPlayerWinner(board){
        const directions = [
            { row: 1, column: 0 },    // Right            
            { row: 0, column: -1 },    // Down
            { row: 1, column: 1 },    // Right Down
            { row: 1, column: -1 },   // Right Up
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
        this.turn = new TurnC();
    }
    
    init(){
        console.log(" INICIA EL JUEGO CONNECTA 4 ");
        //this.board.print();

        do {
            this.turn.makeMove(this.board);
            if(!this.turn.isWinner()){
                this.turn.next();
            }            
        } while (!this.turn.isGameEnd()); 
        this.printMessageEndGame(this.turn.isWinner(), this.turn.getCurrentPlayer().getName());
    }

    printMessageEndGame(isWinner, playerName){
        isWinner ?  console.log("ENORABUENA EL JUGADOR: " + playerName + " HA GANADO"):
                    console.log("NO HAY MAS MOVIMIENTOS POSIBLE, EMPATE");        
    }
}

// ---------- MASTERMAIND ---------
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

    print(){        
        console.log("| " +  this.getColor(0) + " | " + 
                            this.getColor(1) + " | " + 
                            this.getColor(2) + " | " + 
                            this.getColor(3) + " | " + 
                            this.getColor(4) + " |");
    }
}

class DataInputM{
    getInputCombination(secretCodeManager, playerType){
        function getCombinationPlayer(){
            let inputCombination;
            
            do{                     
                let entrada = prompt("Agrega una combinacion valida de 5 colores: ");
                inputCombination = new Combination(entrada.split(' '));
            }while(!secretCodeManager.isValidCombination(inputCombination))
            return inputCombination;
        }
        
        function getRandomTirada(){
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

        return modes[playerType]();
    }
}

class PlayerM{
    constructor(playerType){
        this.PLAYER_TYPE = playerType;        
        this.NAME = "JUGADOR 1";
        this.dataInput = new DataInputM(); 
    }

    getName(){
        return this.NAME;
    }

    getMove(secretCodeManager){
        return this.dataInput.getInputCombination(secretCodeManager, this.PLAYER_TYPE);
    }
}

class GameLogicM{
    constructor(){
        this.maxTurns = 15;
        this.proposedCombinations = [];
        this.combinationColorStatus = [];    
        this.win = false; 
    }

    getLessMoviments(){
        return this.maxTurns;
    }

    guessCode(secretCodeManager, inputCombination){
        const colorMatchStatus = secretCodeManager.checkCombinacionColorStatus(inputCombination);
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
        this.combinationColorStatus.push(colorMatchStatus)
        inputCombination.print();
        colorMatchStatus.print();
        console.log("----------------------------");
    }
}

class TurnM{
    constructor(player){
        this.secretCodeManager = new SecretCodeManager();
        this.player = player;
        this.gameLogic = new GameLogicM(); 
    }

    getCurrentPlayer(){
        return this.player;
    }

    makeMove(){
        console.log(" MOVIMIENTOS RESTANTES: " + this.gameLogic.getLessMoviments());
        const inputCombination = this.player.getMove(secretCodeManager);
        this.gameLogic.guessCode(this.secretCodeManager, inputCombination);
    }

    next(){
        this.gameLogic.lessMoviment();
    }

    isWinner(){
        this.gameLogic.isWinner()
    }

    isGameEnd(){
        return this.gameLogic.isGameEnd();
    }
}

class SecretCodeManager{
    constructor(){
        this.validColors = new Combination(["BLANCO", "NEGRO", "AMARILLO", "VERDE", "ROJO", "AZUL", "NARANJA"]);
        this.winCombination = this.getRandomGeneratedCombination();
        this.winCombination.print();
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
            console.log("ErrorLenght: La combinación introducina no tiene el número de colores adecuado.");
            return false;
        }

        for(let i = 0; i < combination.getLength(); i++){
            if(!this.validColors.contains(combination.getColor(i))){
                console.log("ErrorColorNotFound: El color no esta en la lista de colores validos.");
                return false;
            }
        }

        return true;    
    }

    checkCombinacionColorStatus(combination){
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

    printCombination(){
        console.log(this.winCombination.print());
    }
}

class Mastermaind{
    constructor(){
        this.turn = new TurnM(this.createPlayerByMode());
    }

    init(){
        do{
            this.turn.makeMove();
            if(!this.turn.isWinner()){
                this.turn.next();
            }            
        }while(!this.turn.isGameEnd())

        this.printMessageEndGame(this.turn.isWinner(), this.turn.getCurrentPlayer().getName());
    }

    printMessageEndGame(isWinner, playerName){
        isWinner?
            console.log("ENORABUENA EL JUGAODR" + playerName + " HA GANADO"):
            console.log("NO HAY MAS MOVIMIENTOS POSIBLE, HAS PERDIDO");        
    }

    createPlayerByMode(){
        const PLAYER_MODES = [new PlayerM("JUGADOR"),
                            new PlayerM("MAQUINA")]
        return PLAYER_MODES[getPlayerModeInput() - 1];

        function getPlayerModeInput() {
            let typePlayer;
            let isAnswerdValid;
            do {
                typePlayer = parseInt(prompt('JUGADOR ELIGE :1 \nMAQUINA ELIGE: 2'));
                isAnswerdValid = typePlayer === 1 || typePlayer === 2;
                if(!isAnswerdValid) {
                    console.log("ErrorInvaliOption: La opción elegida no es valida.");
                }
            } while (!isAnswerdValid);
            return typePlayer;
        }
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
            this.game = this.createGameBySelection();
            do{
                this.game.init();
            }while(this.playAgain(keepPlayingSameGame))    
        }while(this.playAgain(keepPlaying))
    }

    selectGame(){
        let selectGame;
        let isValid = false;
        do{
            selectGame = parseInt(prompt('JUGAR MASTERMAIND ELIGE :1 \nJUGAR CONNECTA 4 ELIGE: 2 \nJUGAR TIC TAC TOE ELIGE : 3'));
            isValid = selectGame === 1 || selectGame === 2 || selectGame === 3;
            if (!isValid) {
                console.log("ErrorChooseGame: El valor introducido no pertenece a ningún juego de la lista.");
            }
        }while(!isValid);
        return selectGame;
    }

    createGameBySelection(){
        const selectedGame = this.selectGame();
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
    }

    playAgain(mensaje){
        let restardGame;
        let isAnswerValid;
        do{
            restardGame = prompt(mensaje);
            restardGame = restardGame.toUpperCase();
            isAnswerValid = restardGame === 'SI' || restardGame === 'NO';
            if (!isAnswerValid){
                console.log("LA RESPUESTA NO ES VALIDA, SOLO SE ACEPTA SI O NO.");
            }
        }while(!isAnswerValid)
    
        return restardGame === 'SI'; 
    }
}

let app = new App()
app.start()


