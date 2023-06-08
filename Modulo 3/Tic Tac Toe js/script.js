
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
        const TOKENSTATE = ['X', 'Y'];
        const NPLAYERS = 2;
    
        let player = 0;
        let mov_restantes = 9;
        let tablero = inicializeTablero(3, 3);
        let win;
    
        console.log(tablero);    
        do {
            win = tirada(tablero, player);
            if (!win) {
                player = (player + 1) % NPLAYERS;
                mov_restantes -= 1;
            }
        } while (!gameEnd(win, mov_restantes));
        printMessageEndGame(win, player);
    
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

        function tirada(tablero, player) {
            const TOKENSTATE = ['X', 'Y'];
            let { file, column } = getFileColumn(tablero);
    
            tablero[file][column] = TOKENSTATE[player];
            printTablero(tablero);
    
            return win = playerWin(tablero, TOKENSTATE[player]);

            function playerWin(tablero, tokenState){
                if(tablero[0][0] ==  tokenState && tablero[0][1] == tokenState && tablero[0][2] == tokenState ||
                    tablero[1][0] == tokenState && tablero[1][1] == tokenState && tablero[1][2] == tokenState ||
                    tablero[2][0] == tokenState && tablero[2][1] == tokenState && tablero[2][2] == tokenState ||
                    tablero[0][0] == tokenState && tablero[1][0] == tokenState && tablero[2][0] == tokenState ||
                    tablero[0][1] == tokenState && tablero[1][1] == tokenState && tablero[2][1] == tokenState ||
                    tablero[0][2] == tokenState && tablero[1][2] == tokenState && tablero[2][2] == tokenState ||
                    tablero[0][0] == tokenState && tablero[1][1] == tokenState && tablero[2][2] == tokenState ||
                    tablero[2][0] == tokenState && tablero[1][1] == tokenState && tablero[0][2] == tokenState){
                    //playerWin = true;
                    return true;
                    }
                return false;
            }
    
            function getFileColumn(tablero) {
                let file, column;
                do {
                    file = getPosition("FILE");
                    column = getPosition("COLUMN");
                } while (!isPosititionValid(tablero, file, column));
                console.log("SE HA ELEGIDO LA FILA: " + file);
                console.log("SE HA ELEGIDO LA COLUMNA: " + column);
                return { file, column };

                function isPosititionValid(tablero, file, column){
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
                console.log(fileColumn);
                return fileColumn - OFFSET;
                }
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






