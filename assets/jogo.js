const screen = document.getElementById('screen');
const ctx = screen.getContext('2d');
var bola = new Bola(width, height);
var gerenciar = new Gerenciar(width);
document.addEventListener('keydown', function (e) {
    if (e.key == 'ArrowUp' || e.key == 'ArrowDown') {
        if (socket.id == jogadores[0]) {
            j1.movimentar(e);
            socket.emit('setPosition', { x: j1.x, y: j1.y });
        } else if ((socket.id == jogadores[1])) {
            j2.movimentar(e);
            socket.emit('setPosition', { x: j2.x, y: j2.y });
        }
    }
    if (!gerenciar.rodar) {
        if (e.key == 'Enter') {
            bola.comecarBola();
            socket.emit('beginGame', { rodar: gerenciar.rodar, x: bola.x, y: bola.y, velX: bola.velocidadeX, velY: bola.velocidadeY });
        }
    }
});

socket.on('start', (e) => {
    gerenciar.rodar = true;
});


const drawAllScreen = () => {
    ctx.clearRect(0, 0, width, height);
    gerenciar.pontuar(bola.x, bola.raio);
    if (jogadores.length == 1) {
        j1.desenhar();
    }
    if (jogadores.length == 2) {
        j1.desenhar();
        j2.desenhar();
        gerenciar.desenharPontos();
    }
    if (gerenciar.rodar) {
        socket.emit('sendBall', { x: bola.x, y: bola.y, velX: bola.velocidadeX, velY: bola.velocidadeY });
        bola.desenhar();
    }
}

function addDraw() {
    var intervalDraw = setInterval(() => {
        drawAllScreen();
    }, 10);
}

addDraw();