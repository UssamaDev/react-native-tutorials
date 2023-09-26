import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen from './screens/SignInScreen';
import ConfirmScreen from './screens/ConfirmScreen';
import HomeScreen from './screens/HomeScreen';
import ConfirmProvider from './contexts/confirmation';

const Stack = createNativeStackNavigator();
const MyStack = () => {
  return (
    <Stack.Navigator screenOptions={{
      contentStyle:{
        backgroundColor:'#FFFFFF'
      }
   }} initialRouteName="SignIn">
      <Stack.Screen name='SignIn' component={SignInScreen}/>
      <Stack.Screen name='Confirm' component={ConfirmScreen}/>
      <Stack.Screen name='Home' component={HomeScreen}/>
    </Stack.Navigator>
  );
}

const App = ({navigation}) => {

  return (
    <ConfirmProvider>
      <NavigationContainer>
      <MyStack/>
    </NavigationContainer>
    </ConfirmProvider>
  );

}

export default App
