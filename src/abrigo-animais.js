import { animaisDisponiveis } from './animais-disponiveis-adocao';

class AbrigoAnimais {
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

  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    const listaBrinquedosPessoa1 = brinquedosPessoa1.split(',');
    const listaBrinquedosPessoa2 = brinquedosPessoa2.split(',');
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
}

export { AbrigoAnimais as AbrigoAnimais };
