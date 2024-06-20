import React, { useEffect, useRef, useState } from 'react';
import { View, Button, Text, StyleSheet, ImageBackground, TouchableOpacity, SafeAreaView, FlatList, Image, ScrollView, Pressable, Modal, Alert, TextInput } from 'react-native';
import { FieldPath, QuerySnapshot, collection, doc, getDoc, getDocs, onSnapshot, setDoc } from 'firebase/firestore';
import { firestore } from '../../config/firebase-config';
import { HeaderList, HeaderProject } from '../header';


export interface listProps {
    navigation: any;
}

export default function Projetos(props: listProps ) {

    const [projects, setProjects] = useState([]);
    useEffect(() => {
        const unsubscribe = onSnapshot(collection(firestore, 'projetos'), (querySnapshot) => {
            const newProjects : any = []
            projects.length = 0;  // Limpar o array antes de adicionar novos dados
            querySnapshot.forEach((doc) => {
                newProjects.push(doc.data());
            });
            setProjects(newProjects);
        })
    })
    
    return(
        <ImageBackground source={{uri: "https://i.postimg.cc/hPMS7gGQ/background.png"}}>
            <SafeAreaView style={styles.formPoint}>
                <View style={{backgroundColor: 'rgba(255,255,255,0.08)', marginTop: 5}}>
                <HeaderList/>
                </View>
        <ScrollView style={{flex: 1,  backgroundColor: 'rgba(255,255,255,0.08)', padding: 20}}> 
            
            
                <View>
                    
                    {projects.map((projeto: any) =>
                        <View key={projeto.nome}>
                            <Pressable key={projeto.id} onPress={() => {props.navigation.navigate("Itens", {id: projeto.id})}}>
                                <View key={projeto.nome}>
                                    <Text style={{backgroundColor:'#1f3324', color: '#fff', padding: 10, borderRadius: 30}} key={projeto.nome}>{projeto.nome}</Text>
                                </View>
                            </Pressable>
                            <View style={styles.line}/>
                                
                        </View>
                            
                        
                    )}
                    
                    <View style={{marginTop: 100, width: '100%', alignSelf: 'baseline', marginBottom:50}}>
                        <Pressable onPress={() => props.navigation.navigate("Main")}>
                            <View style={styles.botao}>
                                <Text style={styles.textoB}>Menu</Text>
                            </View>
                        </Pressable>
                    </View>
                </View>
        </ScrollView>
        </SafeAreaView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    formPoint: {
        padding: 20, 
        height: '100%'
    },
    background: {
        flex: 1,
    },
    container: {
        flex: 1,
    },
    icon: {
        fontSize: 25,
        color: '#5F5F5F'
    },
    text: {
        alignSelf: 'flex-start',
        width: 320,
        marginTop: -5,
        marginVertical: 30,
        left: 34,
        fontSize: 20,
        textAlign: 'center',
        color: '#1f3324',
        fontWeight: 'bold',
    },
    containerIcon: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 40
    },
    textButton: {
        fontWeight: 'bold',
    },
    tagText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    tagButton: {
        borderRadius: 9,
        backgroundColor: 'rgba(247, 99, 110, 1)',
        marginHorizontal: 30,
        padding: 10,
        alignItems: 'center'
    },
    textInfo: {
        marginVertical: 30,
        width: 310,
        marginLeft: 'auto',
        marginRight: 'auto',
        fontSize: 18,
        textAlign: 'justify',
        color: '#5F5F5F'
    },
    img: {
        width: 300,
        height: 300,
        alignSelf: 'center',
        objectFit: 'contain'
    },
    autor: {
        fontSize: 12,
        alignSelf: 'center',
        marginTop: 10
    },
    posicaoVideo: {
        alignItems: 'center',
        marginVertical: 40
    },
    texto: {
        color: '#1f3324',
        fontSize: 20,
        marginBottom: 10,
        marginLeft: 2
    },
    nome: {
        borderColor: '#646464',
        borderWidth: 1,
        backgroundColor: '#1f3324',
        width: '60%',
        height: 30,
        alignSelf: 'center',
        borderRadius: 8,
        paddingLeft: 4,
        marginRight: 4,
        marginBottom: 10,
        color: '#c7ffd8',
        
    },
    line: {
        backgroundColor: "#152319",
        width: '50%',
        alignSelf: 'center',
        height: 2,
        margin: 5
    },
    botao: {
        borderRadius: 100,
        alignSelf: 'center',
        height: 30,
        width: '80%',
        backgroundColor: '#3d6647',
        justifyContent: 'center',
        marginTop: 20,
    },
    textoB: {
        color: '#fff',
        alignSelf: 'center',
        fontWeight: 'bold'
    },
});