
function createBoard(){
    let board = {
        validColors: ["BLANCO", "NEGRO", "AMARILLO", "VERDE", "ROJO", "AZUL", "NARANJA"],
        winCombination: createWinCombination(),
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
            return winCombination;
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
        win: function(InputCombination){
            const aciertos = board.checkCombinacionHits(InputCombination);
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
    }
    return board;
}

function createGame(){
    let game = {
        mov_restantes: 15,
        validColors: ["BLANCO", "NEGRO", "AMARILLO", "VERDE", "ROJO", "AZUL", "NARANJA"],
        combinacionesPropuestas: [],
        aciertos: [],
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
                game.aciertos = game.board.checkCombinacionHits(combinacionIngresada, game.board.winCombination);
                game.win = game.board.win(game.aciertos);
                updateHistorial(combinacionIngresada, game.aciertos);
        
                if (!game.win) {
                    game.mov_restantes -= 1;
                }
            } while (!gameEnd()); // nor, si las dos son falsas repite bucle
            printMessageEndGame();        
        }

    }
    return game;

    function getCombinacion(){
        let combinacion_valida;
                
        do{                     
            combinacion_valida = false;
            let entrada = prompt("Agrega una combinacion de 5 colores validos: ");
            game.inputCombination = entrada.split(' ');

            let nColoresValidos = 0;
            for(let i = 0; i < game.inputCombination.length; i++){
                let colorValido = false;
                for (let j = 0; j < game.validColors.length && !colorValido ; j++){
                    if(this.inputCombination[i] === this.validColors[j]){
                        colorValido = true;
                    }
                }
                if(colorValido){
                    nColoresValidos += 1;
                }
            }

            const N_COLORS = 5;
            if(nColoresValidos == N_COLORS){
                combinacion_valida = true;
            } 
        }while(!combinacion_valida)
        return this.inputCombination;
    }

    function updateHistorial(InputCombination, aciertos){
        game.combinacionesPropuestas.push(InputCombination);
        game.aciertos.push(aciertos)
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
            aswerd = prompt('Quieres jugar otra partida: ');
            isAnswerdValid = aswerd === 'SI' || aswerd === 'NO';
            if (!isAnswerdValid){
                console.log("LA RESPUESTA NO ES VALIDA, SOLO SE ACEPTA SI O NO EN MAYUSCULAS");
            }
        }while(!isAnswerdValid)
     
        return aswerd === 'SI';
    }        
}

let app = createApp()
app.start()


// TODO: Revisar que funciona el codigo.