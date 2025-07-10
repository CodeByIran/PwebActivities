import { expect } from 'chai';
import { sequelize, db } from './setup.js';

describe('Comentario Model - Testes personalizados', () => {
  let usuario, filme;

  beforeEach(async () => {
    // Limpa as tabelas na ordem certa para não causar erros de FK
    await db.Comentario.destroy({ where: {}, truncate: true, cascade: true, restartIdentity: true });
    await db.Filme.destroy({ where: {}, truncate: true, cascade: true, restartIdentity: true });
    await db.Usuario.destroy({ where: {}, truncate: true, cascade: true, restartIdentity: true });

    // Cria um usuário e um filme antes de cada teste
    usuario = await db.Usuario.create({
      login: 'teste123',
      nome: 'Usuário Teste',
      email: 'teste123@ifal.edu.br',
    });

    filme = await db.Filme.create({
      titulo: 'Filme Teste',
      genero: 'Ação',
      duracao: 120,
      ano_lancamento: 2023,
      nota_avaliacao: 8.5,
    });
  });

  it('Cria comentário válido e verifica associações', async () => {
    const comentario = await db.Comentario.create({
      id_usuario: usuario.id,
      id_filme: filme.id,
      texto: 'Ótimo filme!',
      avaliacao: 9.0,
    });

    expect(comentario).to.have.property('id');
    expect(comentario.id_usuario).to.equal(usuario.id);
    expect(comentario.id_filme).to.equal(filme.id);
    expect(comentario.texto).to.equal('Ótimo filme!');
    expect(parseFloat(comentario.avaliacao)).to.equal(9);
  });

  it('Não cria comentário sem texto', async () => {
    try {
      await db.Comentario.create({
        id_usuario: usuario.id,
        id_filme: filme.id,
        avaliacao: 7.5,
      });
      expect.fail('Erro esperado de validação por falta de texto');
    } catch (error) {
      expect(error.name).to.equal('SequelizeValidationError');
      const mensagens = error.errors.map(err => err.message);
      expect(
        mensagens.some(
          msg =>
            msg.includes('cannot be null') ||
            msg.includes('comentário') ||
            msg.includes('texto')
        )
      ).to.be.true;
    }
  });

  it('Não cria comentário com avaliação inválida (> 10)', async () => {
    try {
      await db.Comentario.create({
        id_usuario: usuario.id,
        id_filme: filme.id,
        texto: 'Comentário inválido',
        avaliacao: 11,
      });
      expect.fail('Erro esperado por nota acima de 10');
    } catch (error) {
      expect(error.name).to.equal('SequelizeValidationError');
    }
  });

  it('Atualiza comentário existente', async () => {
    const comentario = await db.Comentario.create({
      id_usuario: usuario.id,
      id_filme: filme.id,
      texto: 'Bom filme!',
      avaliacao: 7.0,
    });

    await comentario.update({ texto: 'Excelente filme!', avaliacao: 9.5 });

    expect(comentario.texto).to.equal('Excelente filme!');
    expect(parseFloat(comentario.avaliacao)).to.equal(9.5);
  });
});
