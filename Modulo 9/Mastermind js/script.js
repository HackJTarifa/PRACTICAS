function createBoard(){
    const VALID_COLORS = ["BLANCO", "NEGRO", "AMARILLO", "VERDE", "ROJO", "AZUL", "NARANJA"];
    let winCombination = [];

    return {
        createWinCombination: function(){
            let combination = [];
            do{
                let repeat = false;
                const index = Math.floor(Math.random() * VALID_COLORS.length);
                for(let i = 0; i < combination.length; i++){
                    if(combination[i] === VALID_COLORS[index]){
                        repeat = true;
                    }
                }
                if(!repeat){
                    combination.push(VALID_COLORS[index]);
                }
            }while(combination.length < 5)
    
            console.log(combination[0] + " " + combination[1] + " " + combination[2] + " " + combination[3] + " " + combination[4]);
            winCombination = combination;
        },
        checkCombinacionHits: function(InputCombination){            
            let supportCombination = ["VACIO", "VACIO", "VACIO", "VACIO", "VACIO"];
            for(let i = 0; i < InputCombination.length; i++){
                if(InputCombination[i] === winCombination[i]){
                    supportCombination[i] = "BLANCO";
                }else{
                    let encontrado = false;
                    for(let j = 0; j < winCombination.length && !encontrado; j++){
                        if(InputCombination[i] === winCombination[j]){
                            supportCombination[i] = "NEGRO";
                            encontrado = true;
                        }
                    }
                }
            }
            return supportCombination;
        },
        win: function(hits){
            let nColoresAcertados = 0;
            for(let i = 0; i < hits.length; i++){
                if(hits[i] === "BLANCO"){
                    nColoresAcertados += 1;
                }
            }
            if (nColoresAcertados == 5) {
                return true;
            }
            return false;
        }
    }
}

function createGame(){
    let mov_restantes = 15;
    const validColors = ["BLANCO", "NEGRO", "AMARILLO", "VERDE", "ROJO", "AZUL", "NARANJA"];
    let combinacionesPropuestas = [];
    let hits = [];
    let win = false;
    let inputCombination = NaN;
    let board = createBoard();

    return {
        init: function(){
            board.createWinCombination();
            do {
                const combinacionIngresada = getCombinacion();
                hits = board.checkCombinacionHits(combinacionIngresada, board.winCombination);
                win = board.win(hits);
                updateHistorial(combinacionIngresada, hits);
        
                if (!win) {
                    mov_restantes -= 1;
                }
            } while (!gameEnd()); // nor, si las dos son falsas repite bucle
            printMessageEndGame();        
        }

    }

    function getCombinacion(){
        let vaildCombination;
                
        do{                     
            vaildCombination = false;
            let entrada = prompt("Agrega una combinacion de 5 colores validos: ");
            inputCombination = entrada.split(' ');

            let nColoresValid = 0;
            for(let i = 0; i < inputCombination.length; i++){
                let colorValido = false;
                for (let j = 0; j < validColors.length && !colorValido ; j++){
                    if(inputCombination[i] === validColors[j]){
                        colorValido = true;
                    }
                }
                if(colorValido){
                    nColoresValid += 1;
                }
            }

            const nColors = 5;
            if(nColoresValid == nColors){
                vaildCombination = true;
            } 
        }while(!vaildCombination)
        return inputCombination;
    }

    function updateHistorial(InputCombination, aciertos){
        combinacionesPropuestas.push(InputCombination);
        hits.push(aciertos)
        console.log(InputCombination + " -- " + aciertos );
    }

    function gameEnd(){
        return win || mov_restantes <= 0;  
    }

    function printMessageEndGame(){
        win ? console.log("ENORABUENA EL JUGAODR HA GANADO"):
                 console.log("NO HAY MAS MOVIMIENTOS POSIBLE, HAS PERDIDO");        
    }
}

function createApp(){
    let game = createGame();
    return {
        start: function(){
            do{
                game.init();
            }while(playAgain())    
            console.log("PROGRAMA END"); 
        }
    }

    function playAgain(){
        let aswerd;
        let isAnswerdValid;
        do{
            aswerd = prompt('Quieres jugar otra partida (SI/NO): ');
            isAnswerdValid = aswerd === 'SI' || aswerd === 'NO';
            if (!isAnswerdValid){
                console.log("LA RESPUESTA NO ES VALIDA, SOLO SE ACEPTA SI O NO EN MAYUSCULAS");
            }
        }while(!isAnswerdValid)
     
        return aswerd === 'SI';
    }        
}

let app = createApp();
app.start();