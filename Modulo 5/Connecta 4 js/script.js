
function connecta4() {
    do{
        playGame();    
    }while(playAgain())
    console.log("EL JUEGO CONECTA 4 HA TERMINADO ");
    
    function playGame() {
        const N_PLAYERS = 2;
        const TOKEN_STATE = ['RED', 'YELLOW'];
        const COLUMNS = 7;
        const FILES = 6;

        let player = 0;
        let movRestantes =  COLUMNS * FILES;
        let tablero = inicializeTablero(FILES, COLUMNS);
        
        const getTypesPlayers = function(){
            const playerTypes = ["JUGADOR", "MAQUINA"];
            let respuesta;
            let isAnswerdValid;
            do{
                respuesta = parseInt(prompt('JUGADOR VS JUGADOR ELIGE :1 \nJUGADOR VS MAQUINA ELIGE: 2 \nMAQUINA VS MAQUINA: ELIGE : 3'));
                isAnswerdValid = respuesta === 1 || respuesta === 2 || respuesta === 3;
            }while(!isAnswerdValid)   
            
            const playModes = [[playerTypes[0], playerTypes[0]] , [playerTypes[0], playerTypes[1]], [playerTypes[1], playerTypes[1]]];
            return playModes[respuesta - 1]
        }
        
        let playerMode = getTypesPlayers();
        let win;
        do {
            let column;
            do {
                column = getTirada(playerMode[player]);
            } while (!isPosititionValid(tablero, column));
            updateTablero(tablero, column, TOKEN_STATE[player]);
            printTablero(tablero);

            win = playerWin(tablero, TOKEN_STATE[player], FILES, COLUMNS);
            if (!win) {
                player = (player + 1) % N_PLAYERS;
                movRestantes -= 1;
            }

        } while (!gameEnd(win, movRestantes)); // nor, si las dos son falsas repite bucle
        printMessageEndGame(win, player);

        function getTirada(playerMode){
            let getTiradaColumn;

            const functionPlayerType = { 
                "JUGADOR": function getColumn(){
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
            , "MAQUINA": function getRandomColumn(){
                                // 0, 1, 2, 3, 4, 5, 6
                                const MAX_COLUMN = 7;
                                return Math.floor(Math.random() * MAX_COLUMN);
                            }
            }

            getTiradaColumn = functionPlayerType[playerMode];            
            return getTiradaColumn();
        }

        function gameEnd(win, movRestantes) {
            if(win){
                return true
            }else if(movRestantes <= 0){
                return true;
            } 
            return false;
        }

        function playerWin(tablero, tokenState, FILES, COLUMNS){
            console.log(tokenState);        

            let cuantroEnRaya = false;
            for(let indexFiles = 0; indexFiles < FILES ; indexFiles++){
                for(let indexColumns = 0; indexColumns < COLUMNS; indexColumns++){
                    cuantroEnRaya = checkPosition(tablero, indexColumns, indexFiles, tokenState);
                    if (cuantroEnRaya){
                        return true;
                    }
                }
            }
            return false;

            //[0...7][0...6]
            function checkPosition(tablero, idCol, idFil, tokenState) {
                const SIZE = 4;
                if(SIZE + idCol < 7){                     
                    if (tablero[idCol][idFil] == tokenState && tablero[idCol + 1][idFil] == tokenState && tablero[idCol + 2][idFil] == tokenState && tablero[idCol + 3][idFil] == tokenState){
                        return true;
                    }
                }                 
                if(SIZE + idFil < 6){
                    if(tablero[idCol][idFil] == tokenState && tablero[idCol][idFil + 1] == tokenState && tablero[idCol][idFil + 2] == tokenState && tablero[idCol][idFil + 3] == tokenState){
                        return true;
                    }
                }
                if(SIZE + idCol < 7 && SIZE + idFil < 6){
                    if(tablero[idCol][idFil] == tokenState && tablero[idCol + 1][idFil + 1] == tokenState && tablero[idCol + 2][idFil + 2] == tokenState && tablero[idCol + 3][idFil + 3] == tokenState ||
                        tablero[idCol][idFil + 3] == tokenState && tablero[idCol + 1][idFil + 2] == tokenState && tablero[idCol + 2][idFil + 1] == tokenState && tablero[idCol + 3][idFil] == tokenState) {
                            return true;
                    }
                }
                return false;
            }
        }

        function isPosititionValid(tablero, column){    
            for(let i = 0; i < 6; i++){ 
                if(tablero[column][i] == "0"){
                    return true;
                }
            }
            console.log("LA COLUMNA ELEGIDA NO ES VALIDA, ESTA LLENA.")
            return false;
        }

        function printTablero(tablero){
            console.log(tablero[0]);
            console.log(tablero[1]);
            console.log(tablero[2]);
            console.log(tablero[3]);
            console.log(tablero[4]);
            console.log(tablero[5]);
            console.log(tablero[6]);
            console.log(" ");
        }

        function updateTablero(tablero, column, tokenstate){
            let index = 0;
            while(tablero[column][index] == "RED" || tablero[column][index] == "YELLOW"){
                index += 1;
            }    
            tablero[column][index] = tokenstate;
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
        let respuesta;
        let isAnswerdValid;
        do{
            respuesta = prompt('QUIERES JUGAR OTRA PARTIDA: ');
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
}

connecta4();