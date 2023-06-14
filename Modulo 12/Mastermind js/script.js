
class WinningCombinationManager{
    constructor(){
        this.VALID_COLORS = ["BLANCO", "NEGRO", "AMARILLO", "VERDE", "ROJO", "AZUL", "NARANJA"]; 
        this.winCombination = [];
    }

    getValidColors(){
        return this.VALID_COLORS;
    }

    generateCombination(){
        let winCombination = [];
        do{
            let repetido = false;
            const index = Math.floor(Math.random() * this.VALID_COLORS.length);
            for(let i = 0; i < winCombination.length; i++){
                if(winCombination[i] === this.VALID_COLORS[index]){
                    repetido = true;
                }
            }
            if(!repetido){
                winCombination.push(this.VALID_COLORS[index]);
            }
        }while(winCombination.length < 5)
        this.winCombination = winCombination;
        this.printCombination();
    }

    isWinningCombination(combination){
        if(!this.areArraysSameLength(combination)){
            return false;
        }

        for(let i = 0; i < this.winCombination.length; i++){
            if(combination[i] !== this.winCombination[i]){
                return false;
            }
        }
        return true;
    }

    areArraysSameLength(combination){
        return combination.length === this.winCombination;
    }


    isValidCombination(combination){
        if(!areArraysSameLength(combination)){
            return false;
        }

        for(let i = 0; i < combination.length; i++){
            let validColor = false;
            for (let j = 0; j < this.VALID_COLORS.length && !validColor ; j++){
                if(combination[i] === this.VALID_COLORS[j]){
                    validColor = true;
                }
            }
            if(!validColor){
                return false;
            }
        }
        return true;
    }

    checkCombinacionColorStatus(combination){
            let supportCombination = [];
            for(let i = 0; i < combination.length; i++){
                if(combination[i] === this.winCombination[i]){
                    supportCombination[i] = "BLANCO";
                }else if(this.isColorImArray(combination[i])){
                    supportCombination[i] = "NEGRO";
                }else{
                    supportCombination[i] = "VACIO";
                }                
            }
            return supportCombination;        
    }

    isColorImArray(color){
        for(let i = 0; i < this.winCombination.length; i++){
            if(this.winCombination[i] === color){
                return true;
            }
        }
        return false;
    }

    printCombination(){
        console.log(this.winCombination[0] + " " + 
                    this.winCombination[1] + " " + 
                    this.winCombination[2] + " " + 
                    this.winCombination[3] + " " + 
                    this.winCombination[4]);
    }
}

class Game{
    constructor(){
        this.mov_restantes;
        this.combinacionesPropuestas = [];
        this.combinationColorStatus = [];
        this.win = false;
        this.inputCombination;
        this.winCombinationManager = new WinningCombinationManager();
    }

    init(){
        this.mov_restantes = 15;
        this.winCombinationManager.generateCombination();
        this.playerMode = this.getTypesPlayers();

        do {
            const inputCombination = this.getCombinacionWithFunctionby(this.playerMode, this.winCombinationManager.getValidColors());
            this.combinationColorStatus = this.winCombinationManager.checkCombinacionColorStatus(inputCombination);
            this.win = this.winCombinationManager.isWinningCombination(inputCombination);
            this.updateHistorial(inputCombination, this.combinationColorStatus);
    
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

    updateHistorial(InputCombination, aciertos){
        this.combinacionesPropuestas.push(InputCombination);
        this.combinationColorStatus.push(aciertos)
        console.log(InputCombination + " -- " + aciertos );
    }

    gameEnd(){
        return this.win || this.mov_restantes <= 0;
    }

    printMessageEndGame(){
        this.win?
            console.log("ENORABUENA EL JUGAODR HA GANADO"):
            console.log("NO HAY MAS MOVIMIENTOS POSIBLE, HAS PERDIDO");        
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
            respuesta = prompt('Quieres jugar otra partida (SI/NO): ');
            isAnswerdValid = respuesta === 'SI' || respuesta === 'NO';
            if (!isAnswerdValid){
                console.log("LA RESPUESTA NO ES VALIDA, SOLO SE ACEPTA SI O NO EN MAYUSCULAS");
            }
        }while(!isAnswerdValid)
    
        return respuesta === 'SI';
    }
}

let app = new App()
app.start()