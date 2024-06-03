import { View, Text, Image, TouchableOpacity, TextInput, ToastAndroid, ActivityIndicator, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from 'expo-router'
import * as ImagePicker from 'expo-image-picker';
import {Colors} from './../../constants/Colors';
import RNPickerSelect from 'react-native-picker-select';
import { collection, doc, getDocs, query, setDoc } from 'firebase/firestore';
import {db,storage} from './../../configs/FirebaseConfig'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useUser } from '@clerk/clerk-expo';

export default function AddBusiness() {
  const navigation = useNavigation();
  const [image,setImage] =useState(null);
  const [categoryList, setCategoryList] = useState([]);
  const [name,setName] = useState();
  const [address,setAddress] = useState();
  const [contact,setContact] = useState();
  const [website,setWebsite] = useState();
  const [about,setAbout] = useState();
  const [category,setCategory] = useState();
  const {user} = useUser();
  const [loading,setLoading]=useState(false);

  useEffect(()=>{
    navigation.setOptions({
      headerTitle:'Add New Business',
      headerShown:true,
    })
    GetCategoryList();
  },[])

  const onImagePick =async ()=>{
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      
      quality: 1,
    });
    setImage(result?.assets[0].uri);
    console.log(result);
  }



  const GetCategoryList = async () =>{
    setCategoryList([]);
    const q = query(collection(db,'Category'));
    const snapShot =await getDocs(q);

    snapShot.forEach((doc)=>{
      console.log(doc.data());
      setCategoryList(prev=>[...prev,{
        label:(doc.data()).name,
        value:(doc.data()).name
      }])
    })
  }

  const onAddNewBusiness= async()=>{
    setLoading(true)
    const fileName=Date.now().toString()+".jpg";
    const resp =await fetch(image);
    const blob = await resp.blob();

    const imageRef =ref(storage,'business-app/'+fileName);

    uploadBytes(imageRef,blob).then((snapshot)=>{
      console.log('File Uploaded.....')
    }).then(resp=>{
      getDownloadURL(imageRef).then(async(downloadUrl)=>{
        console.log(downloadUrl);
        saveBusinessDetail(downloadUrl)
      })
    })
    setLoading(false)
  }
const saveBusinessDetail = async(imageUrl)=>{
  await setDoc(doc(db,'BusinessList',Date.now().toString()),{
    name:name,
    address:address,
    contact:contact,
    about:about,
    website:website,
    category:category,
    username:user?.fullName,
    userEmail:user?.primaryEmailAddress?.emailAddress,
    userImage:user?.imageUrl,
    imageUrl:imageUrl
  })
  setLoading(false)
  ToastAndroid.show("New Business Added . . . ",ToastAndroid.LONG)
}

  return (
  <ScrollView>
    <View style={{
      padding:20,
    }}>
      <Text style={{
        fontFamily:'outfit-bold',
        fontSize:25
      }}>AddBusiness</Text>
      <Text style={{
        fontFamily:'outfit',
        color:'#b3b3b3'
      }}>Fill all details inorder to add new business</Text>
      <TouchableOpacity
      onPress={()=>onImagePick()}
      style={{
        marginTop:20
      }}
      >
        {!image?<Image
      style={{
        width:100,
        height:100
      }} source={require('./../../assets/images/placeholder.png')}/>
      :<Image
      style={{
        width:100,
        height:100,
        borderRadius:15
      }} source={{uri:image}}/>}
      </TouchableOpacity>
      <View>
      <TextInput
       placeholder='Name'
       onChangeText={(v)=>setName(v)}
        style={{
          padding:10,
          borderWidth:1,
          borderRadius:5,
          fontSize:15,
          backgroundColor:'#fff',
          marginTop:5,
          borderColor:Colors.PRIMARY,
          fontFamily:'outfit'
        }}/>
        <TextInput placeholder='Address'
        onChangeText={(v)=>setAddress(v)}
        style={{
          padding:10,
          borderWidth:1,
          borderRadius:5,
          fontSize:15,
          backgroundColor:'#fff',
          marginTop:5,
          borderColor:Colors.PRIMARY,
          fontFamily:'outfit'
        }}/>
        <TextInput placeholder='Contact'
        onChangeText={(v)=>setContact(v)}
        style={{
          padding:10,
          borderWidth:1,
          borderRadius:5,
          fontSize:15,
          backgroundColor:'#fff',
          marginTop:5,
          borderColor:Colors.PRIMARY,
          fontFamily:'outfit'
        }}/>
        <TextInput placeholder='Website'
        onChangeText={(v)=>setWebsite(v)}
        style={{
          padding:10,
          borderWidth:1,
          borderRadius:5,
          fontSize:15,
          backgroundColor:'#fff',
          marginTop:5,
          borderColor:Colors.PRIMARY,
          fontFamily:'outfit'
        }}/>
        <TextInput placeholder='About'
        onChangeText={(v)=>setAbout(v)}
        multiline
        numberOfLines={5}
        style={{
          padding:10,
          borderWidth:1,
          borderRadius:5,
          fontSize:15,
          backgroundColor:'#fff',
          marginTop:5,
          borderColor:Colors.PRIMARY,
          fontFamily:'outfit',
          height:100
        }}/>
        <View style={{
          borderWidth:1,
          borderRadius:5,
          
          backgroundColor:'#fff',
          marginTop:5,
          borderColor:Colors.PRIMARY,
          fontFamily:'outfit',
        }}>
        <RNPickerSelect

      onValueChange={(value) => setCategory(value)}
      items={categoryList}
    />
        </View>

      </View>
      <TouchableOpacity 
      disabled={loading}
      style={{
        padding:15,
        backgroundColor:Colors.PRIMARY,
        borderRadius:10,
        marginTop:20
      }}
      onPress={()=>onAddNewBusiness()}
      >
       {loading?
       <ActivityIndicator size={'large'} color={'#fff'}/> :<Text style={{
          textAlign:'center',
          fontFamily:'outfit-bold',
          fontSize:15,
          color:'#fff'
        }}>Add New Business</Text>}
      </TouchableOpacity>
    </View>
  </ScrollView>
  )
}