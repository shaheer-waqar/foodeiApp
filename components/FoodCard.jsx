import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router';

const FoodCard = ({item}) => {
    const router = useRouter()
  return (
    <TouchableOpacity onPress={()=> router.push(`/singlefood/${item._id}`)} style={styles.container}>
      <View style={{gap:4}}>
        <Text style={{color:"white",fontWeight:"bold",fontSize:20}}>{item.title}</Text>
        <Text style={{width:200,color:"white",fontSize:12}}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorum, ut.</Text>
        <Text style={{color:"white",fontWeight:'bold',fontSize:15}}>$15.00</Text>
      </View>
      <View>
        <Image width={100} height={100} style={{borderRadius:10}} source={{uri:item.image}}></Image>
      </View>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        padding:10,
        backgroundColor:"#30194d",
        borderRadius:10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2.5,
        elevation: 3,
        overflow:"hidden",
        color:"white",
        gap:3,
    }

})

export default FoodCard