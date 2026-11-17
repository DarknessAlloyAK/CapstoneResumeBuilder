import React from "react";
import { View, Text, TextInput, Pressable, StyleSheet, FlatList } from "react-native";
import { useState } from "react";
import { useContext } from "react";
import { userContext } from "../../../../functions/context/userContext";
import { useNavigation } from "@react-navigation/native";
// Creation and Editing are pop ups instead of seperate screens

// All designs are left in the basetheme styleshhet

// Todo
// Create func for uploading data
// 


export default function EditReferenceScreen({ route}) {

    // Additional Possibilities, Add Removing Skill Items

    const {setDataInfo} = useContext(userContext)
        const entry = route?.params ?? {}
    
        function keySetData(key, data) {
            setDataInfo((prev) => ({...prev, [key]: prev[key].map((item) => 
                item.id === entry.id ? data : item)}))
        }

    function navigate(location) {
            console.log(location)
            navigation.navigate(location)
    }
    
    const navigation = useNavigation()

    const [firstName, setFirstName] = useState(entry.firstName ?? '')
    const [lastName, setLastName] = useState(entry.lastName ?? '')
    const [phoneNumber, setPhoneNumber] = useState(entry.phoneNumber ?? '')
    const [email, setEmail] = useState(entry.email ?? '')
    const [relationship, setRelationship] = useState(entry.relationship ?? '')
    const [jobTitle, setJobTitle] = useState(entry.jobTitle ?? '')
    // Checks
    const validFirstName = firstName.length > 0
    const validLastName = lastName.length > 0
    const validPhoneNumber = phoneNumber.length > 0
    const validEmail = email.length > 0
    const validRelationship = relationship.length > 0
    const validJobTitle = jobTitle.length > 0

    const currentlyPassing = validJobTitle && validFirstName && validLastName && validPhoneNumber && validEmail && validRelationship

    // This is split into to major parts, Part 1 is updating the usercontext, and the other is update the user data. It is better to do both at once instead of updating one with the other
    async function UploadData() {
        // Checks if all points of data are passing
        const finalresult = {id: entry.id, firstName: firstName, lastName: lastName, jobTitle: jobTitle, phoneNumber: phoneNumber, email: email, relationship: relationship}
        if (currentlyPassing) {
            try {
                // User Context Updater,
                keySetData('references', finalresult)
                navigation.goBack()

            } catch (error) {
                console.log(error)
            }
            
        } else {
            // Send out an error
        }
    }

    return (
        <View style={styles.background}>
                    <View style={styles.mainSection}>
                        <View>
                            <Text style={styles.title}>Change a Reference</Text>
                            <View style={styles.NameInputHolder}>
                                <Text style={styles.NameLabels}>First Name</Text>
                                <Text style={styles.NameLabels}>Last Name</Text>
                            </View>
                            <View style={styles.NameInputHolder}>
                                <TextInput style={styles.input} value={firstName} onChangeText={text => setFirstName(text)}/>
                                <TextInput style={styles.input}value={lastName} onChangeText={text => setLastName(text)}/>
                            </View>
                            
                        </View>
                        <View>
                            <Text style={styles.OtherLabels}>Phone Number: XXX-XXX-XXXX</Text>
                            <TextInput style={styles.input} value={phoneNumber} onChangeText={text => setPhoneNumber(text)}/>
                            <Text style={styles.OtherLabels}>Email</Text>
                            <TextInput style={styles.input} value={email} onChangeText={text => setEmail(text)}/>
                        </View>
                        <View>
                            <Text style={styles.OtherLabels}>Reference's Relationship with you</Text>
                            <TextInput style={styles.input} value={relationship} placeholder="Relationship" onChangeText={text => setRelationship(text)}/>             
                            <Text style={styles.OtherLabels}>Reference's Job</Text>
                            <TextInput style={styles.input} value={jobTitle} placeholder="Company and Job" onChangeText={text => setJobTitle(text)}/>             
                        
                        </View>
                        <View style={styles.AddButton}>
                            <Pressable onPress={() => UploadData()}>
                                <Text style={styles.ButtonText}>Change</Text>
                            </Pressable>
                        </View>
                        <Text style={styles.NameLabels}></Text>
                                        <View style={styles.AddButton}>
                                            <Pressable onPress={() => navigation.goBack()}>
                                                <Text style={styles.ButtonText}>Go Back</Text>
                                            </Pressable>
                                        </View>
                    </View>
                </View>
    )
}

const styles = StyleSheet.create({
    background: {
        width: '100%',
        height: '100%',
        backgroundColor: '#0b0e17',
        flexDirection: 'row',
        display: 'flex',
    },
    mainSection: {
        width: '45%',
        height: '100%',
        backgroundColor: '#15182a',
        marginLeft: '27.5%',
        borderRadius: 0,
        outlineColor: '#ffffff',
        outlineStyle: 'solid',
        outlineWidth: 3
    },
    NameInputHolder: {
        display: 'flex',
        flexDirection: 'row',
        width: '90%',
        marginHorizontal: 'auto',
        justifyContent: 'space-between'
    },
    NameLabels: {
        textAlign: 'left',
        fontSize: 15,
        color: '#ffffff',
        width: '50%',
        marginTop: '2%',
        marginBottom: '-1%',
    },
    OtherLabels: {
        textAlign: 'left',
        fontSize: 15,
        color: '#ffffff',
        width: '50%',
        marginTop: '2%',
        marginBottom: '-1%',
        marginHorizontal: '5%'
    },
    input: {
        marginHorizontal: 'auto',
        width: '90%',
        height: 30,
        backgroundColor: '#ffffff',
        padding: 10,
        marginVertical: '2%',
        outlineWidth: 3,
        outlineStyle: 'solid',
        outlineColor: '#101321',
        borderRadius: 1
    },
    ListLabels: {
        textAlign: 'left',
        fontSize: 15,
        color: '#ffffff',
        width: '80%',
        marginTop: '2%',
        marginBottom: '2%',
        marginHorizontal: '5%'
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        marginTop: '5%',
        marginBottom: '2%'
    },
    AddButton: {
        backgroundColor: '#293155',
        width: 100,
        height: 30,
        marginHorizontal: 'auto',
        borderRadius: 0
    },
    MenuButton: {
        backgroundColor: '#293155',
        width: 100,
        height: 30,
        marginVertical: '1%',
        marginHorizontal: 'auto',
        borderRadius: 0
    },
    ButtonText: {
        textAlign: 'center',
        alignContent: 'center',
        width: '100%',
        height: '100%',
        fontSize: 15,
        color: 'white'
    },
    MainFlatList: {
        width: '95%',
        height: '35%',
        borderWidth: 3,
        borderColor: '#0f111e',
        margin: 'auto',
        marginBottom: '5%',
        backgroundColor: '#181d32'
    },
    SkillsFlatList: {
        width: '100%',
        height: '100%'
    },
    displayText: {
        color: 'white',
    }
})