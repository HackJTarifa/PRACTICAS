
// ------------------- START PROGRAMA -------------------
function ticTacToe() {
    do{
        gameInit();
    }while(playAgain())
    console.log("EL JUEGO A FINALIZADO, HASTA OTRA");
    // -------------- END PROGRAMA ---------------------
    
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

    function gameInit() {
        let game = {
            MODES: [["JUGADOR", "JUGADOR"], ["JUGADOR", "MAQUINA"], ["MAQUINA", "MAQUINA"]],
            TOKENSTATE: ['X', 'Y'],
            TOKEN_STATE_EMPY: "0",
            N_PLAYERS: 2,
            player: 0,
            mov_restantes: 9,
            win: false,
        }
        
        let playerMode;
        const playerModel = getPlayerModel();
        playerMode = game.MODES[playerModel - 1]; //compensamos 1 como la poscion 0 del array

        let board = initializeBoard(3, 3, game.TOKEN_STATE_EMPY);
            
        console.log(board);    
        do {
            game.win = tirada(board, game.player, playerMode[game.player]);
            if (!game.win) {
                game.player = (game.player + 1) % game.N_PLAYERS;
                game.mov_restantes -= 1;
            }
        } while (!gameEnd(game.win, game.mov_restantes));
        printMessageEndGame(game.win, game.player);
    
        function getPlayerModel(){
            let respuesta;
            let isAnswerdValid;
            do{
                respuesta = parseInt(prompt('JUGADOR VS JUGADOR ELIGE :1 \nJUGADOR VS MAQUINA ELIGE: 2 \nMAQUINA VS MAQUINA: ELIGE : 3'));
                isAnswerdValid = respuesta === 1 || respuesta === 2 || respuesta === 3;
            }while(!isAnswerdValid)

            return respuesta;
        }

        /** 
         * Create and Inizialize new tablero files,columns == "0" 
         * @param {number} files 
         * @param {number} columns 
         * @returns {Array} 
         */
        function initializeBoard(files, columns, tokenEstateEmpy){
            let board = [];
            for(let i = 0; i < columns; i++){
                board[i] = [];
                for(let j = 0; j < files; j++){
                    board[i][j] = tokenEstateEmpy;
                }
            }     
            return board;
        }

        /**
         * Check if player win
         * @param {Boolean} winPlayer 
         * @param {number} mov_restantes 
         * @returns 
         */
        function gameEnd(winPlayer, mov_restantes){
            return winPlayer || mov_restantes <= 0;
        }

        /**
         * Print message player win o not more moviments
         * @param {Boolean} win 
         * @param {number} player 
         */
        function printMessageEndGame(win, player){
            const players = ["PLAYER 1", "PLAYER 2"];
            if (win){
                console.log("ENORABUENA EL JUGADOR: " + players[player] + " HA GANADO");
            }else{
                console.log("NO HAY MAS MOVIMIENTOS POSIBLE, EMPATE");
            }
        }

        /** 
         * @param {Array[string][string]} board 
         * @param {number} player 
         * @param {Array[string]} playerMode // Indica si la tirada la realiza un jugador o la maquina
         * @returns 
         */
        function tirada(board, player, playerMode) {
            const TOKENSTATE = ['X', 'Y'];
            let typePlayer;
            console.log("ESTA JUGANDO : " + playerMode);
            if(playerMode === 'JUGADOR'){
                typePlayer = function getFileColumn(board) {
                                let file, column;
                                do {
                                    file = getPosition("FILE");
                                    column = getPosition("COLUMN");
                                } while (!isPosititionValid(board, file, column));
                                console.log("SE HA ELEGIDO LA FILA: " + file);
                                console.log("SE HA ELEGIDO LA COLUMNA: " + column);
                                return [file, column];
                
                                function isPosititionValid(tablero, file, column){
                                    console.log(tablero[file][column]);
                                    return (tablero[file][column] === "0");
                                }                                                
                
                                function getPosition(fileOColumn){
                                    let fileColumn;
                                    let incorrectPosition;
                                    do{ 
                                        incorrectPosition = true;         
                                        fileColumn = parseInt(prompt("Agrega una posicion valida del tablero " + fileOColumn + " 1-2-3"));
                                        if(0 < fileColumn && fileColumn < 4){
                                            incorrectPosition = false; 
                                            
                                        }else{
                                            console.log(fileOColumn + ": SOLO SE ACEPTAN VALOES NUMERICOS ENTRE EN 1 Y EL 3");
                                        }
                                    }while(incorrectPosition)   
                
                                    const OFFSET = 1;
                                    console.log(" " + fileColumn + " " + fileOColumn + "");
                                    return fileColumn - OFFSET;
                                }
                            }              
            }else{
                /** @param {array[string][string]} board */
                typePlayer = function getRandomPosition(board){
                                let validFile = [];
                                let validColumn = [];
                                for(let i = 0; i < board.length; i++){             
                                    for (let j = 0; j < board[i].length; j++){
                                        if (board[i][j] == "0"){
                                            validFile.push(i); 
                                            validColumn.push(j);  
                                        }
                                    }
                                }
                                const position = Math.floor(Math.random() * validFile.length); 
                                console.log((validFile[position] + 1) + " file");
                                console.log((validColumn[position] + 1)  + " column");  
                                return [validFile[position], validColumn[position]];
                            }
            }

            /** @param {funtion} tipoPlayer */
            let getTirada = function (tipoPlayer, board){
                                return tipoPlayer(board);
                            }

            let fileColumn = getTirada(typePlayer, board);

            board[fileColumn[0]][fileColumn[1]] = TOKENSTATE[player];
            printTablero(board);
    
            return win = playerWin(board, TOKENSTATE[player]);

            /**             
             * @param {arry [string][string]} board 
             * @param {array[string]} token 
             * @returns 
             */
            function playerWin(board, token){
                console.log("COMPRUEVA SI EL GANADOR ES: " + token);
                for(let i = 0; i < 3; i++){
                    if(board[i][0] ===  token && board[i][1] === token && board[i][2] === token){
                        console.log("ganador file [" + i + "][0]-["+ i +"][1]-["+ i +"][2]: " + board[i][0] + " " + board[i][1] + " " + board[i][2]);
                        return true;
                    }
                    if(board[0][i] ===  token && board[1][i] === token && board[2][i] === token){
                        console.log("ganador column [0][" + i + "]-[1][" + i + "]-[2]["+ i +"]: " + board[0][i] + " " + board[1][i] + " " + board[2][i]);
                        return true;
                    }           
                }
                if( board[0][0] === token && board[1][1] === token && board[2][2] === token){
                    console.log("granador [0][0]-[1][1]-[2][2]: " + board[0][0] + " " + board[1][1] + " " + board[2][2]);
                    return true;
                }
                if( board[2][0] === token && board[1][1] === token && board[0][2] === token){
                    console.log("ganador [2][0]-[1][1]-[0][2]: " + board[2][0] + " " + board[1][1] + " " + board[0][2]);
                    return true;
                }
                console.log("EL JUGADOR: " + token + " NO HA GANADO");
                return false;
            }
             
            /**             
             * @param {array[string][string]} tablero 
             */
            function printTablero(tablero){
                console.log(tablero[0]);
                console.log(tablero[1]);
                console.log(tablero[2]);
            }    
        }
    }
}

ticTacToe();