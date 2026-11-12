import React from "react";
import { View, Text, Pressable, TextInput, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Register } from "../../functions/imports/accountManager";
import { CreateAccountInfo } from "../../functions/imports/dataManager";

// Chat, WE are downscaling EVERYBODY to Civilian Level :)





export default function LoginScreen() {
    const navigator = useNavigation()
    function navigate(location) {
    navigator.navigate(location)}

    const [password, setPassword] = useState("")
    const [comPassword, setComPassword] = useState("")
    const [email, setEmail] = useState("")
    const [comEmail, setComEmail] = useState("")

    const isValidPassword = password.length >= 6
    const isValidEmail = email.includes("@")
    const isComPassword = password == comPassword
    const isComEmail = email == comEmail

    async function submitRegistering() {
        console.log(isComEmail, isComPassword, isValidEmail, isValidPassword)
        if (isValidEmail && isValidPassword && isComPassword && isComEmail) {
            try {
                const result = await Register(password, email)
                if (result.data.localId && result.data.idToken) {
                    await CreateAccountInfo({location: result.data.localId, idToken: result.data.idToken, data: {
                        Account: {email: email, id: result.data.localId},
                        Personal: {First: '', Last: '', StrAddress: '', City: '', State: ''},
                        Data: {
                            workHistory: false,
                            awards: false,
                            education: false,
                            skills: false,
                            references: false
                        },
                        resumes: false,
                        jobListings: false

                    }})

                    navigate("login")
                }
            } catch (error) {
                console.log(error)
            }
        } else {
            // Get error message
        }
    }
    
    return (
    <View style={styles.background}>
        <View style={styles.mainContainer}>
            <Text style={styles.title}>Resume Builder</Text>
            <Text style={styles.subtitle}>Register</Text>
            <View style={styles.inputField}>
                <TextInput style={styles.input} placeholder="email@gmail.com" onChangeText={(text) => {setEmail(text)}}></TextInput>
                <TextInput style={styles.input} placeholder="Confirm email@gmail.com" onChangeText={(text) => {setComEmail(text)}}></TextInput>
                <TextInput style={styles.input} placeholder="password" onChangeText={(text) => {setPassword(text)}}></TextInput>
                <TextInput style={styles.input} placeholder="Confirm password" onChangeText={(text) => {setComPassword(text)}}></TextInput>
            </View>
            <View style={styles.buttonsContainer}>
                <Pressable style={styles.buttons}>
                    <Text style={styles.buttonText} onPress={() => submitRegistering()}>Register</Text>
                </Pressable>
                <Pressable style={styles.buttons} onPress={() => navigate('login')}>
                    <Text style={styles.buttonText}>Log In</Text>
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
    backgroundImage: {
        width: '100%',
        height: '100%',
        opacity: '50%'
    },
    subtitle: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: '#bdbdbd'},
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
        height: '40%',
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