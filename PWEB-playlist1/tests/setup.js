import * as models from '../models/Index.js';
import sequelize from '../config/database.js';

const db = { ...models };

before(async () => {
  await sequelize.authenticate();
  await sequelize.sync({ force: true });
});

beforeEach(async () => {
  await sequelize.query('SET session_replication_role = replica;'); // Ignora FKs temporariamente

  const tableNames = [
    'playlist_filmes',
    'comentarios',
    'filmes',
    'canais',
    'mensalidades',
    'usuarios',
    'playlists',
  ];

  for (const table of tableNames) {
    await sequelize.query(`TRUNCATE TABLE ${table} RESTART IDENTITY CASCADE;`);
  }

  await sequelize.query('SET session_replication_role = DEFAULT;'); // Restaura regras normais
});

after(async () => {
  await sequelize.close();
});

export { sequelize, db };
