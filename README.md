# Tipos de testes

Unitários = Testam 1 componente/funcionalidade de forma **isolada**.
Integração = Testa como 1 ou mais componentes/funcionalidades se comportam juntos.
E2E = Simula o que um usuário vai fazer na nossa aplicação diariamente.

# Bancos de dados

Unitários = Não
Integração = Talvez
E2E = Sim (não só Banco de Dados, QUALQUER CONEXÃO EXTERNA INCLUSIVE APIS)

# E-commerce

- Realizar compra

1. Cadastra usuário no banco.
2. Cadastra endereço no banco.
3. Se comunica com **gateway de pagamento** para enviar a transação.
4. Cadastra a compra no banco.

Unitário: Não tem banco de dados e nem API do Gateway.
E2E: Não é aconselhavel ter mocks ou dados fakes.

Gateway de pagamento: Conta de teste (API key de Teste)

# Patterns #

Repository Pattern / Data Mapper Pattern
Inversão de dependências
Command/Query Segregation
In Memory Database
