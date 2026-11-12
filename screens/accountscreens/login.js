import React from "react";
import { View, Text, Pressable, TextInput, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState, useContext } from "react";
import { signIn } from "../../functions/imports/accountManager";
import { userContext } from "../../functions/context/userContext";
import { GetAccountInfo } from "../../functions/imports/dataManager";






export default function LoginScreen() {
    const check = useContext(userContext)
    const {accountInfo, setAccountInfo, setUpContext} = useContext(userContext)

    const updateAccountInfo = (authInfo) => {
        setAccountInfo((prev) => ({
            ...prev,
            email,
            id: authInfo.localId,
            idToken: authInfo.idToken
        }))
    }

    const navigation = useNavigation();

    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")

    const isValidPassword = password.length >= 6
    const isValidEmail = email.includes("@")

    function navigate(location) {
    navigation.navigate(location)
    }

    if (accountInfo.email && accountInfo.id) {
        navigate('main')
    }

    async function submitLogin() {
        console.log(isValidEmail, isValidPassword)
        if (isValidEmail && isValidPassword) {

            try {
                const result = await signIn(password, email)

                if (result.data.localId && result.data.idToken) {
                    updateAccountInfo(result.data)
                    
                    // fetch or create new data
                    const appl = await setUpContext(result.data.localId, email)
                    navigate('main')
                }
            } catch (error) {
                console.log(error)
            }

        } else {
            // Handle error Logic here
        }
    }

    return (
    <View style={styles.background}>
        <View style={styles.mainContainer}>
            
            <Text style={styles.title}>Resume Builder</Text>
            <Text style={styles.subtitle}>Log In</Text>
            <View style={styles.inputField}>
                <TextInput style={styles.input} placeholder="email@gmail.com" onChangeText={(text) => setEmail(text)}></TextInput>
                <TextInput style={styles.input} secureTextEntry={true} placeholder="password" onChangeText={(text) => setPassword(text)}></TextInput>
            </View>
            <View style={styles.buttonsContainer}>
                <Pressable style={styles.buttons} onPress={() => submitLogin()}>
                    <Text style={styles.buttonText}>Log in</Text>
                </Pressable>
                <Pressable style={styles.buttons} onPress={() => navigate('register')}>
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
    subtitle: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: '#bdbdbd'
    },
    backgroundImage: {
        width: '100%',
        height: '100%',
    },
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
        marginTop: '5%',
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