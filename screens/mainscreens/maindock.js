import React from "react";
import { View, Text, Button } from "react-native";
import GenerateDocument from "../../functions/exports/resumeDocCreator";


export default function MainDockScreen() {
    return (<View>
        <Text>Test</Text>
        <Button title="Generate Document" onPress={() => GenerateDocument()} />
    </View>)
}