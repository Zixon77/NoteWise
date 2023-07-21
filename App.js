import Home from './Screens/Home';
import { createStackNavigator } from '@react-navigation/stack';
import {NavigationContainer,DarkTheme} from '@react-navigation/native';
import { DrawerContent, createDrawerNavigator } from '@react-navigation/drawer';
import Add from './Screens/Add';
import SettingsScreen from './Screens/SettingsScreen';
import { useState ,useEffect} from 'react';
import React from 'react';
import { EventRegister } from 'react-native-event-listeners';
import theme from './Theme/theme';
import themeContext from './Theme/ThemeContext';
import { DefaultTheme } from 'react-native-paper';


const Stack = createStackNavigator()
const Drawer = createDrawerNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator> 
      <Stack.Screen
        name='Home'
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='Add'
        component={Add}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};


const DrawerNavigator = () => {
  return (
   
    <Drawer.Navigator drawerContent={props => <SettingsScreen {...props} />}>
      <Drawer.Screen
      name='HomeScreen' 
      component={HomeStack}
       options={{ 
        drawerLabel: () => null,
        headerShown: false,
        }} />
    </Drawer.Navigator>

  );
};


export default function App() {

  const [darkMode,setDarkMode] = useState(false)

  useEffect(() =>{
    const listener = EventRegister.addEventListener("ChangeTheme",(data) =>{
      setDarkMode(data)
      console.log(data)
    })
      return () =>{
        EventRegister.removeAllListeners(listener)
      }
  },[darkMode])


  return (
    <themeContext.Provider value={darkMode === true ? theme.dark : theme.light}>
      <NavigationContainer theme = {darkMode === true ? DarkTheme : DefaultTheme}>
            <DrawerNavigator />
      </NavigationContainer>
    </themeContext.Provider>
  );
}



