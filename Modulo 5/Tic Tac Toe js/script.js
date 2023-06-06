
// ------------------- START PROGRAMA -------------------
function ticTacToe() {
    do{
        gameInit();
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

    function gameInit() {   
        const playerModel = getPlayerModel();

        const TOKENSTATE = ['X', 'Y'];
        const NPLAYERS = 2;

        let player = 0;
        let mov_restantes = 9;
        let tablero = inicializeTablero(3, 3);
        let win;
    
        console.log(tablero);    
        do {
            win = tirada(tablero, player, playerModel[player], TOKENSTATE);
            if (!win) {
                player = (player + 1) % NPLAYERS;
                mov_restantes -= 1;
            }
        } while (!gameEnd(win, mov_restantes));
        printMessageEndGame(win, player);
    
        function tirada(tablero, player, playerMode, TOKEN_STATE) {
            let fileColumn = getTirada(tablero, playerMode);            
            tablero[fileColumn[0]][fileColumn[1]] = TOKENSTATE[player];
            printTablero(tablero);
    
            return win = playerWin(tablero, TOKENSTATE[player]);

            function playerWin(tablero, tokenState){
                for(let i = 0; i < 3; i++){
                    if(tablero[i][0] ==  tokenState && tablero[i][1] == tokenState && tablero[i][2] == tokenState){
                        return true;
                    }
                    if(tablero[0][i] ==  tokenState && tablero[1][i] == tokenState && tablero[2][i] == tokenState){
                        return true;
                    }           
                }
                if( tablero[0][0] == tokenState && tablero[1][1] == tokenState && tablero[2][2] == tokenState ||
                    tablero[2][0] == tokenState && tablero[1][1] == tokenState && tablero[0][2] == tokenState){
                    return true;
                }
                return false;
            }
             
            function printTablero(tablero){
                console.log(tablero[0]);
                console.log(tablero[1]);
                console.log(tablero[2]);
            }   
        }

        function getPlayerModel(){
            let respuesta;
            let isAnswerdValid;
            do{
                respuesta = parseInt(prompt('JUGADOR VS JUGADOR ELIGE :1 \nJUGADOR VS MAQUINA ELIGE: 2 \nMAQUINA VS MAQUINA: ELIGE : 3'));
                isAnswerdValid = respuesta === 1 || respuesta === 2 || respuesta === 3;
            }while(!isAnswerdValid)

            const playerMode = [["JUGADOR", "JUGADOR"], ["MAQUINA", "JUGADOR"], ["MAQUINA", "MAQUINA"]];
            return playerMode[respuesta - 1];
        }

        function inicializeTablero(files, columns){
            let tablero = new Array(files);
            for(let i = 0; i < tablero.length; i++){
                tablero[i] = new Array(columns);
            }

            for(let i = 0; i < tablero.length; i++){             
                for (let j = 0; j < tablero[i].length; j++){
                    tablero[i][j] = "0";
                }
            } 

            console.log(tablero[0]);
            console.log(tablero[1]);
            console.log(tablero[2]);
            return tablero;
        }

        function gameEnd(winPlayer, mov_restantes){
            if(winPlayer){
                return true;
            }else if(mov_restantes <= 0){
                return true;
            }
            return false;
        }

        function printMessageEndGame(win, player){
            const players = ["PLAYER 1", "PLAYER 2"];
            if (win){
                console.log("ENORABUENA EL JUGADOR: " + players[player] + " HA GANADO");
            }else{
                console.log("NO HAY MAS MOVIMIENTOS POSIBLE, EMPATE");
            }
        }
        
        function getTirada(tablero, playerMode){
            console.log(playerMode);
            
            const functionPlayerType ={
                "JUGADOR": function getFileColumn(tablero) {
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
                                    return fileColumn - OFFSET;
                                }
                            }              
            , "MAQUINA": function getRandomPosition(tablero){
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
                            return [validFile[position], validColumn[position]];
                         }
            }

            let getTirada = functionPlayerType[playerMode]; 
            let resultado = getTirada(tablero);
            console.log(resultado[0] + " " + resultado[1]);
            return resultado;

        }
    }
}

ticTacToe()