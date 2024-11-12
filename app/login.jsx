import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  View,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { Link, useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import { AntDesign, Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isLoading,setIsLoading] = useState(false)

  const router = useRouter();

  const handleChange = (fieldname, value) => {
    setFormData({ ...formData, [fieldname]: value });
  };

  const handleSubmit = async () => {
    setIsLoading(true)
    const { email, password } = formData;
    if (!email || !password) {
      return Toast.show({
        type: "error",
        text1: "Please fill all fields",
      });
    }

    try {
      const promise = await axios.post(
        "https://app-backend-liart.vercel.app/api/user/login",
        formData
      );
      console.log("Login Form Submitted:", formData);

      console.log(promise.data);
      await AsyncStorage.setItem("token", promise.data.token);

      Toast.show({
        type: "success",
        text1: " Login successfully",
      });
      setIsLoading(false)
      router.push("/(tabs)/");
    } catch (error) {
      setIsLoading(false)
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <LinearGradient
        // Background Linear Gradient
        colors={["#5b2f85", "#262626"]}
        start={{ x: 0.6, y: 0.2 }}
        style={styles.bacckground}
      />
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 40,
        }}
      >
        <Image source={require("../assets/images/logo.png")} />
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            textAlign: "center",
            color: "white",
            marginTop:10
          }}
        >
          Deliver Favourite Food
        </Text>
      </View>
      <View>
        {/* Login Form */}
        <View style={styles.formcontinar}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: "bold",
              textAlign: "center",
              color: "white",
              marginBottom:10
            
            }}
          >
            Login 
          </Text>
          <View style={styles.inpuCoontinaer}>
            <AntDesign name="user" color="white" size={14} />
            <TextInput
              placeholderTextColor="#c2c2c2"
              onChangeText={(value) => handleChange("email", value)}
              style={styles.input}
              placeholder="Email"
              keyboardType="email-address"
            />
          </View>
          <View style={styles.inpuCoontinaer}>
            <Feather name="lock" color="white" size={14} />
            <TextInput
              placeholderTextColor="#c2c2c2"
              onChangeText={(value) => handleChange("password", value)}
              style={styles.input}
              placeholder="password"
              secureTextEntry={true}
            />
          </View>
          <TouchableOpacity disabled={isLoading == true} onPress={handleSubmit} style={styles.button}>
            {
              isLoading? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text style={styles.text}>Login</Text>
              )
            }
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 50 }}>
          <Text
            style={{
              fontSize: 17,
              marginBottom: 3,
              textAlign: "center",
              color: "white",
            }}
          >
            Don't have an account ?{" "}
          </Text>
          <Link
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: 16,
              letterSpacing: 2,
              textAlign: "center",
            }}
            href="signup"
          >
            REGISTER
          </Link>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  bacckground: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
  formcontinar: {
    width: "100%",
    paddingHorizontal: 15,
    paddingVertical: 40,
    gap: 10,
    backgroundColor: "#30194d",
    borderRadius: 10,
  },
  inpuCoontinaer: {
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 7,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    alignItems: "center",
    gap: 4,
  },
  input: {
    height: 40,
    width: "95%",
    paddingHorizontal: 10,
    color: "white",
  },
  icon: {
    position: "absolute",
    color: "white",
  },
  button: {
    backgroundColor: "#233473",
    borderRadius: 7,
    paddingVertical: 10,
  },
  text: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
export default login;
