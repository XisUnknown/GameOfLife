var dropgrid_value = Number(document.getElementById("dropgrid").value);
var dropres_value = Number(document.getElementById("dropres").value);
// Box width
//var bw = 1000;
// Box height
//var bh = 1000;
var g = 0;
var old_gen = Create2DArray((dropgrid_value / dropres_value), (dropgrid_value / dropres_value));
var new_gen = Create2DArray((dropgrid_value / dropres_value), (dropgrid_value / dropres_value));
var canvas = document.getElementById("canvas");
var intervall = 0;
canvas.width = dropgrid_value + 100;
canvas.height = dropgrid_value + 100;
//canvas.color ="#FFFFFF"

var context = canvas.getContext("2d");

function Create2DArray() {
    var arr = [];

    for (var i = 0; i < (dropgrid_value / dropres_value); i++) {
        arr[i] = [];
    }

    return arr;
}
//rand field nochmal!!!!!!!!!!!!!!!!!!!
function rand_field() {
    var x = 0;
    var y = 0;
    var i = 0;
    var j = 0;
    var rand = 0;

    while (y < dropgrid_value) {
        while (x < dropgrid_value) {
            rand = Math.round(Math.random() * 10)+1;
            console.log(rand);
            if (rand <= 4) {
                context.fillRect(x, y, dropres_value, dropres_value);
                old_gen[i][j] = 1;
            } else
                old_gen[i][j] = 0;
            i++;
            x += dropres_value;
        }
        x = 0;
        i = 0;
        y += dropres_value;
        j++;
    }
    //new_gen = old_gen;
    for (var l = 0; l < (dropgrid_value / dropres_value); l++) { //iterate through rows
        for (var k = 0; k < (dropgrid_value / dropres_value); k++) { //iterate through columns
            old_gen[k][l] = new_gen[k][l];

        }
    }
}

function clear_field() {
    var x = 0;
    var y = 0;
    var i = 0;
    var j = 0;
    var rand = 0;

    while (y < dropgrid_value) {
        while (x < dropgrid_value) {
            context.clearRect(x, y, dropres_value, dropres_value);
            x += dropres_value;
        }
        x = 0;
        y += dropres_value;
    }
}

