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


export default function CreateAwardsScreen() {

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

    const [award, setAward] = useState("")


    // Checks
    const validAward = award.length > 0

    // This is split into to major parts, Part 1 is updating the usercontext, and the other is update the user data. It is better to do both at once instead of updating one with the other
    async function UploadData() {
        // Checks if all points of data are passing
        const finalresult = {id: Math.random(), award: award}
        if (validAward) {
            try {
                // User Context Updater,
                console.log(resumeItems, 1, finalresult)
                if (resumeItems.awards.length == 0) {
                    keySetData('awards', [finalresult])
                    const test = await updateDatabase({path: 'Data/awards', data: [finalresult]})
                    console.log(test, 2)
                } else {
                    const updatedAwards = [...resumeItems.awards, finalresult];
                    keySetData('awards', updatedAwards)
                    await updateDatabase({path: 'Data/awards', data: updatedAwards})
                }
                

                // User Data Updater
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
                    <Text style={styles.title}>Create an Award</Text>
                    <Text style={styles.OtherLabels}>Describe an award you recieved</Text>
                    <TextInput style={styles.input} onChangeText={text => setAward(text)}/>
                </View>
                <View style={styles.AddButton}>
                    <Pressable onPress={() => UploadData()}>
                        <Text style={styles.ButtonText}>Create</Text>
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