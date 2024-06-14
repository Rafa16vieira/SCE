import react from "react";
import { View, Text, Image } from "react-native";
import styles from "./style";

export default function Header(){
    return(
        <View style={styles.boxHeader}>
            <View style={{flexDirection: 'row'}}>
                <Image style={{width: 55, height: 40, marginLeft: 50}} source={require('../../../assets/images/imagem_2024-06-08_142437650-removebg-preview.png')}/>
                <View style={{alignSelf: 'flex-end'}}>
                    <Text style={styles.textHeader}>Bem vindo ao SCE</Text>
                </View>
            </View>
            <View style={styles.lineHeader}/>
        </View>
    );
};

export function Header1(){
    return(
        <View style={styles.boxHeader}>
            <View style={{flexDirection: 'row'}}>
                <Image style={{width: 55, height: 40, marginLeft: 50}} source={require('../../../assets/images/imagem_2024-06-08_142437650-removebg-preview.png')}/>
                <View style={{alignSelf: 'flex-end'}}>
                    <Text style={styles.textHeader}>Cadastrar nova evidência</Text>
                </View>
            </View>
            <View style={styles.lineHeader}/>
        </View>
    )
}

export function HeaderProject(){
    return(
        <View style={styles.boxHeader}>
            <View style={{flexDirection: 'row'}}>
                <Image style={{width: 55, height: 40, marginLeft: 50}} source={require('../../../assets/images/imagem_2024-06-08_142437650-removebg-preview.png')}/>
                <View style={{alignSelf: 'flex-end'}}>
                    <Text style={styles.textHeader}>Criar novo projeto</Text>
                </View>
            </View>
            <View style={styles.lineHeader}/>
        </View>
    )
}

export function HeaderList(){
    return(
        <View style={styles.boxHeader}>
            <View style={{flexDirection: 'row'}}>
                <Image style={{width: 55, height: 40, marginLeft: 50}} source={require('../../../assets/images/imagem_2024-06-08_142437650-removebg-preview.png')}/>
                <View style={{alignSelf: 'flex-end'}}>
                    <Text style={styles.textHeader}>Projetos</Text>
                </View>
            </View>
            <View style={styles.lineHeader}/>
        </View>
    )
}

export function HeaderEvids(){
    return(
        <View style={styles.boxHeader}>
            <View style={{flexDirection: 'row'}}>
                <Image style={{width: 55, height: 40, marginLeft: 50}} source={require('../../../assets/images/imagem_2024-06-08_142437650-removebg-preview.png')}/>
                <View style={{alignSelf: 'flex-end'}}>
                    <Text style={styles.textHeader}>Evidências</Text>
                </View>
            </View>
            <View style={styles.lineHeader}/>
        </View>
    )
}

export function HeaderData(){
    return(
        <View style={styles.boxHeader}>
            <View style={{flexDirection: 'row'}}>
                <Image style={{width: 55, height: 40, marginLeft: 50}} source={require('../../../assets/images/imagem_2024-06-08_142437650-removebg-preview.png')}/>
                <View style={{alignSelf: 'flex-end'}}>
                    <Text style={styles.textHeader}>Dados</Text>
                </View>
            </View>
            <View style={styles.lineHeader}/>
        </View>
    )
}

export function HeaderEdit(){
    return(
        <View style={styles.boxHeader}>
            <View style={{flexDirection: 'row'}}>
                <Image style={{width: 55, height: 40, marginLeft: 50}} source={require('../../../assets/images/imagem_2024-06-08_142437650-removebg-preview.png')}/>
                <View style={{alignSelf: 'flex-end'}}>
                    <Text style={styles.textHeader}>Edição</Text>
                </View>
            </View>
            <View style={styles.lineHeader}/>
        </View>
    )
}