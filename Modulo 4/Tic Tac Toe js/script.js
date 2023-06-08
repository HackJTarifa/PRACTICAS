
// ------------------- START PROGRAMA -------------------
function ticTacToe() {
    do{
        game();
    }while(playAgain())
    console.log("EL JUEGO A FINALIZADO, HASTA OTRA");
    // -------------- END PROGRAMA ---------------------
    
    function playAgain(){
        let respuesta;
        let isAnswerdValid;
        do{
            respuesta = prompt('Quieres jugar otra partida: ');
            isAnswerdValid = respuesta === 'SI' || respuesta === 'NO';
            if (!isAnswerdValid){
                console.log("LA RESPUESTA NO ES VALIDA, SOLO SE ACEPTA SI O NO EN MAYUSCULAS");
            }
        }while(!isAnswerdValid)

        if (respuesta === 'SI'){
            return true;
        }
        return false; 
    }

    function game() {   
        let playerMode;
        // const typePlayer = ['MAQUINA', 'JUGADOR'];
        const playerModel = getPlayerModel();
        if(playerModel == 1){
            //playerMode = [1, 1];
            playerMode = ["JUGADOR", "JUGADOR"];
            //playerMode =[typePlayer[1], typePlayer[1]];
        }else if(playerModel == 2){
            //playerMode = [0, 1];
            playerMode = ["JUGADOR", "MAQUINA"];      
            //playerMode =[typePlayer[0], typePlayer[1]];      
        }else if(playerModel == 3){
            //playerMode = [0, 0];
            playerMode = ["MAQUINA", "MAQUINA"];
            //playerMode =[typePlayer[0], typePlayer[1]];
        }

        const TOKENSTATE = ['X', 'Y'];
        const NPLAYERS = 2;
    
        let player = 0;
        let mov_restantes = 9;
        let tablero = inicializeTablero(3, 3);
        let win;
    
        console.log(tablero);    
        do {
            win = tirada(tablero, player, playerMode[player]);
            if (!win) {
                player = (player + 1) % NPLAYERS;
                mov_restantes -= 1;
            }
        } while (!gameEnd(win, mov_restantes));
        printMessageEndGame(win, player);
    
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
        function inicializeTablero(files, columns){
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

        /**
         * Check if player win
         * @param {Boolean} winPlayer 
         * @param {number} mov_restantes 
         * @returns 
         */
        function gameEnd(winPlayer, mov_restantes){
            if(winPlayer){
                return true;
            }else if(mov_restantes <= 0){
                return true;
            }
            return false;
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
         * @param {Array[string][string]} tablero 
         * @param {number} player 
         * @param {Array[string]} playerMode // Indica si la tirada la realiza un jugador o la maquina
         * @returns 
         */
        function tirada(tablero, player, playerMode) {
            const TOKENSTATE = ['X', 'Y'];
            let tipoPlayer;
            console.log("ESTA JUGANDO : " + playerMode);
            if(playerMode === 'JUGADOR'){
                tipoPlayer = function getFileColumn(tablero) {
                                let file, column;
                                do {
                                    file = getPosition("FILE");
                                    column = getPosition("COLUMN");
                                } while (!isPosititionValid(tablero, file, column));
                                console.log("SE HA ELEGIDO LA FILA: " + file);
                                console.log("SE HA ELEGIDO LA COLUMNA: " + column);
                                return [file, column];
                
                                function isPosititionValid(tablero, file, column){
                                    console.log(tablero[file][column]);
                                    if(tablero[file][column] === "0"){
                                        return true;
                                    }
                                    return false;
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
                /** @param {type array[string][string]} tablero */
                tipoPlayer = function getRandomPosition(tablero){
                                let validFile = [];
                                let validColumn = [];
                                for(let i = 0; i < tablero.length; i++){             
                                    for (let j = 0; j < tablero[i].length; j++){
                                        if (tablero[i][j] == "0"){
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
            let getTirada = function (tipoPlayer, tablero){
                                return tipoPlayer(tablero);
                            }

            let fileColumn = getTirada(tipoPlayer, tablero);

            tablero[fileColumn[0]][fileColumn[1]] = TOKENSTATE[player];
            printTablero(tablero);
    
            return win = playerWin(tablero, TOKENSTATE[player]);

            function playerWin(tablero, tokenState){
                console.log("COMPRUEVA SI EL GANADOR ES: " + tokenState);
                for(let i = 0; i < 3; i++){
                    if(tablero[i][0] ===  tokenState && tablero[i][1] === tokenState && tablero[i][2] === tokenState){
                        console.log("ganador file [" + i + "][0]-["+ i +"][1]-["+ i +"][2]: " + tablero[i][0] + " " + tablero[i][1] + " " + tablero[i][2]);
                        return true;
                    }
                    if(tablero[0][i] ===  tokenState && tablero[1][i] === tokenState && tablero[2][i] === tokenState){
                        console.log("ganador column [0][" + i + "]-[1][" + i + "]-[2]["+ i +"]: " + tablero[0][i] + " " + tablero[1][i] + " " + tablero[2][i]);
                        return true;
                    }           
                }
                if( tablero[0][0] === tokenState && tablero[1][1] === tokenState && tablero[2][2] === tokenState){
                    console.log("granador [0][0]-[1][1]-[2][2]: " + tablero[0][0] + " " + tablero[1][1] + " " + tablero[2][2]);
                    return true;
                }
                if( tablero[2][0] === tokenState && tablero[1][1] === tokenState && tablero[0][2] === tokenState){
                    console.log("ganador [2][0]-[1][1]-[0][2]: " + tablero[2][0] + " " + tablero[1][1] + " " + tablero[0][2]);
                    return true;
                }
                console.log("EL JUGADOR: " + tokenState + " NO HA GANADO");
                return false;
            }
             
            function printTablero(tablero){
                console.log(tablero[0]);
                console.log(tablero[1]);
                console.log(tablero[2]);
            }    
        }
    }
}

ticTacToe();