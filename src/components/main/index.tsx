import react from "react";
import { View, Text, Image, Pressable } from "react-native";
import styles from "./style";
import { Icon } from '@rneui/themed';
import Header, { Header1 } from "../header";

export default function Main({navigation}: any){
    return(
        
        <View style={styles.mainScreen}>

            <Header/>

            <View style={styles.squareMain}>
                <View style={styles.squareSecondary}>
                    <Image style={styles.imageMain} source={{uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDKDQdIbD_zY8cvg0fxW40c2f5YhnqanOhX1ATpuriew&s"}}/>
                </View>
                <View style={styles.separator}/>
                <Pressable onPress={() => navigation.navigate("Form1")}>
                    <Text style={styles.textMain}>Cadastrar Evidência</Text>
                </Pressable>
            </View>
            <View style={styles.squareBottom}>
                <Text style={styles.textMain}>Registros</Text>
                
                    <View style={styles.miniBox}>
                        <View style={styles.rowSquares}>
                            <View style={styles.selectSquares}>
                                <Icon name='folder' color={'#000'} size={40}/>
                            </View>
                        </View>
                        <View style={styles.rowSquares}>
                            <View style={styles.selectSquares}>
                                <Icon name='folder-copy' color={'#000'} size={40}/>
                            </View>
                        </View>
                    </View>

            </View>
        </View>
    );
}