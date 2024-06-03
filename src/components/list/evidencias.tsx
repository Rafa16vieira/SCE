import { RouteProp } from "@react-navigation/native";
import { View, Text, SafeAreaView, ScrollView } from "react-native";
import { params } from "../navigation";
import { HeaderEvid } from "../header";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/src/config/firebase-config";
import { useEffect } from "react";
import styles from "./style";


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


export default function Evidencias (props: evidProps){

    //@ts-ignore
const {id, nome} = props.route.params

const getData = async () => {
    evids = []
    const q = query(collection(db, 'forms'), where('nome', '==', nome));
    const querySnapShot = await getDocs(q);
    querySnapShot.forEach((doc) => {
        evids.push(doc.data())
        
    })
}

    

    useEffect(() => {
        getData();
        console.log(id)
        },[])

    
    

    return(
        <SafeAreaView style={styles.formPoint}>
            <HeaderEvid/>
            <ScrollView style={styles.formPoint}>
                {evids.map((projeto: any) =>
                            <View key={projeto.nome} style={{flexDirection: 'column', flex: 1}}>
                                <Text style={styles.texto}>Nome:</Text>
                                <View style={styles.smallField}>
                                    <Text style={styles.dados} key={projeto.nome}>{projeto.nome}</Text>
                                </View>
                                <Text style={styles.texto}>Palavras chave:</Text>
                                <View style={styles.smallField}>
                                    <Text style={styles.dados} key={projeto.palavras}>{projeto.palavras}</Text>
                                </View>
                                <Text style={styles.texto}>Descrição:</Text>
                                <View style={styles.bigField}>
                                    <Text style={styles.dados} key={projeto.descricao}>{projeto.descricao}</Text>
                                </View>
                                <Text style={styles.texto}>Propósito:</Text>
                                <View style={styles.bigField}>
                                    <Text style={styles.dados} key={projeto.proposito}>{projeto.proposito}</Text>
                                </View>
                                <Text style={styles.texto}>Fonte:</Text>
                                <View style={styles.smallField}>
                                    <Text style={styles.dados} key={projeto.fonte}>{projeto.fonte}</Text>
                                </View>
                                <Text style={styles.texto}>Autores:</Text>
                                <View style={styles.smallField}>
                                    <Text style={styles.dados} key={projeto.autores}>{projeto.autores}</Text>
                                </View>
                                <Text style={styles.texto}>Data:</Text>
                                <View style={styles.smallField}>
                                    <Text style={styles.dados} key={projeto.data}>{projeto.data}</Text>
                                </View>
                                <Text style={styles.texto}>Tipo:</Text>
                                <View style={styles.smallField}>
                                    <Text style={styles.dados} key={projeto.tipo}>{projeto.tipo}</Text>
                                </View>
                                <Text style={styles.texto}>Relações na literatura atual:</Text>
                                <View style={styles.smallField}>
                                    <Text style={styles.dados} key={projeto.relacoes}>{projeto.relacoes}</Text>
                                </View>
                                <Text style={styles.texto}>Revisão por pares:</Text>
                                <View style={styles.smallField}>
                                    <Text style={styles.dados} key={projeto}>{boolString(projeto.revisao)}</Text>
                                </View>
                                <Text style={styles.texto}>Consistência com a literatura anterior:</Text>
                                <View style={styles.smallField}>
                                    <Text style={styles.dados} key={projeto.consistencia}>{boolString(projeto.consistencia)}</Text>
                                </View>
                                <Text style={styles.texto}>Texto de amostra:</Text>
                                <View style={styles.bigField}>
                                    <Text style={styles.dados} key={projeto.amostra}>{projeto.amostra}</Text>
                                </View>
                                <Text style={styles.texto}>Aplicabilidade:</Text>
                                <View style={styles.bigField}>
                                    <Text style={styles.dados} key={projeto.aplicabilidade}>{projeto.aplicabilidade}</Text>
                                </View>
                                <Text style={styles.texto}>Implementação:</Text>
                                <View style={styles.bigField}>
                                    <Text style={styles.dados} key={projeto.implementacao}>{projeto.implementacao}</Text>
                                </View>
                                <Text style={styles.texto}>Usos conhecidos:</Text>
                                <View style={styles.bigField}>
                                    <Text style={styles.dados} key={projeto.usos}>{projeto.usos}</Text>
                                </View>
                                <Text style={styles.texto}>Possíveis viéses:</Text>
                                <View style={styles.bigField}>
                                    <Text style={styles.dados} key={projeto.vieses}>{projeto.vieses}</Text>
                                </View>
                                <Text style={styles.texto}>Inexistência de conflitos de interesse:</Text>
                                <View style={styles.smallField}>
                                    <Text style={styles.dados} key={id}>{boolString(projeto.conflitos)}</Text>
                                </View>
                                <Text style={styles.texto}>Síntese da análise:</Text>
                                <View style={styles.smallField}>
                                    <Text style={styles.dados} key={1}>{projeto.sintese}</Text>
                                </View>
                                <Text style={styles.texto}>Relevância:</Text>
                                <View style={styles.smallField}>
                                    <Text style={styles.dados} key={2}>{projeto.relevancia}</Text>
                                </View>
                                <Text style={styles.texto}>Cobertura:</Text>
                                <View style={styles.smallField}>
                                    <Text style={styles.dados} key={3}>{projeto.cobertura}</Text>
                                </View>
                                <Text style={styles.texto}>Força:</Text>
                                <View style={styles.smallField}>
                                    <Text style={styles.dados} key={4}>{projeto.forca}</Text>
                                </View>
                                <Text style={styles.texto}>Grau de importância:</Text>
                                <View style={styles.smallField}>
                                    <Text style={styles.dados} key={5}>{projeto.importancia}</Text>
                                </View>
                                <Text style={styles.texto}>Probabilidade de falha:</Text>
                                <View style={styles.smallField}>
                                    <Text style={styles.dados} key={6}>{projeto.falha}</Text>
                                </View>
                                <Text style={styles.texto}>Selo:</Text>
                                <View style={styles.smallField}>
                                    <Text style={styles.dados} key={projeto.selo}>{projeto.selo}</Text>
                                </View>
                                <Text style={styles.texto}>Evidencia:</Text>
                                <View style={styles.smallField}>
                                    <Text style={styles.dados} key={projeto.evidencia}>{projeto.evidencia}</Text>
                                </View>
                            </View>
                                
                            
                        )}
                    </ScrollView>
        </SafeAreaView>
    )
}