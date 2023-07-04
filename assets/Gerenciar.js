class Gerenciar {
    constructor(width) {
        this.WIDTH = width;
        this.rodar = false;
        this.pontoJ1 = 0;
        this.pontoJ2 = 0;
    }

    desenharPontos() {
        let text = this.pontoJ1 + " X " + this.pontoJ2;
        ctx.fillStyle = "#000";
        ctx.font = "30px Arial";
        ctx.fillText(text, this.WIDTH / 2 - 30, 30);
    }

    pontuar(bolaX, bolaR) {
        if (this.rodar) {
            if (bolaX - bolaR > this.WIDTH) {
                if (this.rodar) {
                    this.pontoJ1 += 1;
                }
                this.rodar = false;
                bola.x = 200;
                bola.y = -100;
            }
            if (bolaX + bolaR < 0) {
                if (this.rodar) {
                    this.pontoJ2 += 1;
                }
                this.rodar = false;
                bola.x = 200;
                bola.y = -100;
            }
        }
    }
}
