import styles from "./style";
import { View, Text, TextInput , TouchableOpacity, Pressable, ScrollView,  } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { Header1 } from "../header";



export default function Form2({ navigation }:any){
    return(
        <View style={styles.formPoint}>
            <Header1/>
            <Text style={styles.text}>Fonte</Text>
            <TextInput style={styles.font} placeholder="Link da fonte" placeholderTextColor={'#484848'}/>
            <Text style={styles.text}>Autores</Text>
            <TextInput style={styles.author} placeholder="Insira o nome do autor" placeholderTextColor={'#484848'}/>
            <View style={styles.pressArea}>
                <Pressable>
                    <View style={styles.buttonRemove}>
                        <Text style={styles.textRemove}>-</Text>
                    </View>
                </Pressable>
                <Pressable>
                    <View style={styles.buttonAdd}>
                        <Text style={styles.textAdd}>+</Text>
                    </View>
                </Pressable>
            </View>
            <Text style={styles.text}>Data</Text>
            <TextInput style={styles.date} placeholder="   /   /      " placeholderTextColor={'#484848'}/>
            <Text style={styles.text}>Tipo</Text>
            <TextInput style={styles.type} multiline={true} placeholder="Para que serve a evidência?" placeholderTextColor={'#484848'}/>
            
            <Text style={styles.text}>Relações na literatura atual</Text>
            <TextInput style={styles.relations} multiline={true} placeholder="Insira as relações" placeholderTextColor={'#484848'}/>
            <View>
                <View style={styles.checkBoxArea}>
                    <Text style={styles.text}>Revisão por pares</Text>
                    <View style={styles.checkBox}/>
                </View>
                <View style={styles.checkBoxArea}>
                    <Text style={styles.text}>Consistente a literatura anterior</Text>
                    <View style={styles.checkBox}/>
                </View>
            </View>
            <View style={styles.buttons}>
                <Pressable style={styles.back} onPress={() => navigation.navigate("Form1")}>
                    <Text style={styles.buttonTextBack}>Voltar</Text>
                </Pressable>
                <Pressable style={styles.next} onPress={() => navigation.navigate("Form3")}>
                    <Text style={styles.buttonTextNext}>Avançar</Text>
                </Pressable>
            </View>
        </View>
    );
}