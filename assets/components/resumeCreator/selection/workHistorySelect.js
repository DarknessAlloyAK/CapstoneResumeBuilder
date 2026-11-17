import React from "react";
import { View, FlatList, Text, Pressable, StyleSheet } from "react-native";

export default function WorkHistoryDisplay(Imports) {
    return (
    <View style={styles.background}>
        <View>
            <Text style={styles.CompanyText}>{Imports.compName}</Text>
            <Text style={styles.SubtitleText}>{Imports.jobTitle} | {Imports.startDate} - {Imports.endDate}</Text>
        </View>
        <View>
            <Pressable style={Imports.isSelected ? styles.RemoveButton : styles.SelectButton} onPress={() => Imports.onSelect(Imports)}>
                <Text style={styles.ButtonText}>{Imports.isSelected ? "Remove" : "Select"}</Text>
            </Pressable>
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
        fontWeight: 'bold'
    },
    SubtitleText: {
        fontSize: 15,
        color: '#c4c4c4'
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