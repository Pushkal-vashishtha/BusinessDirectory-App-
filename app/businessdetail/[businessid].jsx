import { View, Text, ActivityIndicator, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { collection, doc, getDoc, query, where } from 'firebase/firestore';
import { db } from '../../configs/FirebaseConfig';
import { Colors } from '../../constants/Colors';
import Intro from '../../components/BusinessDetail/Intro';
import ActionButton from '../../components/BusinessDetail/ActionButton';
import About from '../../components/BusinessDetail/About';
import Reviews from '../../components/BusinessDetail/Reviews';

export default function BusinessDetail() {

    const {businessid} = useLocalSearchParams();
    const [business,setBusiness] = useState();
    const [loading,setLoading] = useState(false);
    useEffect(()=>{
        GetBusinessDeatilById();
    },[])
    const GetBusinessDeatilById = async ()=>{
        setLoading(true);
        const docRef = doc(db,'BusinessList',businessid)
        const docSnap = await getDoc(docRef);
        if(docSnap.exists()){
            console.log("Document Data",docSnap.data());
            setBusiness({id:docSnap.id,...docSnap.data()});
            setLoading(false);
        }else{
            console.log("No such data")
        }
    }
  return (
    <ScrollView>
        {loading? <ActivityIndicator
        style={{
            marginTop:'70%'
        }}
        size={'large'}
        color={Colors.PRIMARY}
        />:
        <View>
            <Intro
            business={business}/>
            <ActionButton
            business={business}/>
            <About
            business={business}/>
            <Reviews 
            business={business}/>
        </View>
        }
    </ScrollView>
  )
}