import { expect } from 'chai';
import { sequelize, db } from './setup.js';

describe('Configuração do Ambiente de Testes', () => {
  before(async () => {
    await sequelize.sync({ force: true }); 
  });

  after(async () => {
    await sequelize.close(); 
  });

  afterEach(async () => {
  
    await db.Usuario.destroy({ where: {}, truncate: true });
  });

  it('Deve conectar ao banco PostgreSQL', async () => {
    await sequelize.authenticate();
    expect(sequelize.config.database).to.equal('playlist_test');
  });

  it('Deve criar um usuário no banco PostgreSQL', async () => {
    const usuario = await db.Usuario.create({
      login: 'teste123',
      nome: 'Usuário Teste',
    });

    expect(usuario).to.have.property('id');
    expect(usuario.login).to.equal('teste123');
    expect(usuario.nome).to.equal('Usuário Teste');
  });
});
