import React, { useState, useContext, useEffect } from "react";
import { View, FlatList, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {userContext} from "../../../functions/context/userContext"
import EducationDisplay from "../../../assets/components/resumeCreator/selection/education";
import WorkHistoryDisplay from "../../../assets/components/resumeCreator/selection/workHistorySelect";
import ReferencesDisplay from "../../../assets/components/resumeCreator/selection/references";
import SkillsDisplay from "../../../assets/components/resumeCreator/selection/skills";
import AwardsDisplay from "../../../assets/components/resumeCreator/selection/awards";

// Shows all resumes that the user created, and allows for more to be created.

export default function CreateResumeScreen() {

    const {accountInfo, personalInfo, resumeItems, setDataInfo, resumes, setResumes, updateDatabase} = useContext(userContext)
    // Navigation
    const navigation = useNavigation()
    function navigate(location) {
        navigation.navigate(location)
    }

    // Checks
    const [page, setPage] = useState(0)
    

    // Page 0: Basic Checks
    const [jobTitle, setJobTitle] = useState("")
    const [company, setCompany] = useState("")

    const [firstName, setFirstName] = useState(personalInfo.firstName || '')
    const [lastName, setLastName] = useState(personalInfo.lastName || '')
    const [linkedin, setLinkedin] = useState(personalInfo.linkedin || '')
    const [phonenumber, setPhoneNumber] = useState(personalInfo.phoneNumber || '')

    const validJobTitle = jobTitle.length > 0
    const validFirst = firstName.length > 0
    const validLast = lastName.length > 0
    const validCompany = company.length > 0
    const validPhoneNumber = phonenumber.length == 12
    
    const firstPagePassing = validJobTitle && validFirst && validLast && validCompany && validPhoneNumber
    // Page 0: Select History and Education
    const [history, setHistory] = useState([])
    const [education, setEducation] = useState([])

    const validHistory = history.length > 0
    const validEducation = education.length > 0

    const secondPagePassing = validHistory && validEducation
    // Page 1: Select Skills
    const [skills, setSkills] = useState([])
    const [awards, setAwards] = useState([])

    const thirdPagePassing = skills.length > 0
    
    // Page 2: Select References
    const [references, setReferences] = useState([])

    const forthPagePassing = references.length > 0
    // Page 3: Write Summary
    const [summary, setSummary] = useState("")

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
        console.log(personalInfo)
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
        ? previous.filter((item) => item.id !== data.id)
        : [...previous, data])
    }
    function updateSkills(data) {
        setSkills((previous) => previous.some((item) => item.id === data.id)
        ? previous.filter((item) => item.id !== data.id)
        : [...previous, data])
    }
    function updateAwards(data) {
        setAwards((previous) => previous.some((item) => item.id === data.id)
        ? previous.filter((item) => item.id !== data.id)
        : [...previous, data])
    }

    useEffect(() => {
            const unsubscribe = navigation.addListener('blur', () => {
                setPage(0);
                setJobTitle('');
                setCompany('');
                setFirstName(personalInfo.firstName ?? '');
                setLastName(personalInfo.lastName ?? '');
                setLinkedin(personalInfo.linkedin ?? '');
                setPhoneNumber(personalInfo.phoneNumber ?? '');
                setHistory([]);
                setEducation([]);
                setSkills([]);
                setAwards([]);
                setReferences([]);
                setSummary('');
            });
    
      return unsubscribe;
    }, [navigation, personalInfo]);
    

    async function UploadData() {
        const finalresult = {details: {
            firstName: firstName,
            lastName: lastName,
            jobTitle: jobTitle,
            LinkedIn: linkedin,
            phonenumber: phonenumber,
            summary: summary,
            email: accountInfo.email,
            id: Math.random(),
            company: company
        }, resumeItems: {
            skills: skills,
            references: references,
            history: history,
            education: education,
            awards: awards
        }}

        const existingResumes = Array.isArray(resumes)
            ? resumes
            : Object.values(resumes ?? {})
        const updatedResumes = [...existingResumes, finalresult]

        try {
            await updateDatabase({path: 'Resumes', data: updatedResumes})
            setResumes(updatedResumes)
            setPage(0)
            navigation.goBack()
        } catch (error) {
            console.error("Could not save resume:", error.response?.data ?? error.message)
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
                <View style= {styles.NameInputHolder}>
                    <TextInput style={styles.input} value={company} onChangeText={text => setCompany(text)} />
                    <TextInput style={styles.input} value={jobTitle} onChangeText={text => setJobTitle(text)} />
                </View>
                <View style={styles.NameInputHolder}>
                    <Text style={styles.NameLabels}>First Name</Text>
                    <Text style={styles.NameLabels}>Last Name</Text>
                </View>
                <View style={styles.NameInputHolder}>
                    <TextInput style={styles.input} value={firstName} onChangeText={text => setFirstName(text)} />
                    <TextInput style={styles.input} value={lastName} onChangeText={text => setLastName(text)} />
                </View>
                <Text style={styles.OtherLabels}>Phone Number</Text>
                <TextInput style={styles.input} value={phonenumber} onChangeText={text => setPhoneNumber(text)} />              
                <Text style={styles.OtherLabels}>{`(Optional)`} Linkedin</Text>
                <TextInput style={styles.input} value={linkedin} onChangeText={text => setLinkedin(text)} />
            </View>     
        </View>
        }
        {page === 1 &&
        <View style={styles.Thing}>
            <Text style={styles.title}>Select History and Education</Text>
            <Text style={styles.ListLabels}>Select Relevant Work History</Text>
            <View style={styles.MainFlatList}>
                <FlatList  data={resumeItems.workHistory} keyExtractor={(item) => String(item.id)} renderItem={({ item }) => (
                    <WorkHistoryDisplay {...item} isSelected={history.some((selected) => selected.id === item.id)} onSelect={updateHistory} />
                )}/>
            </View>
            <Text style={styles.ListLabels}>Select Relevant Education</Text>
            <View style={styles.MainFlatList}>
                <FlatList  data={resumeItems.education} keyExtractor={(item) => String(item.id)} renderItem={({ item }) => (
                    <EducationDisplay {...item} isSelected={education.some((selected) => selected.id === item.id)} onSelect={updateEducation} />
                )}/>
            </View>
        </View>
        }
        {page === 2 &&
        <View style={styles.Thing}>
            <Text style={styles.title}>Select Skills</Text>
            <Text style={styles.ListLabels}>Select 8-10 Skills. Mix Soft and Technical Skills</Text>
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
            <Text style={styles.ListLabels}>Select 3-5 relevant references</Text>
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
                    multiline
                    textAlignVertical="top"
                    onChangeText={text => setSummary(text)}
                />
            </View>
        </View>
        }
        {page === 5 &&
        <View style={styles.Thing}>
            <Text style={styles.title}>Finalize Resume</Text>
            <Text style={styles.ListLabels}>{`(Optional)`} Add a few awards to spice it up</Text>
            <View style={styles.MainFlatList}>
                <FlatList data={resumeItems.awards} keyExtractor={(item) => (String(item.id))} renderItem={({item}) => (
                        <AwardsDisplay {...item} isSelected={awards.some((selected) => selected.id === item.id)} onSelect={updateAwards}/> 
                )}/>
            </View>
        </View> 
        } <View style={styles.buttonHolders}>
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
    Thing: {
        width: '100%',
        height: '100%'
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
        width: "80%",
        height: "25%",
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
    mainSection: {
        width: '45%',
        height: '100%',
        backgroundColor: '#15182a',
        margin: 'auto',
        borderRadius: 0,
        outlineColor: '#ffffff',
        outlineStyle: 'solid',
        outlineWidth: 3
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
        color: 'white'
    },
    MainFlatList: {
        width: '95%',
        height: '25%',
        borderWidth: 3,
        borderColor: '#0f111e',
        marginHorizontal: 'auto',
        backgroundColor: '#181d32'
    }
})