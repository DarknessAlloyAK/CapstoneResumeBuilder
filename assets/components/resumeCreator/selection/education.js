import React from "react";
import { View, Flatlist, Text, Pressable, StyleSheet, useState } from "react-native";

export default function EducationDisplay(Imports) {
    return (
    <View>
        <Text>{Imports.School}</Text>
        <Text>{Imports.Degree}</Text>
        <View>
            <Text>{Imports.StartDate}</Text>
            <Text>{Imports.EndDate}</Text>
        </View>
        <View>
            <Flatlist data={Imports.LearnedSkills} renderItem={({ item }) => <Text>{item}</Text>}/>
        </View>
        <View>
            <Pressable onPress={() => Imports.onSelect(Imports)}>
                <Text>Select</Text>
            </Pressable>
        </View>
    </View>)
}