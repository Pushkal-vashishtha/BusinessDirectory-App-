import { View, Text, Image, TouchableOpacity, Alert, ToastAndroid } from 'react-native'
import React from 'react'
import {Ionicons} from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { deleteDoc, doc } from 'firebase/firestore'
import { db } from '../../configs/FirebaseConfig'
import { useUser } from '@clerk/clerk-expo'

export default function Intro({ business }) {
  if (!business) {
    return <Text>Loading...</Text>
  }
  const router= useRouter();
  const {user} = useUser();
  const deleteBusiness = async() =>{
    console.log("Delete Business");
    await deleteDoc(doc(db,'BusinessList',business?.id));
    router.back()
    ToastAndroid.show('Business Deleted!!',ToastAndroid.LONG)

  }

  const OnDelete = () =>{
    Alert.alert('Do you want to delete ','Do you really want to delete this business?',[{
      text:'Cancel',
      style:'cancel',

    },{
      text:'Delete',
      style:'destructive',
      onPress:()=>deleteBusiness()
    }])
  }
  return (
    <View>
      <View style={{
        position:'absolute',
        zIndex:10,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        width:'100%',
        padding:20
      }}>
      <TouchableOpacity onPress={()=>router.back()}>
        <Ionicons name="arrow-back-circle" size={40} color="black" />
      </TouchableOpacity>
      <Ionicons name="heart-outline" size={40} color="black" />
      </View>
      <Image
        source={{ uri: business?.imageUrl }}
        style={{
          width: "auto",
          height: 300,
        }}
      />
      <View style={{
  display:'flex',
  flexDirection:'row',
  justifyContent:'space-between',
  backgroundColor:'#fff',
  padding:20,
        marginTop:-20,
        backgroundColor:'#fff',
        borderTopLeftRadius:30,
        borderTopRightRadius:30
}}>
      <View style={{
        padding:20,
        marginTop:-20,
        backgroundColor:'#fff',
        borderTopLeftRadius:30,
        borderTopRightRadius:30
      }}>
        <Text style={{
          fontSize:22,
          fontFamily:'outfit-bold',
        }}>{business.name}
           </Text>
        <Text style={{
          fontFamily:'outfit',
          fontSize:14
        }}>{business.address}</Text>


</View>
{user?.primaryEmailAddress?.emailAddress==business?.userEmail &&  <TouchableOpacity
      onPress={()=>OnDelete()}>
<Ionicons name="trash" size={28} color="red" />
      </TouchableOpacity>}
    </View>
    </View>
  )
}