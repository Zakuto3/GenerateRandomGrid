"use strict"
const LevelRoguelike = require('roguelike/level/roguelike');
let express = require('express');
let app = express();
let bodyParser = require('body-parser');
const math = require('mathjs');
let size = 20;
//use for complex json parsing
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


//allows for navigation from exteral ip(gateway), not needed if ran on localhost
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.post('/getGrid', (req, res) => {
    let level;
    let correctLevel = true;
    do
        try {
            level = LevelRoguelike({
                width: 20, // Max Width of the world
                height: 20, // Max Height of the world
                retry: 100, // How many times should we try to add a room?
                special: true, // Should we generate a "special" room?
                room: {
                    ideal: 10, // Give up once we get this number of rooms
                    min_width: 2,
                    max_width: 21,
                    min_height: 2,
                    max_height: 21
                }
            });
            correctLevel = false;

        } catch (error) {
            correctLevel = true;
        }

    while (correctLevel)

    //--- OOP ---
    //console.log(level);
    let grid = createFirstRoom(size)
        //findRooms(grid)
    console.log(grid)
    res.send(grid);
});

//sets static directory, "root" of homepage
app.use(express.static(__dirname)); // if not this is given, give specific adress like : app.get('/', (req, res) => res.send(fs.readFileSync('./index.html', 'utf8')));

//keep server live trough port 3000 // https://stackabuse.com/how-to-start-a-node-server-examples-with-the-most-popular-frameworks/
app.listen(3000, () => console.log('Server running on port 3000.'));

//OOP: Gen a square of floor, Gen another square floor and see if it
//fits the first square, connect. MAX 1 Void.- CR8 ALL Elements in order

//OOP2: Create a room with walls, conenct second room with walls add Door REP


let EmptyGrid = (size) => {
    let arr = [];
    for (let i = 0; i <= size; i++) {
        arr[i] = [];
    }

    for (let y = 0; y <= size; y++) {
        for (let x = 0; x <= size; x++) {
            arr[x][y] = 0;
        }
    }
    return arr;
}

function createFirstRoom(size) {
    var min = 2;
    var max = 3;

    var roomSize = Math.floor(Math.random() * (+max + 1 - +min)) + +min;

    do {
        //place the room randomly in world x y
        var x = Math.floor((Math.random() * size) + 1);
        var y = Math.floor((Math.random() * size) + 1);
        console.log("x + roomSize AND y + roomSize", (x + roomSize), (y + roomSize));
    } while (x + roomSize + 1 > size || y + roomSize + 1 > size)

    console.log("Room X Y Size", x, y, roomSize);

    let grid = EmptyGrid(size);

    for (let i = y; i < roomSize + y; i++) {
        for (let j = x; j < roomSize + x; j++) {
            grid[j][i] = 1
                //console.log(i,j)
        }
    }
    grid = buildTheWall(grid, findRooms(grid))
    return grid;
}

function buildTheWall(grid, room) {
    let max = Math.sqrt(room.length);
    let y = room[0].x - 1
    let x = room[0].y - 1
    for (var i = x; i <= x + max + 1; i++) {
        for (var j = y; j <= y + max + 1; j++) {
            if (grid[j][i] != 1) grid[j][i] = 2;
        }
    }
    return grid;
}

function findRooms(grid) {
    //pair
    let rooms = []
    for (var y = 0; y <= size; y++) {
        for (var x = 0; x <= size; x++) {
            if (grid[x][y]) {
                rooms.push({
                    x: x,
                    y: y
                });
            }
        }
    }
    console.log(rooms);
    return rooms;
}

function decideLocation(grid) {
    let rooms = findRooms(grid);
    var min = 2;
    var max = 3;
    var roomSize = Math.floor(Math.random() * (+max + 1 - +min)) + +min;
    

}

function createRoom(grid) {



}


/*
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
[ 0, 2, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
[ 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
[ 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0 ],
[ 0, 0, 0, 0, 2, 2, 2, 0, 0, 1, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0 ],
[ 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0 ],
[ 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
*/