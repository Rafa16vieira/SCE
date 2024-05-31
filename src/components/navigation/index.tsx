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


const Stack = createNativeStackNavigator();

const Stacks = createNativeStackNavigator<mainParams>();

const Stacker = createNativeStackNavigator<params>();

export type params = {
    Projetos: any,
    Itens: {id: any},
    Evidencias: {id: any, nome: string}
}
export type mainParams = {
    Selecao: any,
    Form1: {id: any},
    Form2: { id: any},
    Form3: { id: any},
    Form4: { id: any},
    Form5: { id: any, relevancia: number, cobertura: number, forca: number},
}

export function Lista( {route: {params}} : any ) {
    return(
        <Stacker.Navigator initialRouteName="Projetos" screenOptions={{headerStyle: {backgroundColor: '#c7ffd8'}}}>
                <Stacker.Screen name="Projetos" component={Projetos}/>
                <Stacker.Screen name="Itens" component={Itens}/>
                <Stacker.Screen name="Evidencias" component={Evidencias}/>
        </Stacker.Navigator>
    )
}

export function Setter( {route : {mainParams}} : any ) {
    return(
        <Stacks.Navigator initialRouteName="Selecao" screenOptions={{headerShown: false}}>
            <Stacks.Screen name="Selecao" component={Selecao}/>
            <Stacks.Screen name="Form1" component={Form1}/>
            <Stacks.Screen name="Form2" component={Form2}/>
            <Stacks.Screen name="Form3" component={Form3}/>
            <Stacks.Screen name="Form4" component={Form4}/>
            <Stacks.Screen name="Form5" component={Form5}/>
        </Stacks.Navigator>
    )
}


export function Navegacao() {
    return(                
                <Stack.Navigator initialRouteName="Main" screenOptions={{headerShown: false}}>
                        <Stack.Screen name="Main" component={Main}/>
                        <Stack.Screen name="Setter" component={Setter}/>
                        <Stack.Screen name="Listagem" component={Lista}/>
                </Stack.Navigator>
    );
};