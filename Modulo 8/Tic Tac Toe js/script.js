
function createApp(){
    return {
        game: createGame(),
        start: function(){
            do{
                this.game.init();
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
    return {
        TOKEN_STATE: ['X', 'Y'],
        N_PLAYERS: 2,
        player: 0,
        mov_restantes: 9,
        board: NaN,// = new Tablero(3, 3);
        win: false, 
        init: function(){
            this.board = createBoard(3, 3);
            this.board.inicializeTablero(3, 3);
            this.board.print();
            
            do {
                nextThrow(this);
                if (!this.win) {
                    this.player = (this.player + 1) % this.N_PLAYERS;
                    this.mov_restantes -= 1;
                }
            }while(!gameEnd(this))
            printMessageEndGame(this);
        },
    }

    function gameEnd(object){
        return object.win || object.mov_restantes <= 0;
    }

    function nextThrow(object) {
        let { file, column } = getFileColumn(object);
    
        object.board.update(file, column, object.TOKEN_STATE[object.player]);
        object.board.print();
    
        object.win = playerWin(object);
        console.log("TIRADA END")
    }

    function playerWin(object) {      
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
                if (object.board.getCell(row, col,) === object.TOKEN_STATE[object.player]){
                    hits += 1;
                }
            }
            if (hits === 3){
                return true;
            }
        }
        return false;
      }

    function getFileColumn(object) {
        let file, column;
        do {
            file = getPosition("FILE");
            column = getPosition("COLUMN");
        } while(!object.board.isPositionValid(file, column));
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

    function printMessageEndGame(object){
        const PLAYERS = ["PLAYER 1", "PLAYER 2"];
                (object.win) ? console.log("ENORABUENA EL JUGADOR: " + PLAYERS[object.player] + " HA GANADO"): console.log("NO HAY MAS MOVIMIENTOS POSIBLE, EMPATE");       
    }
}

function createBoard(files, columns){
    return {
        files: files,
        columns: columns,
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
            this.boardState = newBoard;
        }, 
        update: function(file, column, token){
            this.boardState[file][column] = token;
        }, 
        getCell: function(file, column){
            return this.boardState[file][column];
        }, 
        isPositionValid: function(file, column){
            if (validatePositionRange(file, column, this)){
                return isEmpy(file, column, this);            
            } 
            return false;
        },
        print: function(){
            console.log("check inside funciton print");
            console.log(this.boardState[0]);
            console.log(this.boardState[1]);
            console.log(this.boardState[2]);
        }    
    }

    function isEmpy(file, column, object){
        if(object.boardState[file][column] === "0"){
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