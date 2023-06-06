let name = prompt('Introduce tu nombre: ');
let age = prompt('Introduce tu edad: ');

document.writeln(`<br\> Hola mundo ${name} tienes ${age} y que te den  <br\>`);
console.log("Hello world!");

let respuesta;
const playAgain = 'SI';

do{
    // PARTE CENTRAL DEL PROGRAMA
    let nPlayers = 2;
    let player = 0;
    let players = ["PLAYER 1", "PLAYER 2"];
    let playerWin = false;
    let mov_restantes = 9;    
    let tokenState = ['X', 'Y'];
    let tablero =[[0,0,0],[0,0,0],[0,0,0]];
    do{
        // si fila es un numero  1, 2, 3
        // si columna es un numero 1, 2, 3
        let posicionValida;
        let fila;
        let colum;
        do{ // COMPROVAMOS QUE LA POSICION INGRESADA ES VALIDA
            
            
            posicionValida = false;
            // START COMPROVACION ENTRADA NUMERO ENTRE 1 2 3

            // TESTEADO CORRECTO FUNCIONAMIENTO SOLO ACECPTAN VALORES 1 ... 3 FILA Y COLUMNA
            let incorrecFile;
            let incorrectColumn;
            do{ 
                 incorrecFile = true;
                 incorrectColumn = true;     
                 
                fila = parseInt(prompt("Agrega una posicion valida del tablero, fila 1-2-3"));
                colum = parseInt(prompt("Agrega una posicion valida del tablero, columna 1-2-3"));
          
                if (0 < fila && fila < 4){
                    incorrecFile = false;                    
                        //let a = prompt("Testeando filacheck, el valor es incorrecto, fuera del rango de valores permitidos.");
                }
                if(0 < colum && colum < 4){
                    incorrectColumn = false; 
                    //let b = prompt("Testeando columnaCheck, el valor es incorrecto, fuera del rango de valores permitidos.");
                }
           }while(incorrecFile || incorrectColumn)    
           // END TESTEADO VALORES DE ENTRADA ------------------------------------------------------

            if(tablero[fila - 1][colum - 1] == 0){
                if(player == 0){
                    tablero[fila - 1][colum - 1] = "X";
                }else{
                    tablero[fila - 1][colum - 1] = "Y";
                }

                posicionValida = true;
            }else{
                console.log("La posicion ya esta ocupada");
            } 
        }while(!posicionValida)

        console.log(tablero[0][0] + " " + tablero[0][1] + " " + tablero[0][2]);
        console.log(tablero[1][0] + " " + tablero[1][1] + " " + tablero[1][2]);
        console.log(tablero[2][0] + " " + tablero[2][1] + " " + tablero[2][2]);

        //Comprovar tres en ralla
        if(tablero[0][0] ==  tokenState[player] && tablero[0][1] == tokenState[player] && tablero[0][2] == tokenState[player] ||
            tablero[1][0] == tokenState[player] && tablero[1][1] == tokenState[player] && tablero[1][2] == tokenState[player] ||
            tablero[2][0] == tokenState[player] && tablero[2][1] == tokenState[player] && tablero[2][2] == tokenState[player] ||
            tablero[0][0] == tokenState[player] && tablero[1][0] == tokenState[player] && tablero[2][0] == tokenState[player] ||
            tablero[0][1] == tokenState[player] && tablero[1][1] == tokenState[player] && tablero[2][1] == tokenState[player] ||
            tablero[0][2] == tokenState[player] && tablero[1][2] == tokenState[player] && tablero[2][2] == tokenState[player] ||
            tablero[0][0] == tokenState[player] && tablero[1][1] == tokenState[player] && tablero[2][2] == tokenState[player] ||
            tablero[2][0] == tokenState[player] && tablero[1][1] == tokenState[player] && tablero[0][2] == tokenState[player]){
            playerWin = true;
        }else{
            player = (player + 1) % nPlayers;
            mov_restantes = mov_restantes - 1;
        }
    }while( !(playerWin || mov_restantes <= 0)) // nor, si las dos son falsas repite bucle

    if (playerWin || mov_restantes > 0){
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