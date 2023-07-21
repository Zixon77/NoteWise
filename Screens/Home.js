
import { Modal, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons'; 
import Note from '../components/Note';
import { FlatList } from 'react-native-gesture-handler';
import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import NoteInfo from '../components/NoteInfo';
import themeContext from '../Theme/ThemeContext';
import { useContext } from 'react';

const Home = ({navigation, route}) => {

  const theme = useContext(themeContext)
  const dayNames = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday",
  "Sunday"]
  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const day = new Date().getDay()-1
const month = new Date().getMonth()
const date = new Date().getDate()
const fullDate = dayNames[day] + ',' +' ' + monthNames[month] + ' '+date


const [notes,setNotes] = useState([])
const [modalOpen,setModalOpen] = useState(false)
const [searchQuery, setSearchQuery] = useState('');

const filteredNotes = notes.filter(note =>
  note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
  note.desc.toLowerCase().includes(searchQuery.toLowerCase())
);


const addHandler = () =>{
  navigation.navigate("Add",{noteMade:false,title:"",desc:""})
}

useEffect(() =>{
  if(route.params != null){
  console.log(route.params)
  if(route.params.noteMade == true){
    setNotes([...notes,{
      id:route.params.title,
      title:route.params.title,
      desc:route.params.desc
    }])
    route.params.noteMade = false
  }
}
},[route.params])

const deleteHandler =(id) =>{
  let newArray = [...notes]
  newArray.splice(id,1)
  setNotes(newArray)
}


  return (
    <>
     <StatusBar style={theme.theme} />
    <SafeAreaView backgroundColor = {theme.backgroundColor} />
      <View style={[styles.container,{backgroundColor:theme.backgroundColor}]}>
          <View style = {styles.topContainer}>
            <TouchableOpacity style = {styles.settings} onPress={() =>navigation.openDrawer()}>
               <AntDesign name="setting" size={30} color={theme.color} />
            </TouchableOpacity>
            <Text style = {[styles.date,{color:theme.color}]}>{fullDate}</Text>
            <TouchableOpacity style = {styles.add} onPress={addHandler}> 
              <Entypo name="plus" size={25} color={theme.color} />
           </TouchableOpacity>
          </View>
         <TextInput placeholder='Search' style = {[styles.search,{color:theme.color}]} 
          placeholderTextColor={theme.color}
           onChangeText={text => setSearchQuery(text)}
           value={searchQuery}/>
         <View style = {styles.noteContainer}>
           <FlatList    
             data={filteredNotes}
            renderItem={({item}) =>
                <Note
                title = {item.title}
                desc = {item.desc}
                onPress = {() => deleteHandler(item.index)}
                onPressModal = {() =>setModalOpen(true)}
                />}
            keyExtractor={item => notes.indexOf(item)}
           />
         </View>
   

       {modalOpen ?
        <Modal visible = {true} animationType='slide' >
          <View style={[styles.modal,{backgroundColor:theme.mod}]}>
            <NoteInfo 
            onPress= {() =>setModalOpen(false)} 
            title = {route.params.title}
            desc = {route.params.desc}
            ></NoteInfo>
          </View>
          </Modal>
         :null }
        
     </View>
    </>

  );
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection:"column"
  },
  topContainer:{
    width:"100%",
    height:"10%", 
   justifyContent:'center',
   flexDirection:"row",
  },
  date:{
    fontSize:"25%",
    fontWeight:"bold",
    top:25,
  },
  settings:{
    position:"absolute",
    top:"35%",
    right:"85%"
  },
  add:{
    position:"absolute",
    top:"28%",
    left:"85%",
    width:40,
    height:40,
    borderRadius:30,
    justifyContent: 'center',
    alignItems:"center"
  },
  search:{
    borderWidth:1,
    borderColor:"gray",
    width:"95%",
    height:45,
    borderRadius:20,
    paddingLeft:15,
    fontSize:17,
  },
  noteContainer:{
   flex:1,
   width:"100%",
   margin:10,
  },
  tap:{
    fontWeight:"bold",
    fontSize:25,
    opacity:0.1,
  },
  modal:{
    flex:1,
    backgroundColor:"#fff"
  }
});
