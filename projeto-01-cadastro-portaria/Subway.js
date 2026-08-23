// Definindo as partes do Lanche
class Tamanho {
    constructor(tamanho) {
        this.tamanho = tamanho;
    }
}

class Pao {
    constructor(tipo) {
        this.tipo = tipo;
    }
}

class Proteina {
    constructor(tipo) {
        this.tipo = tipo;
    }
}

class Queijo {
    constructor(tipo) {
        this.tipo = tipo;
    }
}

class Aquecimento {
    constructor(tipo) {
        this.tipo = tipo;
    }
}

class Molho {
    constructor(tipo) {
        this.tipo = tipo;
    }
}

class Salada {
    constructor(tipo) {
        this.tipo = tipo;
    }
}

class Tempero {
    constructor(tipo) {
        this.tipo = tipo;
    }
}

// Builder
class LancheBuilder {
    constructor() {
        this.tamanho = null;
        this.pao = null;
        this.proteina = null;
        this.queijo = null;
        this.aquecimento = null;
        this.molho = null;
        this.salada = null;
        this.tempero = null;
    }

    definirTamanho(tamanho) {
        this.tamanho = new Tamanho(tamanho);
        return this;
    }

    escolherPao(tipo) {
        this.pao = new Pao(tipo);
        return this;
    }

    escolherProteina(tipo) {
        this.proteina = new Proteina(tipo);
        return this;
    }

    escolherQueijo(tipo) {
        this.queijo = new Queijo(tipo);
        return this;
    }

    definirAquecimento(tipo) {
        this.aquecimento = new Aquecimento(tipo);
        return this;
    }

    adicionarSalada(tipo) {
        this.salada = new Salada(tipo);
        return this;
    }

    adicionarMolho(tipo) {
        this.molho = new Molho(tipo);
        return this;
    }

    adicionarTempero(tipo) {
        this.tempero = new Tempero(tipo);
        return this;
    }

    construir() {
        return new Lanche(
            this.tamanho,
            this.pao,
            this.proteina,
            this.queijo,
            this.aquecimento,
            this.salada,
            this.molho,
            this.tempero
        );
    }
}

// Classe concreta do Lanche
class Lanche {
    constructor(tamanho, pao, proteina, queijo, aquecimento, salada, molho, tempero) {
        this.tamanho = tamanho;
        this.pao = pao;
        this.proteina = proteina;
        this.queijo = queijo;
        this.aquecimento = aquecimento;
        this.salada = salada;
        this.molho = molho;
        this.tempero = tempero;
    }

    mostrarDetalhes() {
        console.log(`--- DETALHES DO LANCHE ---
            Tamanho:     ${this.tamanho ? this.tamanho.tamanho : 'Padrão'}
            Pão:         ${this.pao ? this.pao.tipo : 'Não informado'}
            Proteína:    ${this.proteina ? this.proteina.tipo : 'Nenhuma'}
            Queijo:      ${this.queijo ? this.queijo.tipo : 'Nenhum'}
            Aquecimento: ${this.aquecimento ? this.aquecimento.tipo : 'Nenhum'}
            Salada:      ${this.salada ? this.salada.tipo : 'Nenhuma'}
            Molho:       ${this.molho ? this.molho.tipo : 'Nenhum'}
            Tempero:     ${this.tempero ? this.tempero.tipo : 'Nenhum'} \n`
        );
    }
}

// USO PADRÃO (GoF Criacional - Builder)

const builder = new LancheBuilder();

const lanche1 = builder
    .definirTamanho('30 cm')
    .escolherPao('Francês')
    .escolherProteina('Frango Empanado')
    .escolherQueijo('Cheddar')
    .definirAquecimento('Tostado')
    .adicionarSalada('Alface e Tomate')
    .adicionarMolho('Maionese Especial')
    .adicionarTempero('Orégano')
    .construir();

lanche1.mostrarDetalhes();

const lanche2 = new LancheBuilder()
    .definirTamanho('15 cm')
    .escolherPao('Integral')
    .escolherProteina('Atum')
    .adicionarMolho('Azeite')
    .construir();

lanche2.mostrarDetalhes();