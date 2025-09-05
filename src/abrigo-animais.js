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
  }

  mostraBrinquedos(brinquedos, animal) {
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
