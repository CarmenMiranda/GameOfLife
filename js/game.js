/* 
    CLASS CELL 
    We need to defined a constructor function, and also introduce de position where the cell is going to be.
*/
function Cell(positionX, positionY) {
    this.state = 0;
    this.neighbours = 0;
    this.positionX = positionX;
    this.positionY = positionY;
}
  
// Method to set the state of the Cell
Cell.prototype.setState = function(state) {
    this.state = state;
};

// Method to set the number of neighbours that a Cell has
Cell.prototype.setNeighbours = function(neighbours) {
    this.neighbours = neighbours;
};


/**
 *  ClASS GAME 
 * We need to defined a constructor function, and also introduce de size of the board.
*/
function Game(size) {
    this.board = [];
    this.size = size;
    this.initArray();
}


// Method to create the matrix for the board.
Game.prototype.initArray = function() {
    for ( var i = 0; i < this.size; i++ ) {
        this.board[i] = []; 
    }
}

// Method to initialize the board, putting a dead CELL in each board's cell (position) 
Game.prototype.initializeBoard = function() {
    for (var posX = 0; posX <this.size; posX++){
        for(var posY = 0; posY < this.size; posY++){
            this.board[posX][posY] = new Cell(posX, posY);
        }
    }
}

/**
 * Method to change some of the CELLS state to 1 (alive).
 * Also paints the Cell with a color to imagine that is alive.
 */
Game.prototype.setCellAlive = function(positionX, positionY) {
    this.board[positionX][positionY].setState(1);
    var cell = "r" + positionX + "-c"+ positionY;
    document.getElementById(cell).classList.add("cell-alive");
}

/**
 * Method to change some of the CELLS state to 0 (dead).
 * Also erase Cell's color to imagine that is dead.
 */
Game.prototype.setCellDead = function(positionX, positionY) {
    this.board[positionX][positionY].setState(0);
    var cell = "r" + positionX + "-c"+ positionY;
    document.getElementById(cell).classList.remove("cell-alive");
}

// Method to count and set the neighbours for All the CELLS in the board
Game.prototype.countNeighboursAll = function() {
    for(var positionX=0; positionX<this.size;positionX++){
        for(var positionY=0; positionY<this.size;positionY++){
            this.countNeighbours(positionX,positionY);
        }
    }
}

// Method to count and set the neighbours for a CELL
Game.prototype.countNeighbours = function(positionX, positionY) {
    var neighbours=0;
    for(var posX = positionX-1; posX < positionX+2; posX++){
        if(posX>= 0 && posX<this.size){
            for(var posY = positionY-1; posY< positionY+2; posY++){
                if(posY>=0 && posY<this.size){
                    neighbours+=this.board[posX][posY].state;
                }
            }
        }
    }

    neighbours-=this.board[positionX][positionY].state;
    this.board[positionX][positionY].setNeighbours(neighbours);
}

/**
 * Method to iterate one time the game.
 * According to the rules:
 * -If the Cell is alive and has 2 or 3 neighbours, lives, otherwise die.
 * -If the Cell is dead and has exactly 3 neighbours, born, otherwise it is still dead.
 */
Game.prototype.checkCellsStep = function() {
    for(var posX=0; posX<this.size; posX++){
        for(var posY=0; posY<this.size; posY++){
            if(this.board[posX][posY].state==1){
                if(this.board[posX][posY].neighbours<2 || this.board[posX][posY].neighbours>3) 
                    this.setCellDead(posX, posY);
            }else{
                if(this.board[posX][posY].neighbours==3)
                    this.setCellAlive(posX, posY);
            }
        }
    }
}

// Method to clear the board. Set all the cell that are alive, dead.
Game.prototype.clearBoard = function() {
    for (var posicionX = 0; posicionX <this.size; posicionX++){
        for(var posicionY = 0; posicionY < this.size; posicionY++){
            if(this.board[posicionX][posicionY].state==1)
                this.setCellDead(posicionX,posicionY);
        }
    }
}


/**
 * INTERFACE
 */

var game;

//Creation and initialization of the game
function drawBoard(){
    var size = document.getElementById("sizeBoard").value;
    game = new Game(size);
    game.initializeBoard();
    drawingBoard(size);
}

// Function to draw the board, appending the rows and columns required
function drawingBoard(size){
    for(var posX=0; posX<size;posX++){
        var idRow="row-"+posX;
        //Creates the element row
        var row= document.createElement("div");
        row.setAttribute("id",idRow);
        row.setAttribute("class","row");
        document.getElementById("board").appendChild(row);
        for(var posY=0; posY<size; posY++){
            var idColumn="r"+posX+"-c"+posY;
            //Creates the element column
            var column= document.createElement("div");
            column.setAttribute("id",idColumn);
            column.setAttribute("class","column");
            var functionSelect="selectCell("+posX+", "+posY+")";
            column.setAttribute("onclick",functionSelect);
            document.getElementById(idRow).appendChild(column);
        }
    }
    document.getElementById("startGame").classList.add("hide");
    document.getElementById("board").classList.remove("hide");
    document.getElementsByTagName("footer")[0].classList.remove("hide");
}

/**
 * Function for selecting a cell with a position in X and Y on the board, and setting a state. 
 * If the state of the cell is 0 (dead) is going to be set alive otherwise is going to be dead.
 */
function selectCell(posX, posY){
    (game.board[posX][posY].state==0)? game.setCellAlive(posX, posY) : game.setCellDead(posX,posY);
}

/**
 * Function that allows change the state of some cell depending on the neighbours that the cell has.
 * First count the neighbours and then do the changes.
 */
function step(){
    game.countNeighboursAll();
    game.checkCellsStep();
}

// The variable interval, is an interval of time that do the STEP function every second.
var interval;

//Function that allows to play the game automatically
function play(){
    interval = setInterval(step, 500);
}

//Function that allows to stop the variable interval.
function stop(){
    clearInterval(interval);
}

//Function that uses the game's function called ClearBoard().
function clearB(){
    game.clearBoard();
}

//Function that removes the current board, and allows to visualize the controls to change the size of the board
function selectSize(){
    stop;
    var board = document.getElementById("board");
    while (board.firstChild) {
        board.removeChild(board.firstChild);
    }
    document.getElementById("startGame").classList.remove("hide");
    board.classList.add("hide");
    document.getElementsByTagName("footer")[0].classList.add("hide");
}