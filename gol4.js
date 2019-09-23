var grid = Number(document.getElementById("dropgrid").value);
var dropres_value = Number(document.getElementById("dropres").value);
var dropcolor_live_value = Number(document.getElementById("dropcolor_live").value);
var dropcolor_dead_value = Number(document.getElementById("dropcolor_dead"  ).value);
var txt_gen = Number(document.getElementById("generations").value);
//var grid = Number(document.getElementById("dropgrid").value);
var theGrid = createArray(grid);
var mirrorGrid = createArray(grid);
var canvas = document.getElementById("canvas");
canvas.width = grid + 500;
canvas.height = grid + 100;
var generations_count = 0;
var run;
//var c = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
//var canvas = document.getElementById("canvas");
//var context = canvas.getContext("2d");
ctx.font = "30px Arial";
ctx.fillText("Generation:", grid + 20, 30);
rand_field(); //create the starting state for the grid by filling it with random cells
drawGrid();
//tick //call main loop



function start_animation() {
    tick();
}

//functions 
function tick() { //main loop
    updateGrid();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid();
    txt_gen = Number(document.getElementById("generations").value);
    generations_count++;
    //ctx.clearText(grid + 180, 30, 100,100);
    //ctx.fillText("", grid + 180, 30);
    ctx.fillText("Generation:", grid + 20, 30);
    ctx.fillText(generations_count, grid + 180, 30);
    //updateGrid();
    if (generations_count<txt_gen || txt_gen==0)
    run = requestAnimationFrame(tick);
    else{
        cancelAnimationFrame(run);
        generations_count = 0;
    }
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
            //ctx.clearRect(grid+200, 30, 500, 500);
            x += dropres_value;
        }
        x = 0;
        y += dropres_value;
    }
}

function update_field(){
    cancelAnimationFrame(run);
    clear_field();
    grid = Number(document.getElementById("dropgrid").value);
    dropres_value = Number(document.getElementById("dropres").value);
    canvas.width = grid + 500;
    canvas.height = grid + 100; 
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
                //ctx.fillRect(x, y, dropres_value, dropres_value);
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
    dropcolor_live_value = Number(document.getElementById("dropcolor_live").value);
    dropcolor_dead_value = Number(document.getElementById("dropcolor_dead").value);
    for (var j = 1; j < grid; j++) { //iterate through rows
        for (var k = 1; k < grid; k++) { //iterate through columns
            if (theGrid[j][k] === 1) {
                //ctx.fillStyle = "#FF0000";
                switch(dropcolor_live_value){
                    case 1:
                        ctx.fillStyle = "#FF0000"
                        break;
                    case 2:
                        ctx.fillStyle = "#00FF00"
                        break;
                    case 3:
                        ctx.fillStyle = "#0000FF"
                        break;
                }
                ctx.fillRect(j*dropres_value, k*dropres_value, dropres_value, dropres_value);
            }
            else if(theGrid[j][k] === 0){
                switch(dropcolor_dead_value){
                    case 1:
                        ctx.fillStyle = "#FF0000"
                        break;
                    case 2:
                        ctx.fillStyle = "#00FF00"
                        break;
                    case 3:
                        ctx.fillStyle = "#0000FF"
                        break;
                }
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


}