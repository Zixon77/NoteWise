import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Entypo } from '@expo/vector-icons'; 
import { useContext } from 'react';
import themeContext from '../Theme/ThemeContext';


const Note = (props) => {
    const theme = useContext(themeContext)
  return (
    <View style = {styles.container}>
        <View style = {styles.top}>
          <Text numberOfLines={1} style = {styles.title}>{props.title}</Text>
            <View style = {styles.icons}>
                    <TouchableOpacity style = {styles.mod} onPress={props.onPressModal}>
                            <Entypo name="popup" size={20} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity style ={styles.delete} onPress={props.onPress}>
                         <Entypo name="cross" size={30} color="white" />
                </TouchableOpacity>
            </View>
        </View>
      <Text  numberOfLines={3} style ={styles.desc}>{props.desc}</Text>
    </View>
  )
}

export default Note

const styles = StyleSheet.create({
    container:{
        backgroundColor:"black",
        borderRadius:20,
        width:"90%",
        height:125,
        marginVertical:10,
        borderWidth:1,
        borderColor:"white",
        alignSelf:"center"
    },
    top:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between"
    },
    title:{
        color:"white",
        fontWeight:"bold",
        fontSize:25,
        padding:12
    },
    icons:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between"
    },
    desc:{
        color:"white",
        marginHorizontal:15
       
    },
    delete:{
        paddingHorizontal:10
    }
})