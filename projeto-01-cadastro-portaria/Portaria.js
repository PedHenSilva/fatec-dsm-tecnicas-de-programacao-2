// Classe base de Pessoas
class Pessoa {
    constructor(nome, email, ocupacao) {
        this.nome = nome;
        this.email = email;
        this.ocupacao = ocupacao;
    }

    mostrarDetalhes() {
        console.log(`Nome: ${this.nome} | E-mail: ${this.email} | Ocupação: ${this.ocupacao}`);
    }
}

// Subclasses de tipos de pessoas
class Professor extends Pessoa {
    constructor(nome, email, ocupacao) {
        super(nome, email, ocupacao);
    }
}

class Estudante extends Pessoa {
    constructor(nome, email, ocupacao) {
        super(nome, email, ocupacao);
    }
}

class Visitante extends Pessoa {
    constructor(nome, email, ocupacao) {
        super(nome, email, ocupacao);
    }
}

class Administrador extends Pessoa {
    constructor(nome, email, ocupacao) {
        super(nome, email, ocupacao);
    }
}

class Terceiro extends Pessoa {
    constructor(nome, email, ocupacao) {
        super(nome, email, ocupacao);
    }
}

// Fábrica Abstrata de Perfis
class FabricaPerfis {
    criarPerfil(nome, email, ocupacao) {
        throw new Error('O método deve ser implementado pelas subclasses.');
    }
}

// Fábricas Concretas de Perfis
class FabricaProfessores extends FabricaPerfis {
    criarPerfil(nome, email, ocupacao) {
        return new Professor(nome, email, ocupacao);
    }
}

class FabricaEstudantes extends FabricaPerfis {
    criarPerfil(nome, email, ocupacao) {
        return new Estudante(nome, email, ocupacao);
    }
}

class FabricaVisitantes extends FabricaPerfis {
    criarPerfil(nome, email, ocupacao) {
        return new Visitante(nome, email, ocupacao);
    }
}

class FabricaAdministradores extends FabricaPerfis {
    criarPerfil(nome, email, ocupacao) {
        return new Administrador(nome, email, ocupacao);
    }
}

class FabricaTerceiros extends FabricaPerfis {
    criarPerfil(nome, email, ocupacao) {
        return new Terceiro(nome, email, ocupacao);
    }
}

// USO PADRÃO -----------------------------------

const fabricaProfessores = new FabricaProfessores();
const fabricaEstudantes = new FabricaEstudantes();
const fabricaVisitantes = new FabricaVisitantes();
const fabricaAdministradores = new FabricaAdministradores();
const fabricaTerceiros = new FabricaTerceiros();

const perfil1 = fabricaProfessores.criarPerfil("Carlos Silva", "carlos.silva@email.com", "Professor de Química");
const perfil2 = fabricaEstudantes.criarPerfil("João Souza", "joao.souza@email.com", "Estudante de Ciência da Computação");
const perfil3 = fabricaVisitantes.criarPerfil("Maria Oliveira", "maria.oliveira@email.com", "Palestrante de Direitos Humanos");
const perfil4 = fabricaAdministradores.criarPerfil("Roberto Costa", "roberto.costa@email.com", "Gestor Financeiro da Universidade");
const perfil5 = fabricaTerceiros.criarPerfil("Fernanda Lima", "fernanda.lima@email.com", "Entregador de Suprimentos Alimentícios");

perfil1.mostrarDetalhes();
perfil2.mostrarDetalhes();
perfil3.mostrarDetalhes();
perfil4.mostrarDetalhes();
perfil5.mostrarDetalhes();