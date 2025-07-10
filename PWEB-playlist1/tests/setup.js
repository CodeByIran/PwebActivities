import * as models from '../models/Index.js';
import sequelize from '../config/database.js';

const db = { ...models };

// Antes de tudo, sincroniza
before(async () => {
 await sequelize.authenticate();
});

export { sequelize, db };
