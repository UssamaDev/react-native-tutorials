import React, { useState, useEffect, setState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';


async function onGoogleButtonPress() {
    console.log("Should affect an user here")
    return null
};

async function googleSignOut()  {
    console.log("Should sign out here and: user = null")
};

function HomeScreen({ navigation }) {
  const [email, setEmail] = useState();
  

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={styles.text}>Already loged In</Text>
      <Text style={styles.text}>Welcome "user email"</Text>
      <Pressable 
        onPress={
            () => googleSignOut()
            .then(() => navigation.navigate('Auth'))
        }
        style={styles.button}>
          <Text style={styles.text}>Log Out</Text>
      </Pressable>
    </View>
  );
}



function AuthScreen({ navigation }) {

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {/* We'll use Google button instead */}
        <Pressable 
        onPress={
          () => onGoogleButtonPress()
          .then(() => navigation.navigate('Home'))
        }
        style={styles.button}>
          <Text style={styles.text}>Log In</Text>
      </Pressable>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Auth" component={AuthScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    paddingHorizontal: 16,
    margin: 6,
    borderRadius: 6,
    elevation: 3,
    backgroundColor: '#33B6FF',
    width: '50%',
  },
  text: {
    padding: 10,
    color: '#555555',
    textAlign: 'center',
    fontSize: 20,
  },
});

export default function App() {
    
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
