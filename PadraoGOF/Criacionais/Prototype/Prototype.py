import copy

class Pessoa:
    def __init__(self, id, nome, idade):
        self.id = id
        self.nome = nome
        self.idade = idade

    def clone(self):
        return copy.copy(self)

    def __str__(self):
        return f'ID: {self.id} | Nome: {self.nome} | Idade: {self.idade}'

# Corrigido: A classe deve ficar fora da classe Pessoa (não aninhada)
class GerenciaPessoa:
    def __init__(self):
        self.grupopessoas = {}

    def addPessoa(self, id, nome, idade):
        pessoa = Pessoa(id, nome, idade)
        self.grupopessoas[id] = pessoa

    def getPessoa(self, id):
        return self.grupopessoas[id].clone()

gerencia = GerenciaPessoa()

# Cadastrando pessoas originais
gerencia.addPessoa(1, 'Joao da Silva', 30)
gerencia.addPessoa(2, 'Maria da Silva', 30)
gerencia.addPessoa(3, 'Jose da Silva', 30)

# Criando os clones
pessoaClone1 = gerencia.getPessoa(1)
pessoaClone2 = gerencia.getPessoa(2)
pessoaClone3 = gerencia.getPessoa(3)

# Modificando clones
pessoaClone1.nome = 'Clonaldo de Oliveira'
pessoaClone2.nome = 'Bruno Clonaldo'
pessoaClone3.idade = 99

print("====== Originais =======")
print(gerencia.getPessoa(1))
print(gerencia.getPessoa(2))
print(gerencia.getPessoa(3))

print("\n====== Clones Modificados =======")
print(pessoaClone1)
print(pessoaClone2)
print(pessoaClone3)
