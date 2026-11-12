import React from "react";
import { View, Flatlist, Text, Pressable, StyleSheet, useState, useContext} from "react-native";
import { useNavigation } from "@react-navigation/native";
import userContext from "../../../functions/context/userContext";

// Shows all resumes that the user created, and allows for more to be created.

export default function ResumeCreator() {

    const context = useContext(userContext)

    // Navigation
    const navigation = useNavigation()
    function navigate(location) {
        navigation.navigate(location)
    }

    // Checks
    const [page, setPage] = useState(0)

    // Page 0: Select History and Education
    const [history, setHistory] = useState([])
    const [education, setEducation] = useState([])

    // Page 1: Select Skills
    const [skills, setSkills] = useState([])

    // Page 2: Select References
    const [references, setReferences] = useState([])

    // Page 3: Write Summary
    const [summary, setSummary] = useState("")

    // Page 4: Finalize Resume


    // -- // Functions // -- //

    // Page Navigation //
    function nextPage() {
        if (page < 4) {
            setPage(page + 1)
        } else {
            navigate('resumeCreator')
        }
    }

    function previousPage() {
        if (page > 0) {
            setPage(page - 1)
        }
    }

    // -- // Update Functions // -- //
    function updateHistory(data) {
        setHistory([...history, data])
    }
    function updateEducation(data) {
        setEducation([...education, data])
    }
    function updateSkills(data) {
        setSkills([...skills, data])
    }

    return (<View>
        {page === 0 &&
        <View>
            <Text>Select History and Education</Text>
            <View>
                <Flatlist data={context.resumeItems.workHistory} renderItem={({ item }) => (
                    <WorkHistoryDisplay {...item} onSelect={updateHistory} />
                )}/>
            </View>
            <View>
                <Flatlist data={context.resumeItems.education}/>
            </View>
        </View>
        }
        {page === 1 &&
        <View>
            <Text>Select Skills</Text>
            <View>
                <Flatlist data={context.resumeItems.skills}/>
            </View>
        </View>
        }
        {page === 2 &&
        <View>
            <Text>Select References</Text>
            <View>
                <Flatlist data={context.resumeItems.references}/>
            </View>
        </View>
        }
        {page === 3 &&
        <View>
            <Text>Write Summary</Text>
            <View>
                <TextInput placeholder="Write your summary here" onChangeText={text => setSummary(text)}/>
            </View>
        </View>
        }
        {page === 4 &&
        <View>
            <Text>Finalize Resume</Text>
        </View>
        }
    </View>)
}