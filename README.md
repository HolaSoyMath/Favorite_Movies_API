# Sistema de Gerenciamento de Filmes 🎥

Este projeto foi desenvolvido para explorar conceitos avançados de arquitetura de software, aplicados a um sistema de gerenciamento de filmes. A aplicação permite funcionalidades como cadastro, busca e listagem de filmes, favoritos, avaliações e autenticação de usuários.

## ✨ Objetivo

- Este projeto foi criado para fins de estudo e aprendizado, abordando as seguintes práticas e conceitos:
- Organização modular, separando funcionalidades por módulos específicos.
- Uso do Prisma ORM para interação eficiente com o banco de dados PostgreSQL.
- Implementação de casos de uso isolados, organizados em módulos bem definidos.
- Aplicação de boas práticas no desenvolvimento backend, como:
  - DTOs (Data Transfer Objects) para organização e transferência de dados.
  - Tratamento de erros centralizado para respostas consistentes.
  - Separação de responsabilidades em módulos distintos.
  - Utilização de repositórios para abstração da camada de persistência.
  - Controllers e Services para intermediação entre infraestrutura e lógica de negócio.
- Compreensão do uso de Middlewares no Express.js para segurança e validação.

## ⚙️ Funcionalidades

- Gerenciamento de Filmes: Cadastro, busca e listagem de filmes.
- Sistema de Favoritos: Marcação de filmes favoritos por usuário.
- Classificação de Filmes: Adição, atualização e remoção de avaliações.
- Autenticação de Usuários: Registro e login utilizando JWT.
- Validação e Sanitização: Validação e limpeza de dados de entrada para segurança.

## ⚛️ Tecnologias Utilizadas

- Node.js com Express para construção da API.
- TypeScript para tipagem estática e maior segurança no código.
- Prisma ORM para manipulação eficiente do banco de dados PostgreSQL, garantindo segurança e integridade dos dados.
- JWT para autenticação de usuários com segurança.
- Bcrypt para hashing de senhas antes de serem armazenadas.
- Helmet para proteção contra vulnerabilidades comuns em APIs.
- DDD como base estrutural do projeto.

## 🔒 Segurança

A aplicação implementa diversas medidas para garantir a segurança dos usuários:
- Autenticação JWT (JSON Web Token): Tokens protegidos e renováveis para autenticação.
- Hashing de Senhas com Bcrypt: Proteção contra ataques de força bruta.
- Validação e Sanitização de Dados: Express-validator e Prisma para evitar SQL Injection e XSS.
- Helmet: Proteção contra vulnerabilidades de cabeçalhos HTTP.
- Tratamento de Erros Centralizado: Middleware que captura erros, padroniza respostas e melhora a depuração da API.

## ✨ Status do Projeto

O projeto está em desenvolvimento e pode sofrer alterações conforme novas melhorias são implementadas. Seu principal objetivo é servir como um ambiente de aprendizado e experimentação de boas práticas. Feedbacks e sugestões são sempre bem-vindos! 😊
