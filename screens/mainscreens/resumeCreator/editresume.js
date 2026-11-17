import React, { useState, useContext } from "react";
import { View, FlatList, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {userContext} from "../../../functions/context/userContext"
import EducationDisplay from "../../../assets/components/resumeCreator/selection/education";
import WorkHistoryDisplay from "../../../assets/components/resumeCreator/selection/workHistorySelect";
import ReferencesDisplay from "../../../assets/components/resumeCreator/selection/references";
import SkillsDisplay from "../../../assets/components/resumeCreator/selection/skills";
import AwardsDisplay from "../../../assets/components/resumeCreator/selection/awards";

// Shows all resumes that the user created, and allows for more to be created.

export default function EditResumeScreen({ route }) {


    const entry = route?.params?? {}
    const {personalInfo, resumeItems, setDataInfo, resumes, setResumes, updateDatabase} = useContext(userContext)
    // Navigation
    const navigation = useNavigation()
    function navigate(location) {
        navigation.navigate(location)
    }

    // Checks
    const [page, setPage] = useState(0)
    

    // Page 0: Basic Checks
    const details = entry.details ?? {}
    const resumeItemsForEntry = entry.resumeItems ?? {}

    const [jobTitle, setJobTitle] = useState(details.jobTitle ?? '')
    const [company, setCompany] = useState(details.company ?? '')

    const [firstName, setFirstName] = useState(details.firstName ?? '')
    const [lastName, setLastName] = useState(details.lastName ?? '')
    const [linkedin, setLinkedin] = useState(details.linkedin ?? details.LinkedIn ?? '')
    const [phonenumber, setPhoneNumber] = useState(details.phonenumber ?? details.phoneNumber ?? '')

    const validJobTitle = jobTitle.length > 0
    const validFirst = firstName.length > 0
    const validLast = lastName.length > 0
    
    const firstPagePassing = validJobTitle && validFirst && validLast
    // Page 0: Select History and Education
    const [history, setHistory] = useState(resumeItemsForEntry.history ?? [])
    const [education, setEducation] = useState(resumeItemsForEntry.education ?? [])

    const validHistory = history.length > 0
    const validEducation = education.length > 0

    const secondPagePassing = validHistory && validEducation
    // Page 1: Select Skills
    const [skills, setSkills] = useState(resumeItemsForEntry.skills ?? [])
    const [awards, setAwards] = useState(resumeItemsForEntry.awards ?? [])

    const thirdPagePassing = skills.length > 0
    
    // Page 2: Select References
    const [references, setReferences] = useState(resumeItemsForEntry.references ?? [])

    const forthPagePassing = references.length > 0
    // Page 3: Write Summary
    const [summary, setSummary] = useState(details.summary ?? '')

    const fifthPagePassing = summary.length > 10
    // Page 4: Finalize Resume

    // Main Check
    var setCheck = firstPagePassing
    // -- // Functions // -- //

    // Page Navigation //
    function nextPage() {
        if (page < 5) {
            setPage(page + 1)
            currentCheck()
        }
        
    }

    function previousPage() {
        if (page > 0) {
            setPage(page - 1)
        }
        currentCheck()
    }

    function currentCheck() {
        if (page === 0) {
            setCheck = firstPagePassing
        } else if (page === 1) {
            setCheck = secondPagePassing
        } else if (page === 2) {
            setCheck = thirdPagePassing
        } else if (page === 3) {
            setCheck = forthPagePassing            
        } else if (page === 4) {
            setCheck = fifthPagePassing
        } else if (page === 5) {
            
        }
    }

    // -- // Update Functions // -- //
    function updateHistory(data) {
        setHistory((previous) => previous.some((item) => item.id === data.id)
            ? previous.filter((item) => item.id !== data.id)
            : [...previous, data])
    }
    function updateEducation(data) {
        setEducation((previous) => previous.some((item) => item.id === data.id)
            ? previous.filter((item) => item.id !== data.id)
            : [...previous, data])
    }

    function updateReferences(data) {
        setReferences((previous) => previous.some((item) => item.id === data.id)
        ? previous.filiter((item) => item.id !== data.id)
        : [...previous, data])
    }

    function updateAwards(data) {
        setAwards((previous) => previous.some((item) => item.id === data.id)
        ? previous.filiter((item) => item.id !== data.id)
        : [...previous, data])
    }

    function updateSkills(data) {
        setSkills((previous) => previous.some((item) => item.id === data.id)
        ? previous.filiter((item) => item.id !== data.id)
        : [...previous, data])
    }

    async function UploadData() {
        const finalresult = {details: {
            firstName: firstName,
            lastName: lastName,
            company: company,
            jobTitle: jobTitle,
            LinkedIn: linkedin,
            phonenumber: phonenumber,
            summary: summary,
            id: entry.details.id
        }, resumeItems: {
            skills: skills,
            references: references,
            history: history,
            education: education,
            awards: awards
        }}

        const updatedResumes = resumes.map((item) =>
            item.details.id === entry.details.id ? finalresult : item
        )

        try {
            await updateDatabase({path: 'resumes', data: updatedResumes})
            setResumes(updatedResumes)
            navigation.goBack()
        } catch (error) {
            console.error("Could not update resume:", error.response?.data ?? error.message)
        }
    }  

    return (
    <View style={styles.background}>
        <View style={styles.mainSection}>
        {page === 0 &&
        <View style={styles.Thing}>
            <Text style={styles.title}>Basic Checks</Text>
            <View>
                <View style={styles.NameInputHolder}>
                    <Text style={styles.NameLabels}>Company</Text>
                    <Text style={styles.NameLabels}>Job Title</Text>
                </View>
                <View style={styles.NameInputHolder}>
                    <TextInput style={styles.input} value={company} placeholder="Company" onChangeText={setCompany} />
                    <TextInput style={styles.input} value={jobTitle} placeholder="Job Title" onChangeText={setJobTitle} />
                </View>
                <View style={styles.NameInputHolder}>
                    <Text style={styles.NameLabels}>First Name</Text>
                    <Text style={styles.NameLabels}>Last Name</Text>
                </View>
                <View style={styles.NameInputHolder}>
                    <TextInput style={styles.input} value={firstName} placeholder="First Name" onChangeText={setFirstName} />
                    <TextInput style={styles.input} value={lastName} placeholder="Last Name" onChangeText={setLastName} />
                </View>
                <Text style={styles.OtherLabels}>Phone Number</Text>
                <TextInput style={styles.input} value={phonenumber} placeholder="Phone Number" onChangeText={setPhoneNumber} />
                <Text style={styles.OtherLabels}>(Optional) LinkedIn</Text>
                <TextInput style={styles.input} value={linkedin} placeholder="LinkedIn" onChangeText={setLinkedin} />
            </View>     
        </View>
        }
        {page === 1 &&
        <View style={styles.Thing}>
            <Text style={styles.title}>Select History and Education</Text>
            <Text style={styles.ListLabels}>Select Relevant Work History</Text>
            <View style={styles.MainFlatList}>
                <FlatList data={resumeItems.workHistory} keyExtractor={(item) => String(item.id)} renderItem={({ item }) => (
                    <WorkHistoryDisplay {...item} isSelected={history.some((selected) => selected.id === item.id)} onSelect={updateHistory} />
                )}/>
            </View>
            <Text style={styles.ListLabels}>Select Relevant Education</Text>
            <View style={styles.MainFlatList}>
                <FlatList data={resumeItems.education} keyExtractor={(item) => String(item.id)} renderItem={({ item }) => (
                    <EducationDisplay {...item} isSelected={education.some((selected) => selected.id === item.id)} onSelect={updateEducation} />
                )}/>
            </View>
        </View>
        }
        {page === 2 &&
        <View style={styles.Thing}>
            <Text style={styles.title}>Select Skills</Text>
            <Text style={styles.ListLabels}>Select relevant skills</Text>
            <View style={styles.MainFlatList}>
                <FlatList data={resumeItems.skills} keyExtractor={(item) => (String(item.id))} renderItem={({item}) => (
                    <SkillsDisplay {...item} isSelected={skills.some((selected) => selected.id === item.id)} onSelect={updateSkills}/>
                )}/>
            </View>
        </View>
        }
        {page === 3 &&
        <View style={styles.Thing}>
            <Text style={styles.title}>Select References</Text>
            <Text style={styles.ListLabels}>Select relevant references</Text>
            <View style={styles.MainFlatList}>
                <FlatList data={resumeItems.references} keyExtractor={(item) => (String(item.id))} renderItem={({item}) => (
                    <ReferencesDisplay {...item} isSelected={references.some((selected) => selected.id === item.id)} onSelect={updateReferences}/> 
                )}/>
            </View>
        </View>
        }
        {page === 4 &&
        <View style={styles.Thing}>
            <Text style={styles.title}>Write Summary</Text>
            <Text style={styles.ListLabels}>Write a 4-5 sentence paragraph summary.</Text>
            <View style={styles.summaryHolder}>
                <TextInput
                    style={styles.summaryInput}
                    value={summary}
                    placeholder="Write your summary here"
                    multiline
                    textAlignVertical="top"
                    onChangeText={setSummary}
                />
            </View>
        </View>
        }
        {page === 5 &&
        <View style={styles.Thing}>
            <Text style={styles.title}>Finalize Resume</Text>
            <Text style={styles.ListLabels}>(Optional) Add a few awards to spice it up</Text>
            <View style={styles.MainFlatList}>
                <FlatList data={resumeItems.awards} keyExtractor={(item) => (String(item.id))} renderItem={({item}) => (
                    <AwardsDisplay {...item} isSelected={awards.some((selected) => selected.id === item.id)} onSelect={updateAwards}/> 
                )}/>
            </View>
        </View>
        }
        <View style={styles.buttonHolders}>
            {(page > 0 && setCheck) &&
            <Pressable style={styles.AddButton} onPress={previousPage}>
                <Text style={styles.ButtonText}>Previous</Text>
            </Pressable>
            }
            {(page < 5 && setCheck) &&
            <Pressable style={styles.AddButton} onPress={nextPage}>
                <Text style={styles.ButtonText}>Next</Text>
            </Pressable>
            }
            {page === 5 &&
            <Pressable style={styles.AddButton} onPress={UploadData}>
                <Text style={styles.ButtonText}>Finish</Text>
            </Pressable>
            }
        </View>
        </View>
    </View>)
}

const styles = StyleSheet.create({
    background: {
        width: '100%',
        height: '100%',
        backgroundColor: '#0b0e17',
        flexDirection: 'row',
        display: 'flex',
    },
    Thing: {
        width: '100%',
        height: '100%'
    },
    mainSection: {
        width: '45%',
        height: '100%',
        backgroundColor: '#15182a',
        margin: 'auto',
    },
    buttonHolders: {
        display: 'flex',
        flexDirection: 'row',
        width: '90%',
        marginHorizontal: 'auto',
        justifyContent: 'space-between',
        marginVertical: '-20%'
    },
    summaryHolder: {
        width: '80%',
        height: '25%',
        marginHorizontal: 'auto',
        backgroundColor: '#121823',
    },
    summaryInput: {
        width: '100%',
        height: '100%',
        color: 'white',
        padding: 5,
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
    AddButton: {
        backgroundColor: '#293155',
        minWidth: '25%',
        height: 36,
        marginHorizontal: 'auto',
        marginBottom: '5%',
        borderRadius: 0,
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    ButtonText: {
        textAlign: 'center',
        alignContent: 'center',
        width: '100%',
        height: '100%',
        fontSize: 15,
        color: 'white',
        textAlignVertical: 'center',
    },
    MainFlatList: {
        width: '95%',
        height: '25%',
        borderWidth: 3,
        borderColor: '#0f111e',
        marginHorizontal: 'auto',
        backgroundColor: '#181d32'
    },
})