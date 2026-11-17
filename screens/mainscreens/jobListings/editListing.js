import React from "react";
import { View, Text, TextInput, Pressable, StyleSheet, FlatList } from "react-native";
import { useState } from "react";
import { useContext } from "react";
import { userContext } from "../../../functions/context/userContext";
import { useNavigation } from "@react-navigation/native";
// Creation and Editing are pop ups instead of seperate screens

// All designs are left in the basetheme styleshhet

// Todo
// Create func for uploading data
// 


export default function EditJobListingScreen({ route }) {

    // Additional Possibilities, Add Removing Skill Items
    const entry = route?.params?? {}

    const {jobListings, setJobListings, updateDatabase} = useContext(userContext)

    function navigate(location) {
            console.log(location)
            navigation.navigate(location)
    }
    
    const navigation = useNavigation()

    const [company, setCompany] = useState(entry?.company ?? "")
    const [jobTitle, setJobTitle] = useState(entry?.jobTitle ?? "")
    const [jobLink, setJobLink] = useState(entry?.jobLink ?? "")
    const [notes, setNotes] = useState(entry?.notes ?? "")


    // Checks
    const validCompany = company.length > 0
    const validJobTitle = jobTitle.length > 0

    const isValid = validCompany && validJobTitle
    // This is split into to major parts, Part 1 is updating the usercontext, and the other is update the user data. It is better to do both at once instead of updating one with the other
    async function UploadData() {
        const finalresult = {id: Math.random(), company, jobTitle, jobLink, notes}
        if (isValid) {
            try {
                const updateListings = jobListings.map((item) =>
                item.id === entry.id ? finalresult : item
                )       

                await updateDatabase({path: 'jobListings', data: updateListings})
                setJobListings(updateListings)
                navigation.goBack()
            } catch (error) {
                console.error("Could not edit job listing:", error.response?.data ?? error.message)
            }
            
        } else {
            // Send out an error
        }
    }

    return (
        <View style={styles.background}>
            <View style={styles.mainSection}>
                <View>
                    <Text style={styles.title}>Edit notes for Job Listing</Text>
                    <View style={styles.NameInputHolder}>
                        <Text style={styles.NameLabels}>Company</Text>
                        <Text style={styles.NameLabels}>Job Title</Text>
                    </View>
                    <View style={styles.NameInputHolder}>
                        <TextInput style={styles.input} value={company}onChangeText={text => setCompany(text)}/>
                        <TextInput style={styles.input} value={jobTitle} onChangeText={text => setJobTitle(text)}/>
                    </View>
                    <Text style={styles.OtherLabels}>{`(Optional)`} Link to Job Posting</Text>
                    <TextInput style={styles.input} value={jobLink} onChangeText={text => setJobLink(text)}/>
                    <Text style={styles.OtherLabels}>Write Notes on Job Post</Text> 
                    <View style={styles.summaryHolder}>
                        <TextInput
                            style={styles.summaryInput}
                            value={notes}
                            multiline
                            textAlignVertical="top"
                            onChangeText={text => setNotes(text)}
                        />
                    </View>
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
    summaryHolder: {
        width: "80%",
        height: "45%",
        marginTop: '5%',
        marginBottom: '45%',
        marginHorizontal: 'auto',
        backgroundColor: '#121823',
        textAlign: 'center'

    },
    summaryInput: {
        width: '100%',
        height: '100%',
        color: 'white',
        padding: 5
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