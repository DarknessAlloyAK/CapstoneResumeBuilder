import React from "react";
import { View, Flatlist, Text, Pressable, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

// Shows all resumes that the user created, and allows for more to be created.

export default function ResumeCreator() {

    // Navigation
    const navigation = useNavigation()
    function navigate(location) {
        navigation.navigate(location)
    }


    return (<View>
        
    </View>)
}