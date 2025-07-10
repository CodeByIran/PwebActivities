import { expect } from 'chai';
import { sequelize, db } from './setup.js';

describe('CanalFilme Model', () => {
  let canal, filme;

  beforeEach(async () => {
    // Limpa as tabelas antes de cada teste (caso use truncate)
    await db.CanalFilme.destroy({ where: {}, truncate: true, cascade: true, restartIdentity: true });
    await db.Canal.destroy({ where: {}, truncate: true, cascade: true, restartIdentity: true });
    await db.Filme.destroy({ where: {}, truncate: true, cascade: true, restartIdentity: true });

    // Cria um Canal com os campos obrigatórios
    canal = await db.Canal.create({
      nome: 'Canal Teste',
      url: 'https://canalteste.com',
      data_criacao: new Date(),        // Data atual
      genero_tema: 'Entretenimento',   // Valor válido para o campo
    });

    // Cria um Filme
    filme = await db.Filme.create({
      titulo: 'Filme Teste',
      genero: 'Ação',
      duracao: 120,
      ano_lancamento: 2023,
      nota_avaliacao: 8.5,
    });
  });

  it('Deve criar um canal válido', async () => {
    const canalFilme = await db.CanalFilme.create({
      id_canal: canal.id,
      id_filme: filme.id,
    });

    expect(canalFilme).to.have.property('id');
    expect(canalFilme.id_canal).to.equal(canal.id);
    expect(canalFilme.id_filme).to.equal(filme.id);
  });
});
