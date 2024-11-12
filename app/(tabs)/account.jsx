import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";

const account = () => {
  const [userData, setuserData] = useState({});
  const router = useRouter();
  const logout = async () => {
    // Add logout logic here
    await AsyncStorage.clear();
    router.push("/login");
  };

  useEffect(() => {
    const setData = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const decoded = jwtDecode(token);
        console.log(decoded);
        setuserData(decoded);
      } catch (error) {
        console.error("Error retrieving data", error);
      }
    };
    setData();
  }, []);
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#5b2f85", "#262626"]}
        start={{ x: 0.6, y: 0.2 }}
        style={styles.bacckground}
      />

      <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
        <Text style={[styles.text, { textAlign: "center" }]}>Account</Text>

        <Text style={styles.text}>Username : {userData?.username}</Text>
        <Text style={styles.text}>Email : {userData?.email}</Text>
      </View>

      <View style={styles.bottomContainer}>
        <TouchableOpacity onPress={logout} style={styles.button}>
          <Text style={styles.text}>Log out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 10,
    height: 800,
  },
  bacckground: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 800,
  },
  text: {
    color: "white",
    fontSize: 20,
    fontWeight: "semibold",
  },
  orderContainer: {
    width: "100%",
    padding: 10,
    height: 10,
    backgroundColor: "#1D102D",
    borderRadius: 10,
    shadowColor: "#000",
  },
  bottomContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#1D102D",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    height: 100,
  },
});
export default account;
