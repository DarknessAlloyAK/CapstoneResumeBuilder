import React from "react";
import { View, FlatList, Text, Pressable, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useContext, useState } from "react";
import {userContext} from "../../functions/context/userContext";
import JobListingDisplay from "../../assets/components/jobListing/joblisting";
// Shows all resumes that the user created, and allows for more to be created.

export default function JobListingCreator() {

    const {jobListings, setJobListings, updateDatabase} = useContext(userContext)


    async function deleteJobListing(id) {
        setJobListings(resumes.filter((item) => item.id !== id))
        updateDatabase({path: 'jobListings', data: jobListings.filter((item) => item.id !== id)})
    } 

    // Navigation
    const navigation = useNavigation()
    function navigate(location) {
        navigation.navigate(location)
    }


    return (<View style={styles.background}>
        <View style={styles.mainSection}>
            <Text style={styles.title}>Job Listing</Text>
            <FlatList style={styles.MainFlatList} data={jobListings} keyExtractor={(item) => String(item.id)} renderItem={({item}) => (
                <JobListingDisplay item={item}
                onEdit={() => navigation.navigate('editlisting', item)} 
                onDelete={() => deleteJobListing(item.id)}/>
            )
            }/>
            <Pressable style={styles.AddButton} onPress={() => navigate("createjoblisting")}>
                <Text style={styles.ButtonText}>+ Add Resume</Text>
            </Pressable>
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
        width: '25%',
        height: '5%',
        marginHorizontal: 'auto',
        marginBottom: '5%',
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
        height: '65%',
        borderWidth: 3,
        borderColor: '#0f111e',
        margin: 'auto',
        backgroundColor: '#181d32'
    }
})