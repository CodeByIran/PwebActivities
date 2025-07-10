import { expect } from 'chai';
import { sequelize, db } from './setup.js';

describe('Modelo Mensalidade - Validações e Relacionamentos', () => {
  let usuario;

  beforeEach(async () => {
    usuario = await db.Usuario.create({
      login: `user${Date.now()}`,
      nome: 'Usuário para Mensalidade',
    });
  });

  it('Cria mensalidade válida e associa ao usuário', async () => {
    const mensalidade = await db.Mensalidade.create({
      id_usuario: usuario.id,
      valor: 89.99,
      data_pagamento: new Date('2024-01-15'),
      ano_mes: '2024-01',
      status: 'pago',
    });

    expect(mensalidade).to.include({
      id_usuario: usuario.id,
      ano_mes: '2024-01',
      status: 'pago',
    });
    expect(parseFloat(mensalidade.valor)).to.equal(89.99);
  });

  it('Impede criação sem id_usuario', async () => {
    try {
      await db.Mensalidade.create({
        valor: 59.90,
        ano_mes: '2024-02',
        status: 'pendente',
      });
      expect.fail('Erro esperado de validação');
    } catch (error) {
      expect(error.name).to.equal('SequelizeValidationError');
      expect(error.message).to.include('id_usuario');
    }
  });

  it('Impede criação sem valor definido', async () => {
    try {
      await db.Mensalidade.create({
        id_usuario: usuario.id,
        ano_mes: '2024-02',
        status: 'pendente',
      });
      expect.fail('Erro esperado de validação');
    } catch (error) {
      expect(error.name).to.equal('SequelizeValidationError');
    }
  });

  it('Valida formato e intervalo de ano_mes corretamente', async () => {
    const tentativas = [
      { ano_mes: '2024-13', mensagem: 'Mês deve estar entre 01 e 12' },
      { ano_mes: '2024/01', mensagem: 'Formato de ano_mes deve ser YYYY-MM' },
      { ano_mes: '1999-12', mensagem: 'Ano deve estar entre 2000 e 9999' },
    ];

    for (const tentativa of tentativas) {
      try {
        await db.Mensalidade.create({
          id_usuario: usuario.id,
          valor: 80.0,
          data_pagamento: new Date(),
          ano_mes: tentativa.ano_mes,
          status: 'pendente',
        });
        expect.fail('Erro de validação esperado');
      } catch (error) {
        expect(error.name).to.equal('SequelizeValidationError');
        expect(error.message).to.include(tentativa.mensagem);
      }
    }
  });

  it('Rejeita status inválido fora do ENUM', async () => {
    try {
      await db.Mensalidade.create({
        id_usuario: usuario.id,
        valor: 79.90,
        ano_mes: '2024-03',
        status: 'cancelado', // inválido
      });
      expect.fail('Erro esperado: status inválido');
    } catch (error) {
      expect(error.name).to.match(/DatabaseError|SequelizeDatabaseError/);
      expect(error.message.toLowerCase()).to.include('enum');
    }
  });

  it('Permite múltiplas mensalidades associadas ao mesmo usuário', async () => {
    await db.Mensalidade.bulkCreate([
      {
        id_usuario: usuario.id,
        valor: 100,
        ano_mes: '2024-01',
        status: 'pago',
      },
      {
        id_usuario: usuario.id,
        valor: 100,
        ano_mes: '2024-02',
        status: 'pendente',
      },
    ]);

    const mensalidades = await usuario.getMensalidades();
    const meses = mensalidades.map(m => m.ano_mes);
    expect(mensalidades).to.have.lengthOf(2);
    expect(meses).to.include.members(['2024-01', '2024-02']);
  });
});
