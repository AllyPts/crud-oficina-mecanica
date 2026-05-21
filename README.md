# Sistema de Oficina Mecânica

Projeto desenvolvido para a AV2 da disciplina de Backend.

O sistema consiste em uma aplicação CRUD para gerenciamento de oficina mecânica, permitindo o controle de clientes, veículos, funcionários, itens e ordens de serviço.

## Integrantes do projeto

- Allyson Allan Martins Pontes - 01854829;
- Emilaine Bernardo da Silva - 01763693;
- Marcelo Travassos Lima de Souza - 01818937;

## Tecnologias Utilizadas

- Node.js
- Express.js
- Sequelize
- PostgreSQL
- Insomnia

## Funcionalidades

- Cadastro de clientes
- Cadastro de veículos
- Controle de funcionários
- Gerenciamento de itens e serviços
- Controle de ordens de serviço
- Integração com banco de dados PostgreSQL
- API RESTful

## Estrutura do Projeto

```
src/
├── config/
│   └── database.js
├── controllers/
│   ├── ClienteController.js
│   ├── FuncionarioController.js
│   ├── ItemController.js
│   ├── OrdemServicoController.js
│   └── VeiculoController.js
├── database/
│   └── migrations/
├── models/
│   ├── cliente.js
│   ├── funcionario.js
│   ├── index.js
│   ├── item.js
│   ├── ordemservico.js
│   └── veiculo.js
├── seeders/
├── app.js
├── routes.js
└── server.js
```