const express = require('express');
const bodyParser = require('body-parser');
const produtoRoutes = require('./routes/produtoRoutes');
const clienteRoutes = require('./routes/clienteRoutes');
const pedidoRoutes = require('./routes/pedidoRoutes');
const sequelize = require('./config/database');

const app = express();

// Middleware para interpretar o corpo da requisição como JSON
app.use(bodyParser.json());

// Configuração das rotas
app.use(produtoRoutes);
app.use(clienteRoutes);
app.use(pedidoRoutes);

// Sincronizar o banco de dados com o Sequelize
sequelize.sync({ force: false })  // force: false evita apagar os dados no banco
  .then(() => {
    console.log('Banco de dados sincronizado!');
  })
  .catch((error) => {
    console.error('Erro ao sincronizar o banco de dados:', error);
  });

// Configuração da porta do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
