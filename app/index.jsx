import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, Text, View } from "react-native";

export default function Index() {

  const router = useRouter();
  useEffect(()=>{
    const checkUser = async ()=>{
      try {
        const userLogged = await AsyncStorage.getItem("token")
        if(!userLogged) {
          return router.push("/login");
        }
        else{
          return router.push("/(tabs)/")
        }
        
      } catch (error) {
        console.log("hia")
      }

    }
    checkUser()
  },[])
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator size={40} color="black"/>
      <Link href='login'> Login</Link>
    </View> 
  );
}