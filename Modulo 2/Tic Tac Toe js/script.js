
do{
    const NPLAYERS = 2;
    let player = 0;
    let mov_restantes = 9;    
    const TOKENSTATE = ['X', 'Y'];
    let tablero = inicializeTablero(3, 3);
    console.log(tablero);
    let file, column;
    let win;
    do{
        do{
            file = getFile();
            column = getColumn();
        }while(!isPosititionValid(tablero, file, column))
        console.log("SE HA ELEGIDO LA FILA: " + file);
        console.log("SE HA ELEGIDO LA COLUMNA: " + column);
        

        tablero[file][column] = TOKENSTATE[player];
        printTablero(tablero);

        win = playerWin(tablero, TOKENSTATE[player]);
        if(!win){
            player = (player + 1) % NPLAYERS;
            mov_restantes -= 1;
        }
        console.log("MOVIMIENTOS RESTANTES: " + mov_restantes);
    }while(!gameEnd(win, mov_restantes))
    printMessageEndGame(win, player);
}while(playAgain())

console.log("EL JUEGO A FINALIZADO, HASTA OTRA");


function printTablero(tablero){
    console.log(tablero[0]);
    console.log(tablero[1]);
    console.log(tablero[2]);
}

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

function printMessageEndGame(win, player){
    let players = ["PLAYER 1", "PLAYER 2"];
    if (win){
        console.log("ENORABUENA EL JUGADOR: " + players[player] + " HA GANADO");
    }else{
        console.log("NO HAY MAS MOVIMIENTOS POSIBLE, EMPATE");
    }
}

function gameEnd(win, mov_restantes){
    if(win){
        return true;
    }else if(mov_restantes <= 0){
        return true;
    }
    return false;
}

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

function getFile(){
    let file;
    let incorrectFile;
    do{ 
        incorrectFile = true;         
        file = parseInt(prompt("Agrega una posicion valida del tablero, fila 1-2-3"));
        if(0 < file && file < 4){
            incorrectFile = false; 
            
        }else{
            console.log("FILA: SOLO SE ACEPTAN VALOES NUMERICOS ENTRE EN 1 Y EL 3");
        }
   }while(incorrectFile)   

   let offset = 1;
   console.log(file);
   return file - offset;
}

function getColumn(){
    let column;
    let incorrectColumn;
    do{
        incorrectValue = true
        column = parseInt(prompt("Agrega una posicion valida del tablero, columna 1-2-3"));
        if(0 < column && column < 4){
            incorrectColumn = false; 
        }else{
            console.log("COLUMNA: SOLO SE ACEPTAN VALORES ENTRE EL 1 Y EL TRES");
        }
    }while(incorrectColumn)

    const OFFSET = 1;
    console.log(column);
    return column - OFFSET; 
}

function isPosititionValid(tablero, file, column){
    if(tablero[file][column] === "0"){
        return true;
    }
    return false;
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
     return tablero;
}