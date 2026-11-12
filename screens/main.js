import React from "react";
import { View } from "react-native-web";
import { createDrawerNavigator } from "@react-navigation/drawer";

// Screens
import MainDockScreen from "./mainscreens/maindock";
import JobListingCreator from "./mainscreens/jobListingCreator";
import ResumeCreator from "./mainscreens/resumeCreator";
import ResumeItemsView from "./mainscreens/resumeItems";

const Drawer = createDrawerNavigator()

export default function MainScreen() {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name={'Dock'} component={MainDockScreen}/>
            <Drawer.Screen name={'Job Listings'} component={JobListingCreator}/>
            <Drawer.Screen name={'Resumes'} component={ResumeCreator}/>
            <Drawer.Screen name={'Items'} component={ResumeItemsView}/>
        </Drawer.Navigator>)
}