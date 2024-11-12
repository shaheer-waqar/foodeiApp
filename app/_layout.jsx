import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import Toast from "react-native-toast-message";

export default function RootLayout() {

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
        console.log("first")
      }

    }
    checkUser()
  },[])
  return (
    <>
    <Stack screenOptions={{headerShown:false}}>
      <Stack.Screen name="index" />
    </Stack>
    <Toast ref={(ref)=>Toast.setRef(ref)}/>
    </>
  );
}
