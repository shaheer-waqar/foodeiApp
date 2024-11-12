import { View, Text, StyleSheet, Image, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import Toast from "react-native-toast-message";

const SingleFood = () => {
  const { id } = useLocalSearchParams();
  const [foodData, setFoodData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isfoodLoad,setIsFoodLoad] = useState(false);
  const [counter, setcouner] = useState(1);
  const getFood = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      setIsLoading(true);
      const response = await axios.get(
        `https://app-backend-liart.vercel.app/api/food/getsingle/${id}`,
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

  const addOrder = async ()=>{
    setIsFoodLoad(true)
    try {
      const token = await AsyncStorage.getItem("token");
      // setIsLoading(true);
      const response = await axios.post(
        `https://app-backend-liart.vercel.app/api/order`,{
          title:foodData.title,
          price:foodData.price,
          quantity:counter,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setIsFoodLoad(false)

      Toast.show({
        type: "success",
        text1: "Order Placed Successfully",
      })
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "failed to place order",
      })
      console.log(error)
      setIsFoodLoad(false);

    }
  }

  const plusItem = () => {
    if (counter <= 20) {
      setcouner(counter + 1);
    }
  };
  const minusItem = () => {
    if (counter > 0) {
      setcouner(counter - 1);
    }
  };
  const router = useRouter();
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#5b2f85", "#262626"]}
        start={{ x: 0.6, y: 0.2 }}
        style={styles.bacckground}
      />
      <AntDesign name="arrowleft" color="white" size={30} style={{backgroundColor:"black",width:40, padding:4,borderRadius:10,marginBottom:10 }} onPress={()=>router.back()}/>
      <View style={{ position: "relative" }}>
        <Image
          style={{ borderRadius: 10 }}
          source={{ uri: foodData?.image }}
          width="100%"
          height={300}
        />
        <View style={styles.Blur}>
          <BlurView
            intensity={25}
            tint="dark"
            style={{ paddingHorizontal: 10, paddingVertical: 10 }}
          >
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>
              {foodData?.title}
            </Text>
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
              ${foodData?.price}.00
            </Text>
            <Text style={{ color: "white", fontSize: 14, marginTop: 10 }}>
              {foodData?.description}
            </Text>
            <View style={styles.couter}>
              <Entypo
                onPress={minusItem}
                name="minus"
                size={20}
                color="white"
              />
              <Text style={{ color: "white", fontSize: 20 }}>{counter}</Text>
              <Entypo onPress={plusItem} name="plus" size={20} color="white" />
            </View>
          </BlurView>    
        </View>
      </View>

      <View style={styles.bottomContainer}>
        <TouchableOpacity disabled={isfoodLoad == true}  style={styles.button}>
          {
            isfoodLoad ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text onPress={addOrder} style={styles.text}>Order now</Text>
            )
          }
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
    height: "100%",
    position: "relative",
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
    fontSize: 15,
    fontWeight: "semibold",
  },
  couter: {
    marginTop: 10,
    flexDirection: "row",
    gap: 10,
    borderWidth: 1,
    borderColor: "gray",
    width: 120,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
  Blur: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 240,
    borderRadius: 10,
    overflow: "hidden",
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
  button: {
    backgroundColor: "#233473",
    borderRadius: 7,
    paddingVertical: 10,
    paddingHorizontal: 20,
    
  },
});

export default SingleFood;
