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


export default function EditWorkHistoryScreen({ route }) {

    // Additional Possibilities, Add Removing Skill Items



    const {resumeItems, setDataInfo, updateDatabase} = useContext(userContext)
    const entry = route?.params ?? {}

    function navigate(location) {
            console.log(location)
            navigation.navigate(location)
    }
    
    const navigation = useNavigation()

    const [companyName, setCompanyName] = useState(entry.compName ?? '')
    const [jobTitle, setJobTitle] = useState(entry.jobTitle ?? '')
    const [location, setLocation] = useState(entry.location ?? '')
    const [startEmploymentDate, setStartEmploymentDate] = useState(entry.startDate ?? '')
    const [endEmploymentDate, setEndEmploymentDate] = useState(entry.endDate ?? '')
    const [learnedSkills, setLearnedSkills] = useState(entry.skills ?? [])

    const [tempSkill, setTempSkill] = useState('')

    // Checks
    const validCompanyName = companyName.length > 0
    const validJobTitle = jobTitle.length > 0
    const validLocation = location.length > 0
    const validStartDate = startEmploymentDate.trim().length > 0
    const validEndDate = endEmploymentDate.trim().length > 0 || endEmploymentDate.length === 0

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

    function removeSkillAt(indexToRemove) {
        setLearnedSkills((previous) => previous.filter((_, index) => index !== indexToRemove))
    }

    // This is split into to major parts, Part 1 is updating the usercontext, and the other is update the user data. It is better to do both at once instead of updating one with the other
    async function UploadData() {
        // Checks if all points of data are passing
        const finalresult = {id: entry.id, compName: companyName, jobTitle: jobTitle, location: location, startDate: startEmploymentDate, endDate: endEmploymentDate, skills: learnedSkills}
        if (currentlyPassing) {
            try {
                const updatedWorkHistory = (resumeItems.workHistory ?? []).map((item) =>
                    item.id === entry.id ? finalresult : item
                )
                await updateDatabase({path: 'Data/workHistory', data: updatedWorkHistory})
                setDataInfo((previous) => ({...previous, workHistory: updatedWorkHistory}))
                navigation.goBack()
            } catch (error) {
                console.error("Could not update work history:", error.response?.data ?? error.message)
            }
            
        } else {
            // Send out an error
        }
    }

    return (
        <View style={styles.background}>
            <View style={styles.mainSection}>
                <View>
                    <Text style={styles.title}>Edit Work History</Text>
                    <View style={styles.NameInputHolder}>
                        <Text style={styles.NameLabels}>Company</Text>
                        <Text style={styles.NameLabels}>Job Title</Text>
                    </View>
                    <View style={styles.NameInputHolder}>
                        <TextInput style={styles.input} value={companyName} placeholder="Company Name" onChangeText={setCompanyName}/>
                        <TextInput style={styles.input} value={jobTitle} placeholder="Job Title" onChangeText={setJobTitle}/>
                    </View>
                    <Text style={styles.OtherLabels}>Location: City, ST</Text>
                    <TextInput style={styles.input} value={location} placeholder="Location" onChangeText={setLocation}/>
                </View>
                <View>
                    <View style={styles.NameInputHolder}>
                        <Text style={styles.NameLabels}>Start Date</Text>
                        <Text style={styles.NameLabels}>End Date</Text>
                    </View>
                    <View style={styles.NameInputHolder}>
                        <TextInput style={styles.input} value={startEmploymentDate} placeholder="Month Year" onChangeText={setStartEmploymentDate}/>
                        <TextInput style={styles.input} value={endEmploymentDate} placeholder="Month Year or Now" onChangeText={setEndEmploymentDate}/>
                    </View>
                </View>
                <View>
                    <Text style={styles.ListLabels}>Specific skills gained from this job</Text>
                    <TextInput value={tempSkill} placeholder="Type Skill Here" style={styles.input} onChangeText={setTempSkill}/>
                    <Pressable onPress={AddSkill} style={styles.AddButton}>
                        <Text style={styles.ButtonText}>Add Skill</Text>
                    </Pressable>
                    <View style={styles.MainFlatList}>
                                            <FlatList style={styles.SkillsFlatList} data={learnedSkills} keyExtractor={(_, index) => String(index)} renderItem={({item, index}) => 
                                            <View style={styles.NameInputHolder}>
                                                <Text style={styles.displayText}>{item}</Text>
                                                <Pressable style={styles.DeleteSkillButton} accessibilityRole="button" accessibilityLabel={`Remove ${item}`} onPress={() => removeSkillAt(index)}>
                                                    <Text style={styles.ButtonText}>Remove</Text>
                                                </Pressable>
                                            </View>} 
                                            />
                                        </View>
                </View>
                <Pressable onPress={UploadData} style={styles.MenuButton}>
                    <Text style={styles.ButtonText}>Change</Text>
                </Pressable>
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
        marginTop: '4%',
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