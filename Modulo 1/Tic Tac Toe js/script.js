let name = prompt('Introduce tu nombre: ');
let age = prompt('Introduce tu edad: ');

document.writeln(`<br\> Hola mundo ${name} tienes ${age} y que te den  <br\>`);
console.log("Hello world!");

let answer;
const playAgain = 'SI';

do{
    // PARTE CENTRAL DEL PROGRAMA
    let nPlayers = 2;
    let player = 0;
    let players = ["PLAYER 1", "PLAYER 2"];
    let playerWin = false;
    let mov_restantes = 9;    
    let tokenState = ['X', 'Y'];
    let board =[[0,0,0],[0,0,0],[0,0,0]];
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

            if(board[fila - 1][colum - 1] == 0){
                if(player == 0){
                    board[fila - 1][colum - 1] = "X";
                }else{
                    board[fila - 1][colum - 1] = "Y";
                }

                posicionValida = true;
            }else{
                console.log("La posicion ya esta ocupada");
            } 
        }while(!posicionValida)

        console.log(board[0][0] + " " + board[0][1] + " " + board[0][2]);
        console.log(board[1][0] + " " + board[1][1] + " " + board[1][2]);
        console.log(board[2][0] + " " + board[2][1] + " " + board[2][2]);

        //Comprovar tres en ralla
        if(board[0][0] ==  tokenState[player] && board[0][1] == tokenState[player] && board[0][2] == tokenState[player] ||
            board[1][0] == tokenState[player] && board[1][1] == tokenState[player] && board[1][2] == tokenState[player] ||
            board[2][0] == tokenState[player] && board[2][1] == tokenState[player] && board[2][2] == tokenState[player] ||
            board[0][0] == tokenState[player] && board[1][0] == tokenState[player] && board[2][0] == tokenState[player] ||
            board[0][1] == tokenState[player] && board[1][1] == tokenState[player] && board[2][1] == tokenState[player] ||
            board[0][2] == tokenState[player] && board[1][2] == tokenState[player] && board[2][2] == tokenState[player] ||
            board[0][0] == tokenState[player] && board[1][1] == tokenState[player] && board[2][2] == tokenState[player] ||
            board[2][0] == tokenState[player] && board[1][1] == tokenState[player] && board[0][2] == tokenState[player]){
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
    answer = prompt('Quieres jugar otra partida: ');
    let isAnswerdValid = answer === 'SI' || answer === 'NO';
    do{
        if (!isAnswerdValid){
            answer = prompt("La respuesta no es valida, solamente se acepta SI o NO, Quires jugar otra partida: ");
            isAnswerdValid = answer === 'SI' || answer === 'NO';
        }
    }while(!isAnswerdValid)
}while(answer === playAgain)
console.log("EL JUEGO TIC TAC TOE HA FINALIZADO <br\>");