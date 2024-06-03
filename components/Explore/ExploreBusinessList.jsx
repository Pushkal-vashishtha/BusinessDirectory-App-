import { View, Text, FlatList, ScrollView } from 'react-native'
import React from 'react'
import BusinessListCard from './BusinessListCard'

export default function ExploreBusinessList({businessList}) {
  return (
    <ScrollView
    >
      <FlatList
      data={businessList}
      scrollEnabled
      renderItem={({item,index})=>(
        <View>
            <BusinessListCard
            business={item}
            key={index}
            />
        </View>
      )}/>
      <View style={{
            height:400
        }}>

      </View>
    </ScrollView>
  )
}