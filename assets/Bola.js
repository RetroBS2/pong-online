class Bola {
    constructor(width, height) {
        this.WIDTH = width;
        this.HEIGHT = height;
        this.raio = 15;
        this.color = '#080';
        this.x = width / 2 + this.raio;
        this.y = height / 2 - this.raio;
    }

    desenhar() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.raio, 0, 2 * Math.PI);
        ctx.strokeStyle = '#000';
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.stroke();
    }

    movimentar() {
        this.x += this.velocidadeX;
        this.y += this.velocidadeY;
    }

    baterParede() {
        if (this.y - this.raio <= 0) {
            this.velocidadeY *= -1;
        }
        if (this.y + this.raio >= this.HEIGHT) {
            this.velocidadeY *= -1;
        }
    }

    baterJogador(jg1X, jg1Y, jg2X, jg2Y, largurajg, alturajg) {
        if ((this.x - this.raio <= jg1X + largurajg) && (this.y + this.raio >= jg1Y) && (this.y - this.raio <= jg1Y + alturajg) && (this.velocidadeX < 0)) {
            this.velocidadeX *= -1;
        }
        if ((this.x + this.raio >= jg2X) && (this.y + this.raio >= jg2Y) && (this.y - this.raio <= jg2Y + alturajg) && (this.velocidadeX > 0)) {
            this.velocidadeX *= -1;
        }
    }

    comecarBola() {
        let r = 0;
        let intervalDirection = [-2, -1, 1, 2];
        this.x = width / 2 + this.raio;
        this.y = height / 2 - this.raio;
        while (r == 0) { r = intervalDirection[Math.floor(Math.random() * 3)] };
        this.velocidadeY = r
        r = 0;
        intervalDirection = [-0.6, -0.5, 0.5, 0.6];
        while (r == 0) { r = intervalDirection[Math.floor(Math.random() * 3)] };
        this.velocidadeX = (r <= 2) ? 2 : -2;
    }
}
