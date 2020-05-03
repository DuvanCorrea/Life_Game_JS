//variables
var canva = document.getElementById("canva");
var ctx = canva.getContext("2d");
var fps = 30;

var canvaX = 500; // pixels width
var canvaY = 500; // pixels height

var tileX;
var tileY;

var table;
const rows = 100;
const columns = 100;

var blanco = "#FFFFFF";
var negro = "#000000";

//functions
const init = () => {
  canva.width = canvaX;
  canva.height = canvaY;

  tileX = Math.floor(columns / rows);
  tileY = Math.floor(columns / columns);

  // run render
  setInterval(() => {
    render();
  }, 1000 / fps);
};

// Agents
function Agent(x, y, state) {
  this.x = x;
  this.y = y;
  this.state = state;
  this.proximeState = this.algo;

  var neighbour = []; // save the neighbours

  this.addNeighbour = function () {
    var neighbourX;
    var neighbourY;

    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        neighbourX = (this.x + j + columns) % columns;
        neighbourY = (this.y + i + rows) % rows;

        //discart actual agent

        if (i != 0 || j != 0) {
          neighbour.push(table[neighbourX][neighbourY]);
        }
      }
    }
  };

  this.draw = function () {
    var color;

    if (this.state == 1) {
      color = blanco;
    } else {
      color = negro;
    }

    ctx.fillStyle = color;
    ctx.fillRect(this.x * tileX, this.y * tileY, tileX, tileY);
  };

  this.newRender = function () {
    var aux = neighbour.length;
    console.log(aux);
    var suma = 0;
    for (i = 0; i < this.aux; i++) {
      suma += this.neighbour[i].estado;
    }

    this.proximeState = this.state;

    if (suma < 2 || suma > 3) {
      this.proximeState = 0;
    }

    if (suma == 3) {
      this.proximeState = 1;
    }
  };

  this.mutation = function () {
    this.state = this.proximeState;
  };
}

//draw table
function drawtable(obj) {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      obj[i][j].draw();
    }
  }

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      obj[i][j].newRender();
    }
  }

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      obj[i][j].mutation();
    }
  }
}

//assing functions
document.getElementById("main").addEventListener("load", init());

const render = () => {
  console.log("hola");
  deleteTable();
  drawtable(table);
};

//create table
const createArray2D = (rows, columns) => {
  var obj = new Array(columns);

  for (let i = 0; i < columns; i++) {
    obj[i] = new Array(rows);
  }

  return obj;
};
table = createArray2D(rows, columns);

// delete table
const deleteTable = () => {
  canva.width = canva.width;
  canva.height = canva.height;
};

//initializar
function initTable(obj) {
  let estado;

  //console.log(obj);

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      estado = Math.floor(Math.random() * 2);
      obj[i][j] = new Agent(i, j, estado);
    }
  }

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      obj[i][j].addNeighbour();
    }
  }
}
// init table
initTable(table);
