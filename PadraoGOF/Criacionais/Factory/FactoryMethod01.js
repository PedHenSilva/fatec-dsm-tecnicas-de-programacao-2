//Anotacoes:
//Nome de Classe sempre em maiusculo 


//Classe base de Veiculo
class Veiculo{
    constructor(modelo){
        this.modelo = modelo;
    }

    mostrarDetalhes(){
        console.log(`Modelo: ${this.modelo}`);
    }
}

//Subsclasse de Veiculos
class Carro extends Veiculo{
    constructor(modelo){
        super(modelo);
    }
}

class Moto extends Veiculo{
    constructor(modelo){
        super(modelo);
    }
}

class Navio extends Veiculo{
    constructor(modelo){
        super(modelo);
    }
}

//Fabrica Abstrata de Veiculos
class FabricaVeiculos{
    criarVeiculo(){
        throw new Error('O método deve ser implementado pelas subclasses')
    }
}

//Fabrica Concreta de Carros
class FabricaCarros extends FabricaVeiculos{
    criarVeiculo(modelo){
        return new Carro(modelo);
    }
}

//Fabrica Concreta de Motos
class FabricaMotos extends FabricaVeiculos{
    criarVeiculo(modelo){
        return new Moto(modelo);
    }
}

//Fabrica Concreta de Navios
class FabricaNavios extends Veiculo{
    criarVeiculo(modelo){
        return new Navio(modelo);
    }
}

//USO PADRAO -----------------------------------------

const fabricaMotos = new FabricaMotos();
const fabricaCarros = new FabricaCarros();
const fabricaNavios = new FabricaNavios();

const transporte1 = fabricaCarros.criarVeiculo('Sedan');
const transporte2 = fabricaCarros.criarVeiculo("Pickup");
const transporte3 = fabricaMotos.criarVeiculo('BigTraill');
const transporte4 = fabricaMotos.criarVeiculo('Esportiva');
const transporte5 = fabricaNavios.criarVeiculo('Container');
const transporte6 = fabricaNavios.criarVeiculo('Cargueiro');

transporte1.mostrarDetalhes();
transporte2.mostrarDetalhes();
transporte3.mostrarDetalhes();
transporte4.mostrarDetalhes();
transporte5.mostrarDetalhes();
transporte6.mostrarDetalhes();