import React from "react";
import { View, Text, Pressable, TextInput, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState, useContext } from "react";
import { signIn } from "../../functions/imports/accountManager";
import { userContext } from "../../functions/context/userContext";
import { GetAccountInfo } from "../../functions/imports/dataManager";
import { concreteNumUniqueNumericIdGen } from "docx";






export default function LoginScreen() {
    const check = useContext(userContext)
    const {accountInfo, setAccountInfo, setPersonalInfo, setDataInfo, setResumes, setJobListings} = useContext(userContext)

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

    const [invalidText, setInvalidText] = useState("")
    const [isError, setIsError] = useState(false)

    function navigate(location) {
    navigation.navigate(location)
    }

    async function setUpContext(id, email) {
          if (!id || !email) {
            throw new Error("setUpContext requires id and email")
          }
          const dataResult = await GetAccountInfo(email)
          console.log(dataResult, 1)
          if (dataResult) {
            console.log('pass')
            setAccountInfo(dataResult.Account)
            setPersonalInfo(dataResult.Personal)
            
            for (const key in dataResult.Data) {
              console.log(key, dataResult.Data[key])
              if (dataResult.Data[key] == false) {
                setDataInfo((prev) => ({...prev, [key]: []}))
              } else {

                setDataInfo((prev) => ({...prev, [key]: dataResult.Data[key]}))
              }
            }
    
            if (dataResult.Resumes == false) {
              setResumes([])
            } else {
              setResumes(dataResult.Resumes)
            }
    
            if (dataResult.jobListings == false) {
              setJobListings([])
            } else {
              setJobListings(dataResult.jobListings)
            }
          }
        }

    async function submitLogin() {
        console.log(isValidEmail, isValidPassword)
        if (isValidEmail && isValidPassword) {

            try {
                const result = await signIn(password, email)

                if (result.data.localId && result.data.idToken) {
                    setIsError(false)
                    updateAccountInfo({email: email, id: result.data.localId})
                    
                    // fetch or create new data
                    const appl = await setUpContext(result.data.localId, email)
                    console.log(check, 1)
                    navigate('main')
                }
            } catch (error) {
                console.log(error)
                setInvalidText("Sorry, Password or Email is incorrect")
                setIsError(true)
            }

        } else {
            // Handle error Logic here
        }
    }

    return (
    <View style={styles.background}>
        
        <View style={styles.welcomeSection}>
            <View style={styles.welcomeDetailsContainer}>
                <Text style={styles.welcomeHeadtitle}>Welcome to</Text>
                <Text style={styles.title}>ResBuild</Text>
                <Text style={styles.welcomeSubtitle}>Making resume building easier for you</Text>
            </View>
        </View>
        <View style={styles.mainContainer}>
            
            
            <Text style={styles.subtitle}>Sign In to ResBuild</Text>
            <View style={styles.inputField}>
                {isError && <Text style={styles.invalid}>{invalidText}</Text>}
                <Text style={styles.inputTitle}>Email</Text>
                <TextInput style={styles.input} placeholder="email@gmail.com" onChangeText={(text) => setEmail(text)}></TextInput>
                <Text style={styles.inputTitle}>Password</Text>
                <TextInput style={styles.input} secureTextEntry={true} placeholder="password" onChangeText={(text) => setPassword(text)}></TextInput>
                
            </View>
            
            <Pressable style={styles.buttons} onPress={() => submitLogin()}>
                    <Text style={styles.buttonText}>Log in</Text>
                </Pressable>
            <Pressable style={styles.register} onPress={() => navigate('register')}>
                <Text style={styles.buttonText}>Don't Have an account?</Text>
                <Text style={styles.registerText}>Register</Text>
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
        fontSize: 80,
        fontWeight: 'bold',
        color: '#ffffff',
        marginVertical: '5%',
        marginHorizontal: '10%',
        height: '10%',
        width: '100%'
    },
    welcomeSubtitle: {
        textAlign: 'left',
        margin: '10%',
        marginVertical: '5%',
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
        marginTop: '30%'
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
        marginHorizontal: '70%'
    },
    inputField: {
        width: '100%',
        marginHorizontal: 'auto',
        height: '20%',
        marginTop: '5%',
        justifyContent: 'center',
        borderRadius: 20,
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
        marginTop: 5,
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
        marginBottom: 10
    }
})