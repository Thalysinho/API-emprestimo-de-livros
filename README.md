📚 API de Empréstimo de Livros

API REST desenvolvida em **Node.js** com **Express** para gerenciamento de livros, usuários e empréstimos.

Este projeto foi criado com foco em estudo e prática de backend, abordando conceitos como autenticação, organização de código e regras de negócio.

---

🚀 Tecnologias utilizadas

- Node.js
- Express
- bcrypt
- dotenv
- jsonwebtoken (JWT)
- uuid

---

📌 Funcionalidades

- Cadastro de usuários
- Login com autenticação via JWT
- Criptografia de senhas com bcrypt
- Listagem de livros
- Busca de livro por ID
- Criação, atualização e remoção de livros
- Registro de empréstimos
- Devolução de livros
- Controle de disponibilidade de estoque
- Verificação de atraso na devolução
- Middleware de autenticação
- Middleware global de tratamento de erros

---

 📁 Estrutura do projeto

```bash
API-EMPRESTIMO-DE-LIVROS/
├── node_modules/
├── src/
│   ├── controllers/
│   │   ├── auth-controller.js
│   │   ├── books-controller.js
│   │   └── loans-controller.js
│   ├── errors/
│   │   └── HttpsError.js
│   ├── middleware/
│   │   ├── auth-middleware.js
│   │   └── error-middleware.js
│   ├── models/
│   │   ├── books-model.js
│   │   ├── loans-model.js
│   │   └── users-model.js
│   ├── routes/
│   │   ├── api-router.js
│   │   └── auth-router.js
│   └── server.js
├── .env
├── .env.example
├── .gitignore
├── package-lock.json
└── package.json

⚙️ Instalação

Clone o repositório:
git clone https://github.com/seu-usuario/seu-repo.git

Acesse a pasta:
cd nome-do-projeto

Instale as dependências:
npm install

---

🔐 Variáveis de ambiente

Crie um arquivo .env na raiz do projeto:
PORT=3009
NODE_ENV=development
JWT_SECRET=sua_chave_secreta

---

▶️ Como executar
node src/server.js

ou com nodemon:
npx nodemon src/server.js

Servidor rodando em:
http://localhost:3009

---

🔑 Autenticação

A API utiliza JWT (JSON Web Token).
Após o login, será retornado um token que deve ser enviado nas requisições protegidas:
Authorization: Bearer seu_token_aqui

---

📡 Rotas da API

🔐 Autenticação
Registrar usuário
POST /auth/register
{
  "name": "Thalys",
  "email": "email@email.com",
  "password": "123456"
}
Login
POST /auth/login
{
  "email": "email@email.com",
  "password": "123456"
}

📚 Livros
Listar livros
GET /api/books
Buscar livro por ID
GET /api/books/:id
Criar livro
POST /api/books
{
  "title": "One Piece",
  "author": "Eiichiro Oda",
  "quantityAvailable": 10
}
Atualizar livro
PUT /api/books/:id
Deletar livro
DELETE /api/books/:id

📖 Empréstimos
Listar empréstimos
GET /api/loans
Buscar empréstimo por ID
GET /api/loans/:id
Criar empréstimo 🔒
POST /api/loans
{
  "bookid": "1"
}

🔒 Requer autenticação (JWT)

Devolver livro
POST /api/loans/:id/return

---

📌 Regras de negócio

-O usuário precisa estar autenticado para realizar empréstimos
-Um livro só pode ser emprestado se houver quantidade disponível
-Ao emprestar:
-quantityAvailable é reduzido em 1
-Ao devolver:
-quantityAvailable é incrementado em 1
-O prazo de devolução é de 14 dias
-O sistema verifica automaticamente se houve atraso

---

⚠️ Tratamento de erros

A aplicação utiliza um middleware global para tratamento de erros.

Exemplo de resposta:
{
  "message": "Book not found"
}

---

📌 Observações importantes

❗ Este projeto não utiliza banco de dados
❗ Os dados são armazenados em memória (arrays)
❗ Ao reiniciar o servidor, os dados são resetados
✔️ Projeto desenvolvido com foco em aprendizad
