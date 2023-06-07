function createdBoard(files, columns){
    function inicializeBoard(files, columns){    
        const initialValue = '0'; 
        let board = [];
        for(let i = 0; i < columns; i++){
            board[i] = [];
            for(let j = 0; j < files; j++){
                board[i][j] = initialValue;
            }
        }
        return board;
    }
    
    return {        
        files: files,
        columns: columns,
        board: inicializeBoard(files, columns),
        movesLeft: files * columns,
        getMovesLeft: function(){
            return this.movesLeft;
        },
        getPosition: function(column, file){
            return this.board[column][file]; 
        },
        isPositionValid: function(column){
            for(let i = 0; i < this.files; i++){ 
                if(this.board[column][i] == "0"){
                    return true;
                }
            }
            console.log("LA COLUMNA ELEGIDA NO ES VALIDA, ESTA LLENA.")
            return false;
        },
        update: function(column, tokenState){
            let index = 0;
            while(this.board[column][index] == "RED" || this.board[column][index] == "YELLOW"){
                index += 1;
            }    
            this.board[column][index] = tokenState;
            this.movesLeft -= 1;
        },
        print: function(){
            for(let i = 0; i < this.columns; i++){  
                console.log((this.board)[i]);
            }
        }
    }
}

function createGame(){
    return {
        nPlayers: 2,
        tokenState: ['RED', 'YELLOW'],
        columns: 7,
        files: 6,
        player: 0,
        win: false,
        board: NaN,
        init: function(){
            this.board = createdBoard(this.files, this.columns);

            do {
                let column;
                do {
                    column = getColumn();
                } while (!this.board.isPositionValid(column));
                this.board.update(column, this.tokenState[this.player]);
                printBoard(this);

                this.win = playerWin(this);
                if (!this.win) {
                    this.player = (this.player + 1) % this.nPlayers;
                }
            } while (!thisEnd(this)) // nor, si las dos son falsas repite bucle
            printMessageEndthis(this);
        }           
    }

    function playerWin(object){
        let tokenState = object.tokenState[object.player];
        console.log(tokenState);        

        let cuantroEnRaya = false;
        for(let idFil = 0; idFil < object.files ; idFil++){
            for(let idCol = 0; idCol < object.columns; idCol++){
                cuantroEnRaya = checkPosition(idCol, idFil, tokenState, object);
                if (cuantroEnRaya){
                    return true;
                }
            }
        }
        return false;

       function checkPosition(column, row, token, object) {
            const CONNECTA_SIZE = 4;
            if(CONNECTA_SIZE + column < 7){  
                if (object.board.getPosition(column, row) == token &&
                    object.board.getPosition(column + 1, row) == token &&
                    object.board.getPosition(column + 2, row) == token && 
                    object.board.getPosition(column + 3, row) == token){
                    return true;
                }
            }                 
            if(CONNECTA_SIZE + row < 6){
                if(object.board.getPosition(column, row) == token && 
                    object.board.getPosition(column, row + 1) == token && 
                    object.board.getPosition(column, row + 2) == token && 
                    object.board.getPosition(column, row + 3) == token){
                    return true;
                }
            }
            if(CONNECTA_SIZE + column < 7 && CONNECTA_SIZE + row < 6){
                if(object.board.getPosition(column, row) == token &&
                object.board.getPosition(column + 1, row + 1) == token && 
                object.board.getPosition(column + 2, row + 2) == token && 
                object.board.getPosition(column + 3, row + 3) == token ||
                object.board.getPosition(column, row + 3) == token &&
                object.board.getPosition(column + 1, row + 2) == token && 
                object.board.getPosition(column + 2, row + 1) == token && 
                object.board.getPosition(column + 3, row) == token) {
                return true;
                }
            }
            return false;
        }
    }    

    function thisEnd(object) {
        return object.win || object.board.getMovesLeft() <= 0;
    }

    function printBoard(object){
        object.board.print();
    }

    function getColumn(){
        let column;
        do{ 
            column = parseInt(prompt("Agrega una posicion valida del tablero, columna 1 ... 7"));
            column -= 1;
       }while(isNaN(column) || column < 0 || column > 6);  
       return column;
    }

    function printMessageEndthis(object){
        const PLAYERS = ["PLAYER 1", "PLAYER 2"];
        object.win ? console.log("ENORABUENA EL JUGADOR: " + PLAYERS[object.player] + " HA GANADO"):
                console.log("NO HAY MAS MOVIMIENTOS POSIBLES, EMPATE");        
    }
}

function createApp(){
    return {
        game: createGame(),
        start: function(){
            do{
                this.game.init();
            }while(playAgain())    
            console.log("PROGRAMA END");    
        }
    }

    function playAgain(){
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

let app = createApp();
app.start()