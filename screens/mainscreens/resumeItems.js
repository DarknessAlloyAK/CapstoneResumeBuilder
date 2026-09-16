import React from "react";
import { createStackNavigator } from '@react-navigation/stack';

// Navigation Stack
const Stack = createStackNavigator()

import selectMenu from "./resumeItems/selectMenu";

export default function ResumeItemsView() {
    return (
    <UserContextProvider>
          <Stack.Navigator>
            <Stack.Screen name="selectMenu" component={<selectMenu/>}/>

{           // work history
}           <Stack.Screen name="workhistoryview" component={<RegisterScreen/>}/>
            <Stack.Screen name="workhistoryedit" component={<MainScreen/>}/>
            <Stack.Screen name="workhistorycreate" component={<RegisterScreen/>}/>
            
          </Stack.Navigator>
    </UserContextProvider>
    )
}