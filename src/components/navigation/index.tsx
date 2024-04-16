import React from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Main from '../main'
import Form1 from '../form1';
import Form2 from '../form2'
import Form3 from '../form3';
import Form4 from '../form4';
import Form5 from '../form5';
import styles from "../main/style";

const Stack = createNativeStackNavigator();

export default function Navegacao() {
    return(
        
            <NavigationContainer>
                
                <Stack.Navigator initialRouteName="Main" screenOptions={{headerShown: false}}>
                        <Stack.Screen name="Main" component={Main}/>
                        <Stack.Screen name="Form1" component={Form1}/>
                        <Stack.Screen name="Form2" component={Form2}/>
                        <Stack.Screen name="Form3" component={Form3}/>
                        <Stack.Screen name="Form4" component={Form4}/>
                        <Stack.Screen name="Form5" component={Form5}/>
                    
                </Stack.Navigator>
            </NavigationContainer>
    )
};