import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

const Catgory = ({item}) => {
  const router = useRouter()
  return (
    <TouchableOpacity onPress={()=>router.push(`/${item.catgory}`)}>
      <View style={styles.container}>
        <Image style={styles.Image}  source={item.image} ></Image>
      </View>
      <Text style={styles.text}>{item.label}</Text>
    </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
    container:{
        width:80,
        backgroundColor:"#30194d",
        justifyContent:"center",
        alignItems:"center",
        borderRadius:10,
        borderWidth:.2,
        borderColor:"gray",
        overflow:"hidden",
    },
    Image: {
    width:80,
    height:80
    },
    text:{
        color:"white",
        fontSize:16,
        fontWeight:"semibold",
        textAlign:"center"
      }
})
export default Catgory;
