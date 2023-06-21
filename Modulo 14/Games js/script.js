
class PlayerT{
    constructor(token, player, name){
        this.TOKEN = token
        this.player = player        
        this.NAME = name;
    }

    getName(){
        return this.NAME;
    }

    getToken() { 
        return this.TOKEN;
    }

    getPlayerFunction(board){
        const modes = {"JUGADOR": getFileColumn, 
                        "MAQUINA": getRandomPosition};

        function getFileColumn(board) {
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
                    fileColumn = parseInt(prompt("Agrega una posicion valida del tablero " + fileOrColumn + " 1-2-3"));
                } while (!isValidPosition(fileColumn));  
                
                const OFFSET = 1;
                return fileColumn - OFFSET;
            }

            function isValidPosition(position){
                return board.existPosition(position);      
            }
        }  

        function getRandomPosition(board){ 
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

        return modes[this.player](board);
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

class GameLogicT{
    constructor(turn){
        this.maxTurns;
        this.turn = turn;
        this.win = false;
    }

    init(){
        if(this.maxTurn !== 9){
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

class Tictactoe{
    constructor(){    
        this.board;
        this.win;   
        this.gameLogic;
        this.turn = NaN;
    }

    initialValues(){
        this.board = new BoardT(3, 3);
        this.turn = new TurnT(this.getTypesPlayers(), this.board);
        this.gameLogic = new GameLogicT();
    }

    init(){
        console.log(" INICIA EL JUEGO TIC TAC TOE ");       
        this.initialValues(); 
        this.board.print();
        
        do {
            this.turn.makeMove();
            this.gameLogic.gessCombination(this.board, this.turn.getCurrentPlayer());
            if(!this.gameLogic.getWin()){
                this.turn.next(this.gameLogic);
            }            
        }while(!this.gameLogic.gameEnd())
        this.gameLogic.printMessageEndGame(this.turn.getCurrentPlayer().getName());
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

        const GAME_MODES = [[new PlayerT(TOKEN_STATE[0], PLAYERS[0], "PLAYER 1"), new PlayerT(TOKEN_STATE[1], PLAYERS[0], "PLAYER 2")],
                            [new PlayerT(TOKEN_STATE[0], PLAYERS[0], "PLAYER 1"), new PlayerT(TOKEN_STATE[1], PLAYERS[1], "PLAYER 2")],
                            [new PlayerT(TOKEN_STATE[0], PLAYERS[1], "PLAYER 1"), new PlayerT(TOKEN_STATE[1], PLAYERS[1], "PLAYER 2")]];

        return GAME_MODES[answerd - 1];        
    }    
}

class BoardT{
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

    isPosititionValid(row, column){
        return this.existPosition(row, column) && this.isEmpy(row, column);
    }

    getPosition(row, column){
        return this.board[row][column];
    }

    existPosition(position){
        const MIN_POSITION = 0;
        const MAX_POSITION = 3;

        if (isNaN(position)) {
            console.log("La posición ingresada no es válida. Por favor, ingresa un número.");
            return false;
        }

        if (position < MIN_POSITION || position > MAX_POSITION) {
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
        if (column === NaN){
            console.log(" EL VALOR INGRESADO NO PUEDE SER NULO");
            return false;
        }
        
        if(column < 0 || column > this.COLUMNS - 1){
            console.log(" VALOR FUERA DE RANGO");
            return false;
        }

        for(let i = 0; i < this.ROWNS; i++){ 
            if(this.boardState[column][i] === "0"){
                return true;
            }
        }
        
        console.log("LA COLUMNA ELEGIDA NO ES VALIDA, ESTA LLENA.")
        return false;
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
    constructor(player, token, name){
        this.TOKEN = token
        this.player = player        
        this.NAME = name;
    }
    
    getName() { 
        return this.NAME;
    }

    getToken(){
        return this.TOKEN;
    }

    getColumWithFunctionby( board){
        const modes = {"PLAYER": getColumn, 
                        "MAQUINA": getRandomColumn};

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
        

        return modes[this.player](board);   
    }

    getMove(board){        
        const column = this.getColumWithFunctionby(board);         
        return column;
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

    next(){
        this.playerIndex = (this.playerIndex + 1) % this.N_PLAYERS;
        this.currentPlayer = this.players[this.playerIndex];
    }

    makeMove(board){
        let column = this.currentPlayer.getMove(board);

        board.update(column, this.currentPlayer.getToken());
        board.print();    
    }
}

class Connecta4{
    constructor(){
        this.COLUMNS = 7;
        this.ROWNS = 6;
        this.win = false;
        this.board;
        this.turn = NaN;
    }

    initialValues(){
        this.board = new BoardConnecta4(this.ROWNS, this.COLUMNS);
        this.turn = new TurnC(this.getGamePlayersModes());
    }

    init(){
        console.log(" INICIA EL JUEGO CONNECTA 4 ");
        this.initialValues();
        this.board.print();

        do {
            this.turn.makeMove(this.board);

            this.win = this.checkPlayerWin();
            if (!this.win) {
                this.turn.next();
                this.movRestantes -= 1;
            }

        } while (!this.gameEnd()); 
        this.printMessageEndGame(this.turn.getCurrentPlayer().getName());
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
        const GAME_MODES =  [[new PlayerC(PLAYER_TYPES[0], TOKEN_STATES[0], "PLAYER 1"), new PlayerC(PLAYER_TYPES[0], TOKEN_STATES[1], "PLAYER 2")],
                            [new PlayerC(PLAYER_TYPES[0], TOKEN_STATES[0], "PLAYER 1"), new PlayerC(PLAYER_TYPES[1], TOKEN_STATES[1], "PLAYER 2")],
                            [new PlayerC(PLAYER_TYPES[1], TOKEN_STATES[0], "PLAYER 1"), new PlayerC(PLAYER_TYPES[1], TOKEN_STATES[1], "PLAYER 2")]];
        return GAME_MODES[answer - 1];
    }

    checkPlayerWin(){
        let tokenState = this.turn.getCurrentPlayer().getToken();
        console.log(tokenState);        

        let cuantroEnRaya = false;
        for(let idFil = 0; idFil < this.ROWNS ; idFil++){
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

class GameLogicC{

}

class PlayerM{
    constructor(){
        this.PLAYER_TYPE;        
        this.NAME = "JUGADOR 1";
    }

    setPlayerType(playerType){
        this.PLAYER_TYPE = playerType;
    }

    getName(){
        return this.NAME;
    }

    getPlayerTypeCombination(validColors){ 
        const getCombinationPlayer = function(validColors){
            let InputCombination;
            let vaildCombination;

            do{                     
                vaildCombination = false;
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
    
                const N_COLORS = 5;
                if(nColoresValidos == N_COLORS){
                    vaildCombination = true;
                } 
            }while(!vaildCombination)
            return InputCombination;
        }
        
        const getRandomTirada = function(validColors){
            let colorsRandomTirada = [];
            const N_COLORS = 5;
            for(let i = 0; i < N_COLORS; i++){
                const validColorsRandomIndex = Math.floor(Math.random() * validColors.length);
                colorsRandomTirada.push(validColors[validColorsRandomIndex]);
            }
            return colorsRandomTirada;
        }                                  
    
        const modes ={"JUGADOR": getCombinationPlayer,
                    "MAQUINA": getRandomTirada};

        console.log("TESTEO: " + this.PLAYER_TYPE);
        let funcType = modes[this.PLAYER_TYPE];
        let resultado = funcType(validColors);
        return resultado;
    }
}

class GameLogicM{
    constructor(player){
        this.player = player;
        this.maxTurns = 15;
        this.inputCombination = [];
        this.secretCodeManager = new SecretCodeManager();   
        this.combinacionesPropuestas = [];
        this.combinationColorStatus = [];    
        this.win = false; 
    }

    init(){
        if(this.maxTurns !== 15){
            this.maxTurns = 15;
        }
        this.secretCodeManager.generateCombination();
    }

    generatePlayerCombination(){
        this.inputCombination = this.player.getPlayerTypeCombination(this.secretCodeManager.getValidColors());
    }

    guessCode(){
        const combinationColorStatus = this.secretCodeManager.checkCombinacionColorStatus(this.inputCombination);
        this.win = this.secretCodeManager.isWinningCombination(this.inputCombination);
        this.updateHistorial(inputCombination, combinationColorStatus);
        if (!this.win) {
            this.maxTurns -= 1;
        }
    }

    gameEnd(){
        return this.win || this.mov_restantes <= 0;
    }

    updateHistorial(inputCombination, aciertos){
        this.combinacionesPropuestas.push(inputCombination);
        this.combinationColorStatus.push(aciertos)
        console.log(inputCombination + " -- " + aciertos );
    }

    printMessageEndGame(){
        this.win?
            console.log("ENORABUENA EL JUGAODR HA GANADO"):
            console.log("NO HAY MAS MOVIMIENTOS POSIBLE, HAS PERDIDO");        
    }

}

class SecretCodeManager{
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
        this.player = new PlayerM();
        this.gameLogic; 
    }

    init(){
        const playerType = this.getTypesPlayers();
        this.player.setPlayerType(playerType);
        this.gameLogic = new GameLogicM(this.player);
        this.gameLogic.init();  

        do {
            this.gameLogic.generatePlayerCombination();
            this.gameLogic.guessCode();
        } while (!this.gameLogic.gameEnd()); // nor, si las dos son falsas repite bucle
        this.gameLogic.printMessageEndGame();
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

