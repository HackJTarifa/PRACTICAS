
function createBoard(){
    let board = {
        validColors: ["BLANCO", "NEGRO", "AMARILLO", "VERDE", "ROJO", "AZUL", "NARANJA"],
        winCombination: [],
        createWinCombination: function(){
            let winCombination = [];
            do{
                let repeat = false;
                const index = Math.floor(Math.random() * board.validColors.length);
                for(let i = 0; i < winCombination.length; i++){
                    if(winCombination[i] === board.validColors[index]){
                        repeat = true;
                    }
                }
                if(!repeat){
                    winCombination.push(board.validColors[index]);
                }
            }while(winCombination.length < 5)
    
            console.log(winCombination[0] + " " + winCombination[1] + " " + winCombination[2] + " " + winCombination[3] + " " + winCombination[4]);
            board.winCombination = winCombination;
        },
        checkCombinacionHits: function(InputCombination){
            let supportCombination = ["VACIO", "VACIO", "VACIO", "VACIO", "VACIO"];
            for(let i = 0; i < InputCombination.length; i++){
                if(InputCombination[i] === board.winCombination[i]){
                    supportCombination[i] = "BLANCO";
                }else{
                    let encontrado = false;
                    for(let j = 0; j < board.winCombination.length && !encontrado; j++){
                        if(InputCombination[i] === board.winCombination[j]){
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
    return board;
}

function createGame(){
    let game = {
        mov_restantes: 15,
        validColors: ["BLANCO", "NEGRO", "AMARILLO", "VERDE", "ROJO", "AZUL", "NARANJA"],
        combinacionesPropuestas: [],
        hits: [],
        win: false,
        inputCombination: NaN,
        board: createBoard(),
        combinacionGanadora: [],
        init: function(){
            // game.combinacionGanadora = getWinCombination();
            game.board.createWinCombination();
            //const combinacionIngresada;
            do {
                const combinacionIngresada = getCombinacion();
                game.hits = game.board.checkCombinacionHits(combinacionIngresada, game.board.winCombination);
                game.win = game.board.win(game.hits);
                updateHistorial(combinacionIngresada, game.hits);
        
                if (!game.win) {
                    game.mov_restantes -= 1;
                }
            } while (!gameEnd()); // nor, si las dos son falsas repite bucle
            printMessageEndGame();        
        }

    }
    return game;

    function getCombinacion(){
        let vaildCombination;
                
        do{                     
            vaildCombination = false;
            let entrada = prompt("Agrega una combinacion de 5 colores validos: ");
            game.inputCombination = entrada.split(' ');

            let nColoresValid = 0;
            for(let i = 0; i < game.inputCombination.length; i++){
                let colorValido = false;
                for (let j = 0; j < game.validColors.length && !colorValido ; j++){
                    if(game.inputCombination[i] === game.validColors[j]){
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
        return game.inputCombination;
    }

    function updateHistorial(InputCombination, aciertos){
        game.combinacionesPropuestas.push(InputCombination);
        game.hits.push(aciertos)
        console.log(InputCombination + " -- " + aciertos );
    }

    function gameEnd(){
        return game.win || game.mov_restantes <= 0;  
    }

    function printMessageEndGame(){
        game.win ? console.log("ENORABUENA EL JUGAODR HA GANADO"):
                 console.log("NO HAY MAS MOVIMIENTOS POSIBLE, HAS PERDIDO");        
    }
}

function createApp(){
    let app = {
        game: createGame(),
        start: function(){
            do{
                app.game.init();
            }while(playAgain())    
            console.log("PROGRAMA END"); 
        }
    }
    return app;

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