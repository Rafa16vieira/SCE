import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    formPoint: {
        padding: 20, 
        height: '100%'
    },
    smallField: {
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
    bigField: {
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
    dados: {
        color:'#fff',
        fontWeight: 'bold'
    },
    texto: {
        color: '#1f3324',
        fontSize: 20,
        marginBottom: 10,
        marginLeft: 2
    },
    line: {
        marginTop: 30,
        backgroundColor: "#152319",
        width: '20%',
        alignSelf: 'center',
        height: 2,
        margin: 5
    }
})

export default styles