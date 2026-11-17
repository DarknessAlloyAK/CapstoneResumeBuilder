import React from "react";
import { View, Text, Pressable, TextInput, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState, useContext } from "react";
import { Register } from "../../functions/imports/accountManager";
import { CreateAccountInfo } from "../../functions/imports/dataManager";
import { userContext } from "../../functions/context/userContext";

// Chat, WE are downscaling EVERYBODY to Civilian Level :)





export default function LoginScreen() {
    const {setAccountInfo} = useContext(userContext)

    const navigator = useNavigation()
    function navigate(location) {
    navigator.navigate(location)}

    const [invalidText, setInvalidText] = useState("")
    const [isError, setIsError] = useState(false)

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
                setIsError(false)
                const result = await Register(password, email)
                if (result.data.localId && result.data.idToken) {
                    await CreateAccountInfo({location: result.data.localId, idToken: result.data.idToken, data: {
                        Account: {email: email, id: result.data.localId},
                        Personal: {firstName: '', lastName: '', linkedIn: '', phoneNumber: ''},
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
                    setAccountInfo((previous) => ({
                        ...previous,
                        email,
                        id: result.data.localId,
                    }))
                    navigate("personalInfo")
                }
            } catch (error) {
                console.log(error)
                setIsError(true)
                setInvalidText("Something went wrong. Refresh page and try again.")
            }
        } else {
            // Get error message
            setIsError(true)
            var finalText = ""
            if (!isValidEmail) {
                finalText = finalText + " Must be a valid email."
            }
            if (!isValidPassword) {
                finalText = finalText + " Password must be 6 characters or more."
            }
            if (!isComEmail) {
                finalText = finalText + " Emails must match."
            }
            if (!isComPassword) {
                finalText = finalText + " Passwords must match."
            }
            setInvalidText(finalText)
        }
    }
    
    return (
    <View style={styles.background}>
        <View style={styles.welcomeSection}>
                    <View style={styles.welcomeDetailsContainer}>
                        <Text style={styles.welcomeHeadtitle}></Text>
                        <Text style={styles.title}>Personalize Your Resume</Text>
                        <Text style={styles.welcomeSubtitle}>
                            Recruiters are more likely to notice people who personalize their resumes towards that listing.
                            We'll help make that easier for you.
                            </Text>
                    </View>
                </View>
        <View style={styles.mainContainer}>
            <Text style={styles.subtitle}>Register with ResBuild</Text>
            <View style={styles.inputField}>
                {isError && <Text style={styles.invalid}>{invalidText}</Text>}
                <Text style={styles.inputTitle}>User Email</Text>
                <TextInput style={styles.input} onChangeText={(text) => {setEmail(text)}}></TextInput>
                <Text style={styles.inputTitle}>Confirm Email</Text>
                <TextInput style={styles.input} onChangeText={(text) => {setComEmail(text)}}></TextInput>
                <Text style={styles.inputTitle}>Password</Text>
                <TextInput style={styles.input} secureTextEntry={true} onChangeText={(text) => {setPassword(text)}}></TextInput>
                <Text style={styles.inputTitle}>Confirm Password</Text>
                <TextInput style={styles.input} secureTextEntry={true} onChangeText={(text) => {setComPassword(text)}}></TextInput>
            </View>
            <Pressable style={styles.buttons}>
                    <Text style={styles.buttonText} onPress={() => submitRegistering()}>Register</Text>
            </Pressable>
            <Pressable style={styles.register} onPress={() => navigate('login')}>
                    <Text style={styles.buttonText}>Already have an account?</Text>
                    <Text style={styles.registerText}>Sign In</Text>
            </Pressable>
        </View>
    </View>)
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: '#101321',
        width: '100%',
        height: '100%'
    },
    welcomeSection: {
        width: '70%',
        height: '100%',
        flex: 1,
        alignItems: 'center'
    },
    welcomeDetailsContainer: {
        flex: 1,
        marginVertical: '5%',
        width: '100%',
        height: '30%',
    },
    title: {
        textAlign: 'left',
        fontSize: 60,
        fontWeight: 'bold',
        color: '#ffffff',
        marginTop: '15%',
        marginBottom: '5%',
        marginHorizontal: '10%',
        height: '10%',
        width: '100%'
    },
    welcomeSubtitle: {
        textAlign: 'left',
        margin: '10%',
        marginVertical: '5%',
        width: '70%',
        fontSize: 20,
        color: '#bdbdbd'
    },
    welcomeHeadtitle: {
        textAlign: 'left',
        marginHorizontal: '10%',
        marginTop: '5%',
        fontSize: 35,
        color: '#d1cece',
        fontWeight: 'bold'
    },
    subtitle: {
        textAlign: 'center',
        fontSize: 25,
        fontWeight: 'bold',
        color: '#ffffff',
        marginTop: '30%',
        marginBottom: '5%'
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
    registerText: {
        fontSize: '15',
        color: '#95cfed',
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    mainContainer: {
        width: '30%',
        height: '100%',
        backgroundColor: '#212743',
        marginHorizontal: '60%'
    },
    inputField: {
        width: '100%',
        marginHorizontal: 'auto',
        height: '20%',
        marginTop: '10%',
        justifyContent: 'center',
        borderRadius: 20,
        marginBottom: '7%'
    },
    inputTitle: {
        marginLeft: '5%',
        color: 'white',
        fontWeight: 'bold'
    },
    input: {
        marginHorizontal: 'auto',
        width: '90%',
        height: 40,
        backgroundColor: '#ffffff',
        padding: 10,
        marginVertical: '2%',
        outlineWidth: 3,
        outlineStyle: 'solid',
        outlineColor: '#101321',
        borderRadius: 1
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
        width: '90%',
        height: 30,
        backgroundColor: '#101321',
        alignSelf: 'center',
        marginTop: 20,
        marginHorizontal: 'auto',
        justifyContent: 'center',
        borderRadius: 5
    },
    register: {
        width: '90%',
        height: 30,
        alignSelf: 'center',
        marginTop: 15,
        marginHorizontal: 'auto',
        justifyContent: 'center',
        borderRadius: 5
    },
    invalid: {
        fontSize: '20',
        fontWeight: 'bold',
        color: '#0c0707',
        textAlign: 'center',
        textAlignVertical: 'center',
        backgroundColor: '#d08080',
        width: '80%',
        marginHorizontal: 'auto',
        paddingVertical: 10,
        borderRadius: 20,
        marginBottom: '5%'
    }
})