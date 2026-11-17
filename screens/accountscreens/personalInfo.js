import React from "react";
import { View, Text, Pressable, TextInput, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState, useContext } from "react";
import { Register } from "../../functions/imports/accountManager";
import { CreateAccountInfo } from "../../functions/imports/dataManager";
import { userContext } from "../../functions/context/userContext";

// Chat, WE are downscaling EVERYBODY to Civilian Level :)





export default function PersonalInfoScreen() {
    const {setPersonalInfo, updateDatabase, personalInfo, accountInfo} = useContext(userContext)

    const navigator = useNavigation()
    function navigate(location) {
    navigator.navigate(location)}

    const [invalidText, setInvalidText] = useState("")
    const [isError, setIsError] = useState(false)

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [linkedin, setLinkedin] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")

    const isValidFirstName = firstName.length > 0
    const isValidLastName = lastName.length > 0
    const isValidPhoneNumber = phoneNumber.length === 12

    async function submitRegistering() {
        setInvalidText("")
        if (isValidFirstName && isValidLastName && isValidPhoneNumber) {
            try {
                setIsError(false)
                const updatedPersonalInfo = {
                    ...personalInfo,
                    firstName,
                    lastName,
                    linkedin,
                    phoneNumber,
                };

            await updateDatabase({ path: 'Personal', data: updatedPersonalInfo });
            setPersonalInfo(updatedPersonalInfo);
                navigate('main')
            } catch (error) {
                
            }
            
        } else {
            // Get error message
            var finalText = ""
            setIsError(true)
            if (!isValidFirstName) {
                finalText = finalText + " Must have First Name."
            }
            if (!isValidLastName) {
                finalText = finalText + " Must have Last Name."
            }
            if (!isValidPhoneNumber) {
                finalText = finalText + ' Phone Number must be formated as XXX-XXX-XXXX.'
            }

            setInvalidText(finalText)
        }
    }
    
    return (
    <View style={styles.background}>
        <View style={styles.mainContainer}>
            <Text style={styles.subtitle}>Additional Info</Text>
            <View style={styles.inputField}>
                {isError && <Text style={styles.invalid}>{invalidText}</Text>}
                <Text style={styles.inputTitle}>First Name</Text>
                <TextInput style={styles.input} onChangeText={(text) => {setFirstName(text)}}></TextInput>
                <Text style={styles.inputTitle}>Last Name</Text>
                <TextInput style={styles.input} onChangeText={(text) => {setLastName(text)}}></TextInput>
                <Text style={styles.inputTitle}>Phone Number: XXX-XXX-XXXX</Text>
                <TextInput style={styles.input} onChangeText={(text) => {setPhoneNumber(text)}}></TextInput>
                <Text style={styles.inputTitle}>{`(Optional)`} Linkedin Link</Text>
                <TextInput style={styles.input} onChangeText={(text) => {setLinkedin(text)}}></TextInput>
            </View>
            <Pressable style={styles.buttons}>
                    <Text style={styles.buttonText} onPress={submitRegistering}>Finish Registering</Text>
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
        marginBottom: '15%'
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
        marginHorizontal: '35%'
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
        marginTop: '15%',
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