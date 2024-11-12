import React from 'react'
import { Tabs } from 'expo-router';
import { AntDesign, Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const tabContainer = () => {
  return (
   <Tabs screenOptions={{headerShown:false,}}>
    <Tabs.Screen options={{
    tabBarIcon: () => (
      <AntDesign name="home" size={24}  /> 
    ),
    tabBarLabel: 'Home',
    tabBarColor: 'black',
    tabBarActiveTintColor: 'blue',
    tabBarInactiveTintColor: 'gray',
    tabBarStyle: { backgroundColor: 'white' },

     }} name='index' />

    <Tabs.Screen  options={{
    tabBarIcon: () => (
      <Feather name="book" size={24}  /> 
    ),
    tabBarLabel: 'Order',
    tabBarColor: 'black',
    tabBarActiveTintColor: 'blue',
    tabBarInactiveTintColor: 'gray',
    tabBarStyle: { backgroundColor: 'white' },

     }} name='orders' />
    <Tabs.Screen  options={{
    tabBarIcon: () => (
      <AntDesign name="user" size={24}  /> 
    ),
    tabBarLabel: 'Account',
    tabBarColor: 'black',
    tabBarActiveTintColor: 'blue',
    tabBarInactiveTintColor: 'gray',
    tabBarStyle: { backgroundColor: 'white' },

     }} name='account' />
   </Tabs>
   
  )
}

export default tabContainer