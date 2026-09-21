import React from "react";
import { View, Text, Pressable, TextInput, StyleSheet } from "react-native";


export default function LoginScreen() {
    return (
    <View style={styles.background}>
        <View style={styles.mainContainer}>
            <Text style={styles.title}>Resume Builder</Text>
            <View style={styles.inputField}>
                <TextInput style={styles.input} placeholder="email@gmail.com"></TextInput>
                <TextInput style={styles.input} placeholder="password"></TextInput>
            </View>
            <View style={styles.buttonsContainer}>
                <Pressable style={styles.buttons}>
                    <Text style={styles.buttonText}>Log in</Text>
                </Pressable>
                <Pressable style={styles.buttons}>
                    <Text style={styles.buttonText}>Register</Text>
                </Pressable>
            </View>
        </View>
    </View>)
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: '#512d38',
        width: '100%',
        height: '100%'
    },
    title: {
        textAlign: 'center',
        fontSize: 34,
        marginTop: '10%',
        fontWeight: 'bold',
        color: '#ffffff'
    },
    subtitle: {},
    mainText: {},
    buttonText: {
        fontSize: '15',
        color: 'white',
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    mainContainer: {
        width: '30%',
        height: '60%',
        marginHorizontal: 'auto',
        marginVertical: '5%',
        backgroundColor: '#b27092',
        borderRadius: 10
    },
    inputField: {
        width: '50%',
        marginHorizontal: 'auto',
        backgroundColor: '#f4bfdb',
        height: '20%',
        marginTop: '15%',
        justifyContent: 'center',
        borderRadius: 20
    },
    input: {
        marginHorizontal: 'auto',
        width: 'auto',
        height: 20,
        backgroundColor: '#ffe9f3',
        padding: 10,
        marginVertical: 5,
        outlineWidth: 3,
        outlineStyle: 'solid',
        outlineColor: '#B27092',
        borderRadius: 5
    },
    buttonsContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginHorizontal: 'auto',
        width: '50%',
        height: 30,
        alignContent: 'center'
    },
    buttons: {
        width: 100,
        height: 30,
        backgroundColor: '#87baab',
        alignSelf: 'center',
        marginTop: 25,
        marginHorizontal: 'auto',
        justifyContent: 'center',
        borderRadius: 5
    }
})