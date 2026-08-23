class FabricaAbstrata:
    def criarEletronico(self):
        pass

    def criarVestuario(self):
        pass

class FabricaEletronicos(FabricaAbstrata):
    def criarEletronico(self):
        return Telefone()

    def criarVestuario(self):
        return Camiseta()

class FabricaVestuarios(FabricaAbstrata):
    def criarEletronico(self):
            return Telefone()
    
    def criarVestuario(self):
        return Camiseta()

class ProdutoEletronico:
    def __init__(self, tipo):
        self.tipo = 'Eletrônico'

    def descricao(self):
        return f'Produto {self.tipo}: Telefone'

class ProdutoVestuario:
    def __init__(self, tipo):
        self.tipo = 'Vestuário'

    def descricao(self):
        return f'Produto {self.tipo}: Camiseta'

class Telefone(ProdutoEletronico):
    def descricao(self):
        return f'Produto {self.tipo}: Telefone'

class Camiseta(ProdutoVestuario):
    def descricao(self):
        return f'Produto {self.tipo}: Camiseta'

fabricaEletronicos = FabricaEletronicos()
fabricaVestuarios = FabricaVestuarios()

def lojaVirtual(cliente):
    produtoEletronico = fabricaEletronicos.criarEletronico()
    produtoVestuario = fabricaVestuarios.criarVestuario()

    print(f'{cliente} comprou:')
    print(produtoEletronico.descricao())
    print('-----------------------------')
    print(produtoVestuario.descricao())

cliente1 = 'João'
lojaVirtual(cliente1)
    