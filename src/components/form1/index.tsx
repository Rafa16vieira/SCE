import { Header1 } from "../header";
import styles from "./style";
import { View, Text, TextInput, Button, Pressable, SafeAreaView, ImageBackground } from "react-native";
import { useState } from "react";
import { firestore } from "../../config/firebase-config";
import { doc, setDoc } from "firebase/firestore"; 
import { RouteProp } from "@react-navigation/native";
import { params } from "../navigation";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';



export interface form1props {
    navigation: any;
    route: RouteProp<params, "Form1">;
}

export default function Form1(props: form1props){
    const [ nome, setNome ] = useState("");
    const [ key, setKey ] = useState([", "]);
    const [ descricao, setDescricao ] = useState("");
    const [ proposito, setProposito ] = useState("");

    //@ts-ignore
    const { id, projectID } = props.route.params
    //console.log({id})

    const criacao = async (nome: string, key: any, descricao: string, proposito: string, id: string, projetoID: string) => {
        const projectDoc = doc(firestore, "forms", id)
        await setDoc(projectDoc, {
            nome: nome,
            palavras: key,
            descricao: descricao,
            proposito: proposito,
            projetoID: projetoID
        });
    };

    return(
        <ImageBackground source={{uri: "https://i.postimg.cc/hPMS7gGQ/background.png"}} style={{flex: 1}}>
        <SafeAreaView style={styles.formPoint}>
            <View style={{backgroundColor:'rgba(255,255,255,0.08)', marginTop: 5}}>
            <Header1/>
            </View>
            <KeyboardAwareScrollView keyboardDismissMode="on-drag" style={{ backgroundColor: 'rgba(255,255,255,0.08)', padding: 20}} extraScrollHeight={100}>
            
                <Text style={styles.text}>Nome</Text>
                <TextInput style={styles.nome} onChangeText={nome => setNome(nome)} placeholder="Nomear evidência" placeholderTextColor={'#fff'}/>
                <Text style={styles.text}>Palavras chave</Text>
                {key.map((valor, index) => (<TextInput style={styles.keywords} key={index} placeholder="Palavras chave" placeholderTextColor={'#fff'} onChangeText={texto => {
                    let novoValor = [...key]
                    novoValor[index] = texto + ' '
                    setKey(novoValor)
                }} />)) }
                <Button title="+" color={"#1f3324"} onPress={() => {
                    const novoValor = [...key]
                    novoValor.push('')
                    setKey(novoValor)
                }} />
                <Text style={styles.text}>Contextualização</Text>
                <TextInput style={styles.description} onChangeText={(descricao) => setDescricao(descricao)} multiline={true} numberOfLines={5} placeholder="Contextualização breve" placeholderTextColor={'#fff'}/>
                <Text style={styles.text}>Propósito</Text>
                <TextInput style={styles.purpose} onChangeText={(proposito) => setProposito(proposito)} multiline={true} numberOfLines={3} placeholder="Para que o serve?" placeholderTextColor={'#fff'}/>
                <View style={styles.buttons}>
                    <Pressable style={styles.back} onPress={() => props.navigation.navigate("Itens", {id: projectID})}>
                        <Text style={styles.buttonTextBack}>Voltar</Text>
                    </Pressable>
                    <Pressable style={styles.next} onPressIn={() => criacao(nome, key, descricao, proposito, id, projectID)} onPress={() => props.navigation.navigate("Form2", {id: id, projectID: projectID})}>
                        <Text style={styles.buttonTextNext}>Avançar</Text>
                    </Pressable>
                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
        </ImageBackground>
    );
}