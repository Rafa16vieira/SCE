import { SafeAreaView, ScrollView, View, Text, Button, Pressable } from "react-native";
import styles from "./style";
import { useRoute } from "@react-navigation/native";
import { RouteProp } from '@react-navigation/native';
import { params } from "../navigation";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect } from "react";
import { db } from "@/src/config/firebase-config";


export interface ItensProps {
    navigation: any;
    route: RouteProp<params, "Itens">;
}

let evid: any = []
let newid: string

export default function Itens(props: ItensProps){
    //@ts-ignore
    const {id} = props.route.params
    console.log({id})

    const getData = async () => {
        evid = []
        const q = query(collection(db, 'forms'), where('projetoID', '==', id));
        const querySnapShot = await getDocs(q);
        querySnapShot.forEach((doc) => {
            evid.push(doc.data())
            newid = doc.id
            
        })
    }

    useEffect(() => {
        getData();
        },[])


    return(
        <SafeAreaView style={styles.formPoint}>
            <ScrollView>
                    {evid.map((projeto: any) =>
                        <View key={projeto.nome}>
                        
                            <Text style={styles.texto} key={projeto.nome}>{projeto.nome}</Text>
                            <Button title={'Ver dados'} color={'#1f3324'} key={projeto.id} onPress={() => {props.navigation.navigate("Evidencias", {id: newid, nome: projeto.nome})}}/>
                            <View style={styles.line}/>    
                            
                        </View>
                            
                        
                    )}
            </ScrollView>
        </SafeAreaView>
        
    );
};