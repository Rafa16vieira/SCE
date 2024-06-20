import react, { useState } from "react";
import { View, Text, Pressable, SafeAreaView, TextInput, ImageBackground } from "react-native";
import styles from "./style";
import { Header1 } from "../header";
import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "../../config/firebase-config";
import { RouteProp } from "@react-navigation/native";
import { params } from "../navigation";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export interface form3props {
    navigation: any;
    route: RouteProp<params, "Form3">;
}

export default function Form3( props: form3props ){
    const [ amostra, setAmostra ] = useState("");
    const [ implementacao, setImplementacao ] = useState("");
    const [ usos, setUsos ] = useState("");
    const [ vieses, setVieses ] = useState("");
    const [ conflitos, setConflitos ] = useState("");

    const criacao = (amostra: string, aplicabilidade: string, usos: string, vieses: string, conflitos: string, id: any) => {
        updateDoc(doc(firestore, "forms", id), {
            amostra: amostra,
            implementacao: aplicabilidade,
            usos: usos,
            vieses: vieses,
            conflitos: conflitos
        })
    }

    //@ts-ignore
    const { id, projectID } = props.route.params

    const newid = String(id)

    return(
        <ImageBackground source={{uri: "https://i.postimg.cc/hPMS7gGQ/background.png"}}>
        <SafeAreaView style={styles.formPoint}>
            <View style={{backgroundColor:'rgba(255,255,255,0.08)', marginTop: 5}}>
            <Header1/>
            </View>
            <KeyboardAwareScrollView keyboardDismissMode="on-drag" style={{flex: 1,  backgroundColor: 'rgba(255,255,255,0.08)', padding: 20}} extraScrollHeight={100}>
                <Text style={styles.text}>Texto de amostra</Text>
                <TextInput style={styles.sample} onChangeText={(amostra) => setAmostra(amostra)} multiline={true} numberOfLines={3} placeholder="Digite um breve texto de amostra" placeholderTextColor={'#fff'}/>
                <Text style={styles.text}>Usos conhecidos</Text>
                <TextInput style={styles.uses} onChangeText={(usos) => setUsos(usos)} multiline={true} numberOfLines={3} placeholder="Cite exemplos de aplicação da evidência" placeholderTextColor={'#fff'}/>
                <Text style={styles.text}>Implementação</Text>
                <TextInput style={styles.implementation} onChangeText={(implementacao) => setImplementacao(implementacao)} multiline={true} numberOfLines={3} placeholder="O que deve ser notado ao usar essa evidência" placeholderTextColor={'#fff'}/>
                <Text style={styles.text}>Possíveis viéses</Text>
                <TextInput style={styles.bias} onChangeText={(vieses) => setVieses(vieses)} multiline={true} numberOfLines={3} placeholder="Cite possíveis viéses" placeholderTextColor={'#fff'}/>
                <Text style={styles.text}>Conflitos de interesse</Text>
                <TextInput style={styles.conflitos} onChangeText={(conflitos) => setConflitos(conflitos)} placeholder="Existem conflitos de interesse?" placeholderTextColor={'#fff'}/>
                <View style={styles.buttons}>
                <Pressable style={styles.back} onPress={() => props.navigation.navigate("Form2", {id: newid, projectID: projectID})}>
                    <Text style={styles.buttonTextBack}>Voltar</Text>
                </Pressable>
                <Pressable style={styles.next} onPressIn={() => criacao(amostra, implementacao, usos, vieses, conflitos, newid)} onPress={() => props.navigation.navigate("Form4", {id: newid, projectID: projectID})}>
                    <Text style={styles.buttonTextNext}>Avançar</Text>
                </Pressable>
            </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
        </ImageBackground>
    );
}