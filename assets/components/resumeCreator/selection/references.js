import React from "react";
import { View, Flatlist, Text, Pressable, StyleSheet, useState } from "react-native";

export default function ReferencesDisplay(Imports) {
    return (
    <View>
        <Text>{Imports.Name}</Text>
        <Text>{Imports.Relationship}</Text>
        <Text>{Imports.PhoneNumber}</Text>
        <Text>{Imports.Email}</Text>
        <View>
            <Pressable onPress={() => Imports.onSelect(Imports)}>
                <Text>Select</Text>
            </Pressable>
        </View>
    </View>)
}