function createdBoard(files, columns){
    let fnBoard;

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
    
    fnBoard = {        
        files: files,
        columns: columns,
        board: inicializeBoard(files, columns),
        movesLeft: files * columns,
        getMovesLeft: function(){
            return fnBoard.movesLeft;
        },
        getPosition: function(column, file){
            return fnBoard.board[column][file]; 
        },
        isPositionValid: function(column){
            for(let i = 0; i < fnBoard.files; i++){ 
                if(fnBoard.board[column][i] == "0"){
                    return true;
                }
            }
            console.log("LA COLUMNA ELEGIDA NO ES VALIDA, ESTA LLENA.")
            return false;
        },
        update: function(column, tokenState){
            let index = 0;
            while(fnBoard.board[column][index] == "RED" || fnBoard.board[column][index] == "YELLOW"){
                index += 1;
            }    
            fnBoard.board[column][index] = tokenState;
            fnBoard.movesLeft -= 1;
        },
        print: function(){
            for(let i = 0; i < fnBoard.columns; i++){  
                console.log((fnBoard.board)[i]);
            }
        }
    }
    return fnBoard;
}

function createGame(){
    let game = {
        nPlayers: 2,
        tokenState: ['RED', 'YELLOW'],
        columns: 7,
        files: 6,
        player: 0,
        win: false,
        board: NaN,
        init: function(){
            game.board = createdBoard(game.files, game.columns);

            do {
                let column;
                do {
                    column = getColumn();
                } while (!game.board.isPositionValid(column));
                game.board.update(column, game.tokenState[game.player]);
                printBoard();

                game.win = playerWin();
                if (!game.win) {
                    game.player = (game.player + 1) % game.nPlayers;
                }
            } while (!gameEnd()) // nor, si las dos son falsas repite bucle
            printMessageEndGame();
        }           
    }
    return game;

    function playerWin(){
        let tokenState = game.tokenState[game.player];
        console.log(tokenState);        

        let cuantroEnRaya = false;
        for(let idFil = 0; idFil < game.files ; idFil++){
            for(let idCol = 0; idCol < game.columns; idCol++){
                cuantroEnRaya = checkPosition( idCol, idFil, tokenState);
                if (cuantroEnRaya){
                    return true;
                }
            }
        }
        return false;

       // iC = indexColumns, iF = indexFiles, tS = tokenState
       function checkPosition(column, row, token) {
        const CONNECTA_SIZE = 4;
        if(CONNECTA_SIZE + column < 7){   
            if (game.board.getPosition(column, row) == token &&
                game.board.getPosition(column + 1, row) == token &&
                game.board.getPosition(column + 2, row) == token && 
                game.board.getPosition(column + 3, row) == token){
                return true;
            }
        }                 
        if(CONNECTA_SIZE + row < 6){
            if(game.board.getPosition(column, row) == token && 
                game.board.getPosition(column, row + 1) == token && 
                game.board.getPosition(column, row + 2) == token && 
                game.board.getPosition(column, row + 3) == token){
                return true;
            }
        }
        if(CONNECTA_SIZE + column < 7 && CONNECTA_SIZE + row < 6){
            if(game.board.getPosition(column, row) == token &&
            game.board.getPosition(column + 1, row + 1) == token && 
            game.board.getPosition(column + 2, row + 2) == token && 
            game.board.getPosition(column + 3, row + 3) == token ||
            game.board.getPosition(column, row + 3) == token &&
            game.board.getPosition(column + 1, row + 2) == token && 
            game.board.getPosition(column + 2, row + 1) == token && 
            game.board.getPosition(column + 3, row) == token) {
            return true;
            }
        }
        return false;
    }
    }    

    function gameEnd() {
        return game.win || game.board.getMovesLeft() <= 0;
    }

    function printBoard(){
        game.board.print();
    }

    function getColumn(){
        let column;
        do{ 
            column = parseInt(prompt("Agrega una posicion valida del tablero, columna 1 ... 7"));
            column -= 1;
       }while(isNaN(column) || column < 0 || column > 6);  
       return column;
    }

    function printMessageEndGame(){
        const PLAYERS = ["PLAYER 1", "PLAYER 2"];
        game.win ? console.log("ENORABUENA EL JUGADOR: " + PLAYERS[game.player] + " HA GANADO"):
                console.log("NO HAY MAS MOVIMIENTOS POSIBLES, EMPATE");        
    }
}

function createApp(){
    let app = {
        game: createGame(),
        start: function(){
            do{
                app.game.init();
            }while(playAgain())    
            console.log("PROGRAMA END");    
        }
    }
    return app;

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