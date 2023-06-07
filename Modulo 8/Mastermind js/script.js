function createBoard(){
    return {
        validColors: ["BLANCO", "NEGRO", "AMARILLO", "VERDE", "ROJO", "AZUL", "NARANJA"],
        winCombination: [],
        createWinCombination: function(){
            let winCombination = [];
            do{
                let repeat = false;
                const index = Math.floor(Math.random() * this.validColors.length);
                for(let i = 0; i < winCombination.length; i++){
                    if(winCombination[i] === this.validColors[index]){
                        repeat = true;
                    }
                }
                if(!repeat){
                    winCombination.push(this.validColors[index]);
                }
            }while(winCombination.length < 5)
    
            console.log(winCombination[0] + " " + winCombination[1] + " " + winCombination[2] + " " + winCombination[3] + " " + winCombination[4]);
            this.winCombination = winCombination;
        },
        checkCombinacionHits: function(InputCombination){
            let supportCombination = ["VACIO", "VACIO", "VACIO", "VACIO", "VACIO"];
            for(let i = 0; i < InputCombination.length; i++){
                if(InputCombination[i] === this.winCombination[i]){
                    supportCombination[i] = "BLANCO";
                }else{
                    let encontrado = false;
                    for(let j = 0; j < this.winCombination.length && !encontrado; j++){
                        if(InputCombination[i] === this.winCombination[j]){
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
    return {
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
            this.board.createWinCombination();
            //const combinacionIngresada;
            do {
                const combinacionIngresada = getCombinacion(this);
                this.hits = this.board.checkCombinacionHits(combinacionIngresada, this.board.winCombination);
                this.win = this.board.win(this.hits);
                updateHistorial(combinacionIngresada, this.hits, this);
        
                if (!this.win) {
                    this.mov_restantes -= 1;
                }
            } while (!gameEnd(this)); // nor, si las dos son falsas repite bucle
            printMessageEndGame(this);        
        }

    }

    function getCombinacion(object){
        let vaildCombination;
                
        do{                     
            vaildCombination = false;
            let entrada = prompt("Agrega una combinacion de 5 colores validos: ");
            object.inputCombination = entrada.split(' ');

            let nColoresValid = 0;
            for(let i = 0; i < object.inputCombination.length; i++){
                let colorValido = false;
                for (let j = 0; j < object.validColors.length && !colorValido ; j++){
                    if(object.inputCombination[i] === object.validColors[j]){
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
        return object.inputCombination;
    }

    function updateHistorial(InputCombination, aciertos, object){
        object.combinacionesPropuestas.push(InputCombination);
        object.hits.push(aciertos)
        console.log(InputCombination + " -- " + aciertos );
    }

    function gameEnd(object){
        return object.win || object.mov_restantes <= 0;  
    }

    function printMessageEndGame(object){
        object.win ? console.log("ENORABUENA EL JUGAODR HA GANADO"):
                 console.log("NO HAY MAS MOVIMIENTOS POSIBLE, HAS PERDIDO");        
    }
}

function createApp(){
    return {
        game: createGame(),
        start: function(){
            do{
                this.game.init();
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