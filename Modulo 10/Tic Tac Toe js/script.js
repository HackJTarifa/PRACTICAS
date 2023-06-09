function createApp(){
    let app = {
        game: createGame(),
        playAgain: function(){
            let answer;
            let isAnswerdValid;
            do{
                answer = prompt('Quieres jugar otra partida (SI/NO): ');
                isAnswerdValid = answer === 'SI' || answer === 'NO';
                if (!isAnswerdValid){
                    console.log("LA RESPUESTA NO ES VALIDA, SOLO SE ACEPTA SI O NO EN MAYUSCULAS");
                }
            }while(!isAnswerdValid)    
            return answer === 'SI'; 
        }
    }

    return {
        start: function(){
            do{
                app.game.init();
            }while(app.playAgain())    
            console.log("PROGRAMM END");  
        }
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
        gameEnd: function(){
            return game.win || game.mov_restantes <= 0;
        },
        tirada: function() {
            let { file, column } = game.getFileColumn();
        
            game.board.update(file, column, game.TOKEN_STATE[game.player]);
            game.board.print();
        
            game.win = game.playerWin();
            console.log("TIRADA END")
        },
        playerWin:function() {      
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
        },
        getFileColumn: function() {
            let file, column;
            do {
                file = game.getPosition("FILE");
                column = game.getPosition("COLUMN");
            } while(!game.board.isPositionValid(file, column));
            console.log("SE HA ELEGIDO LA FILA: " + file);
            console.log("SE HA ELEGIDO LA COLUMNA: " + column);
            return { file, column };
        },
        getPosition: function(fileOColumn){
            let fileColumn = parseInt(prompt("Agrega una posicion valida del tablero " + fileOColumn + " 1-2-3"));
            const OFFSET = 1;
            console.log(fileColumn);
            return fileColumn - OFFSET;
        },
        printMessageEndGame: function(){
            const PLAYERS = ["PLAYER 1", "PLAYER 2"];
                    (game.win) ? console.log("ENORABUENA EL JUGADOR: " + PLAYERS[game.player] + " HA GANADO"): console.log("NO HAY MAS MOVIMIENTOS POSIBLE, EMPATE");       
        }
    }

    return{
        init: function(){
            game.board = createBoard(3, 3);
            game.board.inicializeTablero(3, 3);
            game.board.print();
            
            do {
                game.tirada();
                if (!game.win) {
                    game.player = (game.player + 1) % game.N_PLAYERS;
                    game.mov_restantes -= 1;
                }
            }while(!game.gameEnd())
            game.printMessageEndGame();
        }
    }


}

function createBoard(files, columns){
    let board = {
        files: files,
        columns: columns,
        boardState: NaN,
        isEmpy: function(file, column){
            if(board.boardState[file][column] === "0"){
                return true;
            }
            console.log("LA POSICION ELEGIDA NO ES VALIDA POR QUE YA ESTA OCUPADA");
            return false;
        },
        validatePositionRange: function(file, column){
            let validFile = 0 <= file && file < (file + 1);
            let validColumn = 0 <= column && column < (column + 1);

            if(validFile && validColumn){
                return true;
            } 
            console.log("LA POSICION NO ES VALIDA, NO ESTA DENTRO DEL TABLERO");
            return false;
        }
    }

    return{
        inicializeTablero: function(files, columns){
            let newBoard = [];
            const initialValue = "0";
            for(let i = 0; i < columns; i++){
                newBoard[i] = [];
                for (let j = 0; j < files; j++){
                    newBoard[i][j] = initialValue;
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
            if (board.validatePositionRange(file, column)){
                return board.isEmpy(file, column);            
            } 
            return false;
        },
        print: function(){
            console.log(board.boardState[0]);
            console.log(board.boardState[1]);
            console.log(board.boardState[2]);
        } 
    }
}

let app = createApp();
app.start();