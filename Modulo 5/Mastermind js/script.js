
function mastermind(){ 
    do{
        playGame();
    }while(playAgain())
    console.log("EL JUEGO MASTERMAIND HA FINALIZADO ");

    function playGame() {
        let mov_restantes = 15;
        const validColors = ["BLANCO", "NEGRO", "AMARILLO", "VERDE", "ROJO", "AZUL", "NARANJA"];
        const winCombination = getWinCombination(validColors);
        
        let playerMode = getPlayerMode(); 
        
        let combinationsHistory = []; // listado de combinaciones ingresada
        let hits = [];
        let win;

        do {
            const inputCombination = getCombination(validColors, playerMode);
            hits = checkCombinacion(inputCombination, winCombination);
            win = playerWin(hits);
            updateHistorial(combinationsHistory, inputCombination, hits);

            if (!win) {
                mov_restantes -= 1;
            }
        } while (!gameEnd(win, mov_restantes)); // nor, si las dos son falsas repite bucle
        printMessageEndGame(win);
        
        /**
         * Pregunta si quiere que juege el jugaodor o la máquina.
         * @param {Array[string]} playerType //  MAQUINA vs JUGADOR 
         * @returns 
         */
        function getPlayerMode(){
            const playerTypes = ["JUGADOR", "MAQUINA"];
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

        /**
         * 
         * @param {*} validColors 
         * @param {*} playerMode 
         * @param {*} playerType 
         * @returns 
         */
        function getCombination(validColors, playerMode){
            const functionPlayerrType = {"JUGADOR": function getCombinationPlayer(validColors){
                                                        let InputCombination;
                                                
                                                        do{                     
                                                            let combinacion_valida = false;
                                                            let entrada = prompt("Agrega una combinacion de 5 colores validos: ");
                                                            InputCombination = entrada.split(' ');

                                                            let nColoresValidos = 0;
                                                            for(let i = 0; i < InputCombination.length; i++){
                                                                let colorValido = false;
                                                                for (let j = 0; j < validColors.length && !colorValido ; j++){
                                                                    if(InputCombination[i] === validColors[j]){
                                                                        colorValido = true;
                                                                    }
                                                                }
                                                                if(colorValido){
                                                                    nColoresValidos += 1;
                                                                }
                                                            }

                                                            console.log(InputCombination);
                                                            console.log(winCombination);
                                                            const N_COLORS = 5;
                                                            if(nColoresValidos == N_COLORS){
                                                                combinacion_valida = true;
                                                            } 
                                                        }while(!combinacion_valida)
                                                        return InputCombination;
                                                    } 
                                        ,"MAQUINA": function getRandomTirada(validColors){
                                                            let colorsRandomTirada = [];
                                                            const N_COLORS = 5;
                                                            for(let i = 0; i < N_COLORS; i++){
                                                                const validColorsRandomIndex = Math.floor(Math.random() * validColors.length);
                                                                colorsRandomTirada.push(validColors[validColorsRandomIndex]);

                                                            }
                                                            return colorsRandomTirada;
                                                        }
                                                    };        

            let getCombination = functionPlayerrType[playerMode]; 
            return getCombination(validColors);
        }

        /**
         * 
         * @param {*} combinationsHistory 
         * @param {*} InputCombination 
         * @param {*} aciertos 
         */
        function updateHistorial(combinationsHistory ,InputCombination, aciertos){
            combinationsHistory.push(InputCombination);
            hits.push(aciertos)
            console.log(InputCombination + " -- " + aciertos );
        }


        /**
         * 
         * @param {Boolean} playerWin 
         */
        function printMessageEndGame(playerWin){
            if (playerWin){
                console.log("ENORABUENA EL JUGAODR HA GANADO");
            }else{
                console.log("NO HAY MAS MOVIMIENTOS POSIBLE, HAS PERDIDO");
            }  
        }

        /**
         * 
         * @param {Boolean} win 
         * @param {number} mov_restantes 
         * @returns 
         */
        function gameEnd(win, mov_restantes){
            if(win){
                return true;
            }else if(mov_restantes <= 0){
                return true;
            }
            return false;
        }

        /**
         * 
         * @param {Array[string]} aciertos 
         * @returns 
         */
        function playerWin(aciertos){
            let nColoresAcertados = 0;
            for(let i = 0; i < aciertos.length; i++){
                if(aciertos[i] === "NEGRO"){
                    nColoresAcertados += 1;
                }
            }
            if (nColoresAcertados == 5) {
                return true;
            }
            return false;
        }

        /**
         * negro si es igual, blanco si el color esta en la tabla.
         * @param {*} InputCombination 
         * @param {*} combinacionGanadora 
         * @returns 
         */
        function checkCombinacion(InputCombination, combinacionGanadora){
            let supportCombination = ["VACIO", "VACIO", "VACIO", "VACIO", "VACIO"];
            for(let i = 0; i < InputCombination.length; i++){
                if(InputCombination[i] === combinacionGanadora[i]){
                    supportCombination[i] = "NEGRO";
                }else{
                    let encontrado = false;
                    for(let j = 0; j < combinacionGanadora.length && !encontrado; j++){
                        if(InputCombination[i] === combinacionGanadora[j]){
                            supportCombination[i] = "BLANCO";
                            encontrado = true;
                        }
                    }
                }
            }
            return supportCombination;
        }

        /**
         * 
         * @param {Array[String]} coloresValidos 
         * @returns 
         */
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

    /**
     * 
     * @returns 
     */
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
}
mastermind();

