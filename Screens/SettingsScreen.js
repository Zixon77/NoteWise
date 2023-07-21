import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { useState } from 'react'
import { SafeAreaView } from 'react-native'
import { Switch } from 'react-native'
import { EventRegister } from 'react-native-event-listeners'
import themeContext from '../Theme/ThemeContext'
import { StatusBar } from 'expo-status-bar'



const SettingsScreen = () => {

  const theme = useContext(themeContext)
  const [darkMode,setDarkMode] = useState(false)
  return (
    <>
      <SafeAreaView backgroundColor = {theme.backgroundColor}/>
      <View style = {[styles.container,{backgroundColor:theme.backgroundColor}]}>

        <Text style = {[styles.title,{color:theme.color}]}>Settings</Text>
        <View style = {styles.swtichContainer}>
          <Text style ={[styles.title2,{color:theme.color}]}>Dark Mode</Text>
            <Switch
            trackColor={{  true: 'lightgreen' }}  
            value={darkMode}
            onValueChange={(value) =>{
              setDarkMode(value);
              EventRegister.emit('ChangeTheme',value)
            }}
            style={styles.switch} // Custom size using transform
            />
        </View>
      </View>
    </>
 
  )
}

export default SettingsScreen

const styles = StyleSheet.create({
  container:{
    margin:20
  },
  title:{
    fontWeight:"bold",
    fontSize:25,
  },
  swtichContainer:{
    flexDirection:"row",
    marginTop:20,
    alignItems:"center"
  },
  title2:{
    marginRight:10,
    fontSize:17
  },
  switch:{
    transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }]
  }
})