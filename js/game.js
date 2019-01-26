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