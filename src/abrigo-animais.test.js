import { AbrigoAnimais } from './abrigo-animais';

describe('Abrigo de Animais', () => {
  test('Deve rejeitar animal inválido', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'CAIXA,RATO',
      'RATO,BOLA',
      'Lulu'
    );
    expect(resultado.erro).toBe('Animal inválido');
    expect(resultado.lista).toBeFalsy();
  });

  test('Deve encontrar pessoa para um animal', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA',
      'RATO,NOVELO',
      'Rex,Fofo'
    );
    expect(resultado.lista[0]).toBe('Fofo - abrigo');
    expect(resultado.lista[1]).toBe('Rex - pessoa 1');
    expect(resultado.lista.length).toBe(2);
    expect(resultado.erro).toBeFalsy();
  });

  test('Deve encontrar pessoa para um animal intercalando brinquedos', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'BOLA,LASER',
      'BOLA,NOVELO,RATO,LASER',
      'Mimi,Fofo,Rex,Bola'
    );

    expect(resultado.lista[0]).toBe('Bola - abrigo');
    expect(resultado.lista[1]).toBe('Fofo - pessoa 2');
    expect(resultado.lista[2]).toBe('Mimi - abrigo');
    expect(resultado.lista[3]).toBe('Rex - abrigo');
    expect(resultado.lista.length).toBe(4);
    expect(resultado.erro).toBeFalsy();
  });

  test('Não deve encontrar pessoa se brinquedos certos são mostrados na ordem errada', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'BOLA,RATO',
      'RATO,NOVELO',
      'Rex,Fofo'
    );
    expect(resultado.lista[0]).toBe('Fofo - abrigo');
    expect(resultado.lista[1]).toBe('Rex - abrigo');
    expect(resultado.lista.length).toBe(2);
    expect(resultado.erro).toBeFalsy();
  });

  test('Deve manter animal no abrigo se ambas as pessoas podem adotar', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA',
      'RATO,BOLA',
      'Rex,Fofo'
    );
    expect(resultado.lista[0]).toBe('Fofo - abrigo');
    expect(resultado.lista[1]).toBe('Rex - abrigo');
    expect(resultado.lista.length).toBe(2);
    expect(resultado.erro).toBeFalsy();
  });

  test('Deve permitir apenas 3 adoções para uma pessoa mesmo se puder mais', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'BOLA,LASER',
      'SKATE,LASER,RATO,BOLA,CAIXA,NOVELO',
      'Loco,Bebe,Rex,Bola'
    );

    expect(resultado.lista[0]).toBe('Bebe - pessoa 2');
    expect(resultado.lista[1]).toBe('Bola - abrigo');
    expect(resultado.lista[2]).toBe('Loco - pessoa 2');
    expect(resultado.lista[3]).toBe('Rex - pessoa 2');
    expect(resultado.lista.length).toBe(4);
    expect(resultado.erro).toBeFalsy();
  });

  test('Deve rejeitar brinquedo inválido', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'CAIXA,CORDA',
      'RATO,BOLA',
      'Rex,Fofo'
    );

    expect(resultado.erro).toBe('Brinquedo inválido');
    expect(resultado.lista).toBeFalsy();
  });

  test('Deve rejeitar brinquedo duplicado', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'CAIXA,RATO',
      'BOLA,BOLA',
      'Rex,Fofo'
    );

    expect(resultado.erro).toBe('Brinquedo inválido');
    expect(resultado.lista).toBeFalsy();
  });

  test('Deve rejeitar animal duplicado', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'CAIXA,RATO',
      'RATO,BOLA',
      'Rex,Fofo,Rex'
    );

    expect(resultado.erro).toBe('Animal inválido');
    expect(resultado.lista).toBeFalsy();
  });
});
