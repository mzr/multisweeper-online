/******************************************
 *        Multisweeper game server        *
 *           WEPPO Project 2017           *
 *        File author: Piotr Maślankowski *
 *            Project authors:            *
 *              Jan Mazur                 *
 *          Piotr Maślankowski            *
 *         Mikołaj Dzięciołowski          *
 ******************************************/


// 'use strict';
// var express = require('express');
// var router = express.Router();
// var http = require('http').Server(app);
// var http = require('../../bin/www').Server(router);

// var io = require('socket.io');

module.exports = function(io){

var rooms = {waitingRoom: {players: []} };
var users = {};

function Game(name, width, height, bombs) {
    var that = this;
    this.name = name;
    this.width = width;
    this.height = height;
    this.bombs = bombs;
    this.state = 'starting'; //one of following values: starting, playing, loose, win
    this.loserI = undefined;
    this.loserJ = undefined;

    function initBoard() {
        var res = [];
        for(let i=0; i < that.height; i++) {
            res[i] = [];
            for(let j=0; j < that.width; j++)
                res[i][j] = 0;
        }
        return res;
    }
    this.board = initBoard();
    //board codes:
    //0 - empty cell
    //-1 - bomb

    this.boardStates = initBoard();
    //board states:
    //0 - covered
    //1 - discovered
    //-1 - flaged

    this.debugPrint = function() {
        var out = "";
        for(let i=0; i < that.height; i++) {
            for(let j=0; j < that.width; j++)
                out += that.board[i][j] + ' ';
                out += '\n';
            }
        console.log(out);
        console.log('\n\n\n');
    }

    //board codes:
    //0 - 9 - number of adjacent bombs
    //-1 - covered
    //-2 - flaged
    this.getBoard = function() {
        var res = initBoard();
        for(let i=0; i < that.height; i++) {
            for(let j=0; j < that.width; j++) {
                if(that.boardStates[i][j] == 0)
                    res[i][j] = -1;
                else if (that.boardStates[i][j] == -1)
                    res[i][j] = -2;
                else 
                    res[i][j] = that.board[i][j];
            }
        }
        return res;
    }


    this.checkWin = function() {
        let tilesLeft = that.width * that.height;
        for(let i = 0; i < that.height; i++)
            for(let j = 0; j < that.width; j++)
                if(that.boardStates[i][j] == 1)
                    tilesLeft--;
        return tilesLeft == that.bombs;
    }


    this.click = function(clicki, clickj) {

        //auxilary functions:
        function randBombs(clickedI, clickedJ) {
            var bombs = that.bombs;
            while (bombs > 0) {
                let i = Math.floor(Math.random() * (that.height - 1));
                let j = Math.floor(Math.random() * (that.width - 1));
                if(that.board[i][j] != -1 && (i != clickedI || j != clickedJ)) {
                    that.board[i][j] = -1;
                    bombs -= 1;
                }  
            }
        }


        function computeNumbers() {
            var directions = [[-1, -1], [-1, 0], [-1, 1],
                              [0, -1],  [0, 1], [1, -1], 
                              [1, 0], [1, 1]];

            for(let i = 0; i < that.height; i++) 
                for(let j = 0; j < that.width; j++) 
                    if (that.board[i][j] == -1)
                        for(let dir of directions) {
                            let newi = i + dir[0];
                            let newj = j + dir[1];
                            if(0 <= newi && newi < that.height && 0 <= newj && newj < that.width) {
                                if(that.board[newi][newj] != -1)
                                    that.board[newi][newj] += 1; //adds 1 to current value
                            }
                        }
        }


        function discover(starti, startj) {
            let directions = [[-1, -1], [-1, 0], [-1, 1],
                              [0, -1],  [0, 1], [1, -1], 
                              [1, 0], [1, 1]];
            
            //initializing visited array:
            let visited = [] 
            for(let i = 0; i < that.height; i++) {
                visited[i] = [];
                for(let j = 0; j < that.width; j++) {
                    visited[i][j] = false;
                }
            }

            let stack = [[starti, startj]];
            //dfs:
            while(stack.length > 0) {
                //process current node:
                let last = stack.pop();
                let i = last[0]
                let j = last[1];
                visited[i][j] = true;
                let curr = that.board[i][j];
                that.boardStates[i][j] = 1;
                 /* add neighbors: we don't have to check if on the tile is a bomb,
                    because if there was one, algorithm wouldn't step here */ 
                if(curr == 0) {
                    for(let dir of directions) {
                        let newi = i + dir[0];
                        let newj = j + dir[1];
                        if(0 <= newi && newi < that.height && 
                           0 <= newj && newj < that.width &&
                           !visited[newi][newj]) 
                            stack.push([newi, newj]);
                    }
                }
            }
        }


        //actual function body:
        if(that.state == 'starting') {
            randBombs(clicki, clickj);
            computeNumbers();
            that.debugPrint();
            that.state = 'playing';
            discover(clicki, clickj);
        } 
        else if (that.state == 'playing') {
            //we react only if tile is covered
            if(!that.boardStates[clicki][clickj]) {
                //lose
                if(that.board[clicki][clickj] == -1) {
                    that.loserI = clicki;
                    that.loserJ = clickj;
                    that.state = 'lose';
                } else 
                    discover(clicki, clickj);
            }
        }

        if(that.checkWin()) 
            that.state = 'win';
    }

    
    this.flag = function(i, j) {
        if(that.boardStates[i][j] == 0)
            that.boardStates[i][j] = -1;
        else if (that.boardStates[i][j] == -1)
            that.boardStates[i][j] = 0;

        if(that.checkWin())
            that.state = 'win';
    }
}

//signals

function emitRoomsUpdated() {
    var response = {rooms: []};
    for (var room in rooms) {
        response.rooms.push({name: room,
        players: rooms[room].players.length, 
        maxPlayers: rooms[room].maxPlayers});
    };
    io.to('waitingRoom').emit('rooms-updated', response);
}

function emitRoomUsersUpdated(roomName) {
    io.to(roomName).emit('room-users-updated', {
        users: rooms[roomName].players.map(x => users[x].name)
    });
}


io.on('connection', socket => {
    console.log('user connected');


    socket.on('login', username => {
        socket.join('waitingRoom');
        rooms['waitingRoom'].players.push(socket.id);
        users[socket.id] = {
            name: username,
            room: 'waitingRoom'
        };

        emitRoomUsersUpdated('waitingRoom');
        socket.emit('login-response',{ok: true});
        console.log(`user ${username} logged and joined waiting room`);
    });


    socket.on('create', config => {
        if(rooms[config.name]) {
            socket.emit("create-response", {
                ok: false, 
                msg: `There is room called ${config.name} already.`});
            console.log(`Attempt to double room ${config.name}`);
            return;
        } 
        if(!users[socket.id]) {
            socket.emit("create-response", {
                ok: false,
                msg: `You are not logged.`
            });
            return;
        }

        var username = users[socket.id].name;
        rooms[config.name] = {players: [socket.id],
                              maxPlayers: config.maxPlayers,
                              game: new Game(config.name,
                                             config.width,
                                             config.height,
                                             config.bombs) };

        var index = rooms['waitingRoom'].players.indexOf(socket.id); //index of user in player list
        rooms['waitingRoom'].players.splice(index, 1); //remove player from Array
        socket.leave('waitingRoom');
        socket.join(config.name);
        users[socket.id].room = config.name;

        socket.emit("create-response", {
            ok: true, 
            board: rooms[config.name].game.getBoard(),
            players: [users[socket.id]],
            maxPlayers: config.maxPlayers});
            
        emitRoomsUpdated();
        emitRoomUsersUpdated('waitingRoom');
        console.log(`room ${config.name} created by ${username}`);
    });


    socket.on('list-rooms', function() {
        var response = {ok: true, rooms: []};
        for (var room in rooms) {
            response.rooms.push({name: room,
            players: rooms[room].players.length, 
            maxPlayers: rooms[room].maxPlayers});
        };

       socket.emit("list-rooms-response", response);
       console.log("rooms listed by " + users[socket.id].name);
       console.log("Server response:" + JSON.stringify(response));
    });


    socket.on('list-waiting-users', function() {
        socket.emit('list-waiting-users-response', {
            ok: true,
            users: rooms['waitingRoom'].players.map(x => users[x].name)
        });
    });


    socket.on('join', roomName => {
        if(!rooms[roomName]) {
            socket.emit('join-response', 
                {ok: false,
                 msg: `There is no room called ${roomName}`});
            return;
        }

        socket.leave('waitingRoom');
        var index = rooms['waitingRoom'].players.indexOf(socket.id); //index of user in player list
        rooms['waitingRoom'].players.splice(index, 1); //remove player from Array

        socket.join(roomName);
        users[socket.id].room = roomName;
        rooms[roomName].players.push(socket.id);

        socket.emit('join-response', {
            ok: true, 
            board: rooms[roomName].game.getBoard(),
            players: [users[socket.id]],
            maxPlayers: rooms[roomName].maxPlayers
        });

        emitRoomUsersUpdated(roomName);
        emitRoomUsersUpdated('waitingRoom');
        emitRoomsUpdated();
    });


    socket.on('leave', function() {
        if (users[socket.id].room == 'waitingRoom') {
            socket.emit('leave-response',
                 { ok: false,
                   msg: "Users cannot leave waiting room without joining another one"});
            return;
        }

        var roomName = users[socket.id].room;
        var index = rooms[roomName].players.indexOf(socket.id); //index of user in player list
        rooms[roomName].players.splice(index, 1); //remove player from Array
        socket.leave(roomName);
        socket.join('waitingRoom');
        users[socket.id].room = 'waitingRoom';
        rooms['waitingRoom'].players.push(socket.id);

        socket.emit('leave-response', {
            ok: true
        });

        emitRoomUsersUpdated('waitingRoom');

        if (!rooms[roomName].players.length) {;
            delete rooms[roomName];
            emitRoomsUpdated();
        }
        else 
            emitRoomUsersUpdated(roomName);
    });


    socket.on('click', coords => {
        if(!users[socket.id]) {
            socket.emit('click-response', {
                ok: false,
                msg: 'You are not logged'
            });
            return;
        }

        var roomName = users[socket.id].room;
        if(roomName == 'waitingRoom') {
            socket.emit('click-response', {
                ok: false,
                msg: 'Click signal from waiting room received.'
            });
            return;
        }

        if(!('i' in coords) || !('j' in coords)) {
            socket.emit('click-response', {
                ok: false,
                msg: 'Invalid signal arguments'
            });
            return;
        }

        console.log('clicked');
        rooms[roomName].game.click(coords.i, coords.j);
        io.to(roomName).emit('board-updated', { 
            state: rooms[roomName].game.state,
            loserI: rooms[roomName].game.loserI,
            loserJ: rooms[roomName].game.loserJ,
            board: rooms[roomName].game.getBoard()
        });
        socket.emit('click-response', {ok: true});
    });


    socket.on('flag', coords => {
         if(!users[socket.id]) {
            socket.emit('click-response', {
                ok: false,
                msg: 'You are not logged'
            });
            return;
        }

        var roomName = users[socket.id].room;
        if(roomName == 'waitingRoom') {
            socket.emit('click-response', {
                ok: false,
                msg: 'Click signal from waiting room received.'
            });
            return;
        }

        if(!('i' in coords) || !('j' in coords)) {
            socket.emit('click-response', {
                ok: false,
                msg: 'Invalid signal arguments'
            });
            return;
        }

        console.log('flagged');
        rooms[roomName].game.flag(coords.i, coords.j);
        io.to(roomName).emit('board-updated', { 
            state: rooms[roomName].game.state,
            loserI: rooms[roomName].game.loserI,
            loserJ: rooms[roomName].game.loserJ,
            board: rooms[roomName].game.getBoard()
        });
        socket.emit('flag-response', {ok: true});
    });

    socket.on('disconnect', function() {
        console.log('user disconnected');
        if(!users[socket.id]) //check if user was logged in
            return;
        
        var roomName = users[socket.id].room;
        var index = rooms[roomName].players.indexOf(socket.id); //index of user in player list
        rooms[roomName].players.splice(index, 1); //remove player from Array
        socket.leave(roomName);
        
        if (roomName != 'waitingRoom' && rooms[roomName].players.length == 0) {
            delete rooms[roomName];
            emitRoomsUpdated();
        }
        else 
            emitRoomUsersUpdated(roomName);
    });
});

}