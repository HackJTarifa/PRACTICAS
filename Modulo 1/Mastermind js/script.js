let name = prompt('Introduce tu nombre: ');
let age = prompt('Introduce tu edad: ');

document.writeln(`<br\> Hola mundo ${name} tienes ${age} y que te den  <br\>`);
console.log("Hello world!");

let respuesta;
const playAgain = 'SI';

do{
    // PARTE CENTRAL DEL PROGRAMA
    let playerWin = false;
    let mov_restantes = 15;
    let com_ganadora = ["VACIO", "VACIO", "VACIO", "VACIO", "VACIO"];

    //negro si es igual, blanco si el color esta en la tabla.
    let coloresValidos = ["BLANCO", "NEGRO", "AMARILLO", "VERDE", "ROJO", "AZUL", "NARANJA"]
    let combinacionesPropuestas = [];
    let ayudasPropuestas = [];
    
    // GENERAMOS COMBINACION GANADORA
    for(let i = 0; i < com_ganadora.length; i++){
        com_ganadora[i] = coloresValidos[Math.floor(Math.random() * coloresValidos.length)];
    }
    console.log(com_ganadora[0] + " " + com_ganadora[1] + " " + com_ganadora[2] + " " + com_ganadora[3] + " " + com_ganadora[4]);

    let combinacionIngresada;
    do{        
        do{ // COMPROVAMOS QUE LA COMBINACION ES VALIDA                     
            combinacion_valida = false;
            let entrada = prompt("Agrega una combinacion de 5 colores validos: ");
            combinacionIngresada = entrada.split(' ');

            console.log(combinacionIngresada);

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
        console.log("PRIMERA PARTE CORRECTA")

        // CHECK POR COLORES BLANCOS Y NEGROS
        let nColoresAcertados = 0;
        let com_ayuda = ["VACIO", "VACIO", "VACIO", "VACIO", "VACIO"];
        for(let i = 0; i < combinacionIngresada.length; i++){
            if(combinacionIngresada[i] == com_ganadora[i]){
                com_ayuda[i] = "BLANCO";
                nColoresAcertados += 1;
            }else{
                for(let j = 0; j < com_ganadora.length; j++){
                    if(combinacionIngresada[i] == com_ganadora[j]){
                        com_ayuda[i] = "NEGRO";
                    }
                }
            }
        }

        combinacionesPropuestas.push(combinacionIngresada);
        ayudasPropuestas.push(com_ayuda)

        console.log( combinacionIngresada + " -- " + com_ayuda );
        //Comprovar 
        if(nColoresAcertados == 5){
            playerWin = true;
        }else{
            mov_restantes = mov_restantes - 1;
        }
    }while( !(playerWin || mov_restantes <= 0)) // nor, si las dos son falsas repite bucle

    if (playerWin || mov_restantes > 0){
        console.log("ENORABUENA EL JUGAODR HA GANADO");
    }else{
        console.log("NO HAY MAS MOVIMIENTOS POSIBLE, HAS PERDIDO");
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
document.writeln("EL JUEGO TIC TAC TOE HA FINALIZADO <br\>");