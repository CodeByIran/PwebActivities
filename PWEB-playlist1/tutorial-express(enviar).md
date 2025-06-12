# Atividade Realizada por: 
# Iran Santana, Miguel Andrade, Ana Luiza, Anne Caroline


# Tutorial Básico: Express.js

## 0. O que é o Express?

**Express.js** é um framework minimalista e flexível para aplicações Node.js. Ele facilita a criação de servidores HTTP, APIs REST e aplicações web.

### a. Métodos

Os principais métodos HTTP usados com Express são:

- `GET`: Busca informações.
- `POST`: Envia informações.
- `PUT`: Atualiza informações.
- `DELETE`: Remove informações.

### b. Rotas

Rotas definem como o servidor responde a uma requisição em um determinado caminho (endpoint). Exemplo:

```js
app.get('/rota', (req, res) => {
  res.send('Resposta da rota');
});
```

---

## 1. Instalar o Express

No terminal, digite:

```bash
npm init -y        # (caso ainda não tenha package.json)
npm install express
```

---

## 2. Configurar o servidor com Express

Crie um arquivo chamado `server.js` ou `index.js`. Exemplo de configuração básica:

```js
// Importações
import express from 'express';
import bodyParser from 'body-parser'; // opcional, para receber JSON

// Inicialização do app
const app = express();
const port = process.env.PORT || 3000;

// Middleware para interpretar JSON
app.use(bodyParser.json());

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
```

---

## 3. Criar rota de teste

Adicione ao final do seu arquivo `server.js`:

```js
app.get('/version', (req, res) => {
  res.json({ status: 'ok', version: '1.0.1' });
});
```

---

## 4. Testar o servidor

Execute o servidor com:

```bash
node server.js
```

Acesse no navegador ou via Postman:

```
http://localhost:3000/version
```

Você verá:

```json
{
  "status": "ok",
  "version": "1.0.1"
}
```

---

## 5. Próximos passos

- Criar outras rotas (`POST`, `PUT`, `DELETE`)
- Usar o `express.Router()`
- Integrar com um banco de dados (como MongoDB ou Sequelize)
- Criar middleware personalizado


## 5. Próximos passos (detalhado)

### a. Criar outras rotas com diferentes métodos HTTP

Adicione suporte para `POST`, `PUT` e `DELETE`. Exemplo:

```js
app.post('/mensagem', (req, res) => {
  const { texto } = req.body;
  res.json({ recebido: texto });
});

app.put('/mensagem/:id', (req, res) => {
  res.send(`Atualizando mensagem com ID ${req.params.id}`);
});

app.delete('/mensagem/:id', (req, res) => {
  res.send(`Deletando mensagem com ID ${req.params.id}`);
});
```

### b. Usar o `express.Router()` para organizar rotas

Crie um arquivo `routes.js`:

```js
import { Router } from 'express';

const router = Router();

router.get('/ping', (req, res) => {
  res.send('pong');
});

export default router;
```

No `server.js`:

```js
import router from './routes.js';
app.use('/api', router);
```

### c. Integrar com banco de dados

Use um ORM como o **Sequelize** (SQL) ou **Mongoose** (MongoDB):

```bash
npm install mongoose
```

E conecte-se ao banco:

```js
import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/nomeDoBanco')
  .then(() => console.log('Conectado ao MongoDB'))
  .catch(err => console.error(err));
```

### d. Criar middleware personalizado

Middlewares são funções executadas entre a requisição e a resposta. Exemplo:

```js
app.use((req, res, next) => {
  console.log(`Requisição recebida: ${req.method} ${req.url}`);
  next();
});
```

### e. Tratar erros

Crie middleware para capturar erros:

```js
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo deu errado!');
});
```
