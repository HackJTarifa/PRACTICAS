class Tablero{
    constructor(files, columns){
        this.files = files;
        this.column = columns;
        this.board = this.inicializeBoard(this.files, this.column);
        this.movesLeft = this.files * this.column;
    }

    getMovesLeft(){
        return this.movesLeft;
    }

    inicializeBoard(files, columns){    
        const initialValue = "0";
        let board = [];
        for(let i = 0; i < columns; i++){
            board[i] = [];
            for(let j = 0; j < files; j++){
                board[i][j] = initialValue;
            }
        }     
        return board;
    }

    getPosition(column, file){
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

    update(column, tokenState){
        let index = 0;
        while(this.board[column][index] == "RED" || this.board[column][index] == "YELLOW"){
            index += 1;
        }    
        this.board[column][index] = tokenState;
        this.movesLeft -= 1;
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
        this.nPlayers = 2;
        this.tokenState = ['RED', 'YELLOW']; 
        this.columns = 7;
        this.files = 6;
        this.player = 0;

        this.win = false;
        this.board;
    }

    init(){
        this.board = new Tablero(this.files, this.columns);

        do {
            let column;
            do {
                column = this.getColumn();
            } while (!this.board.isPositionValid(column));
            this.board.update(column, this.tokenState[this.player]);
            this.printBoard();

            this.win = this.playerWin();
            if (!this.win) {
                this.player = (this.player + 1) % this.nPlayers;
            }
        } while (!this.gameEnd()); // nor, si las dos son falsas repite bucle
        this.printMessageEndGame();
    }

    playerWin(){
        let tokenState = this.tokenState[this.player];
        console.log(tokenState);        

        let connectFour = false;
        for(let file = 0; file < this.files ; file++){
            for(let column = 0; column < this.columns; column++){
                connectFour = this.checkPosition( column, file, tokenState);
                if (connectFour){
                    return true;
                }
            }
        }
        return false;
    }
    
    // iC = indexColumns, iF = indexFiles, tS = tokenState
    checkPosition(column, file, token) {
        const CONNECTA_SIZE = 4;
        if(CONNECTA_SIZE + column < 7){                     
            if (this.board.getPosition(column, file) == token &&
                this.board.getPosition(column + 1, file) == token &&
                this.board.getPosition(column + 2, file) == token && 
                this.board.getPosition(column + 3, file) == token){
                return true;
            }
        }                 
        if(CONNECTA_SIZE + file < 6){
            if(this.board.getPosition(column, file) == token && 
               this.board.getPosition(column, file + 1) == token && 
               this.board.getPosition(column, file + 2) == token && 
               this.board.getPosition(column, file + 3) == token){
                console.log("CUARTRO EN RAYA");
                return true;
            }
        }
        if(CONNECTA_SIZE + column < 7 && CONNECTA_SIZE + file < 6){
            if(this.board.getPosition(column, file) == token &&
               this.board.getPosition(column + 1, file + 1) == token && 
               this.board.getPosition(column + 2, file + 2) == token && 
               this.board.getPosition(column + 3, file + 3) == token ||
               this.board.getPosition(column, file + 3) == token &&
               this.board.getPosition(column + 1, file + 2) == token && 
               this.board.getPosition(column + 2, file + 1) == token && 
               this.board.getPosition(column + 3, file) == token) {
                return true;
            }
        }
        return false;
    }

    gameEnd() {
        return this.win || this.board.getMovesLeft() <= 0;
    }

    printBoard(){
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

    printMessageEndGame(){
        const PLAYERS = ["PLAYER 1", "PLAYER 2"];
        this.win ? console.log("ENORABUENA EL JUGADOR: " + PLAYERS[this.player] + " HA GANADO"):
                console.log("NO HAY MAS MOVIMIENTOS POSIBLES, EMPATE");        
    }
}

class createApp{
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
        let userResponse;
        let isResponseValid;
        do{
            userResponse = prompt('Quieres jugar otra partida? (SI/NO): ');
            isResponseValid = userResponse !== 'SI' && userResponse !== 'NO';
            if (isResponseValid){
                console.log("LA RESPUESTA NO ES VALIDA, SOLO SE ACEPTA SI O NO EN MAYUSCULAS");
            }
        }while(isResponseValid)
    
        return userResponse === 'SI'; 
    }
}

let app = new createApp()
app.start()