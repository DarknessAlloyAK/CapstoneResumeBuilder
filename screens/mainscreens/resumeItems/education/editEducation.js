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


export default function EditEducationScreen({ route }) {

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

    const [schoolName, setSchoolName] = useState(entry.schoolName ?? '')
    const [degree, setDegree] = useState(entry.degree ?? '')
    const [state, setState] = useState(entry.state ?? '')
    const [city, setCity] = useState(entry.city ?? '')
    const [endSchoolDate, setEndSchoolDate] = useState(entry.endSchoolDate ?? '')


    // Checks
    const validSchoolName = schoolName.length > 0
    const validDegree = degree.length > 0
    const validState = state.length > 0
    const validCity = city.length > 0
    const validEndSchoolDate = endSchoolDate.length == 4

    const currentlyPassing = validSchoolName && validDegree && validState && validCity && validEndSchoolDate

    // This is split into to major parts, Part 1 is updating the usercontext, and the other is update the user data. It is better to do both at once instead of updating one with the other
    async function UploadData() {
        // Checks if all points of data are passing
        const finalresult = {id: entry.id, schoolName: schoolName, degree: degree, state: state, city: city, endSchoolDate: endSchoolDate}
        if (currentlyPassing) {
            try {
                // User Context Updater,
                keySetData('education', finalresult)
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
                    <Text style={styles.ParagraphText}>Enter your school name and degree</Text>
                    <TextInput value={schoolName} placeholder="School Name" onChangeText={text => setSchoolName(text)}/>
                    <TextInput value={degree} placeholder="Degree" onChangeText={text => setDegree(text)}/>
                </View>
                <View>
                    <Text style={styles.ParagraphText}>Enter your school location</Text>
                    <TextInput value={state} placeholder="State" onChangeText={text => setState(text)}/>
                    <TextInput value={city} placeholder="City" onChangeText={text => setCity(text)}/>
                </View>
                <View>
                    <Text style={styles.ParagraphText}>Enter your school end date</Text>
                    <TextInput value={endSchoolDate} placeholder="End of Schooling (YYYY)" onChangeText={text => setEndSchoolDate(text)}/>
                </View>
                <View style={styles.AddButton}>
                    <Pressable onPress={() => UploadData()}>
                        <Text style={styles.ButtonText}>Change</Text>
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