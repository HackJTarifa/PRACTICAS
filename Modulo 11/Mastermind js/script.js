

class Game{
    constructor(){
        this.mov_restantes = 15;
        this.validColors = ["BLANCO", "NEGRO", "AMARILLO", "VERDE", "ROJO", "AZUL", "NARANJA"]; 
        this.combinacionesPropuestas = [];
        this.aciertos = [];
        this.win = false;
        this.inputCombination;
        this.combinacionGanadora;
    }

    init(){
        this.combinacionGanadora = this.getWinCombination();

        //const combinacionIngresada;
        do {
            const combinacionIngresada = this.getCombinacion();
            this.aciertos = this.checkCombinacion(combinacionIngresada, this.combinacionGanadora);
            this.win = this.playerWin(this.aciertos);
            this.updateHistorial(combinacionIngresada, this.aciertos);
    
            if (!this.win) {
                this.mov_restantes -= 1;
            }
        } while (!this.gameEnd()); // nor, si las dos son falsas repite bucle
        this.printMessageEndGame();        
    }

    playerWin(aciertos){
        let nColoresAcertados = 0;
        for(let i = 0; i < aciertos.length; i++){
            if(aciertos[i] === "BLANCO"){
                nColoresAcertados += 1;
            }
        }
        return nColoresAcertados == 5;
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
        return this.win || this.mov_restantes <= 0;  
    }

    printMessageEndGame(){
        this.win ? console.log("ENORABUENA EL JUGAODR HA GANADO"):
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
        }while(playAgain())    
        console.log("PROGRAMA END");    

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
}

let app = new App()
app.start()
