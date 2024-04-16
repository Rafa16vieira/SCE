import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    screen: {
        justifyContent: 'center',
        padding: 10,
        backgroundColor: '#161616'
    },
    text: {
        color: '#bbb',
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
        marginTop: 160,
        marginBottom: 40,
        marginLeft: 10
    },
    back: {
        backgroundColor: '#242424',
        width: 150,
        height: 60,
        padding: 10,
        borderRadius: 6,
        margin:  10,
        marginLeft: 15,
    },
    next: {
        backgroundColor: '#00b4d8',
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
        backgroundColor: '#202020',
        width: 348,
        height: 30,
        alignSelf: 'flex-start',
        borderRadius: 8,
        paddingLeft: 4,
        marginRight: 4,
        marginBottom: 10,
        color: '#ddd',
    }

});

export default styles