import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

// Screens
import MainDockScreen from "./mainscreens/maindock";
import JobListingCreator from "./mainscreens/jobListingCreator";
import ResumeCreator from "./mainscreens/resumeCreator";
import ResumeItemsView from "./mainscreens/resumeItems";

const Drawer = createDrawerNavigator

export default function MainScreen() {
    return (<Drawer.Navigator>
        <Drawer.Screen name={'mainDocker'} component={<MainDockScreen/>}/>
        <Drawer.Screen name={'jobListingCreator'} component={<JobListingCreator/>}/>
        <Drawer.Screen name={'resumeCreator'} component={<ResumeCreator/>}/>
        <Drawer.Screen name={'resumeItems'} component={<ResumeItemsView/>}/>
    </Drawer.Navigator>)
}