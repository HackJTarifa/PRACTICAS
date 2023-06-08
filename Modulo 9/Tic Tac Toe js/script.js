
function createApp(){
    let game = createGame();
    return {
        start: function(){
            do{
                game.init();
            }while(playAgain())    
            console.log("PROGRAMM END");  
        }
    }

    function playAgain(){
        let answer;
        let isAnswerdValid;
        do{
            answer = prompt('Quieres jugar otra partida(SI/NO): ');
            isAnswerdValid = answer === 'SI' || answer === 'NO';
            if (!isAnswerdValid){
                console.log("LA RESPUESTA NO ES VALIDA, SOLO SE ACEPTA SI O NO EN MAYUSCULAS");
            }
        }while(!isAnswerdValid)    
        return answer === 'SI'; 
    }
}

function createGame(){
    const TOKEN_STATE = ['X', 'Y'];
    const N_PLAYERS = 2;
    let player = 0;
    let mov_restantes = 9;
    let board = NaN;
    let win =  false; 

    return {

        init: function(){
            board = createBoard(3, 3);
            board.inicializeTablero(3, 3);
            board.print();
            
            do {
                nextThrow();
                if (!win) {
                    player = (player + 1) % N_PLAYERS;
                    mov_restantes -= 1;
                }
            }while(!gameEnd())
            printMessageEndGame();
        },
    }

    function gameEnd(){
        return win || mov_restantes <= 0;
    }

    function nextThrow() {
        let { file, column } = getFileColumn();
    
        board.update(file, column, TOKEN_STATE[player]);
        board.print();
    
        win = playerWin();
        console.log("TIRADA END")
    }

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
                if (board.getCell(row, col,) === TOKEN_STATE[player]){
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
        } while(!board.isPositionValid(file, column));
        console.log("SE HA ELEGIDO LA FILA: " + file);
        console.log("SE HA ELEGIDO LA COLUMNA: " + column);
        return { file, column };
    }

    function getPosition(fileOColumn){
        let fileColumn = parseInt(prompt("Agrega una posicion valida del tablero " + fileOColumn + " 1-2-3"));
        const OFFSET = 1;
        console.log(fileColumn);
        return fileColumn - OFFSET;
    }

    function printMessageEndGame(){
        const PLAYERS = ["PLAYER 1", "PLAYER 2"];
        win ? console.log("ENORABUENA EL JUGADOR: " + PLAYERS[player] + " HA GANADO"): console.log("NO HAY MAS MOVIMIENTOS POSIBLE, EMPATE");       
    }
}

function createBoard(files, columns){
    let boardState = NaN;

    return {
        boardState: NaN,
        inicializeTablero: function(files, columns){
            let newBoard = [];
            const initialValue = "0";
            for(let i = 0; i < columns; i++){
                newBoard[i] = [];
                for (let j = 0; j < files; j++){
                    newBoard[i][j] = initialValue;
                }
            }
            boardState = newBoard;
        }, 
        update: function(file, column, token){
            boardState[file][column] = token;
        }, 
        getCell: function(file, column){
            return boardState[file][column];
        }, 
        isPositionValid: function(file, column){
            if (validatePositionRange(file, column)){
                return isEmpy(file, column);            
            } 
            return false;
        },
        print: function(){
            console.log("check inside funciton print");
            console.log(boardState[0]);
            console.log(boardState[1]);
            console.log(boardState[2]);
        }    
    }

    function isEmpy(file, column){
        if(boardState[file][column] === "0"){
            return true;
        }
        console.log("LA POSICION ELEGIDA NO ES VALIDA POR QUE YA ESTA OCUPADA");
        return false;
    }

    function validatePositionRange(file, column){
        let validFile = 0 <= file && file < (file + 1);
        let validColumn = 0 <= column && column < (column + 1);

        if(validFile && validColumn){
            return true;
        } 
        console.log("LA POSICION NO ES VALIDA, NO ESTA DENTRO DEL TABLERO");
        return false;
    }
}

let app = createApp();
app.start();