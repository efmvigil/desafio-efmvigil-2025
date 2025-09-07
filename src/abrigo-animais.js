import { animaisDisponiveis } from './animais-disponiveis-adocao';

class AbrigoAnimais {
  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    const listaBrinquedosPessoa1 = brinquedosPessoa1.split(',');
    const listaBrinquedosPessoa2 = brinquedosPessoa2.split(',');
    if (
      listaBrinquedosPessoa1.length != new Set(listaBrinquedosPessoa1).size ||
      listaBrinquedosPessoa2.length != new Set(listaBrinquedosPessoa2).size ||
      this.verificaBrinquedoInvalido(listaBrinquedosPessoa1) ||
      this.verificaBrinquedoInvalido(listaBrinquedosPessoa2)
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
      const pessoa1PodeAdotar = this.verificaBrinquedosCorretos(
        listaBrinquedosPessoa1,
        animal
      );
      const pessoa2PodeAdotar = this.verificaBrinquedosCorretos(
        listaBrinquedosPessoa2,
        animal
      );

      if (
        pessoa1PodeAdotar &&
        !pessoa2PodeAdotar &&
        animaisAdotadosPessoa1.length < 3
      )
        animaisAdotadosPessoa1.push(animal.nome);
      if (
        !pessoa1PodeAdotar &&
        pessoa2PodeAdotar &&
        animaisAdotadosPessoa2.length < 3
      )
        animaisAdotadosPessoa2.push(animal.nome);
    });

    const listaResultado = [];

    nomesAnimais.toSorted().forEach((nome) => {
      let destino;
      if (animaisAdotadosPessoa1.includes(nome)) destino = 'pessoa 1';
      else if (animaisAdotadosPessoa2.includes(nome)) destino = 'pessoa 2';
      else destino = 'abrigo';

      listaResultado.push(nome + ' - ' + destino);
    });

    return { lista: listaResultado };
  }

  verificaBrinquedosCorretos(brinquedos, animal) {
    const brinquedosCorretosParaEsseAnimal = [];

    brinquedos.forEach((brinquedo) => {
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

  verificaBrinquedoInvalido(brinquedos) {
    const brinquedosValidos = new Set(
      animaisDisponiveis.reduce(
        (acumulador, animal) => [...acumulador, ...animal.brinquedosFavoritos],
        []
      )
    );

    for (const brinquedo of brinquedos) {
      if (!brinquedosValidos.has(brinquedo)) return true;
    }

    return false;
  }
}

export { AbrigoAnimais as AbrigoAnimais };
