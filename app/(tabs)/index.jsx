import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  ScrollViewBase,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import Catgory from "../../components/Catgory";
import FoodCard from "../../components/FoodCard";
import axios from "axios";

const catData = [
  {
    label: "Burger",
    image: require("../../assets/images/burger.png"),
    catgory:"burger"
  },
  {
    label: "Desserts",
    image: require("../../assets/images/dessert.png"),
    catgory:"dessert"

  },
  {
    label: "Mexican",
    image: require("../../assets/images/mexican.png"),
    catgory:"mexican"

  },
  {
    label: "sushi",
    image: require("../../assets/images/sushi.png"),
    catgory:"sushi"

  },
];

const index = () => {
  const router = useRouter();
  const logout = async () => {
    await AsyncStorage.clear();
    router.push("/login"); // Navigate to login page after logout
  };

  const [foodData, setFoodData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const getFood = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      setIsLoading(true);
      const response = await axios.get(
        "https://app-backend-liart.vercel.app/api/food/getFood",
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setIsLoading(false);
      setFoodData(response.data.data);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getFood();
  }, []);
  return (
    <ScrollView>
      <LinearGradient
        // Background Linear Gradient
        colors={["#5b2f85", "#262626"]}
        start={{ x: 0.6, y: 0.2 }}
        style={styles.bacckground}
      />
      <View style={styles.container}>
        {/* // categories */}
        <View>
          <Text style={styles.text}>Categories</Text>
          <View style={{ flexDirection: "row", gap: 5, marginTop: 10 }}>
            {catData.map((item, index) => (
              <Catgory key={index} item={item} />
            ))}
          </View>
        </View>
        {/* // cards */}
        <View style={{ marginTop: 10 }}>
          <Text style={styles.text}>Featured Items </Text>
          {isLoading ? (
            <View style={{flex:1,height:500}}>
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
    height: "100%",
  },
  bacckground: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
  text: {
    color: "white",
    fontSize: 20,
    fontWeight: "semibold",
  },
});
export default index;
