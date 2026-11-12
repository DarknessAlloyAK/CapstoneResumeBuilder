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


export default function CreateSkillsScreen() {

    // Additional Possibilities, Add Removing Skill Items

    const {resumeItems, setDataInfo} = useContext(userContext)

    function keySetData(key, data) {
        setDataInfo((prev) => ({...prev, [key]: data}))
    }

    function navigate(location) {
            console.log(location)
            navigation.navigate(location)
    }
    
    const navigation = useNavigation()

    const [skill, setSkill] = useState("")

    // Checks
    const validSkillName = skill.length > 0

    // This is split into to major parts, Part 1 is updating the usercontext, and the other is update the user data. It is better to do both at once instead of updating one with the other
    async function UploadData() {
        // Checks if all points of data are passing
        const finalresult = {id: Math.random(), skill: skill}
        if (validSkillName) {
            try {
                // User Context Updater,
                console.log(resumeItems, 1, finalresult)
                if (resumeItems.skills.length == 0) {
                    keySetData('skills', [finalresult])
                    console.log(resumeItems, resumeItems.skills, 2)
                } else {
                    keySetData('skills', [...resumeItems.skills, finalresult])
                    console.log(resumeItems.skills, 3)
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
                    <Text style={styles.ParagraphText}>Enter the skill you want to add</Text>
                    <TextInput placeholder="Skill" onChangeText={text => setSkill(text)}/>
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