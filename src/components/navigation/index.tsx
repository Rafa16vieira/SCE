import React from "react";
import { View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Main from '../main'
import Form1 from '../form1';
import Form2 from '../form2'
import Form3 from '../form3';
import Form4 from '../form4';
import Form5 from '../form5';
import styles from "../main/style";
import Projetos from "../list/index";
import Itens from "../list/itens";
import Selecao from "@/src/selecao";
import Evidencias from "../list/evidencias";
import LoginScreen from "@/src/login/login";
import RegisterScreen from "@/src/login/registro";
import Edit from "../list/edit";

const Stack = createNativeStackNavigator<params>();

export type params = {
    Main: any,
    Projetos: any,
    Itens: {id: any},
    Evidencias: { nome: string},
    Criacao: any,
    Form1: {id: any, projectID: any},
    Form2: { id: any},
    Form3: { id: any},
    Form4: { id: any},
    Form5: { id: any, relevancia: number, cobertura: number, forca: number},
    Login: any,
    Registro: any,
    Edit: { nome: string }
}





export function Navegacao(  ) {
    return(                
                <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown: false}}>
                        <Stack.Screen name="Login" component={LoginScreen}/>
                        <Stack.Screen name="Registro" component={RegisterScreen}/>
                        <Stack.Screen name="Main" component={Main}/>
                        <Stack.Screen name="Projetos" component={Projetos}/>
                        <Stack.Screen name="Itens" component={Itens}/>
                        <Stack.Screen name="Edit" component={Edit}/>
                        <Stack.Screen name="Evidencias" component={Evidencias}/>
                        <Stack.Screen name="Criacao" component={Selecao}/>
                        <Stack.Screen name="Form1" component={Form1}/>
                        <Stack.Screen name="Form2" component={Form2}/>
                        <Stack.Screen name="Form3" component={Form3}/>
                        <Stack.Screen name="Form4" component={Form4}/>
                        <Stack.Screen name="Form5" component={Form5}/>
                </Stack.Navigator>
    );
};