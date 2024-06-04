import { RouteProp } from "@react-navigation/native";
import { View, Text, SafeAreaView, ScrollView, ImageBackground, Button, Pressable } from "react-native";
import { params } from "../navigation";
import { HeaderEvid } from "../header";
import { collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import { db } from "@/src/config/firebase-config";
import { useEffect } from "react";
import styles from "./style";
import bg from './../../../assets/images/background.png'
import { printToFile } from "@/src/getter";


export interface evidProps {
    navigation: any;
    route: RouteProp<params, "Evidencias">;
}

let evids: any = []
let key: any = []

export function boolString(bool: boolean){
    let stringer : string = String(bool)

    return stringer;
}

export async function exclusao(id: any){
    await deleteDoc(doc(db, "forms", id));
}


export default function Evidencias (props: evidProps){

    //@ts-ignore
const {id, nome} = props.route.params
let iddel:any

const getData = async () => {
    evids = []
    const q = query(collection(db, 'forms'), where('nome', '==', nome));
    const querySnapShot = await getDocs(q);
    querySnapShot.forEach((doc) => {
        evids.push(doc.data())
        iddel = doc.id
        
    })
}

    

    useEffect(() => {
        getData();
        console.log(id)
        },[])

    
    

    return(
        <ImageBackground source={{uri: "https://i.postimg.cc/hPMS7gGQ/background.png"}}>

        <SafeAreaView style={styles.formPoint}>
            <HeaderEvid/>
            <ScrollView style={styles.formPoint}>
                {evids.map((projeto: any) =>
                            <View key={projeto.nome} style={{flexDirection: 'column', flex: 1}}>
                                <Text style={styles.texto}>Nome:</Text>
                                <Pressable style={styles.smallField}>
                                    <Text style={styles.dados} key={projeto.nome}>{projeto.nome}</Text>
                                </Pressable>
                                <Text style={styles.texto}>Palavras chave:</Text>
                                <Pressable style={styles.smallField}>
                                    <Text style={styles.dados} key={projeto.palavras}>{projeto.palavras}</Text>
                                </Pressable>
                                <Text style={styles.texto}>Contextualização:</Text>
                                <Pressable style={styles.bigField}>
                                    <Text style={styles.dados} key={projeto.descricao}>{projeto.descricao}</Text>
                                </Pressable>
                                <Text style={styles.texto}>Propósito:</Text>
                                <Pressable style={styles.bigField}>
                                    <Text style={styles.dados} key={projeto.proposito}>{projeto.proposito}</Text>
                                </Pressable>
                                <Text style={styles.texto}>Fonte:</Text>
                                <Pressable style={styles.smallField}>
                                    <Text style={styles.dados} key={projeto.fonte}>{projeto.fonte}</Text>
                                </Pressable>
                                <Text style={styles.texto}>Contextualizar:</Text>
                                <Pressable style={styles.bigField}>
                                    <Text style={styles.dados} key={projeto.relacoes}>{projeto.relacoes}</Text>
                                </Pressable>
                                <Text style={styles.texto}>Autores:</Text>
                                <Pressable style={styles.smallField}>
                                    <Text style={styles.dados} key={projeto.autores}>{projeto.autores}</Text>
                                </Pressable>
                                <Text style={styles.texto}>Data:</Text>
                                <Pressable style={styles.smallField}>
                                    <Text style={styles.dados} key={projeto.data}>{projeto.data}</Text>
                                </Pressable>
                                <Text style={styles.texto}>Tipo:</Text>
                                <Pressable style={styles.smallField}>
                                    <Text style={styles.dados} key={projeto.tipo}>{projeto.tipo}</Text>
                                </Pressable>
                                <Text style={styles.texto}>Norma Regulatória:</Text>
                                <Pressable style={styles.bigField}>
                                    <Text style={styles.dados} key={projeto.norma}>{projeto.norma}</Text>
                                </Pressable>
                                <Text style={styles.texto}>Relações na literatura atual:</Text>
                                <Pressable style={styles.smallField}>
                                    <Text style={styles.dados} key={projeto.relacoes}>{projeto.relacoes}</Text>
                                </Pressable>
                                <Text style={styles.texto}>Revisão por pares:</Text>
                                <Pressable style={styles.smallField}>
                                    <Text style={styles.dados} key={projeto}>{boolString(projeto.revisao)}</Text>
                                </Pressable>
                                <Text style={styles.texto}>Consistência com a literatura anterior:</Text>
                                <Pressable style={styles.smallField}>
                                    <Text style={styles.dados} key={projeto.consistencia}>{boolString(projeto.consistencia)}</Text>
                                </Pressable>
                                <Text style={styles.texto}>Texto de amostra:</Text>
                                <Pressable style={styles.bigField}>
                                    <Text style={styles.dados} key={projeto.amostra}>{projeto.amostra}</Text>
                                </Pressable>
                                <Text style={styles.texto}>Implementação:</Text>
                                <Pressable style={styles.bigField}>
                                    <Text style={styles.dados} key={projeto.implementacao}>{projeto.implementacao}</Text>
                                </Pressable>
                                <Text style={styles.texto}>Usos conhecidos:</Text>
                                <Pressable style={styles.bigField}>
                                    <Text style={styles.dados} key={projeto.usos}>{projeto.usos}</Text>
                                </Pressable>
                                <Text style={styles.texto}>Possíveis viéses:</Text>
                                <Pressable style={styles.bigField}>
                                    <Text style={styles.dados} key={projeto.vieses}>{projeto.vieses}</Text>
                                </Pressable>
                                <Text style={styles.texto}>Inexistência de conflitos de interesse:</Text>
                                <Pressable style={styles.smallField}>
                                    <Text style={styles.dados} key={id}>{boolString(projeto.conflitos)}</Text>
                                </Pressable>
                                <Text style={styles.texto}>Síntese da análise:</Text>
                                <Pressable style={styles.smallField}>
                                    <Text style={styles.dados} key={1}>{projeto.sintese}</Text>
                                </Pressable>
                                <Text style={styles.texto}>Relevância:</Text>
                                <Pressable style={styles.smallField}>
                                    <Text style={styles.dados} key={2}>{projeto.relevancia}</Text>
                                </Pressable>
                                <Text style={styles.texto}>Cobertura:</Text>
                                <Pressable style={styles.smallField}>
                                    <Text style={styles.dados} key={3}>{projeto.cobertura}</Text>
                                </Pressable>
                                <Text style={styles.texto}>Força:</Text>
                                <Pressable style={styles.smallField}>
                                    <Text style={styles.dados} key={4}>{projeto.forca}</Text>
                                </Pressable>
                                <Text style={styles.texto}>Grau de importância:</Text>
                                <Pressable style={styles.smallField}>
                                    <Text style={styles.dados} key={5}>{projeto.importancia}</Text>
                                </Pressable>
                                <Text style={styles.texto}>Probabilidade de falha:</Text>
                                <Pressable style={styles.smallField}>
                                    <Text style={styles.dados} key={6}>{projeto.falha}</Text>
                                </Pressable>
                                <Text style={styles.texto}>Selo:</Text>
                                <Pressable style={styles.smallField}>
                                    <Text style={styles.dados} key={projeto.selo}>{projeto.selo}</Text>
                                </Pressable>
                                <Text style={styles.texto}>Evidencia:</Text>
                                <Pressable style={styles.smallField}>
                                    <Text style={styles.dados} key={projeto.evidencia}>{projeto.evidencia}</Text>
                                </Pressable>
                                <View style={{marginBottom:100}}>
                                    <Button title="Excluir" color={'rgb(255,0,0)'} onPress={() => exclusao(iddel)}/>
                                <Button title="Exportar para PDF" color={'#1f3324'} onPress={() => printToFile(projeto.nome, projeto.palavras, projeto.descricao, projeto.proposito, projeto.identificacao, projeto.autores, projeto.data, projeto.tipo, projeto.norma, projeto.fonte, projeto.relacoes, projeto.revisao, projeto.consistencia, projeto.amostra, projeto.usos, projeto.implementacao, projeto.vieses, projeto.conflitos, projeto.sintese, projeto.fortalece, projeto.naoAltera, projeto.enfraquece, projeto.relevancia, projeto.cobertura, projeto.forca, projeto.importancia, projeto.falha, projeto.selo, projeto.evidencia)}/>
                                </View>
                            </View>


                        
                                
                            
                        )}
                    </ScrollView>
        </SafeAreaView>
        </ImageBackground>

    )
}