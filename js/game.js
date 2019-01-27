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
*/
function Game() {
    this.board = [];
    this.initArray();
}


// Method to create the matrix for the board.
Game.prototype.initArray = function() {
    for ( var i = 0; i < 10; i++ ) {
        this.board[i] = []; 
    }
}

// Method to initialize the board, putting a dead CELL in each board's cell (position) 
Game.prototype.initializeBoard = function() {
    for (var posX = 0; posX <10; posX++){
        for(var posY = 0; posY < 10; posY++){
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
    for(var positionX=0; positionX<10;positionX++){
        for(var positionY=0; positionY<10;positionY++){
            this.countNeighbours(positionX,positionY);
        }
    }
}

// Method to count and set the neighbours for a CELL
Game.prototype.countNeighbours = function(positionX, positionY) {
    var neighbours=0;
    for(var posX = positionX-1; posX < positionX+2; posX++){
        if(posX>= 0 && posX<10){
            for(var posY = positionY-1; posY< positionY+2; posY++){
                if(posY>=0 && posY<10){
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
 * According to the rules if the Cell has 2 or 3 neighbours, lives, otherwise die.
 */
Game.prototype.checkCellsStep = function() {
    for(var posX=0; posX<10; posX++){
        for(var posY=0; posY<10; posY++){
            (this.board[posX][posY].neighbours>1 && this.board[posX][posY].neighbours<4)? this.setCellAlive(posX, posY) : this.setCellDead(posX, posY);
        }
    }
}

// Method to clear the board. Set all the cell that are alive, dead.
Game.prototype.clearBoard = function() {
    for (var posicionX = 0; posicionX <10; posicionX++){
        for(var posicionY = 0; posicionY < 10; posicionY++){
            if(this.board[posicionX][posicionY].state==1)
                this.setCellDead(posicionX,posicionY);
        }
    }
}