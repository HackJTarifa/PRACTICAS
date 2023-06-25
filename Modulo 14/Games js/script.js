class DataInputT{
    constructor(board) {
        this.board = board;
    }

    callEnterDataByFunction(playerType){
        const board = this.board;

        function getFileColumn() {
            let row, column;

            do{
                row = parseInt(prompt("Agrega una posicion valida del tablero ROW 1-2-3"));
                column = parseInt(prompt("Agrega una posicion valida del tablero COLUMN 1-2-3"));
                row -= 1;
                column -= 1;
            }while(!board.isPosititionValid(row, column))
            return [row, column];
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
            return [row, column];
        }

        const modes = {"JUGADOR": getFileColumn, 
                        "MAQUINA": getRandomPosition};

        return modes[playerType]();
    }

    getInput(playerType){
            return this.callEnterDataByFunction(playerType);
    }
}

class PlayerT{
    constructor(token, playerType, name, board){
        this.TOKEN = token
        this.playerType = playerType        
        this.NAME = name;
        this.dataInput = new DataInputT(board); 
    }

    getName(){
        return this.NAME;
    }

    getToken() { 
        return this.TOKEN;
    }

    getMove(){
        return this.dataInput.callEnterDataByFunction(this.playerType);
    }
}

class GameLogicT{
    constructor(turn){
        this.maxTurns;
        this.turn = turn;
        this.win = false;
    }

    init(){
        if(this.maxTurns !== 9){
            this.maxTurns = 9;
        }
    }

    getWin(){
        return this.win;
    }

    gessCombination(board, player){
        this.win = this.playerWin(board, player);

    }

    gameEnd(){
        return this.win || this.maxTurns <= 0;
    }

    lessMoviment(){
        this.maxTurns -= 1;
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

    printMessageEndGame(playerName){
        this.win ?  console.log("ENORABUENA EL JUGADOR: " + playerName + " HA GANADO"):
                    console.log("NO HAY MAS MOVIMIENTOS POSIBLE, EMPATE");        
    }


}

class TurnT{
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

    next(gameLogic){
        if(gameLogic.getWin()){
            return;
        }
        this.playerIndex = (this.playerIndex + 1) % this.N_PLAYERS;
        this.currentPlayer = this.players[this.playerIndex];
        gameLogic.lessMoviment();
    }

    makeMove(){
        let [row, column] =this.currentPlayer.getMove(this.board);

        this.board.update(row, column, this.currentPlayer.getToken());
        this.board.print();
    
        console.log("TIRADA END")
    }
}

class BoardT{
    constructor(rows, columns){
        this.rows = rows;
        this.columns = columns;
        this.boardState = this.inicializeTablero(this.rows, this.columns);
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
        this.boardState[row][column] = token;
    }

    isPosititionValid(row, column){
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
        this.turns = NaN;
    }

    initialValues(){
        this.board = new BoardT(3, 3);
        this.turns = new TurnT(this.getTypesPlayers(), this.board);
        this.gameLogic = new GameLogicT();
    }

