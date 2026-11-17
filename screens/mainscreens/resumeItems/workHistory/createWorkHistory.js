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

    const {resumeItems, setDataInfo, updateDatabase} = useContext(userContext)

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
    const [startEmploymentYear, setStartEmploymentYear] = useState("")
    const [startEmploymentMonth, setStartEmploymentMonth] = useState("")
    const [endEmploymentYear, setEndEmploymentYear] = useState("")
    const [endEmploymentMonth, setEndEmploymentMonth] = useState("")
    const [learnedSkills, setLearnedSkills] = useState([])

    const [tempSkill, setTempSkill] = useState('')

    // Checks
    const validCompanyName = companyName.length > 0
    const validJobTitle = jobTitle.length > 0
    const validLocation = location.length > 0
    const validStartDate = startEmploymentMonth.length >= 3 && startEmploymentYear.length == 4
    const validEndDate = endEmploymentMonth.length >= 3 && endEmploymentYear.length == 4

    const currentlyPassing = validCompanyName && validJobTitle && validLocation && validStartDate && validEndDate
    
    const validSkill = tempSkill.length > 0

    function AddSkill() {
        setTempSkill('')
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
        const finalresult = {id: Math.random(), compName: companyName, jobTitle: jobTitle, location: location, startDate: `${startEmploymentMonth} ${startEmploymentYear}`, endDate: `${endEmploymentMonth} ${endEmploymentYear}`, skills: learnedSkills}
        if (currentlyPassing) {
            try {
                // User Context Updater,
                console.log(resumeItems, 1, finalresult)
                if (resumeItems.workHistory.length == 0) {
                    const updatedWorkHistory = [finalresult];
                    keySetData('workHistory', updatedWorkHistory)
                    await updateDatabase({path: 'Data/workHistory', data: updatedWorkHistory})
                } else {
                    const updatedWorkHistory = [...resumeItems.workHistory, finalresult];
                    keySetData('workHistory', updatedWorkHistory)
                    await updateDatabase({path: 'Data/workHistory', data: updatedWorkHistory})
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
            <View style={styles.mainSection}>
                <View>
                    <Text style={styles.title}>Create New History</Text>
                    <View style={styles.NameInputHolder}>
                        <Text style={styles.NameLabels}>Company</Text>
                        <Text style={styles.NameLabels}>Job Title</Text>
                    </View>
                    <View style= {styles.NameInputHolder}>
                        <TextInput style={styles.input} value={companyName} onChangeText={text => setCompanyName(text)} />
                        <TextInput style={styles.input} value={jobTitle} onChangeText={text => setJobTitle(text)} />
                    </View>
                    <Text style={styles.OtherLabels}>Location: City, ST</Text>
                    <TextInput style={styles.input} onChangeText={text => setLocation(text)}/>
                </View>
                <View>
                    <View style={styles.NameInputHolder}>
                        <Text style={styles.NameLabels}>Start Year of Employeement: YYYY</Text>
                        <Text style={styles.NameLabels}>Start Month of Employeement</Text>
                    </View>
                    <View style={styles.NameInputHolder}>
                        <TextInput style={styles.input} placeholder="YYYY" onChangeText={text => setStartEmploymentYear(text)}/>
                        <TextInput style={styles.input} placeholder="Full Month" onChangeText={text => setStartEmploymentMonth(text)}/>
                    </View>
                    <View style={styles.NameInputHolder}>
                        <Text style={styles.NameLabels}>End Year of Employeement: YYYY</Text>
                        <Text style={styles.NameLabels}>End Month of Employeement</Text>
                    </View>
                    <View style={styles.NameInputHolder}>
                        <TextInput style={styles.input} placeholder="YYYY" onChangeText={text => setEndEmploymentYear(text)}/>
                        <TextInput style={styles.input} placeholder="Full Month" onChangeText={text => setEndEmploymentMonth(text)}/>
                    </View>
                </View>
                <View>
                    <Text style={styles.ListLabels}>Put 1-2 specific things you skills you gained from this job.</Text>
                    <TextInput value={tempSkill} placeholder="Type Skill Here" style={styles.input} onChangeText={text => setTempSkill(text)}/>
                        <Pressable onPress={() => AddSkill()} style={styles.AddButton}>
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
                <Pressable onPress={() => UploadData()} style={styles.MenuButton}>
                    <Text style={styles.ButtonText}>Create</Text>
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
    displayText:{
        color: 'white'
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
    DateHolder: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        height: 30
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
    section: {
        width: '15%',
        height: '30%',
        backgroundColor: '#1e1d2a',
        marginLeft: '50%',
        borderRadius: 0,
        outlineColor: '#ffffff',
        outlineStyle: 'solid',
        outlineWidth: 3
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
    menuContent: {
        width: '100%',
        height: '100%',
    },
    sectionHeader: {
        textAlign: 'center',
        width: '100%',
        height: '5%',
        fontSize: 30,
        fontWeight: 'bold',
        color: '#ffffff',
        marginTop: 10,
        marginBottom: '5%'
    },
    AddButton: {
        backgroundColor: '#293155',
        width: 100,
        height: 30,
        marginHorizontal: 'auto',
        borderRadius: 0
    },
    ParagraphText: {
        fontSize: 18,
        color: 'white'
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
    Thing: {
        width: '100%',
        height: '100%'
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        marginTop: '5%',
        marginBottom: '2%'
    },
})