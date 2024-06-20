import { SafeAreaView, ScrollView, View, Text, Pressable, ImageBackground, Alert } from "react-native";
import styles from "./style";
import { RouteProp } from '@react-navigation/native';
import { params } from "../navigation";
import { collection, deleteDoc, doc, getDoc, onSnapshot, query, updateDoc, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { firestore } from "@/src/config/firebase-config";
import { Icon } from "@rneui/themed";
import { HeaderEvids } from "../header";
import Toast from 'react-native-root-toast';
import AwesomeAlert from 'react-native-awesome-alerts';


export interface ItensProps {
    navigation: any;
    route: RouteProp<params, "Itens">;
}

export default function Itens(props: ItensProps){
    const [projects, setProjects] = useState([]);
    const [ project, setProject ] = useState<any>(null);
    const [ showAlert, setShowAlert ] = useState(false)

    //@ts-ignore
    const {id} = props.route.params

    const exclusao = async (projeto: any) => {
        Alert.alert('Excluir', `Deseja realmente excluir a evidência ${projeto.nome}?`, [
            {text: 'Cancelar'},
            {text: 'Confirmar', onPress: async () => {
                await deleteDoc(doc(firestore, "forms", projeto.id));
                //buscarEvidencias(projeto.projetoID);
        
                //setShowAlert(false)
                Toast.show('Evidência excluída com sucesso!', {duration: Toast.durations.SHORT, position: Toast.positions.CENTER, animation: true, hideOnPress: true})

            }}
        ])

    }
    
    const makeid = () => {
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

    const buscarProjeto = async (projectID: any) => {
        //Busca o projeto
        const snapshot = await getDoc(doc(firestore, 'projetos', projectID));

        setProject(snapshot.data())
    }

    const buscarEvidencias = async (projetoID: any) => {
        //Busca as evidencias
        const q = query(collection(firestore, 'forms'), where('projetoID', '==', projetoID));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const newProjects : any = [];

            querySnapshot.forEach((doc) => {
                newProjects.push(doc.data());
            });
            setProjects(newProjects)
    
        });
    }

    
    useEffect(() => {
        if (id) {
            buscarProjeto(id);
            buscarEvidencias(id);
        }
    }, [id]);

    const handleExcluir = async (nome: string, id: any) => {
        const text:string = 'Deseja realmente excluir a evidência ' + id + '?'
        if (id) {
            try {
                Alert.alert('Exclusão', text, [
                    { text: 'NÃO'},
                    { text: 'SIM', onPress: () => {exclusao(id)}}
                ]);
            } catch (error) {
                Alert.alert('Erro', 'Ocorreu um erro tentando excluir a evidência.');
            }
        }
    };

    
    return(
        <ImageBackground source={{uri: "https://i.postimg.cc/hPMS7gGQ/background.png"}}>
        <SafeAreaView style={styles.formPoint}>
            <View style={{backgroundColor: 'rgba(255,255,255,0.08)', marginTop: 5}}>
        <HeaderEvids/>
        {project && <Text style={{textAlign: 'center', fontSize: 20}}><Text style={{fontWeight: 'bold'}}>Projeto:</Text> {project.nome}</Text>}
        </View>
            <ScrollView style={{flex: 1, backgroundColor: 'rgba(255,255,255,0.08)'}}>
                

                    
                
                    {projects.map((projeto: any) =>
                        <View key={projeto.nome} style={{flexDirection: 'column'}}>
                            <Pressable>
                                <View style={styles.botao}>
                                    <Text style={styles.texto1} key={projeto.nome}>{projeto.nome}</Text>
                                </View>
                            </Pressable>
                            <View style={styles.bts}>
                                <Pressable onPress={() => exclusao(projeto)}>
                                    <View style={styles.excluir}>
                                        <Icon name="delete" type="material" color={'#fff'}/>
                                    </View>
                                </Pressable>
                                <Pressable onPress={() => props.navigation.navigate("Edit", {nome: projeto.nome, projectID: id})}>
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
                    <Pressable onPress={() => props.navigation.goBack()}>
                        <View style={styles.botao}>
                            <Text style={styles.textoB}>Voltar</Text>
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