import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

export default function JobListingDisplay({ item, onEdit, onDelete }) {
    return (
        <View style={styles.background}>
            <Text style={styles.CompanyText}>{item.company} | {item.jobTitle}</Text>
            <Text style={styles.SubtitleText}>{item.notes}</Text>
            <View style={styles.ButtonHolder}>
                <View style={styles.ButtonScale}>
                    <Pressable style={styles.EditButton} onPress={() => onEdit(item)}>
                        <Text style={styles.ButtonText}>Edit</Text>
                    </Pressable>
                </View>
                <View style={styles.ButtonScale}>
                    <Pressable style={styles.DeleteButton} onPress={() => onDelete(item)}>
                        <Text style={styles.ButtonText}>Delete</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: '#2c3948',

    },
    ButtonHolder: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '50%',
        marginHorizontal: 'auto'
    },
    CompanyText: {
        fontSize: 24,
        color: 'white',
        fontWeight: 'bold'
    },
    SubtitleText: {
        fontSize: 12,
        color: '#c4c4c4',
        marginBottom: 20
    },
    ButtonScale: {
        width: 60,
        height: 30
    },
    ButtonText: {
        textAlign:'center',
        fontSize: 15,
        textAlignVertical: 'center',
        color: 'white',
        alignContent: 'center'
    },
    EditButton: {
        backgroundColor: 'blue',
        width: 60,
        height: 20
    },
    DeleteButton: {
        backgroundColor: 'red',
        width: 60,
        height: 20
    },
})