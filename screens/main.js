import React from "react";
import { View } from "react-native-web";
import { createDrawerNavigator } from "@react-navigation/drawer";

// Screens
import MainDockScreen from "./mainscreens/maindock";
import JobListingCreator from "./mainscreens/jobListingCreator";
import ResumeCreator from "./mainscreens/resumeCreator";
import ResumeItemsView from "./mainscreens/resumeItems";
import CreateResumeScreen from "./mainscreens/resumeCreator/createresume";
import EditResumeScreen from "./mainscreens/resumeCreator/editresume";
import CreateJobListingScreen from "./mainscreens/jobListings/createListing";
import EditJobListingScreen from "./mainscreens/jobListings/editListing";
import LogoutScreen from "./accountscreens/logout";

const Drawer = createDrawerNavigator()

export default function MainScreen() {
    return (
        <Drawer.Navigator 
        screenOptions={{
        drawerType: 'permanent',
        headerShown: false,
        drawerStyle: {
            width: 200,
            backgroundColor: '#101321'
        },
        drawerActiveTintColor: '#e91e63',      // Text & icon color for active item
        drawerInactiveTintColor: '#333333',    // Text & icon color for inactive items
        drawerLabelStyle: {
          fontWeight: 'bold',
          fontSize: 15,
        },
        drawerItemStyle: {
            borderRadius: 0
        }
        }}>
            <Drawer.Screen name={'Resumes'} component={ResumeCreator}/>
            <Drawer.Screen name={'Job Listings'} component={JobListingCreator}/>
            <Drawer.Screen name={'Items'} component={ResumeItemsView}/>
            <Drawer.Screen name={'createresume'} component={CreateResumeScreen} options={{ drawerItemStyle: {display: 'none'}, title: 'Create Resume' }}     />
            <Drawer.Screen name={'editresume'} component={EditResumeScreen} options={{ drawerItemStyle: {display: 'none'}, title: 'Edit Resume' }} />
            <Drawer.Screen name={'createjoblisting'} component={CreateJobListingScreen} options={{ drawerItemStyle: {display: 'none'}, title: 'Create Job Listing' }}     />
            <Drawer.Screen name={'editlisting'} component={EditJobListingScreen} options={{ drawerItemStyle: {display: 'none'}, title: 'Edit Job Listing' }}     />
            <Drawer.Screen name={'logout'} component={LogoutScreen} options={{ title: 'Log Out' }} />
        </Drawer.Navigator>)
}