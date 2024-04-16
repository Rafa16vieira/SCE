import react from "react";
import { View, Text, Image, Pressable, SafeAreaView, ScrollView, TextInput } from "react-native";
import styles from "./style";
import { Icon } from '@rneui/themed';
import { Header1 } from "../header";

export default function Form3({navigation}: any){
    return(
        <SafeAreaView style={styles.scroll}>
            <Header1/>
            <ScrollView keyboardDismissMode="on-drag">
                <Text style={styles.text}>Texto de amostra</Text>
                <TextInput style={styles.sample} multiline={true} numberOfLines={3} placeholder="Digite um breve texto de amostra" placeholderTextColor={'#484848'}/>
                <Text style={styles.text}>Aplicabilidade</Text>
                <TextInput style={styles.aplicability} multiline={true} numberOfLines={3} placeholder="Como essa evidência pode ser usada" placeholderTextColor={'#484848'}/>
                <Text style={styles.text}>Implementação</Text>
                <TextInput style={styles.implementation} multiline={true} numberOfLines={3} placeholder="O que deve ser notado ao usar essa evidência" placeholderTextColor={'#484848'}/>
                <Text style={styles.text}>Usos conhecidos</Text>
                <TextInput style={styles.uses} multiline={true} numberOfLines={3} placeholder="Cite exemplos de aplicação da evidência" placeholderTextColor={'#484848'}/>
                <Text style={styles.text}>Possíveis viéses</Text>
                <TextInput style={styles.bias} multiline={true} numberOfLines={3} placeholder="Cite possíveis viéses" placeholderTextColor={'#484848'}/>
                <View style={styles.checkBoxArea}>
                    <Text style={styles.text}>Inexistência de conflitos de interesse</Text>
                    <View style={styles.checkBox}/>
                </View>
                <View style={styles.buttons}>
                <Pressable style={styles.back} onPress={() => navigation.navigate("Form2")}>
                    <Text style={styles.buttonTextBack}>Voltar</Text>
                </Pressable>
                <Pressable style={styles.next} onPress={() => navigation.navigate("Form4")}>
                    <Text style={styles.buttonTextNext}>Avançar</Text>
                </Pressable>
            </View>
            </ScrollView>
        </SafeAreaView>
    );
}