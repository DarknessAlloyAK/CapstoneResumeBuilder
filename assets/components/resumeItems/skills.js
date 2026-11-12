import React from "react";
import { View, Flatlist, Text, Pressable, StyleSheet, useState } from "react-native";

export default function SkillsDisplay({ id, skill, onEdit, deleteItem }) {
    return (
    <View>
        <Text>{skill}</Text>
        <View>
            <View>
                <Pressable style={styles.EditButton} onPress={() => onEdit(id)}>
                    <Text style={styles.ButtonText}>Edit</Text>
                </Pressable>
            </View>
            <View>
                <Pressable style={styles.DeleteButton} onPress={() => deleteItem(Imports.id)}>
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