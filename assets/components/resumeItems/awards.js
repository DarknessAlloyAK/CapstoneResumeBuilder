import React from "react";
import { View, Flatlist, Text, Pressable, StyleSheet, useState } from "react-native";

export default function AwardsDisplay({ id, award, onEdit, deleteItem }) {
    return (
    <View>
        <Text>{award}</Text>

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