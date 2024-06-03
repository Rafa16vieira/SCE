import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    nome: {
        borderColor: '#646464',
        borderWidth: 1,
        backgroundColor: '#1f3324',
        width: '100%',
        height: 30,
        alignSelf: 'flex-start',
        borderRadius: 8,
        paddingLeft: 4,
        marginRight: 4,
        marginBottom: 10,
        color: '#c7ffd8',
        
    },
    keywords: {
        borderColor: '#646464',
        borderWidth: 1,
        backgroundColor: '#1f3324',
        width: '100%',
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
        backgroundColor: '#1f3324',
        width: '100%',
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
        backgroundColor: '#1f3324',
        width: '100%',
        height: 100,
        alignSelf: 'flex-start',
        borderRadius: 8,
        paddingLeft: 4,
        marginRight: 4,
        marginBottom: 10,
        color: '#ddd'
    },
    formPoint: {
        padding: 20, 
    },
    text: {
        color: '#1f3324',
        fontSize: 20,
        marginBottom: 10,
        marginLeft: 2
    },
    buttons: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
        marginBottom: 20,
        paddingRight: 20,
        width: '100%',
        justifyContent: 'center'
    },
    back: {
        backgroundColor: '#1f3324',
        width: '40%',
        height: 60,
        padding: 10,
        borderRadius: 6,
        margin:  10,
        marginLeft: 15,
        justifyContent: 'center',
        alignContent: 'center'
    },
    next: {
        backgroundColor: '#5c996b',
        width: '40%',
        height: 60,
        padding: 10,
        borderRadius: 6,
        justifyContent: 'center',
        alignContent: 'center'
    },
    buttonTextNext: {
        fontSize: 20,
        color: '#fff',
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: 0,
        fontWeight: 'bold'
    },
    buttonTextBack: {
        fontSize: 20,
        color: '#fff',
        alignSelf: 'center',
        justifyContent: 'center',
        fontWeight: 'bold'
    },
    buttonAdd: {
        borderColor: '#5c996b',
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
        color: '#5c996b',
        fontSize: 14
    },
    pressArea: {
        justifyContent: 'flex-end',
        flexDirection: 'row'
    },

});

export default styles