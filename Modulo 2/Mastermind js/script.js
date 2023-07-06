
do{

    let mov_restantes = 15;
    let coloresValidos = ["BLANCO", "NEGRO", "AMARILLO", "VERDE", "ROJO", "AZUL", "NARANJA"]
    let combinacionGanadora = getWinCombination(coloresValidos);

    //negro si es igual, blanco si el color esta en la tabla.
    let combinacionesPropuestas = [];
    let aciertos = [];
    

    let combinacionIngresada;
    do{        
        combinacionIngresada = getCombinacion(coloresValidos);        
        aciertos = checkCombinacion(combinacionIngresada, combinacionGanadora)
        win = playerWin(aciertos);        
        updateHistorial(combinacionesPropuestas, combinacionIngresada,aciertos);

        if(!win){
            mov_restantes -= 1;
        }
    }while(!gameEnd(win, mov_restantes)) // nor, si las dos son falsas repite bucle
    printMessageEndGame(win);
}while(playAgain())
console.log("EL JUEGO MASTERMAIND HA FINALIZADO ");

function updateHistorial(combinacionesPropuestas ,combinacionIngresada, aciertos){
    combinacionesPropuestas.push(combinacionIngresada);
    aciertos.push(aciertos)
    console.log( combinacionIngresada + " -- " + aciertos );
}

function printMessageEndGame(win){
    if (playerWin){
        console.log("ENORABUENA EL JUGAODR HA GANADO");
    }else{
        console.log("NO HAY MAS MOVIMIENTOS POSIBLE, HAS PERDIDO");
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

function playerWin(aciertos){
    let nColoresAcertados = 0;
    for(let i = 0; i < aciertos.length; i++){
        if(aciertos[i] === "BLANCO"){
            nColoresAcertados += 1;
        }
    }
    if (nColoresAcertados == 5) {
        return true;
    }
    return false;
}

function checkCombinacion(combinacionIngresada, combinacionGanadora){
    let com_ayuda = ["VACIO", "VACIO", "VACIO", "VACIO", "VACIO"];
    for(let i = 0; i < combinacionIngresada.length; i++){
        if(combinacionIngresada[i] === combinacionGanadora[i]){
            com_ayuda[i] = "BLANCO";
        }else{
            for(let j = 0; j < combinacionGanadora.length; j++){
                if(combinacionIngresada[i] === combinacionGanadora[j]){
                    com_ayuda[i] = "NEGRO";
                }
            }
        }
    }
    return com_ayuda;
}

function getCombinacion(coloresValidos){
    let combinacionIngresada;
            
    do{ // COMPROVAMOS QUE LA COMBINACION ES VALIDA                     
        let combinacion_valida = false;
        let entrada = prompt("Agrega una combinacion de 5 colores validos: ");
        combinacionIngresada = entrada.split(' ');

        let nColoresValidos = 0;
        for(let i = 0; i < combinacionIngresada.length; i++){
            let colorValido = false;
            for (let j = 0; j < coloresValidos.length; j++){
                if(combinacionIngresada[i] == coloresValidos[j]){
                    colorValido = true;
                }
            }
            if(colorValido){
                nColoresValidos += 1;
            }
        }

        console.log(combinacionIngresada);
        if(nColoresValidos == 5){
            combinacion_valida = true;
        } 

    }while(!combinacion_valida)
    return combinacionIngresada;
}

function getWinCombination(coloresValidos){
    let com_ganadora =  ["VACIO", "VACIO", "VACIO", "VACIO", "VACIO"];

    for(let i = 0; i < com_ganadora.length; i++){
        com_ganadora[i] = coloresValidos[Math.floor(Math.random() * coloresValidos.length)];
    }
    console.log(com_ganadora[0] + " " + com_ganadora[1] + " " + com_ganadora[2] + " " + com_ganadora[3] + " " + com_ganadora[4]);
    return com_ganadora;
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