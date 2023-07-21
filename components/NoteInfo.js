import { KeyboardAvoidingView, StyleSheet, Text, View,SafeAreaView } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'; 
import { TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useContext } from 'react';
import themeContext from '../Theme/ThemeContext';
import { StatusBar } from 'expo-status-bar';

const NoteInfo = (props) => {
    const theme = useContext(themeContext)
  return (
    <>
    <StatusBar style={theme.theme}></StatusBar>
    <SafeAreaView backgroundColor = {theme.backgroundColor} />
    <View style = {[styles.container,{backgroundColor:theme.backgroundColor}]}>
       <View style = {styles.titleInfo}>
            <Text style = {[styles.heading,{color:theme.color}]}>Title:</Text>
            <Text style = {[styles.text,{color:theme.color}]}>{props.title}</Text>
       </View>
       <ScrollView  style={styles.scrollView}>
           <Text style = {[styles.desc,{color:theme.color}]}>{props.desc}</Text>  
       </ScrollView>
        <TouchableOpacity style = {styles.back} onPress={props.onPress}>
            <Ionicons name="arrow-back" size={40} color={theme.color} />
        </TouchableOpacity>    
    </View>
    </>
   
  )
}

export default NoteInfo

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
    },
    back:{
        position:"absolute",
        top:10,
        left:20,
    },
    titleInfo:{
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        width:"100%",
        top:70,
    },
    scrollView: {
        marginHorizontal: 10,
        top:100,
      },
    desc:{ 
        fontSize:20,
        marginHorizontal:10,
    },
    text:{
        fontSize:20,
        margin:10
    },
    heading:{
        fontWeight:'bold',
        fontSize:20
    }
})