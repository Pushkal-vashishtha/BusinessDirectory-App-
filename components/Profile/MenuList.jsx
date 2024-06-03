import { View, Text, FlatList, Image, TouchableOpacity, Share } from 'react-native'
import React from 'react'
import {Colors} from './../../constants/Colors'
import { useRouter } from 'expo-router'
import { useAuth } from '@clerk/clerk-expo'
export default function MenuList() {
const {signOut} = useAuth();
    const menuList =[
        {
            id:1,
            name:'Add Business',
            icon:require("./../../assets/images/add.png"),
            path:'/business/add-business'
        },
        {
            id:2,
            name:'My Business',
            icon:require("./../../assets/images/business.png"),
            path:'/business/my-business'
        },
        {
            id:3,
            name:'Share App',
            icon:require("./../../assets/images/share.png"),
            path:'share'
        }
        ,
        {
            id:4,
            name:'LogOut',
            icon:require("./../../assets/images/logout.png"),
            path:'logout'
        }
    ]
    const router = useRouter();
    const onMenuClick=(item)=>{
        if(item.path=='logout'){
            signOut();
            return;
        }
        if(item.path=='share'){
            Share.share({
                message:'Download the App By Puru '+'DownloadUrl'
            })
            return;
        }
        router.push(item.path)
    }

  return (
    <View style={{
        marginTop:50
    }}>
      <FlatList
      numColumns={2}
      data= {menuList}
      renderItem={({item,index})=>(
        <TouchableOpacity
        onPress={()=>onMenuClick(item)}
        style={{
            display:'flex',
            flexDirection:'row',
            alignItems:'center',
            gap:10,
            flex:1,
            padding:10,
            borderRadius:15,
            borderWidth:1,
            margin:10,
            backgroundColor:'#fff',
            borderColor:Colors.PRIMARY
        }}>
            <Image source={item.icon}
            style={{
                width:50,
                height:50
            }}/>
            <Text style={{
                fontFamily:'outfit-medium',
                fontSize:12,
                flex:1
            }}>{item.name}</Text>
        </TouchableOpacity>
      )}
      />  
      <Text style={{
        fontFamily:'outfit-medium',
        fontSize:8,
        textAlign:'center',
        marginTop:230,
        color:Colors.PRIMARY
      }}>Developed by Pushkal Vashishtha</Text>
    </View>
  )
}