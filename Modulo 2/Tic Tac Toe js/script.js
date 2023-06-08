
do{
    const NPLAYERS = 2;
    let player = 0;
    let mov_restantes = 9;    
    const TOKENSTATE = ['X', 'Y'];
    let board = inicialitzeBoard(3, 3);
    console.log(board);
    let file, column;
    let win;
    do{
        do{
            file = getFile();
            column = getColumn();
        }while(!isPosititionValid(board, file, column))
        console.log("SE HA ELEGIDO LA FILA: " + file);
        console.log("SE HA ELEGIDO LA COLUMNA: " + column);
        

        board[file][column] = TOKENSTATE[player];
        printBoardState(board);

        win = playerWin(board, TOKENSTATE[player]);
        if(!win){
            player = (player + 1) % NPLAYERS;
            mov_restantes -= 1;
        }
        console.log("MOVIMIENTOS RESTANTES: " + mov_restantes);
    }while(!gameEnd(win, mov_restantes))
    printMessageEndGame(win, player);
}while(playAgain())

console.log("EL JUEGO A FINALIZADO, HASTA OTRA");


function printBoardState(board){
    console.log(board[0]);
    console.log(board[1]);
    console.log(board[2]);
}

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

    if (answer === 'SI'){
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

function playerWin(board, token){
    if(board[0][0] ==  token && board[0][1] == token && board[0][2] == token ||
        board[1][0] == token && board[1][1] == token && board[1][2] == token ||
        board[2][0] == token && board[2][1] == token && board[2][2] == token ||
        board[0][0] == token && board[1][0] == token && board[2][0] == token ||
        board[0][1] == token && board[1][1] == token && board[2][1] == token ||
        board[0][2] == token && board[1][2] == token && board[2][2] == token ||
        board[0][0] == token && board[1][1] == token && board[2][2] == token ||
        board[2][0] == token && board[1][1] == token && board[0][2] == token){
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

function isPosititionValid(board, file, column){
    if(board[file][column] === "0"){
        return true;
    }
    return false;
}

function inicialitzeBoard(files, columns){
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