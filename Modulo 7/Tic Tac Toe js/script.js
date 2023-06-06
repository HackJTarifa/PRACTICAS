
// ------------------- START PROGRAMA -------------------
function createApp(){
    let app = {
        game: createGame(),
        start: function(){
            do{
                app.game.init();
            }while(playAgain())    
            console.info("PROGRAMM END");  
        }
    }
    return app;

    function playAgain(){
        let answer;
        let isAnswerdValid;
        do{
            answer = prompt('Quieres jugar otra partida(SI/NO): ');
            isAnswerdValid = answer === 'SI' || answer === 'NO';
            if (!isAnswerdValid){
                console.info("LA RESPUESTA NO ES VALIDA, SOLO SE ACEPTA SI O NO EN MAYUSCULAS");
            }
        }while(!isAnswerdValid)    
        return answer === 'SI'; 
    }
}

function createGame(){
    let game = {
        TOKEN_STATE: ['X', 'Y'],
        N_PLAYERS: 2,
        player: 0,
        mov_restantes: 9,
        board: NaN,// = new Tablero(3, 3);
        win: false, 
        init: function(){
            game.board = createBoard(3, 3);
            game.board.inicializeTablero(3, 3);
            game.board.print();
            
            do {
                tirada();
                if (!game.win) {
                    game.player = (game.player + 1) % game.N_PLAYERS;
                    game.mov_restantes -= 1;
                }
            }while(!gameEnd())
            printMessageEndGame();
        },
    }
    return game;

    function gameEnd(){
        return game.win || game.mov_restantes <= 0;
    }

    function tirada() {
        let { file, column } = getFileColumn();
    
        game.board.update(file, column, game.TOKEN_STATE[game.player]);
        game.board.print();
    
        game.win = playerWin();
        console.info("TIRADA END")
    }

    /**
    function playerWin(){
        if(game.board.getCell(0, 0) ==  game.tokenState[game.player] && game.board.getCell(0,1) == game.tokenState[game.player] && game.board.getCell(0,2) == game.tokenState[game.player] ||
        game.board.getCell(1, 0) == game.tokenState[game.player] && game.board.getCell(1,1) == game.tokenState[game.player] && game.board.getCell(1,2) == game.tokenState[game.player] ||
        game.board.getCell(2, 0) == game.tokenState[game.player] && game.board.getCell(2,1) == game.tokenState[game.player] && game.board.getCell(2,2) == game.tokenState[game.player] ||
        game.board.getCell(0, 0) == game.tokenState[game.player] && game.board.getCell(1,0) == game.tokenState[game.player] && game.board.getCell(2,0) == game.tokenState[game.player] ||
        game.board.getCell(0, 1) == game.tokenState[game.player] && game.board.getCell(1,1) == game.tokenState[game.player] && game.board.getCell(2,1) == game.tokenState[game.player] ||
        game.board.getCell(0, 2) == game.tokenState[game.player] && game.board.getCell(1,2) == game.tokenState[game.player] && game.board.getCell(2,2) == game.tokenState[game.player] ||
        game.board.getCell(0, 0) == game.tokenState[game.player] && game.board.getCell(1,1) == game.tokenState[game.player] && game.board.getCell(2,2) == game.tokenState[game.player] ||
        game.board.getCell(2, 0) == game.tokenState[game.player] && game.board.getCell(1,1) == game.tokenState[game.player] && game.board.getCell(0,2) == game.tokenState[game.player]){
            return true;
            }
        return false;
    }*/

    function playerWin() {      
        const winConditions = [
          [[0, 0], [0, 1], [0, 2]], // Rows
          [[1, 0], [1, 1], [1, 2]],
          [[2, 0], [2, 1], [2, 2]],
          [[0, 0], [1, 0], [2, 0]], // Columns
          [[0, 1], [1, 1], [2, 1]],
          [[0, 2], [1, 2], [2, 2]],
          [[0, 0], [1, 1], [2, 2]], // Diagonals
          [[2, 0], [1, 1], [0, 2]]
        ];
      
        for(const cells of winConditions) {
            let hits = 0;
            for (const [row, col] of cells) {
                if (game.board.getCell(row, col,) === game.TOKEN_STATE[game.player]){
                    hits += 1;
                }
            }
            if (hits === 3){
                return true;
            }
        }
        return false;
      }

    function getFileColumn() {
        let file, column;
        do {
            file = getPosition("FILE");
            column = getPosition("COLUMN");
        } while(!game.board.isPositionValid(file, column));
        console.info("SE HA ELEGIDO LA FILA: " + file);
        console.info("SE HA ELEGIDO LA COLUMNA: " + column);
        return { file, column };
    }

    function getPosition(fileOColumn){
        let fileColumn = parseInt(prompt("Agrega una posicion valida del tablero " + fileOColumn + " 1-2-3"));
        const OFFSET = 1;
        console.info(fileColumn);
        return fileColumn - OFFSET;
    }

    function printMessageEndGame(){
        const PLAYERS = ["PLAYER 1", "PLAYER 2"];
                (game.win) ? console.info("ENORABUENA EL JUGADOR: " + PLAYERS[game.player] + " HA GANADO"): console.info("NO HAY MAS MOVIMIENTOS POSIBLE, EMPATE");       
    }
}

function createBoard(files, columns){
    let board = {
        files: files,
        columns: columns,
        boardState: NaN,
        inicializeTablero: function(files, columns){
            let newBoard = new Array(files);
            for(let i = 0; i < files; i++){
                newBoard[i] = new Array(columns);
            }
        
            for(let i = 0; i < files; i++){             
                for (let j = 0; j < columns; j++){
                    newBoard[i][j] = "0";
                }
            } 
            board.boardState = newBoard;
        }, 
        update: function(file, column, token){
            board.boardState[file][column] = token;
        }, 
        getCell: function(file, column){
            return board.boardState[file][column];
        }, 
        isPositionValid: function(file, column){
            if (validatePositionRange(file, column)){
                return isEmpy(file, column);            
            } 
            return false;
        },
        print: function(){
            console.info(board.boardState[0]);
            console.info(board.boardState[1]);
            console.info(board.boardState[2]);
        }    
    }
    return board;

    function isEmpy(file, column){
        if(board.boardState[file][column] === "0"){
            return true;
        }
        console.info("LA POSICION ELEGIDA NO ES VALIDA POR QUE YA ESTA OCUPADA");
        return false;
    }

    function validatePositionRange(file, column){
        let validFile = 0 <= file && file < (file + 1);
        let validColumn = 0 <= column && column < (column + 1);

        if(validFile && validColumn){
            return true;
        } 
        console.info("LA POSICION NO ES VALIDA, NO ESTA DENTRO DEL TABLERO");
        return false;
    }
}

let app = createApp();
app.start();