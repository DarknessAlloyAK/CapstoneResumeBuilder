import React from "react";
import { View } from "react-native";
import { createStackNavigator } from '@react-navigation/stack';

// Navigation Stack
const Stack = createStackNavigator()

import SelectMenu from "./resumeItems/selectMenu";
import CreateWorkHistoryScreen from "./resumeItems/workHistory/createWorkHistory";
import EditWorkHistoryScreen from "./resumeItems/workHistory/editWorkHistory";
import CreateEducationScreen from "./resumeItems/education/createEducation";
import editEducationScreen from "./resumeItems/education/editEducation";
import createAwardsScreen from "./resumeItems/awards/createAwards";
import editAwardsScreen from "./resumeItems/awards/editAwards";
import createSkillsScreen from "./resumeItems/skills/createSkills";
import editSkillsScreen from "./resumeItems/skills/editSkills";
import CreateReferenceScreen from "./resumeItems/references/createReference";
import EditReferenceScreen from "./resumeItems/references/editReference";


export default function ResumeItemsView() {
    return (
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name={"selectMenu"} component={SelectMenu}/>
            <Stack.Screen name={"createworkhistoryview"} component={CreateWorkHistoryScreen}/>
            <Stack.Screen name={"editworkhistoryview"} component={EditWorkHistoryScreen}/>
            <Stack.Screen name={"createeducationview"} component={CreateEducationScreen}/>
            <Stack.Screen name={"editeducationview"} component={editEducationScreen}/>
            <Stack.Screen name={"createawardsview"} component={createAwardsScreen}/>
            <Stack.Screen name={"editawardsview"} component={editAwardsScreen}/>
            <Stack.Screen name={"createskillsview"} component={createSkillsScreen}/>
            <Stack.Screen name={"editskillsview"} component={editSkillsScreen}/>
            <Stack.Screen name={"createreferencesview"} component={CreateReferenceScreen}/>
            <Stack.Screen name={"editreferencesview"} component={EditReferenceScreen}/>
          </Stack.Navigator>
    )
}