function new_gen_calc() {
    var x = 0;
    var y = 0;
    //var i = 0;
    //var j = 0;
    var count = 0;
    //const k = 1;
    //new_gen = old_gen;

    while(y < (dropgrid_value / dropres_value)) {
        while(x < (dropgrid_value / dropres_value)) {
            count = 0;
            //Linke obere Ecke
            if (x == 0 && y == 0) {
                //count = 0;
                if (old_gen[x + 1][y] == 1)
                    count++;
                if (old_gen[x + 1][y + 1] == 1)
                    count++;
                if (old_gen[x][y + 1] == 1)
                    count++;
            }
            //obere Leiste
            if (y == 0 && x > 0 && x < ((dropgrid_value / dropres_value) - 1)) {
                if (old_gen[x - 1][y] == 1)
                    count++;
                if (old_gen[x + 1][y] == 1)
                    count++;
                if (old_gen[x - 1][y + 1] == 1)
                    count++;
                if (old_gen[x + 1][y + 1] == 1)
                    count++;
                if (old_gen[x][y + 1] == 1)
                    count++;
            }
            //rechte obere Ecke 
            if (y == 0 && x == ((dropgrid_value / dropres_value) - 1)) {
                if (old_gen[x - 1][y] == 1)
                    count++;
                if (old_gen[x - 1][y + 1] == 1)
                    count++;
                if (old_gen[x][y + 1] == 1)
                    count++;
            }
            //rechte Leiste
            if (x == ((dropgrid_value / dropres_value) - 1) && y > 0 && y < ((dropgrid_value / dropres_value) - 1)) {
                if (old_gen[x][y - 1] == 1)
                    count++;
                if (old_gen[x][y + 1] == 1)
                    count++;
                if (old_gen[x - 1][y + 1] == 1)
                    count++;
                if (old_gen[x - 1][y] == 1)
                    count++;
                if (old_gen[x - 1][y - 1] == 1)
                    count++;
            }
            //untere Rechte Ecke
            if (x == ((dropgrid_value / dropres_value) - 1) && y == ((dropgrid_value / dropres_value) - 1)) {
                if (old_gen[x - 1][y] == 1)
                    count++;
                if (old_gen[x - 1][y - 1] == 1)
                    count++;
                if (old_gen[x][y - 1] == 1)
                    count++;
            }
            //untere Leiste
            if (x < ((dropgrid_value / dropres_value) - 1) && x > 0 && y == ((dropgrid_value / dropres_value) - 1)) {
                if (old_gen[x][y - 1] == 1)
                    count++;
                if (old_gen[x - 1][y - 1] == 1)
                    count++;
                if (old_gen[x + 1][y] == 1)
                    count++;
                if (old_gen[x - 1][y] == 1)
                    count++;
                if (old_gen[x + 1][y - 1] == 1)
                    count++;
            }
            //linke untere Ecke
            if (x == 0 && y == ((dropgrid_value / dropres_value) - 1)) {
                if (old_gen[x][y - 1] == 1)
                    count++;
                if (old_gen[x + 1][y - 1] == 1)
                    count++;
                if (old_gen[x + 1][y] == 1)
                    count++;
            }
            if (x==0 && y>0 && y < ((dropgrid_value / dropres_value) - 1)) {
                if (old_gen[x + 1][y + 1] == 1)
                    count++;
                if (old_gen[x][y + 1] == 1)
                    count++;
                if (old_gen[x][y - 1] == 1)
                    count++;
                if (old_gen[x + 1][y - 1] == 1)
                    count++;
                if (old_gen[x + 1][y] == 1)
                    count++;
            }
            //mittlerer Bereich
            if (x > 0 && x < ((dropgrid_value / dropres_value) - 1) && y > 0 && y < ((dropgrid_value / dropres_value) - 1)) {
                if (old_gen[x - 1][y - 1] == 1)
                    count++;
                if (old_gen[x][y - 1] == 1)
                    count++;
                if (old_gen[x + 1][y - 1] == 1)
                    count++;
                if (old_gen[x - 1][y] == 1)
                    count++;
                if (old_gen[x + 1][y] == 1)
                    count++;
                if (old_gen[x][y + 1] == 1)
                    count++;
                if (old_gen[x - 1][y + 1] == 1)
                    count++;
                if (old_gen[x + 1][y + 1] == 1)
                    count++;
            }
            //new_gen[x][y] = 0;
            if (count < 2 && old_gen[x][y] == 1)
                new_gen[x][y] = 0;
            if ((count == 3 || count == 2) && old_gen[x][y] == 1)
                new_gen[x][y] = 1;
            if (count > 3 && old_gen[x][y] == 1)
                new_gen[x][y] = 0;
            if (count == 3 && old_gen[x][y] == 0)
                new_gen[x][y] = 1;
            count = 0;
            //i++;
            x++;
        }

        count = 0;
        x = 0;
        i = 0;
        y++;
        //j++;
    }
    for (var j = 0; j < (dropgrid_value / dropres_value); j++) { //iterate through rows
        for (var k = 0; k < (dropgrid_value / dropres_value); k++) { //iterate through columns
            old_gen[k][j] = new_gen[k][j];

        }
    }
}


function draw_field() {
    var x = 0;
    var y = 0;
    var i = 0;
    var j = 0;


    while (y < dropgrid_value) {
        while (x < dropgrid_value) {
            if (new_gen[i][j] == 1)
                context.fillRect(x, y, dropres_value, dropres_value);
            else
                context.clearRect(x, y, dropres_value, dropres_value);
            i++;
            x += dropres_value;
        }
        x = 0;
        i = 0;
        j++;
        y += dropres_value;
    }
}

function update_field() {
    clearInterval(intervall);
    clear_field();
    dropgrid_value = Number(document.getElementById("dropgrid").value);
    dropres_value = Number(document.getElementById("dropres").value);
    rand_field();
}

function start_animation() {

    intervall = setInterval(function() {
        clear_field();
        new_gen_calc();
        //console.log(new_gen);
        draw_field();
    }, 100)
}

function stop_animation() {
    clearInterval(intervall);
}
//document.getElementById("dropgrid_click").addEventListener("onclick", update_field());
//document.getElementById("dropres_click").addEventListener("onclick", update_field()); 
rand_field();

/*setInterval(function(){
  clear_field();
  new_gen_calc();
  console.log(new_gen);
  draw_field();
},1000)*/