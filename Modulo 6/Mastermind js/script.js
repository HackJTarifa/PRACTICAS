
function mastermind(){ 
    do{
        gameInit();
    }while(playAgain())
    console.log("EL JUEGO MASTERMAIND HA FINALIZADO ");

    function gameInit() {       
        let game = {
            validColors: ["BLANCO", "NEGRO", "AMARILLO", "VERDE", "ROJO", "AZUL", "NARANJA"],
            playerTypes: ["JUGADOR", "MAQUINA"],
            mov_restantes: 15,
            combinationsHistory: [], //negro si es igual, blanco si el color esta en la tabla.
            hitsHistory:[],
            hits: [],
            win: false,
            winCombination: [],
            playerMode: "",
        }
        game.winCombination = getWinCombination(game.validColors);
        const playerMode = function getPlayerMode(playerTypes) {
            let validPlayerMode = false;
            let entrada;
            do{                
                entrada = parseInt(prompt(" Si quieres que juegue un jugador ingresa: 1\n Si quieres que juegue la maquina ingresa 2: "));
                if (entrada === 1 || entrada === 2){
                    validPlayerMode = !validPlayerMode;
                }
            }while(!validPlayerMode)

            return playerTypes[entrada - 1];
        }

        game.playerMode = playerMode(game.playerTypes);
        let getCombination = getTypeFunctionby(game.playerMode);

        do {
            const InputCombination = getCombination(game.validColors);
            game.hits = checkCombinacion(InputCombination, game.winCombination);
            game.win = playerWin(game.hits);
            updateHistorial(game.combinationsHistory, InputCombination, game.hits, game.hitsHistory);

            if (!game.win) {
                game.mov_restantes -= 1;
            }
        } while (!gameEnd(game.win, game.mov_restantes)); 
        printMessageEndGame(game.win);

        function getTypeFunctionby(checkPlayerMode) {
            let getCombination;
            if (checkPlayerMode === "JUGADOR") {
                getCombination = function getCombinationPlayer(validColors) {
                    let InputCombination;

                    do {
                        combinacion_valida = false;
                        let entrada = prompt("Agrega una combinacion de 5 colores validos: ");
                        InputCombination = entrada.split(' ');

                        let nColoresValidos = 0;
                        for (let i = 0; i < InputCombination.length; i++) {
                            let colorValido = false;
                            for (let j = 0; j < validColors.length && !colorValido; j++) {
                                if (InputCombination[i] === validColors[j]) {
                                    colorValido = true;
                                }
                            }
                            if (colorValido) {
                                nColoresValidos += 1;
                            }
                        }

                        console.log(InputCombination);
                        console.log(winCombination);
                        const N_COLORS = 5;
                        if (nColoresValidos == N_COLORS) {
                            combinacion_valida = true;
                        }
                    } while (!combinacion_valida);
                    return InputCombination;
                };

            } else {
                getCombination = function getRandomTirada(validColors) {
                    let colorsRandomTirada = [];
                    const N_COLORS = 5;
                    for (let i = 0; i < N_COLORS; i++) {
                        const validColorsRandomIndex = Math.floor(Math.random() * validColors.length);
                        colorsRandomTirada.push(validColors[validColorsRandomIndex]);

                    }
                    return colorsRandomTirada;
                };
            }
            return getCombination;
        }

        function updateHistorial(combinationsHistory ,InputCombination, hits, hitsHistory){
            combinationsHistory.push(InputCombination);
            hitsHistory.push(hits)
            console.log(InputCombination + " -- " + hits );
        }

        function printMessageEndGame(playerWin){
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
                if(aciertos[i] === "NEGRO"){
                    nColoresAcertados += 1;
                }
            }
            return nColoresAcertados == 5;
        }

        function checkCombinacion(InputCombination, combinacionGanadora){
            let supportCombination = [];
            for(let i = 0; i < InputCombination.length; i++){
                if(InputCombination[i] === combinacionGanadora[i]){
                    supportCombination[i] = "NEGRO";
                }else if(existColor(InputCombination[i])){
                    supportCombination[i] = "BLANCO";                    
                }else{
                    supportCombination[i] = "VACIO";
                }
            }
            return supportCombination;

            function existColor(colorCheck, combinacionGanadora) {
                for (let j = 0; j < combinacionGanadora.length; j++) {
                    if (colorCheck === combinacionGanadora[j]) {
                        return true;                        
                    }
                }
                return false;
            }
        }

        function getWinCombination(coloresValidos){
            let winCombination = [];
            do{
                let repetido = false;
                const index = Math.floor(Math.random() * coloresValidos.length);
                for(let i = 0; i < winCombination.length; i++){
                    if(winCombination[i] === coloresValidos[index]){
                        repetido = true;
                    }
                }
                if(!repetido){
                    winCombination.push(coloresValidos[index]);
                }
            }while(winCombination.length < 5)

            console.log(winCombination[0] + " " + winCombination[1] + " " + winCombination[2] + " " + winCombination[3] + " " + winCombination[4]);
            return winCombination;
        }

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
        return (answer === 'SI');
    }
}
mastermind();

