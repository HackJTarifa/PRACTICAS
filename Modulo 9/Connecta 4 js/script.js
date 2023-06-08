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

    //const files = files;
    //const columns = columns;
    let board =  inicializeBoard(files, columns);
    let movesLeft = files * columns;

    return {        
        getMovesLeft: function(){
            return movesLeft;
        },
        getPosition: function(column, file){
            return board[column][file]; 
        },
        isPositionValid: function(column){
            for(let i = 0; i < files; i++){ 
                if(board[column][i] == "0"){
                    return true;
                }
            }
            console.log("LA COLUMNA ELEGIDA NO ES VALIDA, ESTA LLENA.")
            return false;
        },
        update: function(column, tokenState){
            let index = 0;
            while(board[column][index] == "RED" || board[column][index] == "YELLOW"){
                index += 1;
            }    
            board[column][index] = tokenState;
            movesLeft -= 1;
        },
        print: function(){
            for(let i = 0; i < columns; i++){  
                console.log((board)[i]);
            }
        }
    }
}

function createGame(){
    const N_PLAYERS = 2;
    const TOKEN_STATE = ['RED', 'YELLOW'];
    const COLUMNS = 7;
    const FILES = 6;
    let player = 0;
    let win = false;
    let board = NaN;

    return {
        init: function(){
            board = createdBoard(FILES, COLUMNS);

            do {
                let column;
                do {
                    column = getColumn();
                } while (!board.isPositionValid(column));
                board.update(column, TOKEN_STATE[player]);
                printBoard();

                win = playerWin(this);
                if (!win) {
                    player = (player + 1) % N_PLAYERS;
                }
            } while (!thisEnd()) // nor, si las dos son falsas repite bucle
            printMessageEndthis();
        }           
    }

    function playerWin(){
        let tokenState = TOKEN_STATE[player];
        console.log(tokenState);        

        let cuantroEnRaya = false;
        for(let idFil = 0; idFil < FILES ; idFil++){
            for(let idCol = 0; idCol < COLUMNS; idCol++){
                cuantroEnRaya = checkPosition(idCol, idFil, tokenState);
                if (cuantroEnRaya){
                    return true;
                }
            }
        }
        return false;

       function checkPosition(column, row, token) {
            const CONNECTA_SIZE = 4;
            if(CONNECTA_SIZE + column < 7){  
                if (board.getPosition(column, row) == token &&
                    board.getPosition(column + 1, row) == token &&
                    board.getPosition(column + 2, row) == token && 
                    board.getPosition(column + 3, row) == token){
                    return true;
                }
            }                 
            if(CONNECTA_SIZE + row < 6){
                if(board.getPosition(column, row) == token && 
                    board.getPosition(column, row + 1) == token && 
                    board.getPosition(column, row + 2) == token && 
                    board.getPosition(column, row + 3) == token){
                    return true;
                }
            }
            if(CONNECTA_SIZE + column < 7 && CONNECTA_SIZE + row < 6){
                if(board.getPosition(column, row) == token &&
                board.getPosition(column + 1, row + 1) == token && 
                board.getPosition(column + 2, row + 2) == token && 
                board.getPosition(column + 3, row + 3) == token ||
                board.getPosition(column, row + 3) == token &&
                board.getPosition(column + 1, row + 2) == token && 
                board.getPosition(column + 2, row + 1) == token && 
                board.getPosition(column + 3, row) == token) {
                return true;
                }
            }
            return false;
        }
    }    

    function thisEnd() {
        return win || board.getMovesLeft() <= 0;
    }

    function printBoard(){
        board.print();
    }

    function getColumn(){
        let column;
        do{ 
            column = parseInt(prompt("Agrega una posicion valida del tablero, columna 1 ... 7"));
            column -= 1;
       }while(isNaN(column) || column < 0 || column > 6);  
       return column;
    }

    function printMessageEndthis(){
        const PLAYERS = ["PLAYER 1", "PLAYER 2"];
        win ? console.log("ENORABUENA EL JUGADOR: " + PLAYERS[player] + " HA GANADO"):
                console.log("NO HAY MAS MOVIMIENTOS POSIBLES, EMPATE");        
    }
}

function createApp(){
    let game = createGame();
    return {
        start: function(){
            do{
                game.init();
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