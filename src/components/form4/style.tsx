import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    formPoint: {
        padding: 20, 
        height: '100%'
    },
    screen: {
        padding: 10,
        backgroundColor: '#c7ffd8'
    },
    text: {
        color: '#1f3324',
        fontSize: 20,
        marginBottom: 10,
        marginLeft: 2
    },
    sample: {
        marginRight: 4,
        marginBottom: 20,
    },
    buttons: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 40,
        justifyContent: 'center'
    },
    back: {
        backgroundColor: '#1f3324',
        width: 150,
        height: 60,
        padding: 10,
        borderRadius: 6,
        margin:  10,
        marginLeft: 0,
    },
    next: {
        backgroundColor: '#5c996b',
        width: 150,
        height: 60,
        padding: 10,
        borderRadius: 6,
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
    verify: {
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
        color: '#ddd',
    },
    dropdown: {
        backgroundColor: '#1f3324',
        borderColor: '#646464',
        borderWidth: 1,
        borderRadius: 4,
        padding: 8,
        color: '#fff'
    },


});

export default styles