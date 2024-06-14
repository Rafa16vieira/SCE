import { RouteProp } from "@react-navigation/native";
import { View, Text, SafeAreaView, ScrollView, ImageBackground, Button, Pressable, ActivityIndicator } from "react-native";
import { params } from "../navigation";
import { HeaderData } from "../header";
import { collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { auth, firestore } from "@/src/config/firebase-config";
import { useEffect, useState } from "react";
import styles from "./style";
import bg from './../../../assets/images/background.png'
import { printToFile } from "@/src/getter";





export interface evidProps {
    navigation: any;
    route: RouteProp<params, "Evidencias">;
}


export function boolString(bool: boolean){
    let stringer : string = String(bool)

    return stringer;
}




export default function Evidencias (props: evidProps){
    const [evids, setEvids] = useState([]);
    const [id, setId] = useState(null)
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);

    //@ts-ignore
const { nome } = props.route.params
let iddel:any

    if (loading) {
        return <ActivityIndicator size="large" color="#1f3324" />;
    }

    

    useEffect(() => {
        const fetchUserName = async () => {
            const user = auth.currentUser;
            if (user) {
                try {
                const userDoc = await getDoc(doc(firestore, 'users', user.uid));
                if (userDoc.exists()) {
                    setName(userDoc.data()?.name || 'No Name Found');
                }
                } catch (error) {
                console.error("Error fetching user data: ", error);
                }
            }
            setLoading(false);
            };
    
            fetchUserName();
        if (nome) {
            const q = query(collection(firestore, 'forms'), where('nome', '==', nome));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const newEvid: any = [];
                let newId = null
                querySnapshot.forEach((doc) => {
                    newEvid.push(doc.data());
                    newId = doc.id;
                });
                setEvids(newEvid);
                setId(newId)
                
            });
        }
        },[nome])

    
    

    return(
        <ImageBackground source={{uri: "https://i.postimg.cc/hPMS7gGQ/background.png"}}>

        <SafeAreaView style={styles.formPoint}>
            <HeaderData/>
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
                                <Pressable style={styles.biggestField}>
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
                                <Text style={styles.texto}>Avaliador</Text>
                                <Pressable style={styles.smallField}>
                                    <Text style={styles.dados} key={name}>{name}</Text>
                                </Pressable>
                                <View style={{marginBottom:100}}>
                                    <Button title="Exportar para PDF" color={'#1f3324'} onPress={() => printToFile(projeto.nome, projeto.palavras, projeto.descricao, projeto.proposito, projeto.identificacao, projeto.autores, projeto.data, projeto.tipo, projeto.norma, projeto.fonte, projeto.relacoes, projeto.revisao, projeto.consistencia, projeto.amostra, projeto.usos, projeto.implementacao, projeto.vieses, projeto.conflitos, projeto.sintese, projeto.fortalece, projeto.naoAltera, projeto.enfraquece, projeto.relevancia, projeto.cobertura, projeto.forca, projeto.importancia, projeto.falha, projeto.selo, projeto.evidencia, name)}/>
                                    <Button title="Menu" color={'#1f3324'} onPress={() => props.navigation.navigate("Main")}/>
                                </View>
                            </View>


                        
                                
                            
                        )}
                    </ScrollView>
        </SafeAreaView>
        </ImageBackground>

    )
}


