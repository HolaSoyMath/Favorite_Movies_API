# Sistema de Gerenciamento de Filmes 🎥

Este é um projeto desenvolvido com o objetivo de aplicar e consolidar os conceitos de **Clean Architecture** e **Domain-Driven Design (DDD)**. A aplicação permite o gerenciamento de filmes, incluindo funcionalidades como **classificação**, **favoritos** e **autenticação de usuários**.

## Objetivo 📚

O projeto foi criado para fins de estudo, sendo uma oportunidade para explorar e aprender:

- Arquitetura bem definida e modular, com camadas separadas de domínio, casos de uso e infraestrutura.
- Uso de **Prisma ORM** para interação eficiente com o banco de dados PostgreSQL.
- Criação de **casos de uso isolados** para lógica de negócio.
- Aplicação de boas práticas no desenvolvimento backend, como:
  - DTOs (Data Transfer Objects) para organização e transferência de dados.
  - Tratamento de erros centralizado para respostas consistentes.
  - Separação de responsabilidades nas diferentes camadas.
- Compreensão do uso e funcionamento dos **Middlewares** no Express.js.

## Funcionalidades 🛠️

- **Gerenciamento de Filmes:** Cadastro, busca e listagem de filmes.
- **Sistema de Favoritos:** Possibilidade de marcar filmes como favoritos.
- **Classificação de Filmes:** Adição de avaliações para cada filme.
- **Autenticação de Usuários:** Registro e login com tokens JWT.
- **Validação e Sanitização:** Dados de entrada são validados e limpos para segurança.

## Tecnologias Utilizadas 🚀

- **Node.js** com Express para construção da API.
- **TypeScript** para tipagem estática e maior segurança no código.
- **Prisma ORM** para interação com o banco de dados PostgreSQL.
- **JWT** para autenticação de usuários com segurança.
- **Bcrypt** para hashing de senhas antes de serem armazenadas.
- **Helmet** para proteção contra vulnerabilidades comuns em APIs.
- **Clean Architecture** e **DDD** como base para a estrutura do projeto.

## Segurança 🔒

A segurança é um dos quesitos abordados, com isso, algumas das medidas adotadas incluem:

- **Autenticação com JWT (JSON Web Token)** para acesso protegido e renovável para autenticar usuários.
- **Hashing de Senhas com Bcrypt** antes de serem armazenadas no banco de dados.
- **Validação e Sanitização** dos dados de entrada que são validados e limpos usando **Prisma** e **Express-validator** para evitar injeção de SQL e scripts maliciosos.
- **Helmet** Proteção contra vulnerabilidades mais comuns em cabeçalhos HTTP, como clickjacking e XSS.
- **Tratamento de Erros Centralizado** deixando todas as exceções serem gerenciadas em um middleware para respostas consistentes e seguras.

Essas práticas foram implementadas para criar um sistema seguro e proteger os dados dos usuários contra ataques maliciosos.

## Status do Projeto 🚧

O projeto está em andamento e tem como principal finalidade o **aprendizado** e a **experimentação de conceitos**. Feedbacks e sugestões são muito bem-vindos! 😊
