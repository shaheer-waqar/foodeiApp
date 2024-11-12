import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import FoodCard from "../components/FoodCard";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";

const category = () => {
  const { category } = useLocalSearchParams();
  const [foodData, setFoodData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const getFood = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      setIsLoading(true);
      const response = await axios.get(
        `https://app-backend-liart.vercel.app/api/food/getFood/${category}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setIsLoading(false);
      setFoodData(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getFood();
  }, []);
  const router = useRouter()
  return (
    <ScrollView>
         <LinearGradient
        // Background Linear Gradient
        colors={["#5b2f85", "#262626"]}
        start={{ x: 0.6, y: 0.2 }}
        style={styles.bacckground}
      />

      <View style={styles.container}>
      <AntDesign name="arrowleft" color="white" size={30} style={{backgroundColor:"black",width:40, padding:4,borderRadius:10,marginBottom:10 }} onPress={()=>router.back()}/>
        <View style={{ marginTop: 10 }}>
          <Text style={styles.text}>{category} Items </Text>
          {isLoading ? (
            <View style={{ flex: 1, height: 500 }}>
              <ActivityIndicator size="small" color="white" />
            </View>
          ) : (
            <View style={{ gap: 10, marginTop: 10 }}>
              {foodData.map((item, index) => (
                <FoodCard key={index} item={item} />
              ))}
            </View>
          )}
        </View>
      </View>
    </ScrollView>
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
    textTransform:"capitalize"
  },
});
export default category;
