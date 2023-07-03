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
    constructor(board) {
        this.board = board;
    }

    callEnterDataByFunction(playerType){
        const board = this.board;
        let inputCell;

        function getFileColumn() {
            let inputRow, inputColumn;
            do{
                inputRow = parseInt(prompt("Agrega una posicion valida del tablero ROW 1-2-3"));
                inputColumn = parseInt(prompt("Agrega una posicion valida del tablero COLUMN 1-2-3"));
                inputRow -= 1;
                inputColumn -= 1;
                inputCell = new Cell(inputRow, inputColumn);
            }while(!board.isPosititionValid(inputCell));
            return inputCell;
        }

        function getRandomPosition(){ 
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
    constructor(token, playerType, name, board){
        this.token = token
        this.playerType = playerType        
        this.NAME = name;
        this.dataInput = new DataInputT(board); 
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
    constructor(players, board, gameLogic){
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
        this.board.print();
    
        console.log("TIRADA END")
    }

    isWinner(){
        return this.gameLogic.isWinner();
    }

    gameEnd(){
        return this.gameLogic.gameEnd(this.board);
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
        console.log(inputCell.getRow() + " " +  inputCell.getColumn() + " " + token);
        this.boardState[inputCell.getRow()][inputCell.getColumn()] = token;
        this.availableCells -= 1;
    }

    isPosititionValid(inputCell){
        const row = inputCell.getRow();
        const column = inputCell.getColumn();
        const isValidRow = row !== undefined && !isNaN(row) && row >= 0 && row <= 2;
        const isValidColumn = column !== undefined && !isNaN(column) && column >= 0 && column <= 2;
        const isPositionEmpty = this.boardState[row][column] === "0";

        if (!isPositionEmpty){
            console.log("LA POSICION ELEGIDA NO ES VALIDA POR QUE YA ESTA OCUPADA");
        }

        return isValidRow && isValidColumn && isPositionEmpty;
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
        this.board;
        this.gameLogic;
        this.turn = NaN;
    }

    initialValues(){
        this.board = new BoardT(3, 3);
        this.gameLogic = new GameLogicT();
        this.turn = new TurnT(this.createPlayersByMode(), this.board, this.gameLogic);
    }

    init(){
        console.log(" INICIA EL JUEGO TIC TAC TOE ");       
        this.initialValues(); 
        this.board.print();

        do{
            this.turn.makeMove();
            if(!this.turn.isWinner()){
                this.turn.next();
            }
        }while(!this.turn.gameEnd())
        this.printMessageEndGame(this.turn.getCurrentPlayer().getName());
    }

    printMessageEndGame(playerName){
        this.turn.win() ?  console.log("ENORABUENA EL JUGADOR: " + playerName + " HA GANADO"):
                    console.log("NO HAY MAS MOVIMIENTOS POSIBLE, EMPATE");        
    }

    createPlayersByMode(){
        const TOKEN_STATE = ['X', 'Y'];
        const PLAYERS = ["JUGADOR", "MAQUINA"];
        let answer;
        let isValid;
        do{
            answer = parseInt(prompt('JUGADOR VS JUGADOR ELIGE :1 \nJUGADOR VS MAQUINA ELIGE: 2 \nMAQUINA VS MAQUINA: ELIGE : 3'));
            isValid = answer === 1 || answer === 2 || answer === 3;
        }while(!isValid)

        const GAME_MODES = [[new PlayerT(TOKEN_STATE[0], PLAYERS[0], "PLAYER 1", this.board),
                            new PlayerT(TOKEN_STATE[1], PLAYERS[0], "PLAYER 2", this.board)],
                            
                            [new PlayerT(TOKEN_STATE[0], PLAYERS[0], "PLAYER 1", this.board),
                            new PlayerT(TOKEN_STATE[1], PLAYERS[1], "PLAYER 2", this.board)],
                            
                            [new PlayerT(TOKEN_STATE[0], PLAYERS[1], "PLAYER 1", this.board),
                            new PlayerT(TOKEN_STATE[1], PLAYERS[1], "PLAYER 2", this.board)]];

        return GAME_MODES[answer - 1];        
    }    
}

// ---------- CONNECTA 4 ----------
class DataInputC{
    constructor(board){
        this.board = board;
    }

    callEnterDataByFunction(playerType){
        const board = this.board;
        function getColumn(){
            let column;
            do{ 
                column = parseInt(prompt("Agrega una posicion valida del tablero, columna 1 ... 7"));         
                column -= 1;
            }while(!board.isPositionValid(column)) 
            return column;
        }

        function getRandomColumn(){
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

    print(){        
        console.log("| " +  this.getColor(0) + " | " + 
                            this.getColor(1) + " | " + 
                            this.getColor(2) + " | " + 
                            this.getColor(3) + " | " + 
                            this.getColor(4) + " |");
    }
}

class DataInputM{
    constructor(secretCodeManager){
        this.secretCodeManager = secretCodeManager;
    }

    callEnterDataByFunction(playerType){
        const secretCodeManager = this.secretCodeManager;
        function getCombinationPlayer(){
            let inputCombination;
            
            do{                     
                let entrada = prompt("Agrega una combinacion de 5 colores validos: ");
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
    constructor(playerType, secretCodeManager){
        this.PLAYER_TYPE = playerType;        
        this.NAME = "JUGADOR 1";
        this.dataInput = new DataInputM(secretCodeManager); 
    }

    getName(){
        return this.NAME;
    }

    getMove(){
        return this.dataInput.getInput(this.PLAYER_TYPE);
    }
}

class GameLogicM{
    constructor(){
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
        this.combinationColorStatus.push(colorMatchStatus)
        inputCombination.print();
        colorMatchStatus.print();
        console.log("----------------------------");
    }
}

class TurnM{
    constructor(player, secretCodeManager, gameLogic){
        this.player = player;
        this.secretCodeManager = secretCodeManager;
        this.gameLogic = gameLogic; 
    }

    getCurrentPlayer(){
        return this.player;
    }

    makeMove(){
        console.log(" MOVIMIENTOS RESTANTES: " + this.gameLogic.getLessMoviments());
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
    constructor(){
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
            return false;
        }

        for(let i = 0; i < combination.getLength(); i++){
            if(!this.validColors.contains(combination.getColor(i))){
                console.log("color no encontrado");
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

    printCombination(){
        console.log(this.winCombination.print());
    }
}

class Mastermaind{
    constructor(){
        this.turn;
        this.player; 
        this.gameLogic; 
        this.secretCodeManager;
    }

    init(){
        this.secretCodeManager = new SecretCodeManager();
        this.player = this.createPlayerByMode();
        this.gameLogic = new GameLogicM();
        this.turn = new TurnM(this.player, this.secretCodeManager, this.gameLogic);

        do{
            this.turn.makeMove();
            if(!this.turn.isWinner()){
                this.turn.next();
            }            
        }while(!this.turn.gameEnd())

        this.printMessageEndGame();
    }

    printMessageEndGame(){
        this.gameLogic.isWinner()?
            console.log("ENORABUENA EL JUGAODR HA GANADO"):
            console.log("NO HAY MAS MOVIMIENTOS POSIBLE, HAS PERDIDO");        
    }

    createPlayerByMode(){
        const PLAYER_MODES = [new PlayerM("JUGADOR", this.secretCodeManager),
                            new PlayerM("MAQUINA", this.secretCodeManager)]
        return PLAYER_MODES[getPlayerModeInput() - 1];

        function getPlayerModeInput() {
            let answer;
            let isAnswerdValid;
            do {
                answer = parseInt(prompt('JUGADOR ELIGE :1 \nMAQUINA ELIGE: 2'));
                isAnswerdValid = answer === 1 || answer === 2;
            } while (!isAnswerdValid);
            return answer;
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
        const optionGame = this.chooseOptionGame();
        console.log("Check game " + optionGame);
        return GAMES[optionGame - 1];
    }

    playAgain(mensaje){
        let answer;
        let isAnswerValid;
        do{
            answer = prompt(mensaje);
            isAnswerValid = answer === 'SI' || answer === 'NO';
            if (!isAnswerValid){
                console.log("LA RESPUESTA NO ES VALIDA, SOLO SE ACEPTA SI O NO EN MAYUSCULAS");
            }
        }while(!isAnswerValid)
    
        return answer === 'SI'; 
    }
}

let app = new App()
app.start()

