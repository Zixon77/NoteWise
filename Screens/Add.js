import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { TextInput, TouchableOpacity,} from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons'; 
import { SafeAreaView } from 'react-native';
import { Keyboard } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native';
import { useContext } from 'react';
import themeContext from '../Theme/ThemeContext';


const Add = ({navigation}) => {
    const theme = useContext(themeContext)

    const [title,setTitle] = useState('')
    const [desc,setDesc] = useState('')
    const[emptyFields,setEmptyFields] = useState(false)

    const cancelHandler =() =>{
        navigation.navigate("Home")
    }
    const sumbitHandler =async () =>{
        if(title.length != 0 && desc.length !=0)
        {
            navigation.navigate("Home",{title:title,desc:desc,noteMade:true})
        } else{
            setEmptyFields(true)
        }
    }

    const clearDesc = () =>{
        const newDesc =  desc.length
        setDesc(newDesc)
    }
    
    const titleLength = title.length
    const descLength = desc.length


  return (
    <>
        <SafeAreaView backgroundColor = {theme.backgroundColor}/>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style = {[styles.container,{backgroundColor:theme.backgroundColor}]} >
            <Text style = {[styles.title,{color:theme.color}]}>Add Note</Text>
            <View style = {styles.titleContainer}>
                  <Text style = {styles.titleLength}>{titleLength}/20</Text>
                    <TextInput 
                    maxLength={20}
                    value={title}
                    style = {[styles.inputTitle,{color:theme.color}]} 
                    onChangeText={text =>setTitle(text)}
                    placeholderTextColor={theme.color}
                    placeholder='Title Goes Here'/>
            </View>
             <Text style = {styles.titleLength}>{descLength}/725</Text>
                <TextInput 
                maxLength={725}
                value = {desc}
                style = {[styles.inputDesc,{color: theme.color}]} 
                onChangeText={text =>setDesc(text)}
        
                multiline  />

                {emptyFields ?  
                  <Text style = {styles.warning}>* Please fill out all fields</Text> :null}
        
              <View style = {styles.icons}>
                <TouchableOpacity style = {styles.back} onPress={cancelHandler}>
                    <Ionicons name="arrow-back" size={35} color={theme.color} />
                </TouchableOpacity>
                <TouchableOpacity onPress={clearDesc}>
                 <Feather name="trash" size={27} color={theme.color} />
                </TouchableOpacity>
                  <TouchableOpacity style = {styles.back} onPress={sumbitHandler}>
                    <Ionicons name="checkmark" size={37} color={theme.color} />
                </TouchableOpacity>
            </View>
        </View>
        </TouchableWithoutFeedback>
    </>
  )
}

export default Add

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#fff',
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center",
    },
    title:{
        fontWeight:"bold",
        fontSize:27
    },
    titleContainer:{
        width:"100%",
        alignItems:"center",
    },
    titleLength:{
        alignSelf:"flex-end",
        marginRight:20,
        marginBottom:5,
        color:"gray",
        fontSize:10
    },
    inputTitle:{
      borderWidth:1,
     borderColor:"gray",
     width:"95%",
      height:45,
      borderRadius:20,
        fontSize:15,
       marginBottom:10,
       paddingLeft:15
    },
    inputDesc:{
        borderWidth:1,
       borderColor:"gray",
       width:"95%",
       height:500,
      borderRadius:20,
       fontSize:15,
       padding:15,
       paddingTop:10
    },
    warning:{
        alignSelf:"flex-start",
        color:"red",
        marginLeft:20,
        marginTop:5
    },
    icons:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        width:"90%",
        marginVertical:10
    },


})