

class Game{
    constructor(){
        this.mov_restantes;
        this.validColors = ["BLANCO", "NEGRO", "AMARILLO", "VERDE", "ROJO", "AZUL", "NARANJA"]; 
        this.combinacionesPropuestas = [];
        this.aciertos = [];
        this.win = false;
        this.inputCombination;
        this.combinacionGanadora;
    }

    init(){
        this.mov_restantes = 15;
        this.combinacionGanadora = this.getWinCombination();
        this.playerMode = this.getTypesPlayers();

        //const combinacionIngresada;
        do {
            const combinacionIngresada = this.getCombinacionWithFunctionby(this.playerMode, this.validColors);
            this.aciertos = this.checkCombinacion(combinacionIngresada, this.combinacionGanadora);
            this.win = this.playerWin(this.aciertos);
            this.updateHistorial(combinacionIngresada, this.aciertos);
    
            if (!this.win) {
                this.mov_restantes -= 1;
            }
        } while (!this.gameEnd()); // nor, si las dos son falsas repite bucle
        this.printMessageEndGame();
    }

    getTypesPlayers(){
        const playerTypes = ["JUGADOR", "MAQUINA"];
        let answerd;
        let isAnswerdValid;
        do{
            answerd = parseInt(prompt('JUGADOR ELIGE :1 \nMAQUINA ELIGE: 2'));
            isAnswerdValid = answerd === 1 || answerd === 2;
        }while(!isAnswerdValid)

        return playerTypes[answerd - 1];
    }

    playerWin(aciertos){
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

    getCombinacionWithFunctionby(playerType, validColors){
        const functionPlayerType = {"JUGADOR": function getCombinationPlayer(validColors){
                                        let InputCombination;
                                
                                        do{                     
                                            combinacion_valida = false;
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

        let getCombination = functionPlayerType[playerType]; 
        return getCombination(validColors);
    }

    getCombinacion(){
        //let inputCombination;
        let combinacion_valida;
                
        do{                     
            combinacion_valida = false;
            let entrada = prompt("Agrega una combinacion de 5 colores validos: ");
            this.inputCombination = entrada.split(' ');

            let nColoresValidos = 0;
            for(let i = 0; i < this.inputCombination.length; i++){
                let colorValido = false;
                for (let j = 0; j < this.validColors.length && !colorValido ; j++){
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

    getWinCombination(){
        let winCombination = [];
        do{
            let repetido = false;
            const index = Math.floor(Math.random() * this.validColors.length);
            for(let i = 0; i < winCombination.length; i++){
                if(winCombination[i] === this.validColors[index]){
                    repetido = true;
                }
            }
            if(!repetido){
                winCombination.push(this.validColors[index]);
            }
        }while(winCombination.length < 5)

        console.log(winCombination[0] + " " + winCombination[1] + " " + winCombination[2] + " " + winCombination[3] + " " + winCombination[4]);
        return winCombination;
    }

    checkCombinacion(InputCombination, combinacionGanadora){
        let supportCombination = ["VACIO", "VACIO", "VACIO", "VACIO", "VACIO"];
        for(let i = 0; i < InputCombination.length; i++){
            if(InputCombination[i] === combinacionGanadora[i]){
                supportCombination[i] = "BLANCO";
            }else{
                let encontrado = false;
                for(let j = 0; j < combinacionGanadora.length && !encontrado; j++){
                    if(InputCombination[i] === combinacionGanadora[j]){
                        supportCombination[i] = "NEGRO";
                        encontrado = true;
                    }
                }
            }
        }
        return supportCombination;
    }

    updateHistorial(InputCombination, aciertos){
        this.combinacionesPropuestas.push(InputCombination);
        this.aciertos.push(aciertos)
        console.log(InputCombination + " -- " + aciertos );
    }

    gameEnd(){
        if(this.win){
            return true;
        }else if(this.mov_restantes <= 0){
            return true;
        }
        return false;
    }

    printMessageEndGame(){
        if (this.win){
            console.log("ENORABUENA EL JUGAODR HA GANADO");
        }else{
            console.log("NO HAY MAS MOVIMIENTOS POSIBLE, HAS PERDIDO");
        } 
    }
}

class App{
    constructor(){
        this.game = new Game();
    }

    start(){
        do{
            this.game.init();
        }while(this.playAgain())    
        console.log("PROGRAMA END");    
    }

    playAgain(){
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

let app = new App()
app.start()