import { expect } from 'chai';
import { sequelize, db } from './setup.js';

describe('Filme Model - Testes personalizados', () => {
  it('Cria um filme válido com nota decimal', async () => {
    const filme = await db.Filme.create({
      titulo: 'A Origem dos Testes',
      genero: 'Ficção Científica',
      duracao: 148,
      ano_lancamento: 2010,
      nota_avaliacao: 9.3,
    });

    expect(filme).to.have.property('id');
    expect(filme.titulo).to.equal('A Origem dos Testes');
    expect(parseFloat(filme.nota_avaliacao)).to.equal(9.3);
  });

  it('Não permite filme sem título (campo obrigatório)', async () => {
    try {
      await db.Filme.create({
        genero: 'Drama',
        duracao: 100,
        ano_lancamento: 2022,
        nota_avaliacao: 7.8,
      });
      expect.fail('Esperava erro por título ausente');
    } catch (error) {
      expect(error.name).to.equal('SequelizeValidationError');
      const mensagens = error.errors.map(e => e.message);
      expect(mensagens.some(msg => msg.includes('titulo'))).to.be.true;
    }
  });

  it('Recusa nota de avaliação acima de 10', async () => {
    try {
      await db.Filme.create({
        titulo: 'Nota Inválida',
        genero: 'Ação',
        duracao: 95,
        ano_lancamento: 2023,
        nota_avaliacao: 12,
      });
      expect.fail('Erro esperado: nota fora do intervalo');
    } catch (error) {
      expect(error.name).to.equal('SequelizeValidationError');
    }
  });

  it('Falha ao criar filme sem gênero (campo obrigatório)', async () => {
    try {
      await db.Filme.create({
        titulo: 'Sem Gênero',
        duracao: 110,
        ano_lancamento: 2020,
        nota_avaliacao: 6.5,
      });
      expect.fail('Erro esperado por ausência de gênero');
    } catch (error) {
      expect(error.name).to.equal('SequelizeValidationError');
    }
  });

  it('Aceita filmes sem nota de avaliação (nota opcional)', async () => {
    const filme = await db.Filme.create({
      titulo: 'Filme Sem Nota',
      genero: 'Comédia',
      duracao: 90,
      ano_lancamento: 2024,
    });

    expect(filme).to.have.property('id');
    expect(filme.nota_avaliacao).to.be.null;
  });
});
