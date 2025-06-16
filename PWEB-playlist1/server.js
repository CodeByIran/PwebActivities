// server.js
import express from 'express';
import bodyParser from 'body-parser';
import { sequelize } from './models/Index.js';
import router from './routes/routes.js'; // <- centralizador de rotas

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(bodyParser.json());
app.use('/api', router);

// Inicia o servidor
(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conectado ao banco de dados com sucesso.');

    await sequelize.sync({ alter: true });
    console.log('✅ Tabelas sincronizadas.');

    app.listen(port, () => {
      console.log(`🚀 Servidor rodando em http://localhost:${port}`);
    });
  } catch (error) {
    console.error('❌ Erro ao conectar ou iniciar o servidor:', error);
  }
})();
