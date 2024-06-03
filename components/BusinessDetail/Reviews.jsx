import { View, Text, Image, TextInput, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import { Rating } from 'react-native-ratings'
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../configs/FirebaseConfig';
import { useUser } from '@clerk/clerk-expo';

export default function Reviews({ business }) {

  const [rating,setRating] = useState(4);
  const [userInput,setUserInput]= useState();
  const {user} = useUser();
 const onSubmit = async () =>{
   const docRef = doc(db,'BusinessList',business.id)
   await updateDoc(docRef,{
    reviews:arrayUnion({
      rating:rating,
      comment:userInput,
      userName:user?.fullName,
      userImage:user?.imageUrl,
      userEmail:user?.primaryEmailAddress?.emailAddress
    })
   })
   ToastAndroid.show("Comment Added Sucessfully!",ToastAndroid.BOTTOM)
 }

  return (
    <View style={{
      padding: 20,
      backgroundColor: '#fff',
    }}>
      <Text style={{
        fontFamily: 'outfit-bold',
        fontSize: 20
      }} >Reviews</Text>
      <View>
        <Rating
          imageSize={20}
          showRating={false}
          onFinishRating={(rating)=>setRating(rating)}
          style={{ paddingVertical: 10 }}
        />
        <TextInput
        onChangeText={(value)=>setUserInput(value)}
        style={{
          borderWidth:1,
          padding:10,
          borderRadius:10,
          borderColor:'#b3b3b3',
          textAlignVertical:'top'

        }}
        placeholder='Write Your Comments'
        numberOfLines={4}
        />
        <TouchableOpacity
        disabled={!userInput}
        onPress={()=>onSubmit()}
        style={{
          backgroundColor:"#f0600f",
          padding:10,
          borderRadius:6, marginTop:10
        }}>
          <Text style={{
            fontFamily:'outfit',
            color:"#fff",
            textAlign:'center'           
          }}>Submit</Text>
        </TouchableOpacity>
      </View>

          <View>
            {business?.reviews?.map((item,index)=>(
              <View style={{
                display:'flex',
                flexDirection:'row',
                alignItems:'center',
                gap:10,
                padding:10,
                borderWidth:1,
                borderColor:'#b3b3b3',
                borderRadius:15,
                marginTop:10
              }}>
                <Image source={{uri:item.userImage}}
                style={{
                  height:50,
                  width:50,
                  borderRadius:99,

                }}/>
                <View style={{
                  display:'flex',
                  gap :5
                }}>
                  <Text style={{
                    fontFamily:'outfit-medium'
                  }}>{item.userName}</Text>
                
                <Rating
                imageSize={20}
                ratingCount={item.rating}
                style={{alignItems:'flex-start'}}
                /> 
                <Text>{item.comment}</Text>
                </View>
                </View>
            ))}
          </View>

    </View>
  )
}