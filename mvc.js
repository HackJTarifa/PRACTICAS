/*
========================
la vista tiene que tener el bucle principal de juego
el modelo<Game> no conoce a la vista.
========================
*/

class  View{
    constructor(){
        this.game = new Game();
    }
    
    prompSelectGameModes(){
        const input = promp("select mode game, player vs player: 1, player vs computer: 2, computer vs computer: 3 "); 
        this.game.selectPlayersModes(input);
    }
    
    prompMakeMove(){
        const input = promp("select coordenadas x, y: "); 
        const coordinates = input.split(",");
        const move = {
            x: parseInt(coordinates[0]),
            y: parseInt(coordinates[1])
        };
        this.game.makeMove(move);
    }
    
    printMessageEnd(player, winner){        
    }
    
    init(){
        const playesMode = this.prompSelectGameModes();
        this.game.init(playesMode);
        do{
            this.game.makeMove(this.prompMakeMove());
            this.game.gessMove();
            if(!this.game.isWinner()){
                this.game.next();
            }
        }while(!this.game.isGameEnd())
        this.printMessageEnd(this.game.getMessageGameEnd());
    }
}

class Game{
    selectPlayersModes(input){}
    init(playersMode){}
    makeMove(move){}
    gessMove(){} 
    next(){}
    isWinner(){}
    isGameEnd(){}
    printMessageEnd(){}
}

/*
========================
el modelo<Game> tiene una referencia de la vista. conoce la vista y esta acoplado a la vista.
========================
*/
class  View{
    constructor(){
        this.game = new Game();
    }
    
    prompSelectGameModes(){
        const input = promp("select mode game, player vs player: 1, player vs computer: 2, computer vs computer: 3 "); 
        return input;

    }
    
    prompMakeMove(){
        const input = promp("select coordenadas x, y: "); 
        const coordinates = input.split(",");
        const move = {
            x: parseInt(coordinates[0]),
            y: parseInt(coordinates[1])
        };
        this.game.makeMove(move);
    }
    
    printMessageEnd(player, winner){        
    }
}

class Game{
    constructor(){
        this.view = new View();
    }
    start(){
        selectPlayersModes(this.view.prompSelectGameModes());
        init(playersMode);
        do{
            makeMove(this.view.prompMakeMove());
            gessMove();     
            if(!isWinner()){
                next();
            }    
        }while(!isGameEnd())
        printMessageEnd(this.view.printMessageEnd(this.player, this.isWinner()));
    }
}


function hasConnectFour(board, column, row, token){
    // row 0...6
    // column 1...7
    

    if(CONNECTA_SIZE + column < 7){                     // right          
        if (board.gePosition(column, row) == token && 
        board.gePosition(column + 1, row) == token && 
        board.gePosition(column + 2, row) == token && 
        board.gePosition(column + 3, row) == token){
            return true;
        }
    } 

    if(column > 0){                     // right          
        if (board.gePosition(column, row) == token && 
        board.gePosition(column - 1, row) == token && 
        board.gePosition(column - 2, row) == token && 
        board.gePosition(column - 3, row) == token){
            return true;
        }
    } 

        if(row - CONNECTA_SIZE > 0){                     // right          
        if (board.gePosition(column, row) == token && 
        board.gePosition(column - 1, row) == token && 
        board.gePosition(column - 2, row) == token && 
        board.gePosition(column - 3, row) == token){
            return true;
        }
    } 
}

function checkWinner(lastMoviment) {
    let leftCell;
    let rightCell;
    let downCell;
    let rightDownCell;
    let rightUpCell;
    let leftDownCell;;
    let leftUpCell;
    for(let i = 0; i < 3; i++){
        leftCell = getLeftCell(lastMoviment);        
        rightCell = getRightCell(lastMoviment);
        downCell = getDownCell(lastMoviment);
        rightDownCell = getRightDownCell(lastMoviment);
        rightUpCell = getRightUpCell(lastMoviment);
        leftDownCell = getLeftDownCell(lastMoviment);
        leftUpCell = getLeftUpCell(lastMoviment);

        if(leftCell !== token || leftCell == undefined ||
            rightCell !== token || rightCell == undefined||
            downCell !== token || downCell == undefined ||
            rightDownCell !== token || downDownCell == undefined ||
            rightUpCell !== token || leftUpCell == undefined ||
            leftDownCell !== token || leftUpCell == undefined ||
            leftUpCell !== token || rightUpCell == undefined){
            return false
        }
    }
    return true;
}

function getCellDirections(direction){
    switch(direction){
        case 'RIGHT':
            break;
        case 'LEFT':
            break;
        case 'DOWN':
            break;
        case 'RIGHT_UP':
            break;
        case 'RIGHT_DOWN':
            break;
        case 'LEFT_UP':
            break;
        case 'LEFT_DOWN':
            break;
    }
}

const directions_ = ["RIGHT","LEFT","DOWN","RIGHT_UP","RIGHT_DOWN","LEFT_UP","LEFT_DOWN"];

const directions = [
    {RIGHT:{ dx: -1, dy: 0 }},   // Left
    {LEFT:{ dx: 1, dy: 0 }},    // Right
    {DOWN:{ dx: 0, dy: 1 }},    // Down
    {RIGHT_UP:{ dx: 1, dy: 1 }},    // Right Down
    {RIGHT_DOWN:{ dx: 1, dy: -1 }},   // Right Up
    {LEFT_UP:{ dx: -1, dy: 1 }},   // Left Down
    {LEFT_DOWN:{ dx: -1, dy: -1 }}   // Left Up
];

for (let direction of directions) {
    let count = 1;
    
    let x = lastMovement.getX();
    let y = lastMovement.getY();
    
    while (count < 4) {
        x += direction.dx;
        y += direction.dy;

        if (!isValidCell(x, y)) {
            break;
        }

        let cell = getCell(x, y);

        if (cell.getToken() !== token) {
            break;
        }

        count++;
    }

    if (count >= 4) {
        return true;
    }
}

return false;
