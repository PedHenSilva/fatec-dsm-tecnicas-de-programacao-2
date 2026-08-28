class McOferta {
    constructor(numeroPedido, numero, lanche, batataTamanho, refriTamanho) {
        this.numeroPedido = numeroPedido;
        this.numero = numero;
        this.lanche = lanche;
        this.batataTamanho = batataTamanho;
        this.refriTamanho = refriTamanho;
    }

    clone() {
        return new McOferta(
            this.numeroPedido,
            this.numero,
            this.lanche,
            this.batataTamanho,
            this.refriTamanho
        );
    }
}

class GerenciaMcOferta {
    constructor() {
        this.originais = {};
    }

    // Abstração no atributo batata e refrigerante por serem tamanho médio por padrão
    addMcOferta(numero, lanche, batataTamanho = 'Média', refriTamanho = 'Médio') {
        const original = new McOferta(0, numero, lanche, batataTamanho, refriTamanho);
        this.originais[numero] = original; 
    }

    getOfertaByNum(numero) {
        const ofertaOriginal = this.originais[numero];
        if (ofertaOriginal) {
            return ofertaOriginal.clone();
        }
        return null;
    }
}

const gerencia = new GerenciaMcOferta();

gerencia.addMcOferta(1, 'Big Mac');
gerencia.addMcOferta(2, 'Quarteirão com Queijo');
gerencia.addMcOferta(3, 'McChicken');
gerencia.addMcOferta(4, 'Cheddar McMelt');
gerencia.addMcOferta(5, 'Quarteirão Duplo com Queijo');

const pedido1 = gerencia.getOfertaByNum(1);
if (pedido1) {
    pedido1.numeroPedido = '2203'
    pedido1.batataTamanho = 'Grande';
    pedido1.refriTamanho = 'Grande';
}

const pedido2 = gerencia.getOfertaByNum(2);
if (pedido2) {
    pedido2.numeroPedido = '2204'
    pedido2.batataTamanho = 'Pequena';
    pedido2.refriTamanho = 'Pequeno';
}

const pedido3 = gerencia.getOfertaByNum(4);
if (pedido3) {
    pedido3.numeroPedido = '2205'
    pedido3.batataTamanho = 'Grande';
}

console.log("====== McOfertas Originais =======");
for (let i = 1; i <= 5; i++) {
    console.log(gerencia.originais[i]); 
}

console.log("\n======== Pedidos Personalizados =======");
console.log(pedido1);
console.log(pedido2);
console.log(pedido3);
