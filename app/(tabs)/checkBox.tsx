import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

// As tarefas exibidas inicialmente na lista de afazeres.
const itensIniciais = ['Estudar React Native', 'Fazer exercícios', 'Ler um livro'];

export default function CheckBox() {
	// Cada posição corresponde à tarefa na mesma posição de `itensIniciais`.
	const [itensMarcados, setItensMarcados] = useState<boolean[]>(
		itensIniciais.map(() => false),
	);

	function alternarItem(index: number) {
		// Cria um novo array e inverte somente o item que foi pressionado.
		setItensMarcados((marcados) =>
			marcados.map((marcado, itemIndex) =>
				itemIndex === index ? !marcado : marcado,
			),
		);
	}

	return (
		<View style={styles.container}>
			<Text style={styles.titulo}>Lista de tarefas</Text>

			{itensIniciais.map((item, index) => (
				<Pressable
					key={item}
					style={styles.linha}
					onPress={() => alternarItem(index)}
				>
					{/* A cor e o simbolo aparecem apenas quando a tarefa esta marcada. */}
					<View style={[styles.checkbox, itensMarcados[index] && styles.marcado]}>
						{itensMarcados[index] && <Text style={styles.check}>✓</Text>}
					</View>
					{/* Tarefas concluidas ficam visualmente riscadas e mais discretas. */}
					<Text style={[styles.item, itensMarcados[index] && styles.concluido]}>
						{item}
					</Text>
				</Pressable>
			))}
		</View>
	);
}

// Estilos separados deixam a estrutura do componente mais legivel e reutilizavel.
const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 24,
		backgroundColor: '#fff',
	},
	titulo: {
		marginBottom: 20,
		fontSize: 24,
		fontWeight: 'bold',
	},
	linha: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 16,
	},
	checkbox: {
		width: 24,
		height: 24,
		marginRight: 12,
		alignItems: 'center',
		justifyContent: 'center',
		borderWidth: 2,
		borderColor: '#555',
		borderRadius: 4,
	},
	marcado: {
		backgroundColor: '#2563eb',
		borderColor: '#2563eb',
	},
	check: {
		color: '#fff',
		fontWeight: 'bold',
	},
	item: {
		fontSize: 18,
	},
	concluido: {
		color: '#888',
		textDecorationLine: 'line-through',
	},
});
