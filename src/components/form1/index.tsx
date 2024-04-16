import { Header1 } from "../header";
import styles from "./style";
import { View, Text, TextInput, TouchableOpacity, Pressable } from "react-native";

export default function Form1({navigation}: any){
    return(
        <View style={styles.formPoint}>
            <Header1/>
            <Text style={styles.text}>Nome</Text>
            <TextInput style={styles.nome} placeholder="Nomear evidência" placeholderTextColor={'#484848'}/>
            <Text style={styles.text}>Palavras chave</Text>
            <TextInput style={styles.keywords} placeholder="Insira as palavras chave" placeholderTextColor={'#484848'}/>
            <TextInput style={styles.keywords} placeholder="Insira as palavras chave" placeholderTextColor={'#484848'}/>
            <View style={styles.pressArea}>
                <Pressable>
                    <View style={styles.buttonAdd}>
                        <Text style={styles.textAdd}>-</Text>
                    </View>
                </Pressable>
                <Pressable>
                    <View style={styles.buttonAdd}>
                        <Text style={styles.textAdd}>+</Text>
                    </View>
                </Pressable>
            </View>
            <Text style={styles.text}>Descrição</Text>
            <TextInput style={styles.description} multiline={true} numberOfLines={5} placeholder="Descrição breve" placeholderTextColor={'#484848'}/>
            <Text style={styles.text}>Propósito</Text>
            <TextInput style={styles.purpose} multiline={true} numberOfLines={3} placeholder="Para que o serve?" placeholderTextColor={'#484848'}/>
            <View style={styles.buttons}>
                <Pressable style={styles.back} onPress={() => navigation.navigate("Main")}>
                    <Text style={styles.buttonTextBack}>Voltar</Text>
                </Pressable>
                <Pressable style={styles.next} onPress={() => navigation.navigate("Form2")}>
                    <Text style={styles.buttonTextNext}>Avançar</Text>
                </Pressable>
            </View>
        </View>
    );
}