import react, { useState } from "react";
import { View, Text, Image, Pressable, SafeAreaView, ScrollView, TextInput } from "react-native";
import styles from "./style";
import { Icon } from '@rneui/themed';
import { Header1 } from "../header";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase-config";
import { RouteProp } from "@react-navigation/native";
import { mainParams } from "../navigation";

export function criacao(amostra: string, aplicabilidade: string, implementacao: string, usos: string, vieses: string, conflitos: boolean, id: any) {
    updateDoc(doc(db, "forms", id), {
        amostra: amostra,
        aplicabilidade: aplicabilidade,
        implementacao: implementacao,
        usos: usos,
        vieses: vieses,
        conflitos: conflitos
    })
}

export interface form3props {
    navigation: any;
    route: RouteProp<mainParams, "Form3">;
}

export default function Form3( props: form3props ){
    const [ amostra, setAmostra ] = useState("");
    const [ aplicabilidade, setAplicabilidade ] = useState("");
    const [ implementacao, setImplementacao ] = useState("");
    const [ usos, setUsos ] = useState("");
    const [ vieses, setVieses ] = useState("");
    const [ conflitos, setConflitos ] = useState(false);

    //@ts-ignore
    const { id } = props.route.params

    const newid = String(id)

    return(
        <SafeAreaView style={styles.formPoint}>
            <Header1/>
            <ScrollView keyboardDismissMode="on-drag">
                <Text style={styles.text}>Texto de amostra</Text>
                <TextInput style={styles.sample} onChangeText={(amostra) => setAmostra(amostra)} multiline={true} numberOfLines={3} placeholder="Digite um breve texto de amostra" placeholderTextColor={'#fff'}/>
                <Text style={styles.text}>Aplicabilidade</Text>
                <TextInput style={styles.aplicability} onChangeText={(aplicabilidade) => setAplicabilidade(aplicabilidade)} multiline={true} numberOfLines={3} placeholder="Como essa evidência pode ser usada" placeholderTextColor={'#fff'}/>
                <Text style={styles.text}>Implementação</Text>
                <TextInput style={styles.implementation} onChangeText={(implementacao) => setImplementacao(implementacao)} multiline={true} numberOfLines={3} placeholder="O que deve ser notado ao usar essa evidência" placeholderTextColor={'#fff'}/>
                <Text style={styles.text}>Usos conhecidos</Text>
                <TextInput style={styles.uses} onChangeText={(usos) => setUsos(usos)} multiline={true} numberOfLines={3} placeholder="Cite exemplos de aplicação da evidência" placeholderTextColor={'#fff'}/>
                <Text style={styles.text}>Possíveis viéses</Text>
                <TextInput style={styles.bias} onChangeText={(vieses) => setVieses(vieses)} multiline={true} numberOfLines={3} placeholder="Cite possíveis viéses" placeholderTextColor={'#fff'}/>
                <View style={styles.checkBoxArea}>
                    <Text style={styles.text}>Inexistência de conflitos de interesse</Text>
                    <BouncyCheckbox fillColor="#1f3324" iconStyle={{borderColor: "#1f3324"}} onPress={(isChecked: boolean) => {setConflitos(true)}} />
                </View>
                <View style={styles.buttons}>
                <Pressable style={styles.back} onPress={() => props.navigation.navigate("Form2")}>
                    <Text style={styles.buttonTextBack}>Voltar</Text>
                </Pressable>
                <Pressable style={styles.next} onPressIn={() => criacao(amostra, aplicabilidade, implementacao, usos, vieses, conflitos, newid)} onPress={() => props.navigation.navigate("Form4", {id: newid})}>
                    <Text style={styles.buttonTextNext}>Avançar</Text>
                </Pressable>
            </View>
            </ScrollView>
        </SafeAreaView>
    );
}