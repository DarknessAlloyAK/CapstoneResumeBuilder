
// Imports
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import UserContextProvider from './functions/context/userContext';
import { createStackNavigator } from '@react-navigation/stack';

// Navigation Stack
const Stack = createStackNavigator()

// Screens
import LoginScreen from './screens/accountscreens/login';
import RegisterScreen from './screens/accountscreens/register';
import MainScreen from './screens/main';

// Functionality
export default function App() {
  return (
    <UserContextProvider>
      <Stack.Navigator>
        <Stack.Screen name="login" component={<LoginScreen/>}/>
        <Stack.Screen name="register" component={<RegisterScreen/>}/>
        <Stack.Screen name="main" component={<MainScreen/>}/>
      </Stack.Navigator>
    </UserContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
