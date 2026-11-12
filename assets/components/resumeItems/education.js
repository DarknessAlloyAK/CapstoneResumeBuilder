import React from "react";
import { View, Flatlist, Text, Pressable, StyleSheet, useState } from "react-native";

export default function EducationDisplay({ id, schoolName, degree, city, state, fieldOfStudy, endSchoolDate, onEdit, deleteItem }) {
    return (
    <View>
        <Text>{schoolName}</Text>
        <Text>{degree}</Text>
        <Text>{fieldOfStudy}</Text>
        <Text>{city} {state}</Text>
        <Text>{endSchoolDate}</Text>
        <View>
            <View>
                <Pressable style={styles.EditButton} onPress={() => onEdit(id)}>
                    <Text style={styles.ButtonText}>Edit</Text>
                </Pressable>
            </View>
            <View>
                <Pressable style={styles.DeleteButton} onPress={() => deleteItem(id)}>
                    <Text style={styles.ButtonText}>Delete</Text>
                </Pressable>
            </View>
        </View>
    </View>)
}

const styles = StyleSheet.create({
    EditButton: {
        backgroundColor: 'blue'
    },
    DeleteButton: {
        backgroundColor: 'red'
    },
    ButtonText: {
        color: 'white',
        textAlign: 'center'
    }
})