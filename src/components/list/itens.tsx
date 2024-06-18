import { SafeAreaView, ScrollView, View, Text, Button, Pressable, ImageBackground } from "react-native";
import styles from "./style";
import { useRoute } from "@react-navigation/native";
import { RouteProp } from '@react-navigation/native';
import { params } from "../navigation";
import { collection, deleteDoc, doc, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { firestore } from "@/src/config/firebase-config";
import bg from './../../../assets/images/background.png'
import { Icon } from "@rneui/themed";
import { HeaderEvids } from "../header";


export interface ItensProps {
    navigation: any;
    route: RouteProp<params, "Itens">;
}

export async function exclusao(id: any){
    await deleteDoc(doc(firestore, "forms", id));
}

function makeid() {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < 200) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}


export default function Itens(props: ItensProps){
    const [projects, setProjects] = useState([]);
    //@ts-ignore
    const {id} = props.route.params
    console.log({id})


    
    useEffect(() => {
        if (id) {
        const q = query(collection(firestore, 'forms'), where('projetoID', '==', id));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const newProjects : any = [];
            querySnapshot.forEach((doc) => {
                newProjects.push(doc.data());
            });
            setProjects(newProjects)
    
            });
        }
    }, [id]);

    



    return(
        <ImageBackground source={{uri: "https://i.postimg.cc/hPMS7gGQ/background.png"}}>
        <SafeAreaView style={styles.formPoint}>
            <ScrollView style={styles.formPoint}>
                <HeaderEvids/>
                
                    {projects.map((projeto: any) =>
                        <View key={projeto.nome} style={{flexDirection: 'column'}}>
                            <Pressable>
                                <View style={styles.botao}>
                                    <Text style={styles.texto1} key={projeto.nome}>{projeto.nome}</Text>
                                </View>
                            </Pressable>
                            <View style={styles.bts}>
                                <Pressable onPress={() => exclusao(projeto.id)}>
                                    <View style={styles.excluir}>
                                        <Icon name="delete" type="material" color={'#fff'}/>
                                    </View>
                                </Pressable>
                                <Pressable onPress={() => props.navigation.navigate("Edit", {nome: projeto.nome})}>
                                    <View style={styles.editar}>
                                        <Icon name="edit" type="material" color={'#000'}/>
                                    </View>
                                </Pressable>
                                <Pressable onPress={() => props.navigation.navigate("Evidencias", {nome: projeto.nome})}>
                                    <View style={styles.printar}>
                                        <Icon name="print" type="material" color={'#fff'}/>
                                    </View>
                                </Pressable>
                            </View>
                            
                            <View style={styles.line}/>    
                            
                        </View>
                            
                        
                    )}
                
                <View style={{marginBottom:100, marginTop: 100}}>
                    <Pressable onPress={() => props.navigation.navigate("Form1", {id: makeid(), projectID: id})}>
                        <View style={styles.botao}>
                            <Text style={styles.textoB}>Cadastrar nova Evidência</Text>
                        </View>
                    </Pressable>
                    <Pressable onPress={() => props.navigation.navigate("Main")}>
                        <View style={styles.botao}>
                            <Text style={styles.textoB}>Menu</Text>
                        </View>
                    </Pressable>
                </View>
            </ScrollView>
        </SafeAreaView>
        </ImageBackground>
    );
};