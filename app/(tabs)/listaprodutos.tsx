// Tela que mostra a lista de produtos disponíveis para comprar.
// Cada produto tem um botão "Adicionar ao carrinho" que grava no disco.
import { Alert, FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { adicionarAoCarrinho } from "../storage/carrinhoStorage";
import { produtosMock } from "../rotaServidor/dadosMock";
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function ListaProdutos() {
    // Função chamada ao clicar no botão: salva o produto no "disco".
    async function adicionarCarrinho(produto) {
        let list = await AsyncStorage.getItem('@carrinho');
        if (!list) {
            list = [];
        } else {
            list = JSON.parse(list);
        }
        list.push(produto);
        await AsyncStorage.setItem('@carrinho', JSON.stringify(list));
        console.log('Produto adicionado ao carrinho:', produto);
        console.log('Lista atual do carrinho:', list);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Produtos</Text>

            {/* FlatList é a forma recomendada de exibir listas no React Native */}
            <FlatList
                data={produtosMock}
                keyExtractor={(produto) => String(produto.id)}
                renderItem={({ item }) => (
                    <View style={styles.linha}>
                        {/* Informações do produto */}
                        <View style={styles.info}>
                            <Text style={styles.nome}>{item.nome}</Text>
                            <Text style={styles.preco}>
                                R$ {item.preco.toFixed(2)}
                            </Text>
                        </View>

                        {/* Botão que grava o produto no disco */}
                        <Pressable
                            style={styles.botao}
                            onPress={() => adicionarCarrinho(item)}
                        >
                            <Text style={styles.botaoTexto}>Adicionar</Text>
                        </Pressable>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#fff",
    },
    titulo: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 12,
    },
    linha: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    info: {
        flex: 1,
    },
    nome: {
        fontSize: 16,
        fontWeight: "600",
    },
    preco: {
        fontSize: 14,
        color: "#555",
    },
    botao: {
        backgroundColor: "#2563eb",
        paddingVertical: 8,
        paddingHorizontal: 14,
        borderRadius: 6,
    },
    botaoTexto: {
        color: "#fff",
        fontWeight: "bold",
    },
});
