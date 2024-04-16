import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    nome: {
        borderColor: '#646464',
        borderWidth: 1,
        backgroundColor: '#202020',
        width: 348,
        height: 30,
        alignSelf: 'flex-start',
        borderRadius: 8,
        paddingLeft: 4,
        marginRight: 4,
        marginBottom: 10,
        color: '#ddd',
        
    },
    keywords: {
        borderColor: '#646464',
        borderWidth: 1,
        backgroundColor: '#202020',
        width: 348,
        height: 30,
        alignSelf: 'flex-start',
        borderRadius: 8,
        paddingLeft: 4,
        marginRight: 4,
        marginBottom: 10,
        color: '#ddd'
    },
    description: {
        borderColor: '#646464',
        borderWidth: 1,
        backgroundColor: '#202020',
        width: 348,
        height: 150,
        alignSelf: 'flex-start',
        borderRadius: 8,
        paddingLeft: 4,
        marginRight: 4,
        marginBottom: 10,
        color: '#ddd'
    },
    purpose: {
        borderColor: '#646464',
        borderWidth: 1,
        backgroundColor: '#202020',
        width: 348,
        height: 100,
        alignSelf: 'flex-start',
        borderRadius: 8,
        paddingLeft: 4,
        marginRight: 4,
        marginBottom: 10,
        color: '#ddd'
    },
    formPoint: {
        justifyContent: 'center',
        padding: 20, 
        backgroundColor: '#161616'
    },
    text: {
        color: '#bbb',
        fontSize: 20,
        marginBottom: 10,
        marginLeft: 2
    },
    buttons: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
        marginBottom: 20
    },
    back: {
        backgroundColor: '#242424',
        width: 150,
        height: 60,
        padding: 10,
        borderRadius: 6,
        margin:  10,
        marginLeft: 15
    },
    next: {
        backgroundColor: '#00b4d8',
        width: 150,
        height: 60,
        padding: 10,
        borderRadius: 6
    },
    buttonTextNext: {
        fontSize: 20,
        color: '#fff',
        marginLeft: 28,
        marginTop: 7,
        fontWeight: 'bold'
    },
    buttonTextBack: {
        fontSize: 20,
        color: '#fff',
        marginLeft: 38,
        marginTop: 7,
        fontWeight: 'bold'
    },
    buttonAdd: {
        borderColor: '#00b4d8',
        borderWidth: 1,
        width: 20,
        height: 20,
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10
    },
    buttonRemove: {
        borderColor: '#242424',
        borderWidth: 1,
        width: 20,
        height: 20,
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textRemove: {
        color: '#242424',
        fontSize: 14
    },
    textAdd: {
        color: '#00b4d8',
        fontSize: 14
    },
    pressArea: {
        justifyContent: 'flex-end',
        flexDirection: 'row'
    },

});

export default styles