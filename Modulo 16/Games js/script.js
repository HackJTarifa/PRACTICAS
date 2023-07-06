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

    callEnterDataByFunction(playerType){
        this.view = view;
        const board = this.board;
        let inputCell;

        const getFileColumn = function () {
            let inputRow, inputColumn;
            do{
                inputRow = this.view.promptRown();
                inputColumn = this.view.promptColumn();
                inputRow -= 1;
                inputColumn -= 1;
                inputCell = new Cell(inputRow, inputColumn);
            }while(!board.isPosititionValid(inputCell));
            return inputCell;
        }

        const getRandomPosition = function(){ 
            let validPositions = [];
            for(let i = 0; i < board.getFilesLength(); i++){             
                for (let j = 0; j < board.getColumnsLength(); j++){
                    if (board.isPositionValid(i, j)){
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
        return this.dataInput.callEnterDataByFunction(this.playerType);
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

    gameEnd(board){
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

    gameEnd(){
        return this.gameLogic.gameEnd(this.board);
    }
}

class BoardT{
    constructor(rows, columns, view){
        this.view = view;
        this.rows = rows;
        this.columns = columns;
        this.boardState = this.inicializeTablero(this.rows, this.columns);
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

        if(row >= 0 && row <= 2){
            this.view.printError("ErrorRowOutRange");
            return false;
        }

        if(column >= 0 && column <= 2){
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

    initialValues(){
        this.view = new ViewT();
        this.board = new BoardT(3, 3, this.view);
        this.gameLogic = new GameLogicT();
        this.turn = new TurnT(this.createPlayersByMode(), this.board, this.gameLogic, this.view);
    }

    init(){
        console.log(" INICIA EL JUEGO TIC TAC TOE ");       
        this.initialValues(); 
        this.view.printBoardState(this.board.getState());

        do{
            this.turn.makeMove();
            if(!this.turn.isWinner()){
                this.turn.next();
            }
        }while(!this.turn.gameEnd())
        this.view.printMessageEndGame(this.turn.isWinner(), this.turn.getCurrentPlayer().getName());
    }

    createPlayersByMode(){
        const TOKEN_STATE = ['X', 'Y'];
        const PLAYERS = ["JUGADOR", "MAQUINA"];
        let playersModes;
        let isValid;
        do{
            playersModes = this.view.promptPlayersModes();
            isValid = playersModes === 1 || playersModes === 2 || playersModes === 3;
            if(!isValid) {
                this.view.printError("ErrorChoisePlayesModes");
            }
        }while(!isValid)

        const GAME_MODES = [[new PlayerT(TOKEN_STATE[0], PLAYERS[0], "PLAYER 1", this.board),
                            new PlayerT(TOKEN_STATE[1], PLAYERS[0], "PLAYER 2", this.board)],
                            
                            [new PlayerT(TOKEN_STATE[0], PLAYERS[0], "PLAYER 1", this.board),
                            new PlayerT(TOKEN_STATE[1], PLAYERS[1], "PLAYER 2", this.board)],
                            
                            [new PlayerT(TOKEN_STATE[0], PLAYERS[1], "PLAYER 1", this.board),
                            new PlayerT(TOKEN_STATE[1], PLAYERS[1], "PLAYER 2", this.board)]];

        return GAME_MODES[playersModes - 1];        
    }    
}

// ---------- CONNECTA 4 ----------
//TODO: falta modificacion de view del juego connecta 4
//TODO: falta la correccion de errores, y el testeo de todos los juegos.
class ViewC{}

class DataInputC{
    constructor(board){
        this.board = board;
    }

    callEnterDataByFunction(playerType){
        const board = this.board;
        const getColumn = function(){
            let column;
            do{ 
                column = parseInt(prompt("Agrega una posicion valida del tablero, columna 1 ... 7"));         
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

    getInput(playerType){
        return this.callEnterDataByFunction(playerType);
    }
}

class BoardC{
    constructor(rowns, columns){
        this.ROWNS = rowns; // 6
        this.COLUMNS = columns; // 7
        this.boardState = this.inicializeBoard(this.ROWNS, this.COLUMNS);
        this.aviableCells = this.ROWNS * this.COLUMNS;
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

    gePosition(column, row){
        return this.boardState[column][row];
    }

    isFull(){
        return this.aviableCells <= 0;
    }

    isPositionValid(column){
        const isValidPos = typeof column === 'number' && !isNaN(column) && column !== undefined;
        if(!isValidPos){
            console.log("ERROR EN EL VALOR INGRESADO, VALOR NULO, O NO ES UN NUMERO");
            return false;
        }

        const isValidColumn = column >= 0 && column <= this.COLUMNS - 1;
        if(!isValidColumn){
            console.log("LA POSICION ELEGIDA ESTA FUERA DE RANGO 1...7");
            return false;
        }

        let emptyPosition = false;
        for(let i = 0; i < this.ROWNS; i++){ 
            if(this.boardState[column][i] === "0"){
                return true;                
            }
        }
        console.log("LA COLUMNA ELEGIDA NO ES VALIDA, ESTA LLENA.");        
        return false;
    }

    update(col, tokenState){
        let row = 0;     
        while(this.boardState[col][row] !== "0"){
            row += 1;
        }    
        this.boardState[col][row] = tokenState;
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
    constructor(playerType, token, name, board){
        this.TOKEN = token
        this.playerType = playerType        
        this.NAME = name;
        this.dataInput = new DataInputC(board);
    }
    
    getName() { 
        return this.NAME;
    }

    getToken(){
        return this.TOKEN;
    }

    getMove(){      
        return this.dataInput.callEnterDataByFunction(this.playerType);
    }
}

class TurnC{
    constructor(players, gameLogic, board){
        this.players = players;
        this.playerIndex = 0;
        this.currentPlayer = this.players[this.playerIndex];
        this.gameLogic = gameLogic;
        this.board = board;
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
        this.gameLogic.gessCombination(this.board, this.getCurrentPlayer());
        this.board.print();    
    }

    isWinner(){
        return this.gameLogic.isWinner();
    }

    gameEnd(){
        return this.gameLogic.gameEnd(this.board);
    }
}

class GameLogicC{
    constructor(){
        this.win = false;
    }

    isWinner(){
        return this.win;
    }
    
    gameEnd(board){
        return this.win || board.isFull();
    }

    gessCombination(board, player){
        this.win = this.playerWin(board, player);
    }

    playerWin(board, player){
        const romsLength = board.rowsLength();
        const columnsLength = board.columnsLength();
        console.log(romsLength + " --- " + columnsLength);
        let cuantroEnRaya = false;
        for(let row = 0; row < romsLength ; row++){
            for(let column = 0; column < columnsLength; column++){
                cuantroEnRaya = this.checkPosition(board, column, row, player.getToken());
                if (cuantroEnRaya){
                    return true;
                }
            }
        }
        return false;
    }

    checkPosition(board, column, row, token) {
        const CONNECTA_SIZE = 4;
        if(CONNECTA_SIZE + column < 7){          
            console.log("col pos: " + (CONNECTA_SIZE + column));           
            if (board.gePosition(column, row) == token && 
            board.gePosition(column + 1, row) == token && 
            board.gePosition(column + 2, row) == token && 
            board.gePosition(column + 3, row) == token){
                return true;
            }
        }                 
        if(CONNECTA_SIZE + row < 6){
            console.log("row pos: " + (CONNECTA_SIZE + row));      
            if(board.gePosition(column, row) == token && 
            board.gePosition(column, row + 1) == token && 
            board.gePosition(column, row + 2) == token && 
            board.gePosition(column, row + 3) == token){
                console.log("CUARTRO EN RAYA");
                return true;
            }
        }
        if(CONNECTA_SIZE + column < 7 && CONNECTA_SIZE + row < 6){
            console.log("col pos: " + (CONNECTA_SIZE + column) + " row pos: " + (CONNECTA_SIZE + row));     
            if(board.gePosition(column, row) == token && 
            board.gePosition(column + 1, row + 1) == token && 
            board.gePosition(column + 2, row + 2) == token && 
            board.gePosition(column + 3, row + 3) == token ||
            board.gePosition(column, row + 3) == token && 
            board.gePosition(column + 1, row + 2) == token && 
            board.gePosition(column + 2, row + 1) == token && 
            board.gePosition(column + 3, row) == token) {
                return true;
            }
        }
        return false;
    }

    printMessageEndGame(playerName){
        this.win ?  console.log("ENORABUENA EL JUGADOR: " + playerName + " HA GANADO"):
                    console.log("NO HAY MAS MOVIMIENTOS POSIBLE, EMPATE");        
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

    initialValues(){
        this.board = new BoardC(this.ROWNS, this.COLUMNS);
        this.gameLogic = new GameLogicC();
        this.turn = new TurnC(this.createPlayersByMode(), this.gameLogic, this.board);
    }

    init(){
        console.log(" INICIA EL JUEGO CONNECTA 4 ");
        this.initialValues();
        this.board.print();

        do {
            this.turn.makeMove(this.board);
            if(!this.turn.isWinner()){
                this.turn.next(this.gameLogic);
            }            
        } while (!this.turn.gameEnd()); 
        this.gameLogic.printMessageEndGame(this.turn.getCurrentPlayer().getName());
    }

    createPlayersByMode(){
        const PLAYER_TYPES = ["JUGADOR", "MAQUINA"];
        const TOKEN_STATES = ['RED', 'YELLOW']; 
        let answer;
        let isAnswerdValid;
        do{
            answer = parseInt(prompt('JUGADOR VS JUGADOR ELIGE :1 \nJUGADOR VS MAQUINA ELIGE: 2 \nMAQUINA VS MAQUINA: ELIGE : 3'));
            isAnswerdValid = answer === 1 || answer === 2 || answer === 3;
        }while(!isAnswerdValid)


        //constructor(player, token, name){
        const GAME_MODES =  [[new PlayerC(PLAYER_TYPES[0], TOKEN_STATES[0], "PLAYER 1", this.board),
                            new PlayerC(PLAYER_TYPES[0], TOKEN_STATES[1], "PLAYER 2", this.board)],
                            
                            [new PlayerC(PLAYER_TYPES[0], TOKEN_STATES[0], "PLAYER 1", this.board),
                            new PlayerC(PLAYER_TYPES[1], TOKEN_STATES[1], "PLAYER 2", this.board)],
                            
                            [new PlayerC(PLAYER_TYPES[1], TOKEN_STATES[0], "PLAYER 1", this.board),
                            new PlayerC(PLAYER_TYPES[1], TOKEN_STATES[1], "PLAYER 2", this.board)]];
        return GAME_MODES[answer - 1];
    }

    gameEnd() {
        return this.win || this.board.isFull();
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

    printMessageEndGame(playerName){
        const PLAYERS = ["PLAYER 1", "PLAYER 2"];
        if (this.win){
            console.log("ENORABUENA EL JUGADOR: " + playerName + " HA GANADO");
        }else{
            console.log("NO HAY MAS MOVIMIENTOS POSIBLES, EMPATE");
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

    printMessageEndGame(winner){
        this.gameLogic.isWinner()?
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
        console.log(" MOVIMIENTOS RESTANTES: " + lessMoviments.getLessMoviments());
    }
}

class Combination{
    constructor(colors = []){
        this.colors = colors;
    }
    
    add(color){
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

    callEnterDataByFunction(playerType){
        const secretCodeManager = this.secretCodeManager;

        const getCombinationPlayer = function(){
            let inputCombination;
            
            do{                     
                let colors = this.view.promptColorsCombination();
                inputCombination = new Combination(colors.split(' '));
            }while(!secretCodeManager.isValidCombination(inputCombination))
            return inputCombination;
        }
        
        const getRandomTirada = function(){
            let colorsRandomTirada = new Combination();
            const N_COLORS = 5;
            const N_DIFERENT_COLORS = secretCodeManager.getValidColorsLength();
            const validColors = secretCodeManager.getValidColors();
            for(let i = 0; i < N_COLORS; i++){
                const validColorsRandomIndex = Math.floor(Math.random() * N_DIFERENT_COLORS);
                colorsRandomTirada.add(validColors.getColor(validColorsRandomIndex));
            }
            return colorsRandomTirada;
        }                                  
    
        const modes ={"JUGADOR": getCombinationPlayer,
                    "MAQUINA": getRandomTirada};

        return modes[playerType]();
    }

    getInput(playerType){
        return this.callEnterDataByFunction(playerType);
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

    getMove(){
        return this.dataInput.getInput(this.PLAYER_TYPE);
    }
}

class GameLogicM{
    constructor(view){
        this.view = view;
        this.maxTurns = 15;
        this.combinacionesPropuestas = [];
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

    gameEnd(){
        return this.win || this.maxTurns <= 0;
    }

    updateHistorial(colorMatchStatus, inputCombination){
        this.combinacionesPropuestas.push(inputCombination);
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
        this.view.printMessageLessMoviments(this.gameLogic.getLessMoviments());  
        const inputCombination = this.player.getMove();
        this.gameLogic.guessCode(this.secretCodeManager, inputCombination);

    }

    next(){
        this.gameLogic.lessMoviment();
    }

    isWinner(){
        this.gameLogic.isWinner()
    }

    gameEnd(){
        return this.gameLogic.gameEnd();
    }
}

class SecretCodeManager{
    constructor(view){
        this.view = view;
        this.validColors = new Combination(["BLANCO", "NEGRO", "AMARILLO", "VERDE", "ROJO", "AZUL", "NARANJA"]);
        this.winCombination = this.generateCombination();
        this.winCombination.print();
    }

    getValidColorsLength(){
        return this.validColors.getLength();
    }

    getValidColors(){
        return this.validColors;
    }

    generateCombination(){
        let winCombination = new Combination();
        do{
            const index = Math.floor(Math.random() * this.validColors.getLength());
            if(!winCombination.contains(this.validColors.getColor(index))){
                winCombination.add(this.validColors.getColor(index));
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

    checkCombinacionColorStatus(combination){
            let supportCombination = new Combination();
            for(let i = 0; i < combination.getLength(); i++){
                const color = combination.getColor(i);
                if(color === this.winCombination.getColor(i)){
                    supportCombination.add("BLANCO");
                }else if(this.winCombination.contains(color)){
                    supportCombination.add("NEGRO");
                }else{
                    supportCombination.add("VACIO");
                }                
            }
            return supportCombination;        
    }
}

class Mastermaind{
    constructor(){
        this.view = new ViewM();
        this.secretCodeManager = new SecretCodeManager(); 
        this.player = this.createPlayerByMode();
        this.gameLogic = new GameLogicM(this.view);
        this.turn = new TurnM(this.player, this.secretCodeManager, this.gameLogic, this.view);
    }

    init(){
        do{
            this.turn.makeMove();
            if(!this.turn.isWinner()){
                this.turn.next();
            }            
        }while(!this.turn.gameEnd())

        this.view.printMessageEndGame(this.gameLogic.isWinner());       
    }

    createPlayerByMode(){
        const PLAYER_MODES = [new PlayerM("JUGADOR", this.secretCodeManager, this.view),
                            new PlayerM("MAQUINA", this.secretCodeManager, this.view)]
        return PLAYER_MODES[getPlayerModeInput() - 1];

        function getPlayerModeInput() {
            let answer;
            let isAnswerdValid;
            do {
                answer = this.view.promptChoisePlayerType();
                isAnswerdValid = answer === 1 || answer === 2;
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

    printError(){
        console.log("Error: LA RESPUESTA NO ES VALIDA SOLO SE ACEPTA (SI/NO)")
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
            this.game = this.selectGame();
            do{
                this.game.init();
            }while(this.playAgain("keepPlayingSameGame"))    
            this.view.printMessageEndGame();   
        }while(this.playAgain("keepPlaying"))
        this.view.printMessageEndApp();
    }

    chooseGame(){
        let selectedGame;
        do{
            selectedGame = this.view.promptSelectGame();
        }while(!(selectedGame === 1 || selectedGame === 2 || selectedGame === 3));
        return selectedGame;
    }

    selectGame(){
        const GAMES = [new Mastermaind(), new Connecta4(), new Tictactoe()];        
        const NAME_GAMES = ["Mastermind", "Connect 4", "Tic Tac Toe"];
        const indexGame = this.chooseGame();
        this.view.printGameSeleted(NAME_GAMES[indexGame]);
        return GAMES[indexGame - 1];
    }

    playAgain(message){
        let restardGame;
        let isAnswerValid;
        do{
            restardGame = this.view.promptPlayAgain(message);
            restardGame = restardGame.toUpperCase();
            isAnswerValid = restardGame === 'SI' || restardGame === 'NO';
            if (!isAnswerValid){
                this.view.printError();
            }
        }while(!isAnswerValid)
    
        return restardGame === 'SI'; 
    }

}

let app = new App()
app.start()

