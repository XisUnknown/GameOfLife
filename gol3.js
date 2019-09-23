var grid = Number(document.getElementById("dropgrid").value);
var dropres_value = Number(document.getElementById("dropres").value);
var dropcolor_value = Number(document.getElementById("dropcolor").value);
//var grid = Number(document.getElementById("dropgrid").value);
var theGrid = createArray(grid);
var mirrorGrid = createArray(grid);
var canvas = document.getElementById("canvas");
canvas.width = grid;
canvas.height = grid;
//canvas.color = "green";
var run;
//var c = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
//ctx.fillStyle = "#FFFFFF";
//ctx.fillRect(0, 0, grid, grid);
//var canvas = document.getElementById("canvas");
//var context = canvas.getContext("2d");

rand_field(); //create the starting state for the grid by filling it with random cells
drawGrid();
//tick //call main loop


var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = slider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
  output.innerHTML = this.value;
} 
function start_animation() {
    tick();
}

//functions 
function tick() { //main loop
    updateGrid();
    drawGrid();
    //updateGrid();
    run = requestAnimationFrame(tick);
}
function stop_animation() {
    cancelAnimationFrame(run);
}

function clear_field() {
    var x = 0;
    var y = 0;
    var i = 0;
    var j = 0;
    var rand = 0;

    while (y < grid) {
        while (x < grid) {
            ctx.clearRect(x, y, dropres_value, dropres_value);
            x += dropres_value;
        }
        x = 0;
        y += dropres_value;
    }
}

function update_field(){
    cancelAnimationFrame(run);
    grid = Number(document.getElementById("dropgrid").value);
    dropres_value = Number(document.getElementById("dropres").value);
    canvas.width = grid;
    canvas.height = grid; 

    clear_field();
    rand_field();
    drawGrid();
}

function createArray(rows) { //creates a 2 dimensional array of required height
    var arr = [];
    for (var i = 0; i < rows; i++) {
        arr[i] = [];
    }
    return arr;
}

function rand_field() {
    var x = 0;
    var y = 0;
    var i = 0;
    var j = 0;
    var rand = 0;

    while (y < grid) {
        while (x < grid) {
            rand = Math.round(Math.random() * 10)+1;
            //console.log(rand);
            if (rand <= 4) {
                ctx.fillRect(x, y, dropres_value, dropres_value);
                theGrid[i][j] = 1;
            } else
                theGrid[i][j] = 0;
            i++;
            x += dropres_value;
        }
        x = 0;
        i = 0;
        y += dropres_value;
        j++;
    }
}

function drawGrid() { //draw the contents of the grid onto a canvas
    
    clear_field();
    for (var j = 1; j < grid; j++) { //iterate through rows
        for (var k = 1; k < grid; k++) { //iterate through columns
            if (theGrid[j][k] === 1) {
                
                //ctx.fillStyle = "#FF0000";
                ctx.fillRect(j*dropres_value, k*dropres_value, dropres_value, dropres_value);
            }
        }
    }
}

function updateGrid() { //perform one iteration of grid update
    for (var j = 1; j < grid - 1; j++) { //iterate through rows
        for (var k = 1; k < grid - 1; k++) { //iterate through columns
            var totalCells = 0;
            //add up the total values for the surrounding cells
            totalCells += theGrid[j - 1][k - 1]; //top left
            totalCells += theGrid[j - 1][k]; //top center
            totalCells += theGrid[j - 1][k + 1]; //top right

            totalCells += theGrid[j][k - 1]; //middle left
            totalCells += theGrid[j][k + 1]; //middle right

            totalCells += theGrid[j + 1][k - 1]; //bottom left
            totalCells += theGrid[j + 1][k]; //bottom center
            totalCells += theGrid[j + 1][k + 1]; //bottom right


            //apply the rules to each cell
            if (theGrid[j][k] === 0) {
                switch (totalCells) {
                    case 3:
                        mirrorGrid[j][k] = 1; //if cell is dead and has 3 neighbours, switch it on
                        break;
                    default:
                        mirrorGrid[j][k] = 0; //otherwise leave it dead
                }
            } else if (theGrid[j][k] === 1) { //apply rules to living cell
                switch (totalCells) {
                    case 0:
                    case 1:
                        mirrorGrid[j][k] = 0; //die of lonelines
                        break;
                    case 2:
                    case 3:
                        mirrorGrid[j][k] = 1; //carry on living
                        break;
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                    case 8:
                        mirrorGrid[j][k] = 0; //die of overcrowding
                        break;
                    default:
                        mirrorGrid[j][k] = 0; //
          
                }

            }
        }
    }

    for (var j = 0; j < grid; j++) { //iterate through rows
        for (var k = 0; k < grid; k++) { //iterate through columns
            theGrid[j][k] = mirrorGrid[j][k];

        }
    }
    //theGrid=mirrorGrid;

}