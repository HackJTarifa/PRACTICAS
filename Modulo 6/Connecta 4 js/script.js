
function connecta4() {
    do{
        gameInit();    
    }while(playAgain())
    console.log("EL JUEGO CONECTA 4 HA TERMINADO ");
    
    function gameInit() {
        let game = {
            N_PLAYERS: 2,
            TOKEN_STATE: ['RED', 'YELLOW'],
            COLUMNS: 7,
            FILES: 6,
            player: 0,
            movRestantes:  42,
            win: false,
        }

        let tablero = inicializeTablero(game.FILES, game.COLUMNS);
        
        const getTypesPlayers = function(){
            const playerTypes = ["JUGADOR", "MAQUINA"];
            let answer;
            let isAnswerdValid;
            do{
                answer = parseInt(prompt('JUGADOR VS JUGADOR ELIGE :1 \nJUGADOR VS MAQUINA ELIGE: 2 \nMAQUINA VS MAQUINA: ELIGE : 3'));
                isAnswerdValid = answer === 1 || answer === 2 || answer === 3;
            }while(!isAnswerdValid)

            const modes =[[playerTypes[0], playerTypes[0]], [playerTypes[0], playerTypes[1]], [playerTypes[1], playerTypes[1]]];       
            return modes[answer - 1];
        }
        
        let playerMode = getTypesPlayers();
        
        do {
            let column;
            do {
                let getTirada;
                if(playerMode[game.player] === "JUGADOR"){
                    getTirada = function getColumn(){
                                    let column;
                                    let incorrectColumn;
                                    do{ 
                                        incorrectColumn = true;                 
                                        column = parseInt(prompt("Agrega una posicion valida del tablero, columna 1 ... 7"));
                                        
                                        if(0 < column && column < 8){
                                            incorrectColumn = false; 
                                        }
                                        column -= 1;
                                    }while(incorrectColumn) 
                                    return column;
                                 } 
                }else{
                    getTirada = function getRandomColumn(){
                                    // 0, 1, 2, 3, 4, 5, 6
                                    const MAX_COLUMN = 7;
                                    return Math.floor(Math.random() * MAX_COLUMN);
                                }
                }
                column = getTirada();
            } while (!isPosititionValid(tablero, column));
            updateTablero(tablero, column, game.TOKEN_STATE[game.player]);
            printTablero(tablero);

            game.win = playerWin(tablero, game.TOKEN_STATE[game.player], game.FILES, game.COLUMNS);
            if (!game.win) {
                game.player = (game.player + 1) % game.N_PLAYERS;
                game.movRestantes -= 1;
            }

        } while (!gameEnd(game.win, game.movRestantes)); // nor, si las dos son falsas repite bucle
        printMessageEndGame(game.win, game.player);

        function gameEnd(win, movRestantes) {
            return win || movRestantes <= 0;
        }

        function playerWin(board, tokenState, FILES, COLUMNS){
            console.log(tokenState);        

            let cuantroEnRaya = false;
            for(let idFil = 0; idFil < FILES ; idFil++){
                for(let idCol = 0; idCol < COLUMNS; idCol++){
                    cuantroEnRaya = checkPosition(board, idCol, idFil, tokenState);
                    if (cuantroEnRaya){
                        return true;
                    }
                }
            }
            return false;

            function checkPosition(tablero, idCol, idRow, token) {
                const CONECTA_SIZE = 4;
                if(CONECTA_SIZE + idCol < 7){                     
                    if (tablero[idCol][idRow] == token && tablero[idCol + 1][idRow] == token && tablero[idCol + 2][idRow] == token && tablero[idCol + 3][idRow] == token){
                        return true;
                    }
                }                 
                if(CONECTA_SIZE + idRow < 6){
                    if(tablero[idCol][idRow] == token && tablero[idCol][idRow + 1] == token && tablero[idCol][idRow + 2] == token && tablero[idCol][idRow + 3] == token){
                        return true;
                    }
                }
                if(CONECTA_SIZE + idCol < 7 && CONECTA_SIZE + idRow < 6){
                    if(tablero[idCol][idRow] == token && tablero[idCol + 1][idRow + 1] == token && tablero[idCol + 2][idRow + 2] == token && tablero[idCol + 3][idRow + 3] == token ||
                        tablero[idCol][idRow + 3] == token && tablero[idCol + 1][idRow + 2] == token && tablero[idCol + 2][idRow + 1] == token && tablero[idCol + 3][idRow] == token) {
                        return true;
                    }
                }
                return false;
            }
        }

        function isPosititionValid(board, column){    
            for(let i = 0; i < 6; i++){ 
                if(board[column][i] == "0"){
                    return true;
                }
            }
            console.log("LA COLUMNA ELEGIDA NO ES VALIDA, ESTA LLENA.")
            return false;
        }

        function printTablero(board){
            console.log(board[0]);
            console.log(board[1]);
            console.log(board[2]);
            console.log(board[3]);
            console.log(board[4]);
            console.log(board[5]);
            console.log(board[6]);
            console.log(" ");
        }

        function updateTablero(board, column, tokenstate){
            let index = 0;
            while(board[column][index] == "RED" || board[column][index] == "YELLOW"){
                index += 1;
            }    
            board[column][index] = tokenstate;
        }

        function inicializeTablero(FILES, COLUMNS){    
            let tablero = new Array(COLUMNS);
            for(let i = 0; i < tablero.length; i++){
                tablero[i] = new Array(FILES);
            }
        
            for(let i = 0; i < tablero.length; i++){             
                for (let j = 0; j < tablero[i].length; j++){
                    tablero[i][j] = "0";
                }
            } 
            return tablero;
        }

        function printMessageEndGame(win, player){
            const PLAYERS = ["PLAYER 1", "PLAYER 2"];
            if (win){
                console.log("ENORABUENA EL JUGADOR: " + PLAYERS[player] + " HA GANADO");
            }else{
                console.log("NO HAY MAS MOVIMIENTOS POSIBLES, EMPATE");
            }
        }
    }
           
    function playAgain(){
        let answer;
        let isAnswerdValid;
        do{
            answer = prompt('QUIERES JUGAR OTRA PARTIDA(SI/NO): ');
            isAnswerdValid = answer === 'SI' || answer === 'NO';
            if (!isAnswerdValid){
                console.log("LA RESPUESTA NO ES VALIDA, SOLO SE ACEPTA SI O NO EN MAYUSCULAS");
            }
        }while(!isAnswerdValid)
    
        return (answer === 'SI');
    }
}

connecta4();