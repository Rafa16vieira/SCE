import react from "react";
import { View, Text } from "react-native";
import styles from "./style";

export default function Header(){
    return(
        <View style={styles.boxHeader}>
            <Text style={styles.textHeader}>Bem vindo ao SCE</Text>
            <View style={styles.lineHeader}/>
        </View>
    );
};

export function Header1(){
    return(
        <View style={styles.boxHeader}>
            <Text style={styles.textHeader}>Cadastrar nova Evidência</Text>
            <View style={styles.lineHeader}/>
        </View>
    )
}

export function HeaderEvid(){
    return(
        <View style={styles.boxHeader}>
            <Text style={styles.textHeader}>Evidência</Text>
            <View style={styles.lineHeader}/>
        </View>
    )
}