    init(){
        console.log(" INICIA EL JUEGO TIC TAC TOE ");       
        this.initialValues(); 
        this.board.print();
        
        do {
            this.turns.makeMove();
            this.gameLogic.gessCombination(this.board, this.turns.getCurrentPlayer());
            this.turns.next(this.gameLogic);                        
        }while(!this.gameLogic.gameEnd())
        this.gameLogic.printMessageEndGame(this.turns.getCurrentPlayer().getName());
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

        const GAME_MODES = [[new PlayerT(TOKEN_STATE[0], PLAYERS[0], "PLAYER 1", this.board),
                            new PlayerT(TOKEN_STATE[1], PLAYERS[0], "PLAYER 2", this.board)],
                            
                            [new PlayerT(TOKEN_STATE[0], PLAYERS[0], "PLAYER 1", this.board),
                            new PlayerT(TOKEN_STATE[1], PLAYERS[1], "PLAYER 2", this.board)],
                            
                            [new PlayerT(TOKEN_STATE[0], PLAYERS[1], "PLAYER 1", this.board),
                            new PlayerT(TOKEN_STATE[1], PLAYERS[1], "PLAYER 2", this.board)]];

        return GAME_MODES[answerd - 1];        
    }    
}

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
        this.movRestantes = this.ROWNS * this.COLUMNS;
    }

    getMovRestantes(){
        return this.movRestantes;
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

    gePosition(file, column){
        return this.boardState[column][file];
    }

    isPositionValid(column){
        const isValidPos = typeof column === 'number' && !isNaN(column) && column !== undefined;
        const isValidColumn = column >= 0 && column <= this.COLUMNS - 1;
        let emptyPosition = false;

        for(let i = 0; i < this.ROWNS; i++){ 
            if(this.boardState[column][i] === "0"){
                emptyPosition = true;
                break;
            }
        }
        if (!isValidColumn){
            console.log("LA POSICION ELEGIDA ESTA FUERA DE RANGO 1...7 ");
        }else if(!emptyPosition){
            console.log("LA COLUMNA ELEGIDA NO ES VALIDA, ESTA LLENA.")
        }
        
        return isValidPos && isValidColumn && emptyPosition;
    }

    update(col, tokenState){
        let row = 0;     
        while(this.boardState[col][row] !== "0"){
            row += 1;
        }    
        this.boardState[col][row] = tokenState;
        this.movRestantes -= 1;
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
    constructor(players){
        this.players = players;
        this.playerIndex = 0;
        this.currentPlayer = this.players[this.playerIndex];
        this.N_PLAYERS = 2;
    }

    getCurrentPlayer() { 
        return this.currentPlayer;
    }

    next(gameLogic){
        if(gameLogic.getWin()){
            return
        }
        this.playerIndex = (this.playerIndex + 1) % this.N_PLAYERS;
        this.currentPlayer = this.players[this.playerIndex];
        gameLogic.lessMoviment();
    }

    makeMove(board){
        let column = this.currentPlayer.getMove(board);

        board.update(column, this.currentPlayer.getToken());
        board.print();    
    }
}

class GameLogicC{
    constructor(ROWNS, COLUMNS, turn){
        this.ROWNS = ROWNS;
        this.COLUMNS = COLUMNS;;
        this.maxTurn = ROWNS * COLUMNS;
        this.turn = turn;
        this.win = false;
    }

    init(){
        if(this.maxTurn !== 42){
            this.maxTurn = 42;
        }
    }

    getWin(){
        return this.win;
    }
    
    gameEnd(){
        return this.win || this.maxTurns <= 0;
    }

    lessMoviment(){
        this.maxTurns -= 1;
    }

    gessCombination(board, player){
        this.win = this.playerWin(board, player);
    }

    playerWin(board, player){
        let cuantroEnRaya = false;
        for(let idFil = 0; idFil < this.ROWNS ; idFil++){
            for(let idCol = 0; idCol < this.COLUMNS; idCol++){
                cuantroEnRaya = this.checkPosition(board, idCol, idFil, player.getToken());
                if (cuantroEnRaya){
                    return true;
                }
            }
        }
        return false;
    }

    checkPosition(board, col, row, token) {
        const CONNECTA_SIZE = 4;
        if(CONNECTA_SIZE + col < 7){                     
            if (board.gePosition(col, row) == token && 
            board.gePosition(col + 1, row) == token && 
            board.gePosition(col + 2, row) == token && 
            board.gePosition(col + 3, row) == token){
                return true;
            }
        }                 
        if(CONNECTA_SIZE + row < 6){
            if(board.gePosition(col, row) == token && 
            board.gePosition(col, row + 1) == token && 
            board.gePosition(col, row + 2) == token && 
            board.gePosition(col, row + 3) == token){
                console.log("CUARTRO EN RAYA");
                return true;
            }
        }
        if(CONNECTA_SIZE + col < 7 && CONNECTA_SIZE + row < 6){
            if(board.gePosition(col, row) == token && 
            board.gePosition(col + 1, row + 1) == token && 
            board.gePosition(col + 2, row + 2) == token && 
            board.gePosition(col + 3, row + 3) == token ||
            board.gePosition(col, row + 3) == token && 
            board.gePosition(col + 1, row + 2) == token && 
            board.gePosition(col + 2, row + 1) == token && 
            board.gePosition(col + 3, row) == token) {
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
        this.win = false;
        this.board;
        this.turn = NaN;
        this.gameLogic;
    }

    initialValues(){
        this.board = new BoardC(this.ROWNS, this.COLUMNS);
        this.turn = new TurnC(this.getGamePlayersModes());
        this.gameLogic = new GameLogicC(this.ROWNS, this.COLUMNS, this.turn);
    }

    init(){
        console.log(" INICIA EL JUEGO CONNECTA 4 ");
        this.initialValues();
        this.board.print();

        do {
            this.turn.makeMove(this.board);
            this.gameLogic.gessCombination(this.board, this.turn.getCurrentPlayer());
            this.turn.next(this.gameLogic);
        } while (!this.gameLogic.gameEnd()); 
        this.gameLogic.printMessageEndGame(this.turn.getCurrentPlayer().getName());
    }

    getGamePlayersModes(){
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
        return this.win || this.board.getMovRestantes() <= 0;
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

class Combination{
    constructor(combination){
        this.combination = combination;
    }    

    getLength(){
        return this.combination.length;
    }

    getColor(index){
        if(this.combination[index] !== undefined){
            return this.combination[index];
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

    callEnterDataByFunction(playerType, secretCodeManager){
        function getCombinationPlayer(secretCodeManager){
            let inputCombination;
            

            do{                     
                let entrada = prompt("Agrega una combinacion de 5 colores validos: ");
                inputCombination = new Combination(entrada.split(' '));
            }while(!secretCodeManager.isValidCombination(inputCombination))
            return inputCombination;
        }
        
        function getRandomTirada(secretCodeManager){
            let colorsRandomTirada = [];
            const N_COLORS = 5;
            const N_DIFERENT_COLORS = secretCodeManager.getValidColorsLength();
            const VALID_COLORS = secretCodeManager.getValidColors();
            for(let i = 0; i < N_COLORS; i++){
                const validColorsRandomIndex = Math.floor(Math.random() * N_DIFERENT_COLORS);
                colorsRandomTirada.push(VALID_COLORS[validColorsRandomIndex]);
            }
            return new Combination(colorsRandomTirada);
        }                                  
    
        const modes ={"JUGADOR": getCombinationPlayer,
                    "MAQUINA": getRandomTirada};

        return modes[playerType](secretCodeManager);
    }

    getInput(playerType){
        return this.callEnterDataByFunction(playerType, this.secretCodeManager);
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

    guessCode(secretCodeManager, inputCombination){
        const colorMatchStatus = secretCodeManager.checkCombinacionColorStatus(inputCombination);
        this.win = secretCodeManager.isWinningCombination(inputCombination);
        this.updateHistorial(colorMatchStatus, inputCombination);
    }

    lessMoviment(){
        this.maxTurns -= 1;
    }

    playerWin(){
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

    printMessageEndGame(){
        this.win?
            console.log("ENORABUENA EL JUGAODR HA GANADO"):
            console.log("NO HAY MAS MOVIMIENTOS POSIBLE, HAS PERDIDO");        
    }
}

class TurnM{
    constructor(player){
        this.player = player;
    }

    getCurrentPlayer(){
        return this.player;
    }

    next(gameLogic){
        gameLogic.lessMoviment();
    }
}

class SecretCodeManager{
    constructor(){
        this.VALID_COLORS = ["BLANCO", "NEGRO", "AMARILLO", "VERDE", "ROJO", "AZUL", "NARANJA"]; 
        this.winCombination = this.generateCombination();
        this.winCombination.print();
    }

    getValidColorsLength(){
        return this.VALID_COLORS.length;
    }

    getValidColors(){
        return this.VALID_COLORS;
    }

    isValidColor(color){
        for(var i = 0; i < this.VALID_COLORS.length; i++){
            if(color === this.VALID_COLORS[i]){
                return true;
            }
        }
        return false;
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
        return new Combination(winCombination);        
    }

    isWinningCombination(combination){
        if(!this.areArraysSameLength(combination)){
            return false;
        }

        for(let i = 0; i < this.winCombination.getLength(); i++){
            if(combination.getColor(i) !== this.winCombination.getColor(i)){
                return false;
            }
        }
        return true;
    }

    areArraysSameLength(combination){
        return combination.getLength() === this.winCombination.getLength();
    }

    isValidCombination(combination){
        if(!this.areArraysSameLength(combination)){
            return false;
        }

        let nValidColors = 0;
        for(let i = 0; i < combination.getLength(); i++){
            if(!this.isValidColor(combination.getColor(i))){
                console.log("color no encontrado");
                return false;
            }
            nValidColors += 1;
        }

        console.log(nValidColors);
        return  nValidColors === 5;    
    }

    checkCombinacionColorStatus(combination){
            let supportCombination = [];
            for(let i = 0; i < combination.getLength(); i++){
                const color = combination.getColor(i);
                if(color === this.winCombination.getColor(i)){
                    supportCombination[i] = "BLANCO";
                }else if(this.isColorInArray(color)){
                    supportCombination[i] = "NEGRO";
                }else{
                    supportCombination[i] = "VACIO";
                }                
            }
            return new Combination(supportCombination);        
    }

    isColorInArray(color){
        for(let i = 0; i < this.winCombination.getLength(); i++){
            if(this.winCombination.getColor(i) === color){
                return true;
            }
        }
        return false;
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
        const playerType = this.getTypePlayer();
        this.secretCodeManager = new SecretCodeManager();
        this.player = new PlayerM(playerType, this.secretCodeManager);
        this.turn = new TurnM(this.player);
        this.gameLogic = new GameLogicM();

        do {
            const inputCombination = this.player.getMove();
            this.gameLogic.guessCode(this.secretCodeManager, inputCombination);
            if(!this.gameLogic.playerWin()){
                this.turn.next(this.gameLogic);
            }
        } while (!this.gameLogic.gameEnd()); // nor, si las dos son falsas repite bucle
        this.gameLogic.printMessageEndGame();
    }

    getTypePlayer(){
        const PLAYER_TYPES = ["JUGADOR", "MAQUINA"];
        let answer;
        let isAnswerdValid;
        do{
            answer = parseInt(prompt('JUGADOR ELIGE :1 \nMAQUINA ELIGE: 2'));
            isAnswerdValid = answer === 1 || answer === 2;
        }while(!isAnswerdValid)

        return PLAYER_TYPES[answer - 1];
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

