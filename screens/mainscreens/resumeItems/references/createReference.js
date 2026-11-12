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


export default function CreateReferenceScreen() {

    // Additional Possibilities, Add Removing Skill Items

    const {resumeItems, setDataInfo, updateDatabase} = useContext(userContext)

    function keySetData(key, data) {
        setDataInfo((prev) => ({...prev, [key]: data}))
    }

    function navigate(location) {
            console.log(location)
            navigation.navigate(location)
    }
    
    const navigation = useNavigation()

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [email, setEmail] = useState("")
    const [relationship, setRelationship] = useState("")
    // Checks
    const validFirstName = firstName.length > 0
    const validLastName = lastName.length > 0
    const validPhoneNumber = phoneNumber.length == 12
    const validEmail = email.length > 0
    const validRelationship = relationship.length > 0

    const currentlyPassing = validFirstName && validLastName && validPhoneNumber && validEmail && validRelationship

    // This is split into to major parts, Part 1 is updating the usercontext, and the other is update the user data. It is better to do both at once instead of updating one with the other
    async function UploadData() {
        // Checks if all points of data are passing
        const finalresult = {id: Math.random(), firstName: firstName, lastName: lastName, phoneNumber: phoneNumber, email: email, relationship: relationship}
        if (currentlyPassing) {
            try {
                // User Context Updater,
                console.log(resumeItems, 1, finalresult)
                if (resumeItems.references.length == 0) {
                    const updatedReferences = [finalresult];
                    keySetData('references', updatedReferences)
                    await updateDatabase({path: 'Data/references', data: updatedReferences})
                } else {
                    const updatedReferences = [...resumeItems.references, finalresult];
                    keySetData('references', updatedReferences)
                    await updateDatabase({path: 'Data/references', data: updatedReferences})
                }
                

                // User Data Updater
                navigate('selectMenu')
                
            } catch (error) {
                console.log(error)
            }
            
        } else {
            // Send out an error
        }
    }

    return (
        <View style={styles.background}>
            <View style={styles.section}>
                <View>
                    <Text style={styles.ParagraphText}>Enter the reference's first and last name</Text>
                    <TextInput placeholder="First Name" onChangeText={text => setFirstName(text)}/>
                    <TextInput placeholder="Last Name" onChangeText={text => setLastName(text)}/>
                </View>
                <View>
                    <Text style={styles.ParagraphText}>Enter the reference's contact information. Format Phone: XXX-XXX-XXXX</Text>
                    <TextInput placeholder="Phone Number" onChangeText={text => setPhoneNumber(text)}/>
                    <TextInput placeholder="Email" onChangeText={text => setEmail(text)}/>
                </View>
                <View>
                    <Text style={styles.ParagraphText}>Enter the reference's relationship to you</Text>
                    <TextInput placeholder="Relationship" onChangeText={text => setRelationship(text)}/>             
                </View>
                <View style={styles.AddButton}>
                    <Pressable onPress={() => UploadData()}>
                        <Text style={styles.ButtonText}>Create</Text>
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
        backgroundColor: '#512d38',
        flexDirection: 'row',
        display: 'flex',
    },
    section: {
        width: '24%',
        height: '97%',
        backgroundColor: '#b27092',
        margin: 'auto',
        borderRadius: 15,
        outlineColor: '#ffffff',
        outlineStyle: 'solid',
        outlineWidth: 3
    },
    sectionHeader: {
        textAlign: 'center',
        width: '100%',
        height: '5%',
        fontSize: 30,
        fontWeight: 'bold',
        color: '#ffffff',
        marginTop: 10
    },
    AddButton: {
        backgroundColor: '#9ab87a',
        width: '50%',
        height: '5%',
        marginHorizontal: 'auto',
        marginVertical: '5%',
        borderRadius: 20
    },
    ButtonText: {
        textAlign: 'center',
        width: '100%',
        height: '100%',
        fontSize: 20,
        color: 'white'
    },
    ParagraphText: {
        textAlign: 'center',
        width: '100%',
        height: '100%',
        fontSize: 15,
        color: '#d4d2d2'
    }
})