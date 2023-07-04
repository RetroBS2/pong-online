const express = require('express');
const app = express();
const http = require('http').createServer(app);
const path = require('path');
app.use(express.static(__dirname));
const io = require('socket.io')(http)
var jogadores = [];
var jogo = {
    player1: {
        id: "",
        x: 0,
        y: 0,
    },
    player2: {
        id: "",
        x: 0,
        y: 0,
    },
    bola: {
        x: 100,
        y: -30,
        vx: 0,
        vy: 0,
    },
}
app.get('/', (req, res) => {
    const filePath = path.join(__dirname, 'index.html');
    res.sendFile(filePath)
})

io.on('connection', (socket) => {
    socket.join('pong');
    console.log('Im connect ' + socket.id);
    if (jogadores.length < 2) {
        jogadores.push(socket.id)
        io.to('pong').emit('msg', [jogadores.length, socket.id, jogadores]);
    } else {
        io.to('pong').emit('noMorePlayers', jogadores);
        console.log("Não mais: " + jogadores)
    }
    socket.on('msg', (newp) => {
        if (newp[3] == null)
            return;
        if (newp[2] == 1) {
            jogo.player1.id = newp[3];
            jogo.player1.x = newp[0];
            jogo.player1.y = newp[1];
        } else {
            jogo.player2.id = newp[3];
            jogo.player2.x = newp[0];
            jogo.player2.y = newp[1];
        }
    });

    socket.on('setPosition', (setPosition) => {
        if (socket.id == jogo.player1.id) {
            jogo.player1.x = setPosition.x;
            jogo.player1.y = setPosition.y;
        } else {
            jogo.player2.x = setPosition.x;
            jogo.player2.y = setPosition.y;
        }
    });
    socket.on('sendBall', (Ball) => {
        jogo.bola.x = Ball.x;
        jogo.bola.y = Ball.y;
        jogo.bola.vx = Ball.velX;
        jogo.bola.vy = Ball.velY;
    });
    socket.on('beginGame', (e) => {
        jogo.bola.x = e.x;
        jogo.bola.y = e.y;
        jogo.bola.vx = e.velX;
        jogo.bola.vy = e.velY;
        io.to('pong').emit('start', true);
    });
    socket.on('disconnect', () => {
        if (jogadores.indexOf(socket.id) != -1) {
            console.log("Player " + jogadores.indexOf(socket.id) + " " + socket.id + " disconnect");
            newcollection = jogadores.pop(jogadores.indexOf(socket.id));
            jogadores = [];
            jogadores.push(newcollection);
            if (jogadores.length > 0) {
                jogo.player1.id = jogadores[0];
            }
            io.to('pong').emit('RemovePlayer', jogadores);
        }
    })
})
setInterval(() => {
    io.to('pong').emit('gameposition', jogo);
}, 10)
http.listen(3000, function () {
    console.log('Listening on port 3000')
})