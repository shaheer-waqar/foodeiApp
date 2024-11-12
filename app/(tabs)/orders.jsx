import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";

const orders = () => {
  const [orderData, setOrderData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getOrder = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      setIsLoading(true);
      const response = await axios.get(
        "https://app-backend-liart.vercel.app/api/getorder",
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setIsLoading(false);
      setOrderData(response.data.data);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getOrder();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        // Background Linear Gradient
        colors={["#5b2f85", "#262626"]}
        start={{ x: 0.6, y: 0.2 }}
        style={styles.background}
      />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
          <Text style={styles.text}>Your Order History</Text>
         
          <View style={styles.ordersList}>
            {orderData.map((item, index) => (
              <View key={index} style={styles.orderContainer}>
                <Text style={styles.orderText}>Name: {item.title}</Text>
                <Text style={styles.orderText}>Price: ${item.price}</Text>
                <Text style={styles.orderText}>Quantity: {item.quantity}</Text>
                <Text style={styles.orderText}>Order ID: {item._id}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  background: {
    ...StyleSheet.absoluteFillObject, // Ensures the gradient covers the entire screen
  },
  scrollViewContent: {
    flexGrow: 1, // This ensures that ScrollView content stretches to fill the space
    zIndex: 1, // Ensures scroll view content is on top of the gradient
  },
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 10,
  },
  text: {
    color: "white",
    fontSize: 20,
    fontWeight: "600", // Corrected font weight
  },
  ordersList: {
    gap: 6,
  },
  orderContainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#1D102D",
    borderRadius: 10,
  },
  orderText: {
    color: "white",
  },
});

export default orders;
