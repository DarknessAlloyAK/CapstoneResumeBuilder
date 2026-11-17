import React from "react";
import { View, Flatlist, Text, Pressable, StyleSheet, useState } from "react-native";

export default function EducationDisplay({ id, schoolName, degree, city, state, fieldOfStudy, endSchoolDate, onEdit, deleteItem }) {
    return (
    <View style={styles.background}>
        <Text style={styles.CompanyText}>{schoolName}</Text>
        <Text style={styles.SubtitleText}>{degree}</Text>
        <Text style={styles.SubtitleText}>{city}, {state} - {endSchoolDate}</Text>
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
    background: {
        width: '100%',
        backgroundColor: '#2c3948',
        marginVertical: 5,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    CompanyText: {
        fontSize: 24,
        color: 'white',
        fontWeight: 'bold',
        marginVertical:'auto',
        textAlign: 'center'
    },
    SubtitleText: {
        fontSize: 15,
        color: '#c4c4c4',
        marginVertical:'auto',
        textAlign: 'center'
    },
    SelectButton: {
        backgroundColor: '#425555',
        height: '80%',
        width: '120%',
        margin: 'auto'
    },
    ButtonText: {
        width: '100%',
        height: '100%',
        color: 'white',
        textAlign: 'center',
        alignContent: 'center',
        padding: 5,
        fontWeight: 'bold'
    },
    RemoveButton: {
        backgroundColor: '#4c6968',
        height: '80%',
        width: '120%',
        margin: 'auto'
    }
})

