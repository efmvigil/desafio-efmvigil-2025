import { animaisDisponiveis } from './animais-disponiveis-adocao.js';

const BRINQUEDOS_VALIDOS = new Set(
  animaisDisponiveis.reduce(
    (acumulador, animal) => [...acumulador, ...animal.brinquedosFavoritos],
    []
  )
);

class AbrigoAnimais {
  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    const listaBrinquedosPessoa1 = brinquedosPessoa1.split(',');
    const listaBrinquedosPessoa2 = brinquedosPessoa2.split(',');
    if (
      listaBrinquedosPessoa1.length !== new Set(listaBrinquedosPessoa1).size ||
      listaBrinquedosPessoa2.length !== new Set(listaBrinquedosPessoa2).size ||
      this.verificaBrinquedoInvalido(
        listaBrinquedosPessoa1,
        listaBrinquedosPessoa2
      )
    ) {
      return { erro: 'Brinquedo inválido' };
    }

    const nomesAnimais = ordemAnimais.split(',');
    if (nomesAnimais.length != new Set(nomesAnimais).size) {
      return { erro: 'Animal inválido' };
    }

    const listaAnimais = nomesAnimais.map((nomeAnimal) =>
      animaisDisponiveis.find(
        (animalDisponivel) => nomeAnimal === animalDisponivel.nome
      )
    );
    if (listaAnimais.includes(undefined)) {
      return { erro: 'Animal inválido' };
    }

    const animaisAdotadosPessoa1 = [];
    const animaisAdotadosPessoa2 = [];

    listaAnimais.forEach((animal) => {
      const pessoa1BrinquedosCorretos = this.verificaBrinquedosCorretos(
        listaBrinquedosPessoa1,
        animal,
        animaisAdotadosPessoa1
      );
      const pessoa2BrinquedosCorretos = this.verificaBrinquedosCorretos(
        listaBrinquedosPessoa2,
        animal,
        animaisAdotadosPessoa2
      );

      const pessoa1PodeAdotar =
        pessoa1BrinquedosCorretos && animaisAdotadosPessoa1.length < 3;
      const pessoa2PodeAdotar =
        pessoa2BrinquedosCorretos && animaisAdotadosPessoa2.length < 3;

      if (pessoa1PodeAdotar && !pessoa2PodeAdotar)
        animaisAdotadosPessoa1.push(animal);
      if (!pessoa1PodeAdotar && pessoa2PodeAdotar)
        animaisAdotadosPessoa2.push(animal);
    });

    const listaResultado = [];

    nomesAnimais.toSorted().forEach((nome) => {
      let destino;
      if (
        animaisAdotadosPessoa1.some(
          (animalAdotado) => animalAdotado.nome === nome
        )
      )
        destino = 'pessoa 1';
      else if (
        animaisAdotadosPessoa2.some(
          (animalAdotado) => animalAdotado.nome === nome
        )
      )
        destino = 'pessoa 2';
      else destino = 'abrigo';

      listaResultado.push(nome + ' - ' + destino);
    });

    return { lista: listaResultado };
  }

  verificaBrinquedosCorretos(brinquedosMostrados, animal, animaisJaAdotados) {
    //Interpretei que a regra 3 significa que se um gato e outro animal desejam os mesmos brinquedos, apenas um pode ser adotado (o que vier primeiro na ordem de consideração)
    if (animal.especie === 'gato' && animaisJaAdotados.length > 0) {
      for (const animalAdotado of animaisJaAdotados) {
        if (
          animalAdotado.brinquedosFavoritos.some((brinquedo) =>
            animal.brinquedosFavoritos.includes(brinquedo)
          )
        ) {
          return false;
        }
      }
    }
    const brinquedosJaComGato = [];
    animaisJaAdotados.forEach((animalAdotado) => {
      if (animalAdotado.especie === 'gato') {
        animalAdotado.brinquedosFavoritos.forEach((brinquedo) =>
          brinquedosJaComGato.push(brinquedo)
        );
      }
    });

    brinquedosMostrados = brinquedosMostrados.filter(
      (brinquedo) => !brinquedosJaComGato.includes(brinquedo)
    );

    /*Como os animais devem ser considerados na ordem especificada, interpretei que a regra 6 significa que Loco aceita os brinquedos fora de ordem
    apenas se outro animal já foi adotado pela mesma pessoa antes dele, pois se ele vier antes ainda não há a informação de que ele vai ter companhia (ou não)*/
    if (animal.nome === 'Loco' && animaisJaAdotados.length > 0) {
      if (
        animal.brinquedosFavoritos.every((brinquedo) =>
          brinquedosMostrados.includes(brinquedo)
        )
      )
        return true;
      else return false;
    }

    const brinquedosCorretosParaEsseAnimal = [];

    brinquedosMostrados.forEach((brinquedo) => {
      if (animal.brinquedosFavoritos.includes(brinquedo)) {
        brinquedosCorretosParaEsseAnimal.push(brinquedo);
      }
    });

    if (
      brinquedosCorretosParaEsseAnimal.length ===
        animal.brinquedosFavoritos.length &&
      brinquedosCorretosParaEsseAnimal.every(
        (brinquedo, i) => brinquedo === animal.brinquedosFavoritos[i]
      )
    ) {
      return true;
    } else return false;
  }

  verificaBrinquedoInvalido(brinquedosPessoa1, brinquedosPessoa2) {
    for (const brinquedo of brinquedosPessoa1) {
      if (!BRINQUEDOS_VALIDOS.has(brinquedo)) return true;
    }

    for (const brinquedo of brinquedosPessoa2) {
      if (!BRINQUEDOS_VALIDOS.has(brinquedo)) return true;
    }

    return false;
  }
}

export { AbrigoAnimais as AbrigoAnimais };
