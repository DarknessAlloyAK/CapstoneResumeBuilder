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
    // Checks
    const validFirstName = firstName.length > 0
    const validLastName = lastName.length > 0
    const validPhoneNumber = phoneNumber.length > 0
    const validEmail = email.length > 0
    const validRelationship = relationship.length > 0

    const currentlyPassing = validFirstName && validLastName && validPhoneNumber && validEmail && validRelationship

    // This is split into to major parts, Part 1 is updating the usercontext, and the other is update the user data. It is better to do both at once instead of updating one with the other
    async function UploadData() {
        // Checks if all points of data are passing
        const finalresult = {id: entry.id, firstName: firstName, lastName: lastName, phoneNumber: phoneNumber, email: email, relationship: relationship}
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
            <View style={styles.section}>
                <View>
                    <Text style={styles.ParagraphText}>Enter the reference's first and last name</Text>
                    <TextInput value={firstName} placeholder="First Name" onChangeText={text => setFirstName(text)}/>
                    <TextInput value={lastName} placeholder="Last Name" onChangeText={text => setLastName(text)}/>
                </View>
                <View>
                    <Text style={styles.ParagraphText}>Enter the reference's contact information</Text>
                    <TextInput value={phoneNumber} placeholder="Phone Number" onChangeText={text => setPhoneNumber(text)}/>
                    <TextInput value={email} placeholder="Email" onChangeText={text => setEmail(text)}/>
                </View>
                <View>
                    <Text style={styles.ParagraphText}>Enter the reference's relationship to you</Text>
                    <TextInput value={relationship} placeholder="Relationship" onChangeText={text => setRelationship(text)}/>             
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