import React from "react";
import { View, FlatList, Text, Pressable, StyleSheet } from "react-native";

export default function WorkHistoryDisplay({ id, location, compName, jobTitle, startDate, endDate, skills, onEdit, deleteItem }) {
    return (
    <View>
        <Text>{compName}</Text>
        <Text>{jobTitle}</Text>
        <Text>{location}</Text>
        <View>
            <Text>{startDate}</Text>
            <Text>{endDate}</Text>
        </View>
        <View>
            <FlatList data={skills} renderItem={({ item }) => <Text>{item}</Text>}/>
        </View>
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
        color: 'white'
    }
})