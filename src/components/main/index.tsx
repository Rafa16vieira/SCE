import react from "react";
import { View, Text, Image, Pressable, ImageBackground, SafeAreaView, ScrollView } from "react-native";
import styles from "./style";
import { Icon } from '@rneui/themed';
import Header, { Header1 } from "../header";
import bg from './../../../assets/images/background.png';
import { printToFile } from "@/src/getter";







export interface MainProps {
    navigation: any;
}

export default function Main(props: MainProps){
    return(
        <ImageBackground source={{uri: "https://i.postimg.cc/hPMS7gGQ/background.png"}}>
        <SafeAreaView style={styles.mainScreen}>
        
            <ScrollView style={styles.mainScreen}>
            

            <Header/>
            <View style={{marginTop: 100}}>
                <View style={styles.squareBottom}>
                    <Pressable onPress={() => props.navigation.navigate("Criacao")}>
                        <Text style={styles.textMain}>Novo Projeto</Text>
                    </Pressable>
                </View>
                <Pressable onPress={() => props.navigation.navigate("Projetos")}>
                    <View style={styles.squareBottom}>
                        <Text style={styles.textMain}>Abrir Projetos</Text>
                        
                    </View>
                </Pressable>
            </View>
        </ScrollView>
        </SafeAreaView>
        </ImageBackground>
    );
}
