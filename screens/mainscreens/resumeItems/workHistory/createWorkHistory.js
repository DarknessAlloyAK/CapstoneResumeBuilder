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


export default function CreateWorkHistoryScreen() {

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

    const [companyName, setCompanyName] = useState("")
    const [jobTitle, setJobTitle] = useState("")
    const [location, setLocation] = useState("")
    const [startEmploymentDate, setStartEmploymentDate] = useState("")
    const [endEmploymentDate, setEndEmploymentDate] = useState("")
    const [learnedSkills, setLearnedSkills] = useState([])

    const [tempSkill, setTempSkill] = useState('')

    // Checks
    const validCompanyName = companyName.length > 0
    const validJobTitle = jobTitle.length > 0
    const validLocation = location.length > 0
    const validStartDate = startEmploymentDate.length >= 3 && startEmploymentDate.includes('/')
    const validEndDate = (endEmploymentDate.length >= 3 && endEmploymentDate.includes('/')) || endEmploymentDate.length == 0

    const currentlyPassing = validCompanyName && validJobTitle && validLocation && validStartDate && validEndDate
    
    const validSkill = tempSkill.length > 0

    function AddSkill() {
        console.log(tempSkill, learnedSkills)
        if (validSkill) {
            if (learnedSkills.length == 0) {
                setLearnedSkills([tempSkill]);
            } else {
                setLearnedSkills([...learnedSkills, tempSkill]);
            }
           
        }
        
    }

    // This is split into to major parts, Part 1 is updating the usercontext, and the other is update the user data. It is better to do both at once instead of updating one with the other
    async function UploadData() {
        // Checks if all points of data are passing
        const finalresult = {id: Math.random(), compName: companyName, jobTitle: jobTitle, location: location, startDate: startEmploymentDate, endDate: endEmploymentDate, skills: learnedSkills}
        if (currentlyPassing) {
            try {
                // User Context Updater,
                console.log(resumeItems, 1, finalresult)
                if (resumeItems.workHistory.length == 0) {
                    keySetData('workHistory', [finalresult])
                    console.log(resumeItems, resumeItems.workHistory, 2)
                } else {
                    keySetData('workHistory', [...resumeItems.workHistory, finalresult])
                    console.log(resumeItems.workHistory, 3)
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
                    <Text style={styles.ParagraphText}>Put the company Name, Location, and your Job Title</Text>
                    <TextInput placeholder="Company Name" onChangeText={text => setCompanyName(text)}/>
                    <TextInput placeholder="Job Title" onChangeText={text => setJobTitle(text)}/>
                    <TextInput placeholder="Location" onChangeText={text => setLocation(text)}/>
                </View>
                <View>
                    <Text style={styles.ParagraphText}>Enter your starting and end dates for your current employeement, if you are still working their, set end to "Now".</Text>
                    <TextInput placeholder="Beginning of Employeement" onChangeText={text => setStartEmploymentDate(text)}/>
                    <TextInput placeholder="End of Employeement" onChangeText={text => setEndEmploymentDate(text)}/>
                </View>
                <View>
                    <Text style={styles.ParagraphText}>Put 1-2 specific things you learned from this job.</Text>
                    <TextInput placeholder="Learned Skills" onChangeText={text => setTempSkill(text)}/>
                    <FlatList data={learnedSkills} renderItem={({item}) => <Text>{item}</Text>} keyExtractor={(item) => item}/>


                    <View style={styles.AddButton}>
                        <Pressable onPress={() => AddSkill()}>
                            <Text style={styles.ButtonText}>Add Skill</Text>
                        </Pressable>
                    </View>
                    
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