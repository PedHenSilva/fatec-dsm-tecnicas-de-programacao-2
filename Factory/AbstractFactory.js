// Interface da Fabrica Abstarta
class FabricaAbstrata {
    criarProdutoEletronico() {};
    criarProdutoVestuario() {};
}

// Classe Concreta da Fabrica de Produtos Eletronicos
class FabricaEletronico extends FabricaAbstrata {
    criarProdutoEletronico() {
        return new Telefone();
    }

    criarProdutoVestuario() {
        return new Camiseta();
    }
}

// Classe Concreta da Fabrica de Produtos Vestuarios
class FabricaVestuario extends FabricaAbstrata {
    criarProdutoEletronico() {
        return new Telefone();
    }

    criarProdutoVestuario() {
        return new Camiseta();
    }
}

// Classe Abstrata para Produtos Eletronicos
class ProdutoEletronico {
    constructor() {
        this.tipo = 'eletrônico';
    }

    descricao() {
        return `Produto ${this.tipo}: Telefone`;
    }
}

// Classe Abstrata para Produtos Vestuarios
class ProdutoVestuario {
    constructor() {
        this.tipo = 'vestuário';
    }

    descricao() {
        return `Produto ${this.tipo}: Camiseta`;
    }
}

// Classe Concreta para Produto Eletronico:
class Telefone extends ProdutoEletronico {
    descricao() {
        return `Produto ${this.tipo}: Telefone`;
    }
}

// Classe Concreta para Produto Vestuario:
class Camiseta extends ProdutoVestuario {
    descricao() {
        return `Produto ${this.tipo}: Camiseta`;
    }
}

// Simulação do Uso do Padrão em Loja Virtual
function lojaVirtual(cliente, fabrica) {
    const produtoEletronico = fabrica.criarProdutoEletronico();
    const produtoVestuario = fabrica.criarProdutoVestuario();

    console.log(`${cliente} comprou:`);
    console.log(produtoEletronico.descricao());
    console.log('--------------------------------------');
    console.log(produtoVestuario.descricao());
    console.log('--------------------------------------');
}

// Exemplo de uso com Fabrica de Produtos Eletronicos e Vestuario:
const cliente1 = 'João';
const fabricaEletronico = new FabricaEletronico();
lojaVirtual(cliente1, fabricaEletronico);

const cliente2 = 'Maria';
const fabricaVestuario = new FabricaVestuario();
lojaVirtual(cliente2, fabricaVestuario);