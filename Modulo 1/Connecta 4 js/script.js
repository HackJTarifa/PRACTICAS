let respuesta;
const playAgain = 'SI';

do{
    // PARTE CENTRAL DEL PROGRAMA
    let nPlayers = 2;
    let player = 0;
    let players = ["PLAYER 1", "PLAYER 2"];
    let playerWin = false;
    let movRestantes = 42;    
    let tokenState = ['RED', 'YELLOW'];
    let tablero =   [["0", "0", "0", "0", "0", "0"],
                    ["0", "0", "0", "0", "0", "0"],
                    ["0", "0", "0", "0", "0", "0"],
                    ["0", "0", "0", "0", "0", "0"],
                    ["0", "0", "0", "0", "0", "0"],
                    ["0", "0", "0", "0", "0", "0"],
                    ["0", "0", "0", "0", "0", "0"]];

    do{
        // si fila es un numero  1, 2, 3
        // si columna es un numero 1, 2, 3
        let posicionValida;
        do{ // COMPROVAMOS QUE LA POSICION INGRESADA ES VALIDA
            // TESTEADO CORRECTO FUNCIONAMIENTO SOLO ACECPTAN VALORES 1 ... 3 FILA Y COLUMNA
            let colum;
            let incorrectColumn;
            do{ 
                incorrectColumn = true;                 
                colum = parseInt(prompt("Agrega una posicion valida del tablero, columna 1 ... 7"));
                
                if(0 < colum && colum < 8){
                    incorrectColumn = false; 
                }
                colum -= 1;
           }while(incorrectColumn)    
           // END TESTEADO VALORES DE ENTRADA ------------------------------------------------------
            posicionValida = false;
            let columSitiosLibres = 0;
            for(let i = 0; i < 6; i++){ 
                if(tablero[colum][i] == "0"){
                    columSitiosLibres += 1;
                }
            }

            if(columSitiosLibres > 0){
                let index = 0;
                console.log(tablero[colum][index] == "RED" || tablero[colum][index] == "YELLOW");
                console.log(tablero[colum][index]);
                console.log("valor de colum: " + colum + " valor del index: " + index);

                while(tablero[colum][index] == "RED" || tablero[colum][index] == "YELLOW"){
                    index += 1;
                }
                console.log("testeando el valor del index: " + index);

                if(player == 0){
                    tablero[colum][index] = "RED";
                }else{
                    tablero[colum][index] = "YELLOW";
                }

                posicionValida = true;
            }else{
                console.log("La posicion ya esta ocupada");
            } 
        }while(!posicionValida)

        console.log(tablero[0]);
        console.log(tablero[1]);
        console.log(tablero[2]);
        console.log(tablero[3]);
        console.log(tablero[4]);
        console.log(tablero[5]);
        console.log(tablero[6]);

        //[0...7][0...6]
        const COLUMNS = 7;      
        const FILES = 6;
        let cuantroEnRaya = false;
        const playerToken = tokenState[player];
        for(let idFil = 0; idFil < FILES ; idFil++){
            for(let idCol = 0; idCol < COLUMNS; idCol++){
                const SIZE = 4;
                if(SIZE + idCol < 7){                     
                    if (tablero[idCol][idFil] == playerToken && tablero[idCol + 1][idFil] == playerToken && tablero[idCol + 2][idFil] == playerToken && tablero[idCol + 3][idFil] == playerToken){
                        cuantroEnRaya = true;
                    }
                }                 
                if(SIZE + idFil < 6){
                    if(tablero[idCol][idFil] == playerToken && tablero[idCol][idFil + 1] == playerToken && tablero[idCol][idFil + 2] == playerToken && tablero[idCol][idFil + 3] == playerToken){
                        cuantroEnRaya = true;
                    }
                }
                if(SIZE + idCol < 7 && SIZE + idFil < 6){
                    if(tablero[idCol][idFil] == playerToken && tablero[idCol + 1][idFil + 1] == playerToken && tablero[idCol + 2][idFil + 2] == playerToken && tablero[idCol + 3][idFil + 3] == playerToken ||
                        tablero[idCol][idFil + 3] == playerToken && tablero[idCol + 1][idFil + 2] == playerToken && tablero[idCol + 2][idFil + 1] == playerToken && tablero[idCol + 3][idFil] == playerToken) {
                            cuantroEnRaya = true;
                    }
                }
            }
        }
        if(cuantroEnRaya){
            playerWin = true;
        }else{
            player = (player + 1) % nPlayers;
            movRestantes -= 1; 
        }
    }while(!(playerWin || movRestantes <= 0)) // nor, si las dos son falsas repite bucle

    if (playerWin || movRestantes > 0){
        console.log("ENORABUENA EL JUGAODR" + players[player] + " HA GANADO");
    }else{
        console.log("NO HAY MAS MOVIMIENTOS POSIBLE, EMPATE");
    }
    
    // COMPRAVACION SI EL JUGADOR QUIERE VOLVER A JUGAR.
    respuesta = prompt('Quieres jugar otra partida: ');
    let isAnswerdValid = respuesta === 'SI' || respuesta === 'NO';
    do{
        if (!isAnswerdValid){
            respuesta = prompt("La respuesta no es valida, solamente se acepta SI o NO, Quires jugar otra partida: ");
            isAnswerdValid = respuesta === 'SI' || respuesta === 'NO';
        }
    }while(!isAnswerdValid)
}while(respuesta === playAgain)
console.log("EL JUEGO TIC TAC TOE HA FINALIZADO <br\>");

