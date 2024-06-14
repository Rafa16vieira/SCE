import react, { useState } from "react";
import { View, Text, Image, Pressable, SafeAreaView, ScrollView, TextInput, ImageBackground } from "react-native";
import styles from "./style";
import { Icon } from '@rneui/themed';
import { Header1 } from "../header";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { firestore } from "../../config/firebase-config";
import { RouteProp } from "@react-navigation/native";
import { params } from "../navigation";
import bg from './../../../assets/images/background.png'

export function criacao(amostra: string, aplicabilidade: string, usos: string, vieses: string, conflitos: string, id: any) {
    updateDoc(doc(firestore, "forms", id), {
        amostra: amostra,
        implementacao: aplicabilidade,
        usos: usos,
        vieses: vieses,
        conflitos: conflitos
    })
}

export interface form3props {
    navigation: any;
    route: RouteProp<params, "Form3">;
}

export default function Form3( props: form3props ){
    const [ amostra, setAmostra ] = useState("");
    const [ aplicabilidade, setAplicabilidade ] = useState("");
    const [ implementacao, setImplementacao ] = useState("");
    const [ usos, setUsos ] = useState("");
    const [ vieses, setVieses ] = useState("");
    const [ conflitos, setConflitos ] = useState("");

    //@ts-ignore
    const { id } = props.route.params

    const newid = String(id)

    return(
        <ImageBackground source={{uri: "https://i.postimg.cc/hPMS7gGQ/background.png"}}>
        <SafeAreaView style={styles.formPoint}>
            <Header1/>
            <ScrollView keyboardDismissMode="on-drag" style={styles.formPoint}>
                <Text style={styles.text}>Texto de amostra</Text>
                <TextInput style={styles.sample} onChangeText={(amostra) => setAmostra(amostra)} multiline={true} numberOfLines={3} placeholder="Digite um breve texto de amostra" placeholderTextColor={'#fff'}/>
                <Text style={styles.text}>Implementação</Text>
                <TextInput style={styles.implementation} onChangeText={(implementacao) => setImplementacao(implementacao)} multiline={true} numberOfLines={3} placeholder="O que deve ser notado ao usar essa evidência" placeholderTextColor={'#fff'}/>
                <Text style={styles.text}>Usos conhecidos</Text>
                <TextInput style={styles.uses} onChangeText={(usos) => setUsos(usos)} multiline={true} numberOfLines={3} placeholder="Cite exemplos de aplicação da evidência" placeholderTextColor={'#fff'}/>
                <Text style={styles.text}>Possíveis viéses</Text>
                <TextInput style={styles.bias} onChangeText={(vieses) => setVieses(vieses)} multiline={true} numberOfLines={3} placeholder="Cite possíveis viéses" placeholderTextColor={'#fff'}/>
                <Text style={styles.text}>Conflitos de interesse:</Text>
                <TextInput style={styles.conflitos} onChangeText={(conflitos) => setConflitos(conflitos)} placeholder="Existem conflitos de interesse?" placeholderTextColor={'#fff'}/>
                <View style={styles.buttons}>
                <Pressable style={styles.back} onPress={() => props.navigation.navigate("Form2", {id: newid})}>
                    <Text style={styles.buttonTextBack}>Voltar</Text>
                </Pressable>
                <Pressable style={styles.next} onPressIn={() => criacao(amostra, implementacao, usos, vieses, conflitos, newid)} onPress={() => props.navigation.navigate("Form4", {id: newid})}>
                    <Text style={styles.buttonTextNext}>Avançar</Text>
                </Pressable>
            </View>
            </ScrollView>
        </SafeAreaView>
        </ImageBackground>
    );
}