// PT-BR: Importa as bibliotecas necessárias [express, cookieParser, cors]
// EN: Import necessary libraries [express, cookieParser, cors]
const express = require("express");
const cookieParser = require('cookie-parser');
const cors = require("cors");


// PT-BR: Importa o objeto Router para roteamento [userRoutes = para rotas de usuário, projectRoutes = para rotas do projeto]
// EN: Import the Router object for routing [userRoutes = for user routes, projectRoutes = for project routes]
const userRoutes = require("./routes/User");
const projectRoutes = require("./routes/Project")

// PT-BR: Inicializa o express
// EN: Initialize express
const app = express();

// PT-BR: Cria o server usando a instância do Express para poder iniciar o socket.io
// EN: Create the server using the Express instance to start socket.io
const server = require("http").createServer(app)

// PT-BR: Importa e inicializa o socket.io, permitindo cors apenas para a página 'localhost:8081'
// EN: Import and initialize socket.io, allowing cors only for the 'http://localhost:8081' page
const socketIo = require("socket.io")(server, {
  cors: {
    origins: ['http://localhost:8081']
  }
});

module.exports = socketIo;
const chat = require("./controllers/Socket")

// PT-BR: Libera o cors da aplicação apenas
// EN: Enable cors for the application
app.use(cors());

// PT-BR: Configura o Express para lidar com requisições JSON
// EN: Configure Express to handle JSON requests
app.use(express.json({ limit: '10mb' }));

// PT-BR: Configura o Express para lidar com dados de formulário
// EN: Configure Express to handle form data
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// PT-BR: Middleware para usar o cookie-parser
// EN: Middleware to use cookie-parser
app.use(cookieParser());

// PT-BR: Usa o router dos usuários com o prefixo /users
// EN: Use the user router with the prefix '/users'
app.use("/users", userRoutes);

// PT-BR: Usa a rota dos projetos com o prefixo /projects 
// EN: Use the project router with the prefix '/projects'
app.use("/projects", projectRoutes)

// PT:BR- Inicializa o server na porta 8080
// EN: Start the server on port 8080
server.listen(8080,() => {
    // PT-BR: Envia para o console do servidor a mensagem "Servidor rodando" toda vez que o server é inicializado
    // EN: Print 'Server running' to the server console every time the server is initialized
    console.log("Servidor rodando")
});