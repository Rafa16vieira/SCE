import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    mainScreen: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 0,
        backgroundColor: '#c7ffd8'
    },
    textMain: {
        color: "#152319",
        fontSize: 20,
        fontWeight: "bold",
        alignSelf: 'center',
        marginTop: 15
    },
    squareMain: {
        borderRadius: 32,
        width: 325,
        height: 250,
        backgroundColor: "#3d6647",
        marginBottom: 60
    },
    squareBottom: {
        borderRadius: 32,
        width: 325,
        height: 250,
        backgroundColor: "#3d6647",
        marginBottom: 150
    },
    squareSecondary:{
        borderRadius: 12,
        width: 285,
        height: 150,
        backgroundColor: "#152319",
        margin: 20,
        marginBottom: 20
    },
    imageMain: {
        width: 275,
        borderRadius: 5,
        height: 140,
        margin: 5
    },
    separator: {
        width: 325,
        height: 2,
        marginTop: 5,
        backgroundColor: "#99ffb2"
    },
    miniBox: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rowSquares: {
        width: 142.5,
        height: 140,
        backgroundColor: "#152319",
        margin: 10,
        marginTop: 30,
        borderRadius: 12,
        padding: 21.25
    },
    selectSquares: {
        width: 100,
        height: 100,
        borderRadius: 12,
        backgroundColor: '#99ffb2',
        padding: 20,
        paddingTop: 30
    }
});

export default styles