// Funções simples para salvar/ler o carrinho em "disco" usando AsyncStorage.
// AsyncStorage guarda os dados como texto, então usamos JSON.stringify / JSON.parse.
import AsyncStorage from "@react-native-async-storage/async-storage";

// Nome da "chave" no armazenamento. É como se fosse o nome do arquivo.
const CHAVE = "carrinho";

export type Produto = {
    id: number;
    nome: string;
    preco: number;
};

// Lê a lista do carrinho que está salva no disco.
// Se nunca foi salvo nada, retorna uma lista vazia.
export async function carregarCarrinho(): Promise<Produto[]> {
    const texto = await AsyncStorage.getItem(CHAVE);
    if (!texto) return [];
    return JSON.parse(texto) as Produto[];
}

// Salva a lista inteira no disco (sobrescreve o que estava lá).
async function salvarCarrinho(itens: Produto[]) {
    await AsyncStorage.setItem(CHAVE, JSON.stringify(itens));
}

// Adiciona um produto: lê a lista, acrescenta no final e salva de volta.
export async function adicionarAoCarrinho(produto: Produto) {
    const itens = await carregarCarrinho();
    itens.push(produto);
    await salvarCarrinho(itens);
}

// Remove o produto que está na posição "index" da lista.
export async function removerDoCarrinho(index: number) {
    const itens = await carregarCarrinho();
    itens.splice(index, 1);
    await salvarCarrinho(itens);
}
