var canvas = document.getElementById("canvas");
var context = canvas.getContext('2d');
let img = document.createElement("img");
img.src = "New_Piskel_2.png";
img.wi = "32px";
img.height = 32;
//ctrl+k cltr+v, list of ctrl+c
//ctrl+shift+D
var size = 20;

function drawBoard() {

    for (var x = 0.5; x < 501; x += 20) {
        context.moveTo(x, 0);
        context.lineTo(x, 381);
    }

    for (var y = 0.5; y < 381; y += 20) {
        context.moveTo(0, y);
        context.lineTo(500, y);
    }
    
    context.strokeStyle = "black";
    context.stroke();
}

//drawBoard();

function drawGrid(grid) {
    for (var y = 0; y <= size; y++) {
        for (var x = 0; x <= size; x++) {
            context.drawImage(img, grid[x][y] * 32, 0, 32, 32, y * 32, x * 32, 32, 32)
        }
    }
}



function getMap() {
    req = new XMLHttpRequest();
    req.open('post', '/getGrid');
    req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    req.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let grid = JSON.parse(req.responseText)
            
            drawGrid(grid);
        } else if (this.status !== 200 && this.readyState != 4) {
            alert('Request failed.  Returned status of ' + req.status);
        }
    }
    req.send();
    return "success"
};
 //https://www.npmjs.com/package/roguelike