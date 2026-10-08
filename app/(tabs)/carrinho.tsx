// Tela do carrinho: lê a lista do disco quando a tela ganha foco
// e tem botão para remover cada item (também atualiza o disco).
import { useState, useEffect } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Carrinho() {  
    
    const [itens, setItens] = useState([]);

    // Função que lê do disco e atualiza o estado.
    async function atualizar() {
        const lista = await AsyncStorage.getItem('@carrinho');
        setItens(lista ? JSON.parse(lista) : []);
    }
    //chama a função atualizar quando a página é exibida, para atualizar a lista do carrinho.   
    useEffect(() => {
        atualizar();
    }, []);


    async function removerDoCarrinho(index) {
        let list = await AsyncStorage.getItem('@carrinho');
        if (list) {
            const lista = JSON.parse(list);
            lista.splice(index, 1);
            await AsyncStorage.setItem('@carrinho', JSON.stringify(lista));
        }
    }

    // Remove um item: apaga do disco e recarrega a lista.
    async function remover(index: number) {
        await removerDoCarrinho(index);
        await atualizar();
    }

    // Calcula o total somando o preço de cada produto.
    const total = itens.reduce((soma, produto) => soma + produto.preco, 0);

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Meu Carrinho</Text>

            {itens.length === 0 ? (
                <Text style={styles.vazio}>O carrinho está vazio.</Text>
            ) : (
                <FlatList
                    data={itens}
                    keyExtractor={(_, index) => String(index)}
                    renderItem={({ item, index }) => (
                        <View style={styles.linha}>
                            <View style={styles.info}>
                                <Text style={styles.nome}>{item.nome}</Text>
                                <Text style={styles.preco}>
                                    R$ {item.preco.toFixed(2)}
                                </Text>
                            </View>

                            {/* Botão que remove o item do disco */}
                            <Pressable
                                style={styles.botaoRemover}
                                onPress={() => remover(index)}
                            >
                                <Text style={styles.botaoTexto}>Remover</Text>
                            </Pressable>
                        </View>
                    )}
                />
            )}

            <Text style={styles.total}>Total: R$ {total.toFixed(2)}</Text>
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
    vazio: {
        fontSize: 16,
        color: "#777",
        marginTop: 20,
    },
    linha: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    info: {
        flex: 1,
    },
    nome: {
        fontSize: 16,
    },
    preco: {
        fontSize: 14,
        color: "#555",
    },
    botaoRemover: {
        backgroundColor: "#dc2626",
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 6,
    },
    botaoTexto: {
        color: "#fff",
        fontWeight: "bold",
    },
    total: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 16,
        textAlign: "right",
    },
});
