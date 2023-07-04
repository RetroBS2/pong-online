class Jogador {
    constructor(id, width, height) {
        this.WIDTH = width;
        this.HEIGHT = height;
        this.id = id;
        this.y = this.HEIGHT / 2;
        this.altura = 150
        this.largura = 50
        this.VELOCIDADE = 15;
        if (this.id == 1) {
            this.color = '#F00'
            this.x = 0;
        } else {
            this.color = '#00F'
            this.x = this.WIDTH - this.largura;
        }
    }

    desenhar() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.largura, this.altura);
    }

    movimentar(e) {
        if (e.key == 'ArrowUp') {
            if (this.y >= 0) {
                this.y -= this.VELOCIDADE
            }
        }

        if (e.key == 'ArrowDown') {
            if (this.y + this.altura <= this.HEIGHT) {
                this.y += this.VELOCIDADE;
            }
        }
    }
    escrever(text) {
        console.log(text);
    }
}
